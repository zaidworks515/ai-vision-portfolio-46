# Zaid Ahmed | AI/ML Engineer portfolio

An interactive portfolio for computer vision, speech and language models, and the GPU
inference layer that serves them. Built with **Vite + React 18 + TypeScript +
Tailwind CSS + Framer Motion**, laid out the same way as a Lovable project so it can
be dropped straight into Lovable.

- **Signal router** (hero): pick Video / Voice / Document / Language and watch the
  signal pass through the five stages of a real shipped pipeline.
- **Capability filter** (Work): choose a capability to see which case studies and
  archive projects use it, plus the tools behind it.
- **Case studies** at `/work/<slug>`: problem, constraints, what was built, an
  animated pipeline, the interesting decision, measured results and the real demo
  recording (loaded from Google Drive only when you press play).
- **How I think**: engineering decisions with charts built from measured data
  (hover or use ← → on the concurrency chart; every chart has a data table).
- **Experience timeline**, **LinkedIn recommendations** with verification links,
  **resume** view/download, and contact.

---

## Run it locally

Requires Node 18+ (20 recommended).

```sh
npm install
npm run dev        # http://localhost:8080
```

Production build and preview:

```sh
npm run build      # outputs dist/
npm run preview    # http://localhost:8080
```

Checks:

```sh
npm run typecheck
npm run lint
```

---

## Deploy on Lovable

This repo (`zaidworks515/ai-vision-portfolio-46`) is the one connected to the Lovable
project, and it follows Lovable's template: Vite on port 8080, the `@/` alias to `src/`,
`lovable-tagger` in development, and `npm run build` to `dist/`. No environment
variables are needed.

1. Push to `main`. Lovable syncs the commit automatically.
2. In Lovable, press **Share → Publish**. Deep links such as `/work/measuremates`
   work because Lovable hosting serves `index.html` for unknown paths.
3. Edits made inside Lovable are committed back to this repo.

`package-lock.json` is the lockfile. The old `bun.lockb` was removed because it pinned
the previous dependency set; Lovable regenerates its own lockfile on install.

The canonical URL in `index.html`, `public/robots.txt` and `public/sitemap.xml` is
`https://zaidportfolio.lovable.app`. If you attach a custom domain, search-and-replace
that URL in those three files.

## Deploy with Docker

```sh
docker compose build
docker compose up -d          # http://localhost:8080
```

- Multi-stage image: `node:20-alpine` builds, `nginx:1.27-alpine` serves `dist/`.
- `PORTFOLIO_PORT=80 docker compose up -d` changes the host port.
- `nginx.conf` handles the SPA fallback, gzip, long-lived caching for hashed
  assets, `no-cache` for `index.html` and `/data/`, a Content-Security-Policy
  (only Google Fonts and Google Drive embeds are allowed off-site) and `/healthz`.
- The container runs read-only, with tmpfs for nginx's cache and pid.

---

## Editing content

Everything shown on the site lives in `src/data/`. The components only render it.

| File | What it holds |
|---|---|
| `profile.ts` | name, links, contact, education, certifications, awards, languages |
| `projects.ts` | the 8 case studies, the archive list, capability groups and tools |
| `experience.ts` | roles, periods, highlights, and which projects belong to which role |
| `thinking.ts` | the "How I think" decisions and the measured chart data |
| `signals.ts` | the hero signal router's routes |
| `recommendations.ts` | LinkedIn recommendation defaults |

**Rule of the content:** nothing is invented. Every metric names its source (the
platform's audit/performance reports, a repo's notebook output, Kaggle, or the demo
overlay). Keep it that way when you add numbers.

### Adding or changing a demo video

Each project in `src/data/projects.ts` can carry three media fields:

```ts
poster: { src: "/media/posters/x.webp", srcSm: "/media/posters/x-sm.webp", alt: "…", ratio: 16 / 9, width: 1280 },
clip: "/media/clips/x.mp4",                                  // 6–8 s muted hover loop, served from the repo
videos: [{ label: "Walkthrough", driveId: "<Google Drive file id>", duration: "2:10" }],
```

