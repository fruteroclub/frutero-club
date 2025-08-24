# Cloudflare R2 Implementation Plan for Mobil3 Mentorship Logs

## 📋 Executive Summary
Implement Cloudflare R2 storage for persistent mentorship log storage, replacing the current file-based system with a scalable cloud solution. This will enable better data persistence, querying capabilities, and cross-deployment access to mentorship data.

## 🎯 Goals & Objectives
1. **Migrate from file-based storage** to Cloudflare R2 for mentorship logs
2. **Store logs in organized structure** under `mobil3-mentorships/` bucket prefix
3. **Enable querying and retrieval** of historical mentorship data
4. **Maintain backward compatibility** with existing Omi webhook endpoints
5. **Improve scalability** for multiple mentors and high-volume data

## 🏗️ Architecture Design

### Storage Structure
```
R2 Bucket: frutero-data (or your-bucket-name)
└── mobil3-mentorships/
    ├── by-user/
    │   ├── {user_id}/
    │   │   ├── {year}/
    │   │   │   ├── {month}/
    │   │   │   │   └── {memory_id}-{timestamp}.json
    │   │   └── metadata.json
    ├── all/
    │   └── {date}/
    │       └── {user_id}-{memory_id}-{timestamp}.json
    └── analytics/
        ├── daily-summaries/
        └── user-stats/
```

### Key Components

#### 1. R2 Client Service (`/src/lib/r2/client.ts`)
```typescript
import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

export class R2StorageClient {
  private client: S3Client;
  private bucketName: string;

  constructor() {
    this.client = new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    });
    this.bucketName = process.env.R2_BUCKET_NAME!;
  }

  async uploadMentorshipLog(userId: string, memoryId: string, data: any): Promise<string> {
    const timestamp = Date.now();
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    
    const key = `mobil3-mentorships/by-user/${userId}/${year}/${month}/${memoryId}-${timestamp}.json`;
    
    await this.client.send(new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: JSON.stringify(data, null, 2),
      ContentType: 'application/json',
      Metadata: {
        userId,
        memoryId,
        timestamp: timestamp.toString(),
        type: 'mentorship-log'
      }
    }));
    
    return key;
  }

  async getMentorshipLogs(userId: string, limit: number = 20): Promise<any[]> {
    const prefix = `mobil3-mentorships/by-user/${userId}/`;
    
    const response = await this.client.send(new ListObjectsV2Command({
      Bucket: this.bucketName,
      Prefix: prefix,
      MaxKeys: limit,
    }));
    
    const logs = [];
    for (const object of response.Contents || []) {
      const data = await this.getObject(object.Key!);
      logs.push(JSON.parse(data));
    }
    
    return logs;
  }

  async getAllRecentLogs(limit: number = 20): Promise<any[]> {
    const today = new Date().toISOString().split('T')[0];
    const prefix = `mobil3-mentorships/all/${today}/`;
    
    const response = await this.client.send(new ListObjectsV2Command({
      Bucket: this.bucketName,
      Prefix: prefix,
      MaxKeys: limit,
    }));
    
    const logs = [];
    for (const object of response.Contents || []) {
      const data = await this.getObject(object.Key!);
      logs.push(JSON.parse(data));
    }
    
    return logs;
  }

  private async getObject(key: string): Promise<string> {
    const response = await this.client.send(new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    }));
    
    return await response.Body!.transformToString();
  }
}
```

#### 2. Enhanced User Manager (`/src/lib/omi/r2-user-manager.ts`)
```typescript
import { R2StorageClient } from '@/lib/r2/client';

export class R2UserManager {
  private r2Client: R2StorageClient;

  constructor() {
    this.r2Client = new R2StorageClient();
  }

  async saveMemory(
    uid: string,
    memoryId: string,
    data: Record<string, unknown>
  ): Promise<{ r2Key: string; publicUrl?: string }> {
    // Save to R2
    const r2Key = await this.r2Client.uploadMentorshipLog(uid, memoryId, data);
    
    // Also save a copy to "all" folder for daily aggregation
    const date = new Date().toISOString().split('T')[0];
    const allKey = `mobil3-mentorships/all/${date}/${uid}-${memoryId}-${Date.now()}.json`;
    
    await this.r2Client.uploadMentorshipLog('all', `${date}/${uid}-${memoryId}`, data);
    
    // Generate public URL if bucket is public
    const publicUrl = process.env.R2_PUBLIC_URL 
      ? `${process.env.R2_PUBLIC_URL}/${r2Key}`
      : undefined;
    
    return { r2Key, publicUrl };
  }

  async getUserMemories(uid: string, limit: number = 20): Promise<Array<Record<string, unknown>>> {
    return await this.r2Client.getMentorshipLogs(uid, limit);
  }

  async getUserStats(uid: string): Promise<any> {
    const memories = await this.getUserMemories(uid, 1000);
    
    // Calculate stats (same logic as before but with R2 data)
    return {
      total_memories: memories.length,
      // ... other stats
    };
  }
}
```

#### 3. Updated API Endpoints

##### Memory Webhook (`/src/app/api/omi/memory/route.ts`)
```typescript
import { R2UserManager } from '@/lib/omi/r2-user-manager';

export async function POST(request: NextRequest) {
  const userManager = new R2UserManager();
  
  // ... existing validation logic ...
  
  // Save to R2 instead of file system
  const { r2Key, publicUrl } = await userManager.saveMemory(
    uid,
    memoryData.id,
    processedMemory
  );
  
  return NextResponse.json({
    success: true,
    message: 'Memory stored in R2',
    storage: {
      r2Key,
      publicUrl,
    },
    // ... rest of response
  });
}
```

