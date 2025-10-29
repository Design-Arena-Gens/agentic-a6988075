import { NextRequest, NextResponse } from 'next/server';
import { schedulePipeline } from '@/lib/pipeline/runner';
import { getJobStore } from '@/lib/state';
import { extractTopicFromMessage, validateSecretToken } from '@/lib/telegram';

export async function POST(request: NextRequest) {
  const secretToken = request.headers.get('x-telegram-bot-api-secret-token');

  if (!validateSecretToken(secretToken)) {
    return NextResponse.json({ ok: false, error: 'Invalid secret' }, { status: 401 });
  }

  const payload = await request.json();
  const messageText: string | undefined =
    payload?.message?.text ?? payload?.edited_message?.text;

  if (!messageText) {
    return NextResponse.json({ ok: true, message: 'No text content' });
  }

  const topic = extractTopicFromMessage(messageText);
  if (!topic) {
    return NextResponse.json({
      ok: true,
      message: 'Ignoring message without make <topic> command.'
    });
  }

  const store = getJobStore();
  const existing = Array.from(store.jobs.values()).find(
    (job) =>
      job.topic.toLowerCase() === topic.toLowerCase() &&
      job.status !== 'failed' &&
      job.status !== 'completed'
  );

  if (existing) {
    return NextResponse.json({
      ok: true,
      message: 'Job already in progress.',
      jobId: existing.id
    });
  }

  const job = schedulePipeline(topic);

  return NextResponse.json({
    ok: true,
    message: `Production launched for ${topic}`,
    jobId: job.id
  });
}
