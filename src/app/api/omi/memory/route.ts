import { NextRequest, NextResponse } from 'next/server';
import { MemoryCreation, MemoryWebhookResponse, ProcessedMemory } from '@/lib/omi/memory-types';
import { MemoryProcessor } from '@/lib/omi/memory-processor';
import { UserManager } from '@/lib/omi/user-manager';

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  console.log('=== OMI MEMORY CREATION WEBHOOK RECEIVED ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Method:', request.method);
  console.log('URL:', request.url);

  try {
    // Extract user ID from query parameter
    const searchParams = request.nextUrl.searchParams;
    const uid = searchParams.get('uid');
    const sanitizedUid = UserManager.sanitizeUserId(uid);

    console.log('Raw UID:', uid);
    console.log('Sanitized UID:', sanitizedUid);

    // Validate user ID is provided
    if (!uid) {
      console.error('Missing uid parameter');
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required uid parameter',
          message: 'Please provide uid as query parameter: ?uid=YOUR_USER_ID' 
        },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json() as MemoryCreation;
    console.log('Memory ID:', body.id);
    console.log('Language:', body.language);
    console.log('Title:', body.structured?.title);
    console.log('Segments:', body.transcript_segments?.length || 0);

    // Validate required fields
    if (!body.id || !body.created_at || !body.transcript_segments) {
      console.error('Missing required fields');
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields in memory data',
          required: ['id', 'created_at', 'transcript_segments']
        },
        { status: 400 }
      );
    }

    // Process the memory for word frequency and analytics
    console.log('Processing memory for word frequency...');
    const processed = MemoryProcessor.processMemory(body);
    
    console.log(`Processed ${processed.total_words} words, ${processed.unique_words} unique`);
    console.log(`Found ${processed.speaker_stats.length} speakers`);

    // Calculate conversation duration
    const startTime = new Date(body.started_at).getTime();
    const endTime = new Date(body.finished_at).getTime();
    const durationSeconds = Math.round((endTime - startTime) / 1000);

    console.log(`Conversation duration: ${durationSeconds} seconds`);

    // Extract topics
    const topics = MemoryProcessor.extractTopics(body);
    console.log('Extracted topics:', topics);

    // Create processed memory object
    const processedMemory: ProcessedMemory = {
      ...body,
      uid: sanitizedUid,
      word_frequency: processed.word_frequency,
      total_words: processed.total_words,
      unique_words: processed.unique_words,
      conversation_duration: durationSeconds,
      speaker_stats: processed.speaker_stats,
      processed_at: new Date().toISOString(),
      file_path: '' // Will be set after saving
    };

    // Save to user-organized storage
    console.log('Saving memory to storage...');
    const storage = await UserManager.saveMemory(
      sanitizedUid,
      body.id,
      {
        memory: body,
        processed: processedMemory,
        analytics: {
          total_words: processed.total_words,
          unique_words: processed.unique_words,
          top_words: processed.word_frequency.slice(0, 10),
          duration_seconds: durationSeconds,
          speakers: processed.speaker_stats.length,
          topics
        },
        webhook_received_at: new Date().toISOString(),
        processing_time_ms: Date.now() - startTime
      }
    );

    console.log('Saved to paths:', storage);

    // Get user statistics
    const userStats = await UserManager.getUserStats(sanitizedUid);
    console.log('User stats:', userStats);

    // Prepare response
    const response: MemoryWebhookResponse = {
      success: true,
      memory_id: body.id,
      user_id: sanitizedUid,
      analytics: {
        total_words: processed.total_words,
        unique_words: processed.unique_words,
        top_words: processed.word_frequency.slice(0, 10),
        duration_seconds: durationSeconds,
        speakers: processed.speaker_stats.length
      },
      storage: {
        file: storage.userPath,
        user_total_memories: userStats.total_memories + 1
      }
    };

    console.log('Processing completed in:', Date.now() - startTime, 'ms');
    console.log('=== MEMORY CREATION WEBHOOK COMPLETE ===\n');

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('=== MEMORY CREATION WEBHOOK ERROR ===');
    console.error('Error processing Memory Creation:', error);
    console.error('Stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process Memory Creation webhook',
        message: errorMessage,
        processing_time_ms: Date.now() - startTime
      },
      { status: 500 }
    );
  }
}

// Handle GET method for endpoint info
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const uid = searchParams.get('uid');

  if (uid) {
    // Return user-specific info
    const sanitizedUid = UserManager.sanitizeUserId(uid);
    const stats = await UserManager.getUserStats(sanitizedUid);
    
    return NextResponse.json({
      success: true,
      message: 'Omi Memory Creation endpoint is active',
      endpoint: '/api/omi/memory',
      user_id: sanitizedUid,
      user_stats: stats,
      timestamp: new Date().toISOString(),
      usage: 'POST with JSON body containing Memory Creation data'
    });
  }

  return NextResponse.json({
    success: true,
    message: 'Omi Memory Creation endpoint is active',
    endpoint: '/api/omi/memory',
    timestamp: new Date().toISOString(),
    usage: 'POST /api/omi/memory?uid=YOUR_USER_ID',
    required_fields: ['id', 'created_at', 'transcript_segments'],
    supported_features: [
      'Multi-language word frequency analysis',
      'Speaker-based statistics',
      'User-organized storage',
      'Topic extraction',
      'Action item parsing'
    ]
  });
}