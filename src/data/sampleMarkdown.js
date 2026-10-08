export const sampleMarkdown = `# Field notes: Northstar release

A shared place for the small details that make a release go smoothly.

## Before launch

- [x] Confirm the release owner
- [x] Review the migration plan
- [ ] Share the status page with support
- [ ] Run the final smoke test

> Keep the handoff clear, calm, and easy to scan.

## Release details

| Area | Owner | Status |
|:--|:--|:--|
| API | Platform | Ready |
| Docs | Product | In review |
| Support | Operations | Next up |

## Quick check

Use the health endpoint after deployment:

\`GET /health\`

If a check fails, note the time and the affected service before escalating. See the [release handbook](https://example.com/handbook) for the full checklist.
`;

export const draftStorageKey = "markdown-editor-document-v1";

export const loadSavedMarkdown = (storage) => {
    try {
        const browserStorage = storage || localStorage;
        const savedMarkdown = browserStorage.getItem(draftStorageKey);
        return savedMarkdown === null ? sampleMarkdown : savedMarkdown;
    } catch {
        return sampleMarkdown;
    }
};
