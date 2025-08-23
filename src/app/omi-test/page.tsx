'use client';

import { useState, useEffect } from 'react';
import { ProcessedWordFrequency } from '@/lib/omi/types';

interface OmiLog {
  timestamp: string;
  webhook_received_at?: string;
  body?: any;
  memory?: any;
  analytics?: any;
  processed?: any;
  headers?: Record<string, string>;
  wordFrequency?: ProcessedWordFrequency[];
  textLength?: number;
  filename?: string;
  endpoint?: string;
  type?: 'transcript' | 'memory';
}

export default function OmiTestPage() {
  const [logs, setLogs] = useState<OmiLog[]>([]);
  const [transcriptLogs, setTranscriptLogs] = useState<OmiLog[]>([]);
  const [memoryLogs, setMemoryLogs] = useState<OmiLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [testResponse, setTestResponse] = useState<any>(null);
  const [memoryTestResponse, setMemoryTestResponse] = useState<any>(null);

  useEffect(() => {
    fetchLogs();
    
    // Auto-refresh every 5 seconds if enabled
    if (autoRefresh) {
      const interval = setInterval(fetchLogs, 5000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/omi/logs');
      const data = await response.json();
      setLogs(data.logs || []);
      setTranscriptLogs(data.transcript_logs || []);
      setMemoryLogs(data.memory_logs || []);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearLogs = async () => {
    if (confirm('Are you sure you want to clear all logs?')) {
      try {
        await fetch('/api/omi/logs', { method: 'DELETE' });
        fetchLogs();
      } catch (error) {
        console.error('Failed to clear logs:', error);
      }
    }
  };

  const sendTestWebhook = async () => {
    const testData = {
      memory_id: `test-${Date.now()}`,
      transcript: "This is a test conversation about building amazing products with artificial intelligence and machine learning. We need to focus on user experience and create valuable solutions for our community. The implementation should be scalable and maintainable.",
      context: "meeting",
      timestamp: new Date().toISOString(),
      user_id: "test-user"
    };

    try {
      const response = await fetch('/api/omi/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      });
      
      const result = await response.json();
      setTestResponse(result);
      
      // Refresh logs after sending test
      setTimeout(fetchLogs, 1000);
    } catch (error) {
      console.error('Failed to send test webhook:', error);
      setTestResponse({ error: 'Failed to send test webhook' });
    }
  };

  const sendMemoryTest = async (language: 'en' | 'es' = 'en', uid: string = 'test_user') => {
    try {
      const response = await fetch(`/api/omi/memory/test?uid=${uid}&lang=${language}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const result = await response.json();
      setMemoryTestResponse(result);
      
      // Refresh logs after sending test
      setTimeout(fetchLogs, 1500);
    } catch (error) {
      console.error('Failed to send memory test:', error);
      setMemoryTestResponse({ error: 'Failed to send memory test' });
    }
  };

  const webhookUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/api/omi/webhook`
    : '';
  
  const testUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/api/omi/test`
    : '';

  const memoryUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/api/omi/memory?uid=YOUR_USER_ID`
    : '';

  const memoryTestUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/api/omi/memory/test`
    : '';

  const renderWordFrequency = (words: ProcessedWordFrequency[], maxWords: number = 10) => {
    return (
      <div className="flex flex-wrap gap-2">
        {words.slice(0, maxWords).map(({ word, count }, i) => (
          <span
            key={word}
            className="rounded-full bg-blue-100 px-3 py-1 text-sm"
            style={{
              fontSize: `${Math.max(14 - i * 0.5, 12)}px`,
              opacity: Math.max(1 - i * 0.08, 0.5)
            }}
          >
            {word} ({count})
          </span>
        ))}
      </div>
    );
  };

  const renderMemoryLog = (log: OmiLog, index: number) => {
    const memory = log.memory;
    const analytics = log.analytics;
    
    return (
      <div key={index} className="rounded-lg border bg-green-50 p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-full bg-green-600 px-2 py-1 text-xs text-white">
                MEMORY
              </span>
              {memory?.structured?.emoji && (
                <span className="text-lg">{memory.structured.emoji}</span>
              )}
              <span className="font-semibold text-green-900">
                {memory?.structured?.title || 'Untitled Memory'}
              </span>
            </div>
            <div className="text-sm text-green-700">
              Received: {new Date(log.webhook_received_at || log.timestamp).toLocaleString()}
            </div>
            <div className="text-sm text-green-700">
              User: {log.processed?.uid || 'Unknown'}
            </div>
            {memory?.structured?.category && (
              <div className="text-sm text-green-700">
                Category: {memory.structured.category}
              </div>
            )}
          </div>
          <div className="text-sm text-green-600">
            {analytics?.duration_seconds && (
              <div>Duration: {Math.round(analytics.duration_seconds / 60)}m</div>
            )}
            {analytics?.total_words && (
              <div>Words: {analytics.total_words}</div>
            )}
            {analytics?.speakers && (
              <div>Speakers: {analytics.speakers}</div>
            )}
          </div>
        </div>

        {memory?.structured?.overview && (
          <div className="mb-4">
            <h4 className="mb-2 text-sm font-semibold text-green-900">Overview:</h4>
            <p className="text-sm text-green-800">{memory.structured.overview}</p>
          </div>
        )}

        {memory?.structured?.action_items && memory.structured.action_items.length > 0 && (
          <div className="mb-4">
            <h4 className="mb-2 text-sm font-semibold text-green-900">Action Items:</h4>
            <ul className="space-y-1">
              {memory.structured.action_items.map((item: any, i: number) => (
                <li key={i} className="text-sm text-green-800">
                  • {item.description}
                </li>
              ))}
            </ul>
          </div>
        )}

        {analytics?.top_words && analytics.top_words.length > 0 && (
          <div className="mb-4">
            <h4 className="mb-3 text-sm font-semibold text-green-900">Top Words:</h4>
            {renderWordFrequency(analytics.top_words)}
          </div>
        )}

        {log.processed?.speaker_stats && log.processed.speaker_stats.length > 0 && (
          <div className="mb-4">
            <h4 className="mb-3 text-sm font-semibold text-green-900">Speaker Stats:</h4>
            <div className="space-y-2">
              {log.processed.speaker_stats.map((speaker: any, i: number) => (
                <div key={i} className="rounded bg-green-100 p-2 text-sm">
                  <div className="font-medium">{speaker.speaker}</div>
                  <div className="text-green-700">
                    {speaker.wordCount} words • {Math.round(speaker.duration)}s
                  </div>
                  {speaker.topWords?.length > 0 && (
                    <div className="mt-1">
                      {renderWordFrequency(speaker.topWords, 5)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <details className="cursor-pointer">
          <summary className="text-sm font-medium hover:text-green-600">
            View Raw Data
          </summary>
          <div className="mt-3">
            <pre className="mt-1 max-h-60 overflow-auto rounded bg-green-100 p-2 text-xs">
              {JSON.stringify(log, null, 2)}
            </pre>
          </div>
        </details>
      </div>
    );
  };

  const renderTranscriptLog = (log: OmiLog, index: number) => {
    return (
      <div key={index} className="rounded-lg border bg-blue-50 p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-full bg-blue-600 px-2 py-1 text-xs text-white">
                TRANSCRIPT
              </span>
              <span className="font-semibold text-blue-900">Real-time Transcript</span>
            </div>
            <div className="text-sm text-blue-700">
              Received: {new Date(log.timestamp).toLocaleString()}
            </div>
            {log.filename && (
              <div className="text-xs text-blue-600">
                File: {log.filename}
              </div>
            )}
          </div>
          {log.textLength && (
            <div className="text-sm text-blue-600">
              Text: {log.textLength} chars
            </div>
          )}
        </div>
        
        {log.wordFrequency && log.wordFrequency.length > 0 && (
          <div className="mb-4">
            <h4 className="mb-3 text-sm font-semibold text-blue-900">Top Words:</h4>
            {renderWordFrequency(log.wordFrequency)}
          </div>
        )}
        
        <details className="cursor-pointer">
          <summary className="text-sm font-medium hover:text-blue-600">
            View Raw Data
          </summary>
          <div className="mt-3 space-y-2">
            {log.headers && (
              <div>
                <div className="text-xs font-semibold text-blue-700">Headers:</div>
                <pre className="mt-1 max-h-40 overflow-auto rounded bg-blue-100 p-2 text-xs">
                  {JSON.stringify(log.headers, null, 2)}
                </pre>
              </div>
            )}
            <div>
              <div className="text-xs font-semibold text-blue-700">Body:</div>
              <pre className="mt-1 max-h-60 overflow-auto rounded bg-blue-100 p-2 text-xs">
                {JSON.stringify(log.body, null, 2)}
              </pre>
            </div>
          </div>
        </details>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold">Omi Integration Test Dashboard</h1>
        
        {/* Webhook URLs Section */}
        <div className="mb-8 space-y-4">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-xl font-semibold">Webhook Endpoints</h2>
            
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  Real-time Transcript Webhook:
                </label>
                <code className="block rounded bg-muted p-3 text-sm">
                  {webhookUrl}
                </code>
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  Memory Creation Webhook:
                </label>
                <code className="block rounded bg-green-100 p-3 text-sm">
                  {memoryUrl}
                </code>
                <div className="mt-2 text-xs text-muted-foreground">
                  Replace YOUR_USER_ID with your custom identifier (e.g., @melguachun, mel_twitter)
                </div>
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  Test Endpoint (flexible):
                </label>
                <code className="block rounded bg-muted p-3 text-sm">
                  {testUrl}
                </code>
              </div>
            </div>
            
            <div className="mt-4 rounded-lg bg-blue-50 p-4 text-sm">
              <p className="font-medium text-blue-900">Quick Test with cURL:</p>
              <pre className="mt-2 overflow-x-auto rounded bg-blue-100 p-2 text-xs">
{`curl -X POST ${memoryUrl.replace('YOUR_USER_ID', 'mel_test')} \\
  -H "Content-Type: application/json" \\
  -d '{"transcript": "Test conversation about AI and technology"}'`}
              </pre>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="mb-6 flex flex-wrap gap-4">
          <button
            onClick={sendTestWebhook}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Send Transcript Test
          </button>

          <button
            onClick={() => sendMemoryTest('en', 'test_user')}
            className="rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
          >
            Send Memory Test (EN)
          </button>

          <button
            onClick={() => sendMemoryTest('es', 'test_spanish')}
            className="rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
          >
            Send Memory Test (ES)
          </button>
          
          <button
            onClick={fetchLogs}
            className="rounded-lg border bg-white px-4 py-2 transition-colors hover:bg-gray-50"
          >
            Refresh Logs
          </button>
          
          <button
            onClick={clearLogs}
            className="rounded-lg border border-red-300 bg-white px-4 py-2 text-red-600 transition-colors hover:bg-red-50"
          >
            Clear All Logs
          </button>
          
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded"
            />
            <span>Auto-refresh (5s)</span>
          </label>
        </div>

        {/* Test Responses */}
        {testResponse && (
          <div className="mb-6 rounded-lg border bg-blue-50 p-4">
            <h3 className="mb-2 font-semibold text-blue-900">Transcript Test Response:</h3>
            <pre className="overflow-x-auto text-xs">
              {JSON.stringify(testResponse, null, 2)}
            </pre>
          </div>
        )}

        {memoryTestResponse && (
          <div className="mb-6 rounded-lg border bg-green-50 p-4">
            <h3 className="mb-2 font-semibold text-green-900">Memory Test Response:</h3>
            <pre className="overflow-x-auto text-xs">
              {JSON.stringify(memoryTestResponse, null, 2)}
            </pre>
          </div>
        )}

        {/* Statistics */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-4">
            <h3 className="text-lg font-semibold">Total Webhooks</h3>
            <p className="text-2xl font-bold text-blue-600">{logs.length}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <h3 className="text-lg font-semibold">Real-time Transcripts</h3>
            <p className="text-2xl font-bold text-blue-600">{transcriptLogs.length}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <h3 className="text-lg font-semibold">Memory Creations</h3>
            <p className="text-2xl font-bold text-green-600">{memoryLogs.length}</p>
          </div>
        </div>

        {/* Logs Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            All Webhooks ({logs.length})
          </h2>
          
          {loading ? (
            <div className="rounded-lg border bg-card p-8 text-center">
              <div className="text-muted-foreground">Loading logs...</div>
            </div>
          ) : logs.length === 0 ? (
            <div className="rounded-lg border bg-card p-8 text-center">
              <div className="text-muted-foreground">
                No webhooks received yet. Send a test webhook to see it here.
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map((log, index) => (
                log.type === 'memory' ? 
                  renderMemoryLog(log, index) : 
                  renderTranscriptLog(log, index)
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}