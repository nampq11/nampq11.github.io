# nampq11.github.io

Static personal website for `nampq11.github.io`, deployed with GitHub Pages.

There is intentionally no framework, bundler, package manager, or generated application code. Top-level public files live in `src/`; route folders live in `src/pages/`; a small shell script assembles the deployable site into `_site/`.

## Project structure

```text
.
├── src/
│   ├── index.html                # /
│   ├── search.html               # /search.html
│   ├── cv.html                   # /cv.html
│   ├── rss.xml                   # /rss.xml
│   ├── .nojekyll                 # Disable Jekyll processing on GitHub Pages
│   ├── pages/                    # Route folders copied to the deployed web root
│   │   ├── start-here/index.html # /start-here/
│   │   ├── about/index.html      # /about/
│   │   ├── writing/index.html    # /writing/
│   │   ├── projects/index.html   # /projects/
│   │   └── posts/*.html          # /posts/*.html
│   ├── includes/                 # Build-time HTML partials
│   │   ├── header.html
│   │   └── footer.html
│   ├── assets/
│   │   └── img/avatar.jpg
│   ├── javascripts/
│   │   ├── theme.js              # Shared dark-mode toggle
│   │   ├── archive-filter.js     # Shared tag filtering for writing/projects
│   │   ├── search.js             # Search-page filtering
│   │   └── scale.fix.js          # Legacy CV theme helper
│   └── stylesheets/
│       ├── blog.css              # Main blog stylesheet entrypoint
│       ├── blog/                 # Modular blog CSS partials
│       ├── styles.css            # Legacy CV theme styles
│       └── pygment_trac.css      # Legacy CV syntax styles
├── scripts/build-site.sh         # Assembles _site/ from src + shared assets
├── .github/workflows/static.yml  # Builds and deploys _site/ to GitHub Pages
├── README.md
└── AGENTS.md
```

## Reusing header and footer

Pages can include shared partials with build-time comments:

```html
<!-- @include header root="../" active="writing" -->
<!-- @include footer root="../" -->
```

Use `root=""` for top-level files in `src/` and `root="../"` for files in `src/pages/<route>/`. Supported active values are `start-here`, `writing`, `projects`, `cv`, `about`, and `search`.

## How deployment works

The source is organized like this:

```text
src/index.html + src/pages/ + src/includes/ + src/stylesheets/ + src/javascripts/ + src/assets/
            │
            ▼ scripts/build-site.sh
_site/index.html + _site/about/ + _site/stylesheets/ + _site/javascripts/ + _site/assets/
            │
            ▼ GitHub Pages artifact
https://nampq11.github.io/
```

GitHub Actions runs:

```bash
./scripts/build-site.sh
```

Then uploads `_site/` as the Pages artifact. This keeps repo docs/configs out of the published site while preserving public URLs.

## Local preview

Build the deployable site:

```bash
./scripts/build-site.sh
```

Serve `_site/`:

```bash
python3 -m http.server 8000 --directory _site
```

Open:

```text
http://localhost:8000/
```

## Architecture rules

- Keep the site static: do not add React, Next.js, Astro, Eleventy, npm dependencies, or generated assets unless the migration is intentional.
- Keep public URLs stable:
  - `/` maps from `src/index.html`
  - `/search.html` maps from `src/search.html`
  - `/cv.html` maps from `src/cv.html`
  - `/rss.xml` maps from `src/rss.xml`
  - `/start-here/` maps from `src/pages/start-here/index.html`
  - `/writing/` maps from `src/pages/writing/index.html`
  - `/projects/` maps from `src/pages/projects/index.html`
  - `/about/` maps from `src/pages/about/index.html`
  - `/posts/<slug>.html` maps from `src/pages/posts/<slug>.html`
- Put shared behavior in `src/javascripts/` instead of duplicating inline scripts.
- Put shared blog/page styling in `src/stylesheets/blog/` and import it from `src/stylesheets/blog.css`.
- Leave `src/cv.html` on the legacy Minimal theme unless intentionally redesigning the CV page.

## Content update checklist

When adding or changing a post:

1. Add or edit the file in `src/pages/posts/`.
2. Update latest/popular/favorites links on `src/index.html` if relevant.
3. Update `src/pages/writing/index.html` archive entries and tag filters.
4. Update `src/search.html` search entries.
5. Update `src/rss.xml`.
6. Update previous/next links inside affected post pages.

## Validation checklist

For HTML/CSS/JS changes:

```bash
node --check src/javascripts/theme.js
node --check src/javascripts/archive-filter.js
node --check src/javascripts/search.js
./scripts/build-site.sh
python3 -m http.server 8000 --directory _site
```

Then manually inspect changed pages in the browser.
