import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { OmiLogEntry, ProcessedWordFrequency } from '@/lib/omi/types';

function getTopWords(text: string): ProcessedWordFrequency[] {
  const stopWords = new Set([
    'the', 'is', 'at', 'which', 'on', 'and', 'a', 'an', 'as', 'are',
    'was', 'were', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
    'would', 'could', 'should', 'to', 'of', 'in', 'for', 'with', 'by',
    'from', 'about', 'into', 'through', 'during', 'before', 'after',
    'i', 'you', 'he', 'she', 'it', 'we', 'they', 'them', 'their',
    'this', 'that', 'these', 'those', 'be', 'been', 'being', 'but',
    'if', 'or', 'because', 'as', 'until', 'while', 'up', 'down', 'out',
    'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once'
  ]);
  
  const words = text
    .toLowerCase()
    .replace(/[^\w\sáéíóúñü]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));
  
  const frequency: Record<string, number> = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  return Object.entries(frequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }));
}

async function readMemoryLogs(limit: number = 20): Promise<any[]> {
  const memoryDir = path.join(process.cwd(), 'omi-logs', 'memory', 'all');
  const logs: any[] = [];
  
  try {
    await fs.access(memoryDir);
    const files = await fs.readdir(memoryDir);
    const jsonFiles = files
      .filter(file => file.endsWith('.json'))
      .sort()
      .reverse()
      .slice(0, limit);

    for (const file of jsonFiles) {
      try {
        const content = await fs.readFile(path.join(memoryDir, file), 'utf-8');
        const data = JSON.parse(content);
        
        // Mark as memory type and add metadata
        data.type = 'memory';
        data.filename = file;
        
        logs.push(data);
      } catch (error) {
        console.error(`Error reading memory file ${file}:`, error);
      }
    }
  } catch {
    // Memory directory doesn't exist yet
  }
  
  return logs;
}

export async function GET() {
  try {
    const logDir = path.join(process.cwd(), 'omi-logs');
    
    // Check if directory exists
    try {
      await fs.access(logDir);
    } catch {
      // Directory doesn't exist, return empty logs
      return NextResponse.json({ 
        success: true,
        logs: [],
        message: 'No logs found yet'
      });
    }
    
    // Read transcript logs (existing)
    const transcriptLogs: OmiLogEntry[] = [];
    const files = await fs.readdir(logDir);
    const jsonFiles = files
      .filter(file => file.endsWith('.json'))
      .sort()
      .reverse(); // Most recent first
    
    // Process last 10 transcript logs
    for (const file of jsonFiles.slice(0, 10)) {
      try {
        const content = await fs.readFile(path.join(logDir, file), 'utf-8');
        const data = JSON.parse(content);
        
        // Try to extract text from various possible fields
        let text = '';
        if (data.body) {
          if (data.body.transcript?.raw_text) {
            text = data.body.transcript.raw_text;
          } else if (data.body.raw_transcript) {
            text = data.body.raw_transcript;
          } else if (data.body.text) {
            text = data.body.text;
          } else if (data.body.content) {
            text = data.body.content;
          } else if (data.body.transcription) {
            text = data.body.transcription;
          }
        }
        
        // Process word frequency if text exists
        if (text) {
          data.wordFrequency = getTopWords(text);
          data.textLength = text.length;
        }
        
        // Mark as transcript type
        data.type = 'transcript';
        data.filename = file;
        
        transcriptLogs.push(data as OmiLogEntry);
      } catch (error) {
        console.error(`Error reading log file ${file}:`, error);
      }
    }
    
    // Read memory logs (new)
    const memoryLogs = await readMemoryLogs(10);
    
    // Combine and sort by timestamp
    const allLogs = [...transcriptLogs, ...memoryLogs];
    allLogs.sort((a, b) => {
      const timeA = new Date(a.timestamp || a.webhook_received_at || 0).getTime();
      const timeB = new Date(b.timestamp || b.webhook_received_at || 0).getTime();
      return timeB - timeA; // Most recent first
    });
    
    return NextResponse.json({ 
      success: true,
      logs: allLogs.slice(0, 20), // Combined logs
      transcript_logs: transcriptLogs,
      memory_logs: memoryLogs,
      total: allLogs.length,
      message: `Found ${transcriptLogs.length} transcript logs and ${memoryLogs.length} memory logs`
    });
    
  } catch (error) {
    console.error('Error reading logs:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to read logs',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE endpoint to clear logs (useful for testing)
export async function DELETE() {
  try {
    const logDir = path.join(process.cwd(), 'omi-logs');
    
    try {
      await fs.access(logDir);
      const files = await fs.readdir(logDir);
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          await fs.unlink(path.join(logDir, file));
        }
      }
      
      return NextResponse.json({
        success: true,
        message: `Cleared ${files.length} log files`
      });
    } catch {
      return NextResponse.json({
        success: true,
        message: 'No logs to clear'
      });
    }
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to clear logs'
      },
      { status: 500 }
    );
  }
}