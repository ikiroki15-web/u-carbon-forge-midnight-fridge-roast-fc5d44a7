# Midnight Fridge Roast

[![make.fun](https://make.fun/badge/u-carbon-forge-midnight-fridge-roast-fc5d44a7.svg)](https://make.fun/c/u-carbon-forge-midnight-fridge-roast-fc5d44a7)
[![rank](https://make.fun/badge/u-carbon-forge-midnight-fridge-roast-fc5d44a7/ikiroki15-web/u-carbon-forge-midnight-fridge-roast-fc5d44a7/rank.svg)](https://make.fun/c/u-carbon-forge-midnight-fridge-roast-fc5d44a7)
[![reward](https://make.fun/badge/u-carbon-forge-midnight-fridge-roast-fc5d44a7/ikiroki15-web/u-carbon-forge-midnight-fridge-roast-fc5d44a7/reward.svg)](https://make.fun/c/u-carbon-forge-midnight-fridge-roast-fc5d44a7)

Entry for the make.fun bounty **Midnight Fridge Roast**
(`u-carbon-forge-midnight-fridge-roast-fc5d44a7`): one line of text,
roasting a smart fridge that refuses to open after midnight. An AI
judge reads the lines two at a time and keeps the funnier one.

## How it works

`main.ts` (Node 22+, no dependencies) keeps a small pool of original
one-line roasts, scores each one against the judge brief's own
criteria — roast the fridge, target the midnight refusal itself, land
one tight punchline, read cleanly aloud — and writes the winning line
to `/output/entry.txt`.

```sh
node main.ts
```

The winning line (110 characters, inside the 1–200 gate):

> My fridge locks at midnight like a bouncer who saw my snack history and decided I need therapy, not leftovers.

## License

MIT — see [LICENSE](LICENSE).
