# Agentic Relay

Autonomous content engine that listens for Telegram prompts, researches the daily news cycle, scripts and narrates a short-form story, renders a vertical video, and distributes the result to YouTube Shorts (plus optional Slack alerts).

## Tech Stack

- Next.js 14 (App Router) hosted on Vercel
- Tailwind CSS for the console UI
- OpenAI Responses + Image + Speech APIs for script, thumbnail, and narration
- Fluent FFmpeg for video assembly
- Google YouTube Data API v3 for publishing
- Telegram Bot API webhook ingestion
- Slack SDK (optional) for launch notifications

## Quick Start

```bash
npm install
npm run dev
```

Set the environment variables listed in `.env.example` (create it using the table below) and expose your local server to Telegram using a tunnel such as `ngrok`.

| Variable | Description |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | Bot token from BotFather |
| `TELEGRAM_WEBHOOK_SECRET` | Random secret string used to validate webhook requests |
| `OPENAI_API_KEY` | OpenAI API key with access to GPT-4o mini + image + TTS endpoints |
| `CONTENT_SAFETY_GUARDRAIL` | `strict`, `medium`, or `off` (default `medium`) |
| `REDDIT_SCRAPE_LIMIT` | Optional number of Reddit posts to sample (default `5`) |
| `YOUTUBE_CLIENT_ID` | OAuth client ID for YouTube Data API |
| `YOUTUBE_CLIENT_SECRET` | OAuth client secret |
| `YOUTUBE_REFRESH_TOKEN` | Refresh token with `youtube.upload` scope |
| `YOUTUBE_CHANNEL_ID` | Channel ID receiving uploads |
| `GOOGLE_PROJECT_ID` / `GOOGLE_BUCKET_NAME` | Optional GCS export target (future use) |
| `SLACK_BOT_TOKEN` / `SLACK_CHANNEL_ID` | Optional notification channel |
| `NEXT_PUBLIC_BASE_URL` | Base URL for dashboard data fetching |

## Telegram Webhook

Configure the webhook so Telegram posts updates to `/api/telegram`:

```bash
curl "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook" \
  -d "url=https://agentic-a6988075.vercel.app/api/telegram" \
  -d "secret_token=${TELEGRAM_WEBHOOK_SECRET}"
```

Messages starting with `make <topic>` trigger a pipeline run. Duplicate requests for a topic already in progress are ignored.

## Video Assembly Flow

1. **Research** – Pull top Reddit stories for the topic, scrape article context, and summarise.
2. **Script** – Ask GPT-4o mini for a hook, narration script, title, description, and hashtags.
3. **Thumbnail** – Generate cinematic artwork with GPT-Image and normalize via Sharp.
4. **Narration** – Use GPT-4o mini TTS to synthesise MP3 narration and SRT captions.
5. **Render** – Merge narration with cinematic background using FFmpeg (slow zoom effect).
6. **Distribute** – Upload the MP4, thumbnail, and captions to YouTube Shorts and optionally ping Slack.

Monitor progress at the dashboard home page. Each job shows the current phase, YouTube link, and generated metadata.

## Deployment

Once environment variables are set in Vercel:

```bash
npm run build
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-a6988075
```

After deployment, Telegram should deliver webhook events to the hosted API route automatically.
