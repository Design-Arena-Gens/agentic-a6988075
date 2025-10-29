import { NextResponse } from 'next/server';
import { getConfig } from '@/lib/config';

export async function GET() {
  const config = getConfig();
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    telegram: Boolean(config.TELEGRAM_BOT_TOKEN && config.TELEGRAM_WEBHOOK_SECRET),
    openai: Boolean(config.OPENAI_API_KEY),
    youtube: Boolean(
      config.YOUTUBE_CLIENT_ID &&
        config.YOUTUBE_CLIENT_SECRET &&
        config.YOUTUBE_REFRESH_TOKEN &&
        config.YOUTUBE_CHANNEL_ID
    )
  });
}
