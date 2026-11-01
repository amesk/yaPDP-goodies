# RT-11 ASCII Art disk

An RT-11 disk image containing a small collection of text and ASCII-art files.

## Image

- **File:** [`rt-11-ascii-art.dsk.zst`](rt-11-ascii-art.dsk.zst)
- **Volume name:** `RT11A`
- **Compression:** Zstandard (`.zst`)

## Directory listing

The volume contains the following files:

```text
COGUAR.TXT       7 blocks
MADONN.ART      15 blocks
BONES.ART        9 blocks
GIRLFA.TXT      22 blocks
KENNED.ART       5 blocks
WINEGL.VT       20 blocks

6 files, 78 blocks used
4684 free blocks
```

The filenames suggest a mixture of text documents and artwork. In particular, `MADONN.ART` is the Madonna artwork file in this collection.

## Using the image

The repository stores the disk image compressed as `rt-11-ascii-art.dsk.zst`. Decompress it with a Zstandard-compatible utility if the software you use expects a raw `.dsk` image.

The image is provided as a standalone media resource. It is not automatically installed into yaPDP when this repository is cloned.
