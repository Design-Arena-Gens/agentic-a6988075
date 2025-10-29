const steps = [
  {
    title: 'Create Telegram Bot',
    description:
      'Chat with @BotFather, create a bot, copy the token, then set your webhook pointing to /api/telegram with secret token.'
  },
  {
    title: 'Configure Environment',
    description:
      'Populate TELEGRAM_BOT_TOKEN, TELEGRAM_WEBHOOK_SECRET, OPENAI_API_KEY, and YouTube OAuth credentials as Vercel project environment variables.'
  },
  {
    title: 'Authorize YouTube',
    description:
      'Generate OAuth client + refresh token with youtube.upload scope; paste refresh token into YOUTUBE_REFRESH_TOKEN.'
  },
  {
    title: 'Connect Slack (Optional)',
    description:
      'Create Slack app with chat:write scope, install, and set SLACK_BOT_TOKEN + SLACK_CHANNEL_ID.'
  },
  {
    title: 'Trigger Production',
    description:
      'DM your bot with “make <topic>”. Check the dashboard for status updates as the agent researches, scripts, renders, and uploads.'
  }
];

export default function SetupPage() {
  return (
    <main className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Setup Guide</h1>
        <p className="text-slate-300">
          Configure the automation stack so Telegram prompts kick off fully
          autonomous content drops.
        </p>
      </header>
      <ol className="space-y-6">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-lg border border-slate-800 bg-slate-900 p-6 shadow"
          >
            <span className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Step {index + 1}
            </span>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100">
              {step.title}
            </h2>
            <p className="mt-2 text-slate-300">{step.description}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}
