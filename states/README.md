# Saved states

This directory contains saved yaPDP emulator states.

A saved state captures a configured emulator session and can be used to return to that session without repeating the original setup. Each state has its own directory containing the state file, a preview, and any supporting material.

## Available states

- [Madonna demonstration](madonna/README.md) — a saved state set up to print an image of Madonna and Child.

## File conventions

- State files ending in `.zst` are Zstandard-compressed.
- `preview.png` is a screenshot showing what to expect after loading the state.
- Additional files, such as PDFs, may provide a printable result or supporting documentation.

State dependencies and compatibility notes should be documented in the corresponding item README. A preview is illustrative; it is not itself a saved state.
