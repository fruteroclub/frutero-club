import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { OmiWebhookPayload, ProcessedWordFrequency } from '@/lib/omi/types';

// Helper function to process word frequency
function processWordFrequency(text: string): ProcessedWordFrequency[] {
  const stopWords = new Set([
    'the', 'is', 'at', 'which', 'on', 'and', 'a', 'an', 'as', 'are', 
    'was', 'were', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 
    'would', 'could', 'should', 'may', 'might', 'must', 'can', 'could',
    'to', 'of', 'in', 'for', 'with', 'by', 'from', 'about', 'into',
    'through', 'during', 'before', 'after', 'above', 'below', 'between',
    'under', 'again', 'further', 'then', 'once', 'there', 'when', 'where',
    'why', 'how', 'all', 'both', 'each', 'few', 'more', 'most', 'other',
    'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so',
    'than', 'too', 'very', 'this', 'that', 'these', 'those', 'i', 'you',
    'he', 'she', 'it', 'we', 'they', 'them', 'their', 'what', 'which',
    'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are',
    'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having',
    'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if',
    'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for',
    'with', 'about', 'against', 'between', 'into', 'through', 'during',
    'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down',
    'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further',
    'then', 'once'
  ]);

  // Process text
  const words = text
    .toLowerCase()
    .replace(/[^\w\sáéíóúñü]/g, '') // Keep Spanish characters
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));

  // Count frequencies
  const frequency: Record<string, number> = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  // Calculate total for percentages
  const total = words.length;

  // Convert to array and sort
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .map(([word, count]) => ({
      word,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0
    }));
}

// Helper function to save logs
async function saveLog(headers: Record<string, string>, body: any) {
  try {
    const logDir = path.join(process.cwd(), 'omi-logs');
    await fs.mkdir(logDir, { recursive: true });

    // Generate timestamp-based filename
    const timestamp = new Date().toISOString();
    const filename = `omi-${Date.now()}.json`;
    const filepath = path.join(logDir, filename);

    // Save log data
    const logData = {
      timestamp,
      headers,
      body,
      processedAt: timestamp
    };

    await fs.writeFile(filepath, JSON.stringify(logData, null, 2));

    // Implement log rotation - keep only last 100 files
    const files = await fs.readdir(logDir);
    const jsonFiles = files
      .filter(f => f.endsWith('.json'))
      .sort()
      .reverse();

    // Delete older files if we have more than 100
    if (jsonFiles.length > 100) {
      const filesToDelete = jsonFiles.slice(100);
      for (const file of filesToDelete) {
        await fs.unlink(path.join(logDir, file));
      }
    }

    return filename;
  } catch (error) {
    console.error('Error saving log:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  console.log('=== OMI WEBHOOK RECEIVED ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Method:', request.method);
  console.log('URL:', request.url);

  try {
    // Parse request body
    const body = await request.json() as Partial<OmiWebhookPayload>;
    
    // Extract headers for logging
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headers[key] = value;
    });

    // Log to console
    console.log('Headers:', JSON.stringify(headers, null, 2));
    console.log('Body:', JSON.stringify(body, null, 2));

    // Save to log file
    const logFile = await saveLog(headers, body);
    console.log('Log saved to:', logFile);

    // Extract text from various possible fields
    const text = body.transcript?.raw_text || 
                 body.raw_transcript || 
                 body.text || 
                 '';

    // Process word frequency if we have text
    let wordFrequency: ProcessedWordFrequency[] = [];
    if (text) {
      wordFrequency = processWordFrequency(text);
      console.log(`Processed ${wordFrequency.length} unique words`);
    }

    // Prepare response
    const response = {
      success: true,
      message: 'Webhook received and processed',
      received_at: new Date().toISOString(),
      memory_id: body.memory_id || 'unknown',
      text_length: text.length,
      unique_words: wordFrequency.length,
      top_words: wordFrequency.slice(0, 10),
      log_file: logFile
    };

    console.log('Sending response:', JSON.stringify(response, null, 2));
    console.log('=== WEBHOOK PROCESSING COMPLETE ===\n');

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('=== WEBHOOK ERROR ===');
    console.error('Error processing webhook:', error);
    console.error('Stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to process webhook',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle other methods
export async function GET() {
  return NextResponse.json(
    { 
      success: true,
      message: 'Omi webhook endpoint is active',
      timestamp: new Date().toISOString(),
      endpoint: '/api/omi/webhook',
      method: 'POST'
    },
    { status: 200 }
  );
}