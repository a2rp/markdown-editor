import assert from "node:assert/strict";
import test from "node:test";
import { draftStorageKey, loadSavedMarkdown, sampleMarkdown } from "./sampleMarkdown.js";

const makeStorage = (value) => ({ getItem: (key) => key === draftStorageKey ? value : null });

test("loads the sample when no draft has been saved", () => {
    assert.equal(loadSavedMarkdown(makeStorage(null)), sampleMarkdown);
});

test("restores a saved document, including an intentionally empty draft", () => {
    assert.equal(loadSavedMarkdown(makeStorage("# My note")), "# My note");
    assert.equal(loadSavedMarkdown(makeStorage("")), "");
});

test("falls back to the sample when browser storage cannot be read", () => {
    assert.equal(loadSavedMarkdown({ getItem: () => { throw new Error("Storage disabled"); } }), sampleMarkdown);
});
