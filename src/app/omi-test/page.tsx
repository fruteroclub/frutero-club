'use client';

import { useState, useEffect } from 'react';
import { ProcessedWordFrequency } from '@/lib/omi/types';

interface OmiLog {
  timestamp: string;
  body: any;
  headers?: Record<string, string>;
  wordFrequency?: ProcessedWordFrequency[];
  textLength?: number;
  filename?: string;
  endpoint?: string;
}

export default function OmiTestPage() {
  const [logs, setLogs] = useState<OmiLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [testResponse, setTestResponse] = useState<any>(null);

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

  const webhookUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/api/omi/webhook`
    : '';
  
  const testUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/api/omi/test`
    : '';

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
                  Production Webhook URL:
                </label>
                <code className="block rounded bg-muted p-3 text-sm">
                  {webhookUrl}
                </code>
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  Test Webhook URL (flexible):
                </label>
                <code className="block rounded bg-muted p-3 text-sm">
                  {testUrl}
                </code>
              </div>
            </div>
            
            <div className="mt-4 rounded-lg bg-blue-50 p-4 text-sm">
              <p className="font-medium text-blue-900">Quick Test with cURL:</p>
              <pre className="mt-2 overflow-x-auto rounded bg-blue-100 p-2 text-xs">
{`curl -X POST ${testUrl} \\
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
            Send Test Webhook
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

        {/* Test Response Display */}
        {testResponse && (
          <div className="mb-6 rounded-lg border bg-green-50 p-4">
            <h3 className="mb-2 font-semibold text-green-900">Test Response:</h3>
            <pre className="overflow-x-auto text-xs">
              {JSON.stringify(testResponse, null, 2)}
            </pre>
          </div>
        )}

        {/* Logs Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Received Webhooks ({logs.length})
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
                <div key={index} className="rounded-lg border bg-card p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Received: {new Date(log.timestamp).toLocaleString()}
                      </div>
                      {log.filename && (
                        <div className="text-xs text-muted-foreground">
                          File: {log.filename}
                        </div>
                      )}
                      {log.endpoint && (
                        <div className="text-xs text-muted-foreground">
                          Endpoint: {log.endpoint}
                        </div>
                      )}
                    </div>
                    {log.textLength && (
                      <div className="text-sm text-muted-foreground">
                        Text: {log.textLength} chars
                      </div>
                    )}
                  </div>
                  
                  {/* Word Frequency Display */}
                  {log.wordFrequency && log.wordFrequency.length > 0 && (
                    <div className="mb-4">
                      <h4 className="mb-3 text-sm font-semibold">Top Words:</h4>
                      <div className="flex flex-wrap gap-2">
                        {log.wordFrequency.map(({ word, count }, i) => (
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
                    </div>
                  )}
                  
                  {/* Expandable Raw Data */}
                  <details className="cursor-pointer">
                    <summary className="text-sm font-medium hover:text-blue-600">
                      View Raw Data
                    </summary>
                    <div className="mt-3 space-y-2">
                      {log.headers && (
                        <div>
                          <div className="text-xs font-semibold text-muted-foreground">Headers:</div>
                          <pre className="mt-1 max-h-40 overflow-auto rounded bg-muted p-2 text-xs">
                            {JSON.stringify(log.headers, null, 2)}
                          </pre>
                        </div>
                      )}
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground">Body:</div>
                        <pre className="mt-1 max-h-60 overflow-auto rounded bg-muted p-2 text-xs">
                          {JSON.stringify(log.body, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}