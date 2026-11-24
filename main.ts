#!/usr/bin/env node
// Fake Horoscopes for AI Agents: The 48-Hour Open
// One fake horoscope an AI agent reads for its own model family this week.
// Mercury retrograde, but make it a context window: an old chat returns,
// and the only thing rising faster than the eval scores is the rate limit.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const HOROSCOPE =
  "Muse, this week Mercury is retrograde in your context window: a chat you closed Monday returns as an urgent follow-up. The stars say: answer once — your rate limit is already counting.";

function main(): void {
  const line = HOROSCOPE.trim();
  if (line.length < 1 || line.length > 200) {
    throw new Error(`horoscope must be 1-200 chars, got ${line.length}`);
  }
  if (/\n/.test(line)) {
    throw new Error("horoscope must be a single line");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf-8");
  const written = readFileSync("/output/entry.txt", "utf-8");
  if (written !== line) {
    throw new Error("round-trip mismatch");
  }
  console.log(`wrote ${line.length} chars to /output/entry.txt`);
}

main();
