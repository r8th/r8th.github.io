Place your Tech Art images in this folder with the exact filenames expected by the HTML:

- tech-pcg-biome.png  (used for the PCG Biome thumbnail and project cover)

You uploaded an image in the chat; please save it here as `tech-pcg-biome.png` so the site will display it.

Path: assets/tech-pcg-biome.png

Per-project galleries
---------------------
You can manage images for each project by creating a subfolder under `assets/` that matches the project key used in the site.

Examples:

- `assets/dungeoncrawl/` → shown on the Dungeon Crawl project page
- `assets/pinefore/` → shown on the Eastern White Pine Forest project page
- `assets/tech-pcg-biome/` and `assets/tech-pcg-density/`

The site will look for `assets/<project>/gallery.json` at runtime and use that file to render images. To generate that manifest automatically, run from the project root:

```bash
node scripts/generate-gallery.js assets/dungeoncrawl
```

This writes `assets/dungeoncrawl/gallery.json` with a JSON object shape:

```json
{
	"images": [
		"01_DungeonCrawlShot.jpg",
		"02_DungeonCrawlShot.jpg"
	]
}
```

Filenames with numeric prefixes (e.g. `01_`, `02_`) will be sorted numerically. If no `gallery.json` is present the site falls back to the images defined in `PROJECTS`.

