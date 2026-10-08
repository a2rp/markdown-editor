import { useEffect, useRef, useState } from "react";
import { FiBold, FiCheck, FiCode, FiColumns, FiDownload, FiEdit3, FiEye, FiFileText, FiItalic, FiLink, FiList, FiMessageSquare, FiRotateCcw, FiSave } from "react-icons/fi";
import { draftStorageKey, loadSavedMarkdown, sampleMarkdown } from "../../data/sampleMarkdown.js";
import { getMarkdownStats } from "../../utils/markdownStats.js";
import MarkdownEditor from "./markdownEditor/index.jsx";
import MarkdownPreview from "./markdownPreview/index.jsx";
import ResetConfirm from "./resetConfirm/index.jsx";
import styles from "./styles.module.css";

const MarkdownWorkspace = () => {
    const [markdown, setMarkdown] = useState(loadSavedMarkdown);
    const [view, setView] = useState("split");
    const [saveStatus, setSaveStatus] = useState("Saving draft...");
    const [copyState, setCopyState] = useState("idle");
    const [resetOpen, setResetOpen] = useState(false);
    const editorRef = useRef(null);
    const { words: wordCount, characters, lines: lineCount, readingMinutes } = getMarkdownStats(markdown);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            try {
                localStorage.setItem(draftStorageKey, markdown);
                setSaveStatus("Saved on this device");
            } catch {
                setSaveStatus("Browser storage is unavailable");
            }
        }, 250);
        return () => window.clearTimeout(timeoutId);
    }, [markdown]);

    const insertWrapped = (before, after, placeholder) => {
        const editor = editorRef.current;
        if (!editor) return;
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const selectedText = markdown.slice(start, end);
        const insertedText = selectedText || placeholder;
        const nextMarkdown = `${markdown.slice(0, start)}${before}${insertedText}${after}${markdown.slice(end)}`;
        setMarkdown(nextMarkdown);
        window.requestAnimationFrame(() => {
            editor.focus();
            editor.setSelectionRange(start + before.length, start + before.length + insertedText.length);
        });
    };

    const insertLinePrefix = (prefix) => {
        const editor = editorRef.current;
        if (!editor) return;
        const start = editor.selectionStart;
        const lineStart = markdown.lastIndexOf("\n", Math.max(0, start - 1)) + 1;
        setMarkdown(`${markdown.slice(0, lineStart)}${prefix}${markdown.slice(lineStart)}`);
        window.requestAnimationFrame(() => {
            editor.focus();
            editor.setSelectionRange(start + prefix.length, start + prefix.length);
        });
    };

    const handleEditorKeyDown = (event) => {
        if (event.key !== "Tab") return;
        event.preventDefault();
        const editor = editorRef.current;
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        setMarkdown(`${markdown.slice(0, start)}  ${markdown.slice(end)}`);
        window.requestAnimationFrame(() => {
            editor.focus();
            editor.setSelectionRange(start + 2, start + 2);
        });
    };

    const copyMarkdown = async () => {
        try {
            await navigator.clipboard.writeText(markdown);
            setCopyState("copied");
            window.setTimeout(() => setCopyState("idle"), 1500);
        } catch {
            setCopyState("failed");
            window.setTimeout(() => setCopyState("idle"), 2000);
        }
    };

    const downloadMarkdown = () => {
        const objectUrl = URL.createObjectURL(new Blob([markdown], { type: "text/markdown;charset=utf-8" }));
        const link = document.createElement("a");
        link.href = objectUrl;
        link.download = "document.md";
        link.click();
        window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
        setSaveStatus("Downloaded document.md");
    };

    const cancelReset = () => setResetOpen(false);
    const restoreSample = () => {
        setMarkdown(sampleMarkdown);
        setCopyState("idle");
        setResetOpen(false);
        setSaveStatus("Restoring sample...");
    };

    const editorVisible = view !== "preview";
    const previewVisible = view !== "write";

    return (
        <section className={styles.workspace} id="editor" aria-labelledby="workspace-title">
            <div className={styles.workspaceHeading}>
                <div><p className={styles.sectionLabel}><FiFileText aria-hidden="true" /> Writing desk</p><h2 id="workspace-title">Your document</h2></div>
                <div className={styles.stats} aria-label="Document statistics"><span><strong>{wordCount}</strong> words</span><i /><span><strong>{characters}</strong> characters</span><i /><span><strong>{readingMinutes}</strong> min read</span></div>
            </div>

            <div className={styles.toolbar}>
                <div className={styles.formattingTools} role="group" aria-label="Insert Markdown syntax">
                    <button type="button" title="Add a level-two heading" aria-label="Insert heading" onClick={() => insertLinePrefix("## ")}><span>H2</span></button>
                    <span className={styles.toolDivider} />
                    <button type="button" title="Bold selected text" aria-label="Bold" onClick={() => insertWrapped("**", "**", "bold text")}><FiBold aria-hidden="true" /></button>
                    <button type="button" title="Italicize selected text" aria-label="Italic" onClick={() => insertWrapped("*", "*", "italic text")}><FiItalic aria-hidden="true" /></button>
                    <button type="button" title="Add a link" aria-label="Insert link" onClick={() => insertWrapped("[", "](https://example.com)", "link text")}><FiLink aria-hidden="true" /></button>
                    <button type="button" title="Insert inline code" aria-label="Insert inline code" onClick={() => insertWrapped("`", "`", "code")}><FiCode aria-hidden="true" /></button>
                    <button type="button" title="Start a bullet list item" aria-label="Insert bullet list item" onClick={() => insertLinePrefix("- ")}><FiList aria-hidden="true" /></button>
                    <button type="button" title="Quote selected line" aria-label="Insert quote" onClick={() => insertLinePrefix("> ")}><FiMessageSquare aria-hidden="true" /></button>
                </div>
                <div className={styles.documentActions}>
                    <button type="button" onClick={copyMarkdown}><FiCheck aria-hidden="true" /> {copyState === "copied" ? "Copied" : copyState === "failed" ? "Unavailable" : "Copy Markdown"}</button>
                    <button className={styles.downloadButton} type="button" onClick={downloadMarkdown}><FiDownload aria-hidden="true" /> Download</button>
                    <button className={styles.resetButton} type="button" onClick={() => setResetOpen(true)}><FiRotateCcw aria-hidden="true" /> Restore sample</button>
                </div>
            </div>

            <div className={styles.workspaceMeta} role="status" aria-live="polite"><span><FiSave aria-hidden="true" /> {saveStatus}</span><span>Saved drafts stay in this browser.</span></div>

            <div className={`${styles.panes} ${styles[view]}`}>
                {editorVisible && <MarkdownEditor value={markdown} onChange={setMarkdown} editorRef={editorRef} lineCount={lineCount} onKeyDown={handleEditorKeyDown} />}
                {previewVisible && <MarkdownPreview value={markdown} />}
            </div>

            <div className={styles.bottomBar}>
                <span className={styles.bottomHint}>Tab inserts two spaces in the editor</span>
                <div className={styles.viewControls} role="group" aria-label="Preview layout">
                    <button type="button" className={view === "write" ? styles.viewActive : ""} aria-pressed={view === "write"} onClick={() => setView("write")}><FiEdit3 aria-hidden="true" /><span>Write</span></button>
                    <button type="button" className={view === "split" ? styles.viewActive : ""} aria-pressed={view === "split"} onClick={() => setView("split")}><FiColumns aria-hidden="true" /><span>Split</span></button>
                    <button type="button" className={view === "preview" ? styles.viewActive : ""} aria-pressed={view === "preview"} onClick={() => setView("preview")}><FiEye aria-hidden="true" /><span>Preview</span></button>
                </div>
            </div>
            {resetOpen && <ResetConfirm onCancel={cancelReset} onConfirm={restoreSample} />}
        </section>
    );
};

export default MarkdownWorkspace;
