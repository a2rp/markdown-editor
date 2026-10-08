export const getMarkdownStats = (source) => {
    const trimmedSource = source.trim();
    const words = trimmedSource ? trimmedSource.split(/\s+/).length : 0;
    return {
        words,
        characters: source.length,
        lines: source.split("\n").length,
        readingMinutes: Math.max(1, Math.ceil(words / 200)),
    };
};
