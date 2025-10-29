import { NextResponse } from 'next/server';
import { getJobStore } from '@/lib/state';

export async function GET() {
  const store = getJobStore();
  return NextResponse.json(
    Array.from(store.jobs.values()).sort((a, b) =>
      a.requestedAt > b.requestedAt ? -1 : 1
    )
  );
}