##### Logs Retrieval (`/src/app/api/omi/logs/route.ts`)
```typescript
import { R2UserManager } from '@/lib/omi/r2-user-manager';

export async function GET(request: NextRequest) {
  const userManager = new R2UserManager();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const limit = parseInt(searchParams.get('limit') || '20');
  
  let logs;
  if (userId) {
    logs = await userManager.getUserMemories(userId, limit);
  } else {
    logs = await userManager.getAllRecentLogs(limit);
  }
  
  return NextResponse.json({
    success: true,
    logs,
    source: 'r2',
    total: logs.length
  });
}
```

## 📦 Required Dependencies

Add to `package.json`:
```json
{
  "dependencies": {
    "@aws-sdk/client-s3": "^3.600.0"
  }
}
```

## 🔧 Environment Variables

Add to `.env.local`:
```bash
# Cloudflare R2 Configuration
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key_id
R2_SECRET_ACCESS_KEY=your_secret_access_key
R2_BUCKET_NAME=frutero-data
R2_PUBLIC_URL=https://your-public-r2-url.com  # Optional, if bucket is public
```

## 🚀 Implementation Phases

### Phase 1: Infrastructure Setup (Day 1)
1. ✅ Install AWS SDK dependencies
2. ✅ Configure environment variables
3. ✅ Create R2 bucket and access credentials in Cloudflare dashboard
4. ✅ Set up bucket CORS if needed for direct browser access

### Phase 2: Core Implementation (Days 2-3)
1. ✅ Create R2 client service
2. ✅ Implement R2UserManager
3. ✅ Update memory webhook to use R2
4. ✅ Update logs endpoint to query R2
5. ✅ Add error handling and retry logic

### Phase 3: Migration & Testing (Day 4)
1. ✅ Create migration script for existing file-based logs
2. ✅ Test with production-like data volumes
3. ✅ Implement caching layer for frequently accessed data
4. ✅ Add monitoring and logging

### Phase 4: Dashboard Integration (Day 5)
1. ✅ Update mobil3 dashboard to use new endpoints
2. ✅ Add loading states and error handling
3. ✅ Implement pagination for large datasets
4. ✅ Add search and filtering capabilities

### Phase 5: Advanced Features (Optional)
1. ⏳ Analytics dashboard with aggregated stats
2. ⏳ Export functionality (CSV, JSON)
3. ⏳ Scheduled cleanup of old logs
4. ⏳ Real-time updates via WebSockets

## 🔄 Migration Strategy

### Migration Script (`/scripts/migrate-to-r2.ts`)
```typescript
import fs from 'fs/promises';
import path from 'path';
import { R2StorageClient } from '@/lib/r2/client';

async function migrateLogsToR2() {
  const r2Client = new R2StorageClient();
  const logsDir = path.join(process.cwd(), 'omi-logs');
  
  // Read all existing logs
  const files = await fs.readdir(path.join(logsDir, 'memory', 'all'));
  
  for (const file of files) {
    if (file.endsWith('.json')) {
      const content = await fs.readFile(
        path.join(logsDir, 'memory', 'all', file),
        'utf-8'
      );
      const data = JSON.parse(content);
      
      // Extract user ID and memory ID from filename or data
      const userId = data.uid || 'unknown';
      const memoryId = data.memory?.id || 'unknown';
      
      // Upload to R2
      await r2Client.uploadMentorshipLog(userId, memoryId, data);
      
      console.log(`Migrated: ${file}`);
    }
  }
}
```

## 🔒 Security Considerations

1. **Access Control**: Use IAM policies to restrict R2 access
2. **Encryption**: Enable encryption at rest for sensitive data
3. **API Keys**: Never expose R2 credentials in client-side code
4. **Rate Limiting**: Implement rate limiting on API endpoints
5. **Data Privacy**: Ensure GDPR compliance for user data storage

## 📊 Monitoring & Observability

1. **CloudWatch Metrics**: Monitor R2 usage and costs
2. **Application Logs**: Log all R2 operations for debugging
3. **Error Tracking**: Implement Sentry or similar for error monitoring
4. **Performance Metrics**: Track API response times and R2 latency

## 🎯 Success Metrics

- ✅ All mentorship logs stored persistently in R2
- ✅ Query response time < 500ms for recent logs
- ✅ 99.9% availability for log storage and retrieval
- ✅ Successful migration of all existing logs
- ✅ Cost optimization: < $5/month for expected volume

## 🔄 Rollback Plan

If issues arise:
1. Keep file-based system as fallback for 30 days
2. Implement dual-write during transition period
3. Create backup export of all R2 data daily
4. Document rollback procedure in runbook

## 📝 Next Steps

1. **Review and approve** this implementation plan
2. **Set up R2 bucket** in Cloudflare dashboard
3. **Start with Phase 1** infrastructure setup
4. **Implement core functionality** following the phases
5. **Test thoroughly** before production deployment

---

This plan provides a complete roadmap for implementing Cloudflare R2 storage for the mobil3 mentorship logs, ensuring scalability, reliability, and maintainability.