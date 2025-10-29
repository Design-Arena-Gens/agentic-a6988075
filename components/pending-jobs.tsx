import { getJobStore, PipelineJob } from '@/lib/state';

async function fetchJobs(): Promise<PipelineJob[]> {
  try {
    const origin =
      process.env.NEXT_PUBLIC_BASE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    const res = await fetch(`${origin}/api/jobs`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error('Failed to load jobs');
    }

    return (await res.json()) as PipelineJob[];
  } catch (error) {
    // During build or when the API is unreachable, fall back to in-memory state.
    const store = getJobStore();
    return Array.from(store.jobs.values());
  }
}

function phaseColor(phase: PipelineJob['status']) {
  switch (phase) {
    case 'pending':
      return 'bg-slate-800 text-slate-200';
    case 'researching':
    case 'scripting':
      return 'bg-amber-500/10 text-amber-300 ring-1 ring-amber-300/40';
    case 'designing':
    case 'synthesizing':
      return 'bg-sky-500/10 text-sky-300 ring-1 ring-sky-300/40';
    case 'uploading':
      return 'bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-300/40';
    case 'completed':
      return 'bg-emerald-600 text-emerald-50';
    case 'failed':
      return 'bg-rose-600 text-rose-50';
    default:
      return 'bg-slate-800 text-slate-200';
  }
}

export async function PendingJobs() {
  const jobs = await fetchJobs();

  if (jobs.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-700 bg-slate-900/50 p-10 text-center text-slate-400">
        No active productions. Drop <code>make &lt;topic&gt;</code> into Telegram
        to spin one up.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <article
          key={job.id}
          className="rounded-lg border border-slate-700 bg-slate-900 p-6 shadow"
        >
          <header className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-wide text-slate-500">
                {new Date(job.requestedAt).toLocaleString()}
              </p>
              <h3 className="text-2xl font-semibold text-slate-100">
                {job.topic}
              </h3>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${phaseColor(
                job.status
              )}`}
            >
              {job.status}
            </span>
          </header>
          {job.outputs?.title ? (
            <dl className="mt-4 grid gap-4 text-sm md:grid-cols-3">
              <div>
                <dt className="font-medium text-slate-400">YouTube Title</dt>
                <dd className="text-slate-200">{job.outputs.title}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-400">Hashtags</dt>
                <dd className="text-slate-200">
                  {job.outputs.hashtags?.map((tag) => `#${tag}`).join(' ')}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-400">Video</dt>
                <dd className="text-slate-200">
                  {job.outputs.youtubeId ? (
                    <a
                      href={`https://youtube.com/shorts/${job.outputs.youtubeId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-300 underline"
                    >
                      View on YouTube
                    </a>
                  ) : (
                    job.outputs.videoPath ?? 'Pending upload'
                  )}
                </dd>
              </div>
            </dl>
          ) : null}
          {job.error ? (
            <p className="mt-4 rounded-md bg-rose-500/10 p-3 text-sm text-rose-300">
              {job.error}
            </p>
          ) : null}
        </article>
      ))}
    </div>
  );
}
