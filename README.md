# Suomen Jujutsuliitto – www.jujutsuliitto.fi

Static website built with [Jekyll](https://jekyllrb.com/) and hosted on GitHub Pages.
It replaces the old WordPress site; content was converted from a Wayback Machine mirror.

## Editing content

Every page is a Markdown file. Edit it directly on github.com (pencil icon) and commit;
GitHub Pages republishes the site in a minute or two.

| Page | File |
|---|---|
| Etusivu (Suomen Jujutsuliitto) | `index.md` |
| Hallitus | `hallitus.md` |
| Jäsenseurat | `jasenseurat.md` |
| Jujutsu | `jujutsu.md` |
| Tapahtumat | `tapahtumat.md` |
| Galleria | `galleria/index.md` + one file per gallery |
| Sidebar (Yhteystiedot, Ajankohtaista) | `_includes/sidebar.md` |
| Main menu | `_data/navigation.yml` |

Markdown basics: `**bold**`, `[link text](https://example.com)`, a blank line starts a new
paragraph, and a `\` at the end of a line is a line break within a paragraph.

### Adding a page

Create e.g. `uusi-sivu.md`:

```markdown
---
layout: page
title: Uusi sivu
permalink: /uusi-sivu/
---

Sisältö tähän.
```

and add it to `_data/navigation.yml` if it should appear in the menu.

### Adding a gallery

1. Upload the photos to a new folder, e.g. `assets/galleries/2025-kesaleiri/`
   (GitHub: *Add file → Upload files*). Resize them to about 1600 px wide first.
2. Create `galleria/kesaleiri-2025.md`:

```markdown
---
layout: gallery
title: Kesäleiri 2025
permalink: /galleria/kesaleiri-2025/
sections:
  - title: Lauantai
    images:
      - src: /assets/galleries/2025-kesaleiri/kuva1.jpg
      - src: /assets/galleries/2025-kesaleiri/kuva2.jpg
        alt: Ryhmäkuva
---

Optional introduction text.
```

`thumb:` (a small preview image) and `alt:` (description) are optional.

3. Link it from `galleria/index.md` and `_data/navigation.yml`.

## Publishing on GitHub Pages

1. Push this directory to a GitHub repository (as the repository root).
2. *Settings → Pages → Build and deployment*: Source **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Custom domain: enter `www.jujutsuliitto.fi` there (GitHub creates a `CNAME` file) and point
   DNS to GitHub: `www` CNAME → `<user>.github.io`. Enable *Enforce HTTPS*.
   If you use `https://<user>.github.io/<repo>/` instead, set `baseurl: "/<repo>"` in `_config.yml`.

Old WordPress links (`/?page_id=16` etc.) are redirected to the new pages; see `_data/legacy_urls.yml`.

## Running locally (optional)

Requires Ruby 3.x (macOS: `brew install ruby`; the built-in system Ruby does not work).

```sh
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000.
