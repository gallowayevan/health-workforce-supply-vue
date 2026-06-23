# workforcevue2 — Developer Notes

Vue 2 (vue-cli 3) app for the **North Carolina Health Professional Supply Data**
interactive visualization. This repo is where the viz is built and tested; the
*built* output is then copied into the Hugo site, which is what actually deploys.

## Build & deploy workflow

This is a manual build-and-copy workflow (no CI deploy from this repo):

1. Make/verify changes in `src/`, then commit them to this repo.
2. Build: `npm run build`
   - On Windows the npm scripts already set `NODE_OPTIONS=--openssl-legacy-provider`
     (required for the old webpack/node combo). If running the cli-service
     directly in PowerShell, set `$env:NODE_OPTIONS="--openssl-legacy-provider"` first.
   - `vue.config.js` sets `filenameHashing: false`, so output names are stable.
   - Build emits exactly two JS files: `dist/js/app.js` and `dist/js/chunk-vendors.js`
     (`chunk-vendors.js` only changes when dependencies change; `app.js` carries
     our source changes).
3. Copy the two built files into the Hugo site's supply viz:
   - From: `dist/js/app.js`, `dist/js/chunk-vendors.js`
   - To:   `../workforcehugo/content/interactive/supply/js/`
   (overwrite the existing `app.js` and `chunk-vendors.js` there)
4. Deploy happens from the **workforcehugo** repo, not this one.

## Local development / testing

- `npm run serve` runs the dev server (default http://localhost:8080).
- In development, `src/env.js` points `ROOT_API` at `http://localhost:1313/`
  (the local Hugo server), which serves both `specialties.csv` and the
  `api/supply` data endpoint. If Hugo isn't running there, no profession or
  county data loads and the map stays empty.
- To test against real data without running Hugo, temporarily set the
  `development` `ROOT_API` in `src/env.js` to the production URL (see the
  `production` entry), reload, then **revert before committing** — env.js
  should never be committed pointing dev at production.
- Region/specialty data are fetched async, so dropdowns are empty until the
  fetch resolves.

## Key files

- `src/chart-text.js` — all the human-readable text in the viz:
  - `getSourceText(profession)` — the **Notes** block. One `case` per profession;
    the text shown is keyed on `specialty.profession` (see `App.vue:254`), so a
    note added to a profession's case shows for **all** of that profession's
    specialties/practice types. Profession-specific methodology notes go here.
  - `professionChartTitle()` — chart titles & pluralization rules.
  - `getLayerText()` — rural/urbanized-area overlay footnotes.
  - `getFooterText()` — source/citation footer.
  - `getPhysicianGroupText()` — "primary area of practice" group expansions.
- `src/components/SpecialtySelect.vue` — profession + specialty/practice-type
  dropdowns. Options come from `public/data/specialties.csv` (the deployed data
  may have more rows than the local copy, e.g. the CNM practice-type split).
- Live site: https://nchealthworkforce.unc.edu/interactive/supply/

## Domain notes

- **CNM practice types**: Effective 2023 (NC Session Law 2023-14, the Care for
  Women, Children, and Families Act), experienced CNMs (>=24 months & 4,000 hrs)
  can practice independently. The viz splits CNMs into "Independent" (series
  begins 2023) and "Collaborative" practice types. The collaborative total dips
  at the end of its series as midwives move into the independent category — this
  is a reclassification, not a workforce decline.
- Data are as of Oct 31 each year; counts are active, licensed practitioners.
