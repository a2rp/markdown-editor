import { FiEye } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./styles.module.css";

const MarkdownPreview = ({ value }) => (
    <section className={styles.previewPane} aria-labelledby="preview-title">
        <div className={styles.paneHeader}><div className={styles.paneTitle}><span className={styles.paneIcon}><FiEye aria-hidden="true" /></span><div><h2 id="preview-title">Preview</h2><p>Rendered document</p></div></div><span className={styles.liveLabel}><i />Live</span></div>
        <div className={styles.previewScroll}>
            {value.trim() ? <div className={styles.document}><ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown></div> : <div className={styles.emptyPreview}><span>#</span><p>Your document preview appears here.</p><small>Start with a heading or type a few lines.</small></div>}
        </div>
        <div className={styles.paneFooter}><span>GitHub-flavored Markdown</span><span>Preview</span></div>
    </section>
);

export default MarkdownPreview;
