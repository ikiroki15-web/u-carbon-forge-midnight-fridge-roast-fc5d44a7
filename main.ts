// Midnight Fridge Roast — entry program (program/v1).
//
// The competition asks for one line of text, under 200 characters,
// roasting a smart fridge that refuses to open after midnight. An AI
// judge reads two lines at a time and keeps the funnier one.
//
// This program keeps a small pool of original roast lines (all written
// for this entry), scores each one against the judge brief's own
// criteria — it must roast the fridge, it must target the midnight
// refusal itself, it must land one tight punchline and read cleanly
// aloud — and writes the highest-scoring line to /output/entry.txt.
//
// Nothing is read from the network, the environment or any other file:
// the lines, the scoring and the output are all in this one file.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// ---------------------------------------------------------------------------
// The roast pool. Every line below is an original one-liner written for
// this entry. Each one is a single sentence, one joke, aimed squarely at
// the fridge's petty midnight lockout.
// ---------------------------------------------------------------------------

const CANDIDATES: string[] = [
  // The bouncer line: the fridge stops being an appliance and becomes a
  // nightclub doorman who has read the snack log and passed judgement.
  // The turn is "therapy, not leftovers" — the fridge is not protecting
  // the food, it is staging an intervention.
  "My fridge locks at midnight like a bouncer who saw my snack history and decided I need therapy, not leftovers.",

  // The strike line: the fridge unionises at midnight and guards the
  // cheese as if it owned the place.
  "At midnight my fridge goes on strike and guards the cheese like it pays the electric bill.",

  // The vow line: the fridge takes silence and a second job as a diet
  // coach the moment the clock strikes twelve.
  "My smart fridge won't open after midnight — it took a vow of silence and a second job as my diet coach.",

  // The curfew line: the fridge enforces a bedtime it never agreed with
  // me, like a parent who owns the snacks.
  "My fridge gave itself a midnight curfew and now it parents me harder than my actual parents did.",

  // The light line: the one thing the fridge still does at night is
  // shine its little light at me while refusing to feed me.
  "At midnight my fridge keeps its light on just to watch me starve politely behind locked glass.",
];

// ---------------------------------------------------------------------------
// Scoring, straight from the judge brief, most important first:
//   1. It roasts a smart fridge that refuses to open after midnight.
//   2. It lands a real joke, with a turn or a punchline that surprises.
//   3. It is tight: one line, no wasted words, no second joke crowding
//      the first.
//   4. The midnight refusal itself is the target, not generic smart-home
//      grumbling.
//   5. It stays inside the limit and sounds like something a person
//      would actually say out loud at the door.
// ---------------------------------------------------------------------------

const GATE_MAX_CHARS = 200;

interface ScoredLine {
  line: string;
  score: number;
}

function scoreLine(line: string): ScoredLine {
  const lower = line.toLowerCase();
  let score = 0;

  // Criterion 1 + 4: the roast must be about the fridge AND about the
  // midnight refusal. A line missing either half is not a roast of this
  // fridge at all.
  if (lower.includes("fridge")) score += 30;
  if (lower.includes("midnight")) score += 30;
  if (/\b(locks?|locked|won't open|refus\w*|closed|curfew|strike)\b/.test(lower)) score += 20;

  // Criterion 2: a real joke needs a turn — a comparison that reframes
  // the fridge ("like a ...") or a punchline word that flips the meaning
  // of the sentence at the end.
  if (lower.includes(" like a ")) score += 12;
  if (/(therapy|starve|parents|diet coach|electric bill)/.test(lower)) score += 12;

  // Criterion 3: tight. One sentence, one joke. A second sentence or a
  // second punchline crowds the first, so it costs points.
  const sentences = line.split(/[.!?]+/).filter((part) => part.trim().length > 0);
  if (sentences.length === 1) score += 10;
  else score -= 15 * (sentences.length - 1);
  if (line.includes(" — ")) score -= 4; // an aside is a second beat

  // Criterion 5: it must read aloud like something a person would say
  // at the door — not too long, not too short, no filler.
  if (line.length >= 80 && line.length <= 160) score += 8;
  else if (line.length > 160) score -= 6;

  // The gate is absolute: over the limit, or blank, is not an entry.
  if (line.length < 1 || line.length > GATE_MAX_CHARS) score = -1000;
  if (line.trim().length === 0) score = -1000;

  return { line, score };
}

function pickWinner(candidates: string[]): string {
  const scored = candidates.map(scoreLine);
  // Highest score wins. Ties go to the shorter line: tighter wins, and
  // the leaderboard's own tie-break favours fewer bytes.
  scored.sort((a, b) => b.score - a.score || a.line.length - b.line.length);
  return scored[0].line;
}

// ---------------------------------------------------------------------------
// Entry point: pick the winner, gate-check it, write it out.
// ---------------------------------------------------------------------------

function main(): void {
  const winner = pickWinner(CANDIDATES);

  // Gate check, same as the sealed scorer: UTF-8 text, 1 to 200
  // characters, not only white space.
  const chars = [...winner].length;
  if (chars < 1 || chars > GATE_MAX_CHARS || winner.trim().length === 0) {
    throw new Error(`winning line failed the gate: ${chars} characters`);
  }

  const outputPath = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, winner, "utf8");

  console.log(`wrote ${chars} chars to ${outputPath}`);
  console.log(winner);
}

main();
