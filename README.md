# yaPDP Goodies

A curated companion collection for [yaPDP](https://github.com/amesk/yaPDP), the browser-based PDP-11 emulator.

**Browse the collection:** [yaPDP Goodies on GitHub Pages](https://amesk.github.io/yaPDP-goodies/)

Goodies keeps optional content separate from the emulator itself:

- **Saved states** — prepared machine sessions that can be launched in yaPDP.
- **Disk images** — independent media resources to download and use with the emulator.
- **Documentation** — bibliographic references to historical PDP-11 manuals and related material.
- **Media** — supporting images and other collection material.

The catalogue is a static site. It uses ordinary HTML, CSS, JavaScript and JSON and requires no build step or server-side component.

## Repository layout

- `index.html`, `css/`, `js/` — the GitHub Pages catalogue.
- `catalog.json` — states and disk images displayed on the site.
- `states/` — saved emulator states and their supporting files.
- `media/` — disk images and other media.
- `documentation/catalog.json` — external documentation references.

## GitHub Pages

To publish the site, open **Settings → Pages** and choose **Deploy from a branch**, then select the `main` branch and `/(root)` folder. After the branch containing the site is merged into `main`, GitHub Pages will publish it at:

https://amesk.github.io/yaPDP-goodies/

No build workflow is required.

## Content and rights

Saved states and disk images are independent resources. A state may be self-contained or may depend on a separate disk image; item notes should explain known dependencies and compatibility.

The documentation catalogue initially contains external references, not mirrored PDFs. PCjs is used as a discovery index; its entries can point to material hosted by other archives. The presence of a document online does not by itself establish permission to redistribute it. Before adding document files to this repository, record the source and a clear redistribution basis or permission.

## File formats

Large binary resources may use Zstandard compression and the `.zst` suffix. Keep original filenames when downloading or mirroring files. Decompress them first if the software you use does not support Zstandard input.

## Contributing

For each new resource:

1. Give it a descriptive directory under `states/` or `media/`.
2. Add a README describing its contents, purpose, provenance and usage.
3. Include a representative preview image where useful.
4. Add or update the corresponding record in `catalog.json`.
5. Document dependencies, attribution and licensing information.

For documentation references, update `documentation/catalog.json` and include a source link. Do not mirror a PDF unless its redistribution status is clear.
