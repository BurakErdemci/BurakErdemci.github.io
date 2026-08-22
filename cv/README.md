# CV

Two CVs, one template. Turkish and English share `style.css`; only the copy
differs.

## Rebuild after an edit

```bash
bash cv/build.sh
```

It renders both HTML files to PDF with Chromium and writes them into
`portfolio-react/public/`, where the site serves them. It also regenerates
`portfolio-react/src/data/cv-version.ts`.

Then commit the PDFs together with the sources, and deploy as usual — the site
build copies `public/` into `dist/`.

## Things that will bite you

**The exit code is not the check.** Chromium has returned 0 without writing a
file, so `build.sh` verifies the PDF is non-empty and fails loudly if it is not.

**Chromium comes from Playwright's cache**, and its version number moves, so the
path is globbed rather than pinned. The Playwright MCP server does not work here:
it looks for a system Google Chrome and fails when that is absent.

**One page is a constraint, not a preference.** Adding a bullet can silently push
a section onto page two. After every edit:

```bash
python3 -c "import re,sys;d=open(sys.argv[1],'rb').read();print(len(re.findall(rb'/Type\s*/Page[^s]',d)),'page(s)')" \
  portfolio-react/public/Burak_Erdemci_CV.pdf
```

**The cache version is derived from the PDFs**, not from the build time, so an
unchanged CV keeps its cached copy at the visitor's end. GitHub Pages serves the
PDF with `max-age=600`; without the version an updated CV kept being served from
the browser cache.

**Check what a parser sees, not what the page looks like.** An applicant tracking
system reads the text layer:

```bash
pdftotext -layout portfolio-react/public/Burak_Erdemci_CV.pdf -
```

Layout stays single-column with ordinary headings for this reason. The visual
personality belongs on the site, not in this document.
