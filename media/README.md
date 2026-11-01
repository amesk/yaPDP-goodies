# Media

This directory contains disk images and other media intended for use with yaPDP.

Each resource lives in its own directory and has a README describing the image, its contents, and any known provenance or usage notes.

## Available media

- [RT-11 ASCII Art](rt-11-ascii-art/README.md) — an RT-11 disk image containing text and ASCII-art files.

## Format

Files ending in `.zst` are compressed with Zstandard. The original compressed file is kept in the repository to reduce download size. Decompress it first if the tool used to inspect or mount the image does not support Zstandard input.

Media resources are independent of saved states. A state that needs a particular image should identify that dependency in its own README.
