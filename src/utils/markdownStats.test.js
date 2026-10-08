import assert from "node:assert/strict";
import test from "node:test";
import { getMarkdownStats } from "./markdownStats.js";

test("counts words, characters, lines, and a minimum reading minute", () => {
    assert.deepEqual(getMarkdownStats("First line\nsecond line"), {
        words: 4,
        characters: 22,
        lines: 2,
        readingMinutes: 1,
    });
});

test("handles empty and whitespace-only documents", () => {
    assert.deepEqual(getMarkdownStats("  \n "), {
        words: 0,
        characters: 4,
        lines: 2,
        readingMinutes: 1,
    });
});

test("estimates a longer read at about 200 words per minute", () => {
    const source = Array.from({ length: 401 }, (_, index) => `word${index}`).join(" ");
    assert.equal(getMarkdownStats(source).readingMinutes, 3);
});
