import Link from 'next/link';
import { Suspense } from 'react';
import { PendingJobs } from '@/components/pending-jobs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function HomePage() {
  return (
    <main className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Telegram → Viral Content Pipeline
        </h1>
        <p className="text-lg text-slate-300">
          Drop a trigger keyword in Telegram and this agent researches the
          topic, scripts a story, designs a thumbnail, generates narration,
          assembles a vertical video, and distributes the package to YouTube
          Shorts and your connected social channels.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/docs/setup"
            className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400"
          >
            Setup Guide
          </Link>
          <Link
            href="/api/health"
            className="rounded-md border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800"
          >
            Health Check
          </Link>
        </div>
      </section>
      <Suspense fallback={<div>Loading pipeline state...</div>}>
        <PendingJobs />
      </Suspense>
      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-lg">
          <h2 className="text-xl font-semibold">Trigger Format</h2>
          <p className="mt-3 text-sm text-slate-300">
            DM your bot on Telegram with&nbsp;
            <code className="rounded bg-slate-800 px-1 py-0.5 text-xs">
              make &lt;topic&gt;
            </code>
            . The agent monitors the day&apos;s news cycle, builds a rapid story
            arc, and kicks off production if the topic isn&apos;t already in
            flight.
          </p>
        </article>
        <article className="rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-lg">
          <h2 className="text-xl font-semibold">Distribution Targets</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300">
            <li>YouTube Shorts via the official Data API</li>
            <li>Instagram Reels publishing webhook</li>
            <li>Optional Slack alert when a drop goes live</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
