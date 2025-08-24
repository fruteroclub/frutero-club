#!/usr/bin/env node

import { S3Client, CreateBucketCommand, HeadBucketCommand } from '@aws-sdk/client-s3';

async function createR2Bucket() {
  console.log('🪣 Creating R2 Bucket...\n');

  try {
    // Check environment variables
    const accountId = process.env.R2_ACCOUNT_ID;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
    const bucketName = process.env.R2_BUCKET_NAME;

    if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
      console.error('❌ Missing required environment variables:');
      console.error('   - R2_ACCOUNT_ID:', accountId ? '✅' : '❌');
      console.error('   - R2_ACCESS_KEY_ID:', accessKeyId ? '✅' : '❌');
      console.error('   - R2_SECRET_ACCESS_KEY:', secretAccessKey ? '✅' : '❌');
      console.error('   - R2_BUCKET_NAME:', bucketName ? '✅' : '❌');
      return;
    }

    console.log('📋 Configuration:');
    console.log('   - Account ID:', accountId);
    console.log('   - Bucket Name:', bucketName);
    console.log('   - Access Key:', accessKeyId.substring(0, 8) + '...');

    const client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    // First, check if bucket already exists
    console.log('\n🔍 Checking if bucket already exists...');
    try {
      await client.send(new HeadBucketCommand({ Bucket: bucketName }));
      console.log('✅ Bucket already exists and is accessible!');
      console.log(`🎉 R2 bucket "${bucketName}" is ready to use.`);
      return;
    } catch (error) {
      if (error instanceof Error && error.name === 'NoSuchBucket') {
        console.log('📦 Bucket does not exist, creating it...');
      } else {
        console.log('⚠️  Could not check bucket status, attempting to create...');
        console.log('   Error:', error instanceof Error ? error.message : error);
      }
    }

    // Create the bucket
    console.log(`\n🏗️  Creating bucket: ${bucketName}`);
    
    await client.send(new CreateBucketCommand({
      Bucket: bucketName,
    }));

    console.log('✅ Bucket created successfully!');

    // Verify the bucket was created
    console.log('\n🔍 Verifying bucket creation...');
    await client.send(new HeadBucketCommand({ Bucket: bucketName }));
    console.log('✅ Bucket verification successful!');

    console.log(`\n🎉 R2 bucket "${bucketName}" is now ready for use!`);
    console.log('\nNext steps:');
    console.log('1. Run: bun run test:r2');
    console.log('2. Test your mentorship webhook endpoints');
    console.log('3. Migrate existing data: bun run migrate:r2');

    console.log('\n📁 Your bucket structure will be:');
    console.log(`└── ${bucketName}/`);
    console.log('    └── mobil3-mentorships/');
    console.log('        ├── by-user/{user_id}/{year}/{month}/');
    console.log('        ├── all/{date}/');
    console.log('        └── analytics/');

  } catch (error) {
    console.error('\n❌ Failed to create R2 bucket:');
    console.error('Error:', error instanceof Error ? error.message : error);
    
    if (error instanceof Error) {
      if (error.message.includes('Invalid credentials')) {
        console.error('\n💡 Credential issues:');
        console.error('1. Check your R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY');
        console.error('2. Ensure the API token has proper permissions');
        console.error('3. Verify the token hasn\'t expired');
      } else if (error.message.includes('BucketAlreadyExists')) {
        console.error('\n💡 Bucket name conflict:');
        console.error('1. The bucket name is already taken globally');
        console.error('2. Try a different bucket name in your .env.local');
        console.error('3. Bucket names must be globally unique');
      } else if (error.message.includes('account')) {
        console.error('\n💡 Account issues:');
        console.error('1. Check your R2_ACCOUNT_ID is correct');
        console.error('2. Ensure R2 is enabled for your Cloudflare account');
      }
    }
    
    process.exit(1);
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createR2Bucket();
}

export { createR2Bucket };