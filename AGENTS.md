# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Overview

This is a static personal website for `nampq11.github.io`, deployed to GitHub Pages.

- No package manager, bundler, or application framework is currently used.
- Top-level public files live under `src/`.
- Route folders live under `src/pages/`.
- Shared assets live under `src/assets/`, `src/javascripts/`, and `src/stylesheets/`.
- `scripts/build-site.sh` assembles the deployable `_site/` directory.
- GitHub Pages deploys `_site/` on pushes to `main` via `.github/workflows/static.yml`.

## Repository Structure

- `src/index.html` — homepage, intro, latest writing, projects, footer.
- `src/search.html` — client-side search page.
- `src/rss.xml` — RSS feed; update it when adding or changing posts.
- `src/cv.html` — standalone CV page using the older Minimal theme styles.
- `src/.nojekyll` — disables Jekyll processing on GitHub Pages.
- `src/pages/start-here/index.html` — guided entry point to writing, projects, and background.
- `src/pages/about/index.html` — about page.
- `src/pages/writing/index.html` — writing archive and tag filtering UI.
- `src/pages/projects/index.html` — projects archive and tag filtering UI.
- `src/pages/posts/*.html` — individual blog posts.
- `src/includes/header.html` — shared header/nav partial expanded at build time.
- `src/includes/footer.html` — shared footer partial expanded at build time.
- `src/stylesheets/blog.css` — main blog stylesheet entrypoint.
- `src/stylesheets/blog/*.css` — modular blog CSS partials.
- `src/stylesheets/styles.css` and `src/stylesheets/pygment_trac.css` — CV/legacy Minimal theme styles.
- `src/assets/img/avatar.jpg` — profile image.
- `src/javascripts/theme.js` — shared dark-mode behavior.
- `src/javascripts/archive-filter.js` — shared tag filtering for archives.
- `src/javascripts/search.js` — search page behavior.
- `src/javascripts/scale.fix.js` — legacy Minimal theme script.
- `scripts/build-site.sh` — renders includes, copies source pages, and copies shared assets to `_site/`.
- `scripts/render-includes.py` — tiny dependency-free include renderer for `<!-- @include ... -->` comments.
- `_site/` — generated deploy output; do not edit or commit.
- `.quarto/` — ignored local Quarto metadata/cache; do not commit it.

## Local Preview

Build the static output:

```bash
./scripts/build-site.sh
```

Preview the generated web root:

```bash
python3 -m http.server 8000 --directory _site
```

Then open `http://localhost:8000/`.

## Change Guidelines

- Keep diffs scoped to the requested change. Do not reformat whole HTML/CSS files unless asked.
- Preserve the static-site architecture. Do not introduce React, Next.js, build tooling, npm dependencies, or generated assets unless explicitly requested.
- Prefer hand-written semantic HTML, CSS variables, and small vanilla JavaScript.
- Keep public URLs stable by editing top-level public files in `src/` and route folders in `src/pages/`; the build script copies them to the deployed root.
- Use relative links as if the files are already in the deployed root:
  - Top-level files in `src/` use `stylesheets/blog.css`, `writing/`, `posts/...`.
  - Route files in `src/pages/start-here/`, `src/pages/writing/`, `src/pages/projects/`, `src/pages/about/`, and `src/pages/posts/` generally use `../stylesheets/blog.css` and `../...` links.
- For external links opened in a new tab, use `target="_blank" rel="noreferrer"`.
- Keep public content professional; avoid adding private notes, secrets, API keys, or extra personal contact details.

## Content Updates

When adding, removing, renaming, or changing a post, update all relevant surfaces:

1. Add or edit the file in `src/pages/posts/`.
2. Update latest/popular/favorites links on `src/index.html` if appropriate.
3. Update `src/pages/writing/index.html` archive entries and tag filters.
4. Update `src/search.html` search index (`data-search` entries).
5. Update `src/rss.xml` with the post title, URL, date, description, and content summary.
6. Update previous/next links inside affected post pages.

Use dates consistently in both human-readable text and machine-readable attributes, e.g.:

```html
<time datetime="2026-06-25">25 Jun 2026</time>
```

## Styling Conventions

- Use `src/stylesheets/blog.css` for the main site and blog pages.
- Keep color decisions in CSS custom properties under `:root` and `html.dark-mode` when possible.
- Maintain light/dark mode support. If adding UI elements, verify they are readable in both modes.
- Keep typography aligned with the existing Merriweather/Raleway style.
- Do not mix CV styles into blog pages; `src/cv.html` intentionally uses the legacy Minimal theme CSS.

## JavaScript Conventions

- Keep scripts small and dependency-free.
- Local storage access should stay wrapped in `try/catch` because browser privacy settings can throw.
- Put shared behavior in `src/javascripts/` rather than duplicating inline scripts across pages.
- Reuse `src/includes/header.html` and `src/includes/footer.html` via `<!-- @include ... -->` comments rather than duplicating header/footer HTML.
- Prefer defensive DOM access (`if (element) ...` or optional chaining) for page-specific elements.

## Accessibility & SEO Checklist

Before finishing UI/content changes, check:

- Each page has a meaningful `<title>` and `<meta name="description">`.
- Navigation uses semantic `<nav>` and the active page is clear.
- Images have useful `alt` text.
- Interactive controls have labels or accessible text.
- Keyboard focus remains visible.
- Heading order is logical.
- RSS and Open Graph metadata stay accurate where present.

## Validation

For static changes, at minimum:

```bash
git status --short
node --check src/javascripts/theme.js
node --check src/javascripts/archive-filter.js
node --check src/javascripts/search.js
./scripts/build-site.sh
python3 -m http.server 8000 --directory _site
```

Then manually inspect the changed pages in a browser if possible.