- **Hover loop (`clip`)**: a short, muted MP4 in `public/media/clips/`. It must live
  in the repo: Google Drive serves files with `Cross-Origin-Resource-Policy: same-site`,
  so browsers refuse to play a Drive file in a `<video>` on another domain (tested:
  `MEDIA_ELEMENT_ERROR`). Loops are tiny (all of them together are ~1.5 MB), well
  inside GitHub's limits.
- **Full video (`videos`)**: stays on Google Drive and opens in Drive's player when
  the visitor presses play (with sound). Share it as "Anyone with the link".
- The Triton reel is vertical (9:16); set `ratio: 720 / 1280` and the player sizes
  itself accordingly.

A live link (`liveUrl`) is supported too. The Triton console's raw IP was left out on
purpose: put it behind a domain and authentication first.

### Media

Posters (`public/media/posters/*.webp`) and loops (`public/media/clips/*.mp4`) are
frames from the real demo recordings. They are cropped to remove browser chrome,
addresses and personal data. To make a new loop:

```sh
ffmpeg -ss 12 -t 6 -i demo.mp4 -vf "crop=W:H:X:Y,scale=960:-2,fps=24" -an \
  -c:v libx264 -preset slow -crf 30 -pix_fmt yuv420p -movflags +faststart clip.mp4
```

---

## Keeping recommendations current

LinkedIn offers no public API for a recommender's current title, blocks
cross-origin and anonymous requests, and shows logged-out visitors only the
current company. So the site uses **defaults + runtime overrides**:

1. **Defaults**: `src/data/recommendations.ts`, verified on the date in
   `verifiedOn`. These are bundled and always render immediately.
2. **Overrides**: `public/data/recommendations.json`, fetched at runtime with a
   3.5 s timeout. Any non-empty field (for example `designation`, `company` or
   `photo`) replaces the default for the same `id`. A missing file, a timeout,
   invalid JSON or an empty field falls back to the default silently.
3. **New recommendations**: add an object with `id`, `name`, `text` and
   `profileUrl` to the JSON and it appears without a code change.

Editing the JSON in Lovable (or in the container's `dist/data/`) updates the live
site without touching any component. Update `verifiedOn` whenever you re-check a
profile. The card shows "details as of …".

LinkedIn gives individual recommendations no permalink, so every card links to the
recommender's profile and to the recommendations page on Zaid's profile.

---

## Structure

```
src/
  components/
    Navbar, Hero, SignalRouter, Experience, Recommendations, About, Contact
    work/       Work, FlagshipCard, ProjectCard, ProjectMedia, ArchitectureDiagram, Archive
    case/       CaseStudy (code-split), VideoEmbed, PipelineStepper
    thinking/   Thinking, Visuals
    charts/     ConcurrencyChart, BeforeAfter, chartTokens
    ui/         Button, Reveal, SectionHeading, Metric, Icons
  data/         all content (see above)
  hooks/        active section, focus trap, scroll lock, count-up, recommendations…
  pages/        Index (home + /work/:slug), NotFound
public/
  media/        posters, clips, people, profile photo
  resume/       Zaid-Ahmed-AI-ML-Engineer-Resume.pdf
  data/         recommendations.json (runtime overrides)
  og-image.png, favicons, robots.txt, sitemap.xml, site.webmanifest
```

## Accessibility & performance notes

- Semantic landmarks, a skip link, labelled tabs/dialogs and a focus-trapped case
  study (Esc closes and returns focus to the card that opened it).
- Bright mode is the default for every visitor. The toggle switches to dark mode,
  and the choice is remembered on that device.
- `prefers-reduced-motion` disables autoplay, count-ups and transforms. The site
  works the same, just still.
- Images are WebP with `srcset`; loops are created only on hover (or when in view
  on touch screens) and are skipped under Data Saver; Drive players load on click.
- The case-study view is a separate chunk that preloads when a card is hovered.
- Chart colours were validated for colour-vision deficiency and contrast against
  the dark surface.
