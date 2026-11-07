# yaPDP Goodies

Additional media and saved states for [yaPDP](https://github.com/amesk/yaPDP), a PDP-11 emulator that runs in the browser.

This repository keeps optional demonstration content separate from the emulator source code. It is intended to be a small, browsable collection of disk images and ready-to-load machine states. The collection can grow with contributions from other yaPDP users.

- **Emulator:** [yaPDP on GitHub](https://github.com/amesk/yaPDP)
- **Try it:** [yaPDP web application](https://amesk.github.io/yaPDP/)

## Contents

The repository has two independent sections:

- [`media/`](media/README.md) — disk images and other media that can be used by the emulator.
- [`states/`](states/README.md) — saved emulator states, with previews and supporting material where available.
- [`documentation/`](documentation/README.md) — curated references to historical PDP-11 documentation (initially external links; no PDFs mirrored).

A saved state and a disk image are separate resources. A state may rely on a disk image, include the required data itself, or be useful on its own; dependencies are documented with each state when known.

### Current collection

| Item | Description |
| --- | --- |
| [RT-11 ASCII Art disk](media/rt-11-ascii-art/README.md) | An RT-11 volume containing a small collection of text and ASCII-art files. |
| [Madonna demonstration state](states/madonna/README.md) | A saved yaPDP state set up to print an image of Madonna and Child. |

## File formats

Large binary resources are stored using [Zstandard](https://facebook.github.io/zstd/) compression and use the `.zst` suffix. Keep the original filenames when downloading or mirroring the files. If a tool does not support Zstandard-compressed input, decompress the file before using it.

PNG previews and PDF documents are provided as ordinary files and can be viewed directly.

## Using the content

Open the [yaPDP web application](https://amesk.github.io/yaPDP/) and use its relevant media or saved-state loading workflow. These files are published as a content collection; simply cloning this repository does not install them into yaPDP or add them to its built-in catalog.

**For direct loading from a browser**, use URLs on `raw.githubusercontent.com`, not GitHub's `github.com/.../raw/...` page URLs. For example, a file at `states/example/example.state.zst` on the `main` branch can be addressed as:

```
https://raw.githubusercontent.com/amesk/yaPDP-goodies/main/states/example/example.state.zst
```

This raw-content URL can be supplied to yaPDP's URL-based state loader (for example, with the `?state=` query parameter). The `github.com/.../raw/...` URL may fail in browser `fetch()` requests because of cross-origin (CORS) headers.

Refer to the README in each item directory for its contents and any item-specific notes.

## Contributing

Contributions of additional disk images, saved states, and demonstrations are welcome.

For each contribution:

1. Put the resource in its own descriptive directory under `media/` or `states/`.
2. Add a README explaining what it is, what a user should expect, and how it was created or obtained.
3. For saved states, include a representative `preview.png` whenever possible.
4. Document required media, emulator/version requirements, provenance, attribution, and licensing information whenever applicable.
5. Do not include material unless you have the right to redistribute it.

Keep media and states as independent resources where practical: several states may use the same disk image, and one disk image may be useful with several states.

## License and attribution

The repository includes an MIT license. Individual contributions may have separate copyright, attribution, or licensing requirements; check the relevant item README before redistributing an item. Contributors are responsible for documenting the rights and permissions applicable to the material they submit.
