import { FiEdit3 } from "react-icons/fi";
import styles from "./styles.module.css";

const MarkdownEditor = ({ value, onChange, editorRef, lineCount, onKeyDown }) => (
    <section className={styles.editorPane} aria-labelledby="editor-title">
        <div className={styles.paneHeader}><div className={styles.paneTitle}><span className={styles.paneIcon}><FiEdit3 aria-hidden="true" /></span><div><h2 id="editor-title">Write</h2><p>Markdown source</p></div></div><span className={styles.fileName}>document.md</span></div>
        <label className={styles.visuallyHidden} htmlFor="markdown-source">Markdown source</label>
        <textarea ref={editorRef} id="markdown-source" className={styles.textarea} value={value} onChange={(event) => onChange(event.target.value)} onKeyDown={onKeyDown} spellCheck="false" aria-describedby="markdown-hint" />
        <div className={styles.paneFooter}><span id="markdown-hint">Markdown with GitHub-flavored tables and task lists</span><span>{lineCount} lines</span></div>
    </section>
);

export default MarkdownEditor;
