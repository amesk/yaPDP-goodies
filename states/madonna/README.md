# Madonna and Child

A self-contained, ready-to-load yaPDP saved state prepared to print an image of Madonna and Child.

The state was restored and verified independently: **it contains everything needed for this demonstration. No separate disk image from the `media/` collection is required.**

## Files

- **[`madonna.state.zst`](madonna.state.zst)** — the Zstandard-compressed saved emulator state.
- **[`preview.png`](preview.png)** — a screenshot preview of the demonstration.
- **[`print.pdf`](print.pdf)** — the accompanying PDF printout.

![Preview of the Madonna and Child demonstration](preview.png)

## Load directly in yaPDP

Use this URL to load the saved state directly from the browser:

[`madonna.state.zst`](https://raw.githubusercontent.com/amesk/yaPDP-goodies/main/states/madonna/madonna.state.zst)

For URL-based loading, pass the raw-content URL to yaPDP (for example, as the value of the `state` query parameter). Use `raw.githubusercontent.com` URLs for browser `fetch()` requests; GitHub's `github.com/.../raw/...` page URLs may fail due to CORS.

## What to expect

Load the saved state in yaPDP to resume the prepared session. The demonstration is intended to show the emulator's printing workflow and the resulting image.

## Format

The state file is compressed with Zstandard. If the yaPDP version or loading workflow you use does not accept the compressed file directly, decompress it first with a Zstandard-compatible utility.
