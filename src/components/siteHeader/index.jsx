import { FiGithub, FiPenTool } from "react-icons/fi";
import styles from "./styles.module.css";

const SiteHeader = () => (
    <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="Markdown Editor home"><span className={styles.brandMark}><FiPenTool aria-hidden="true" /></span><span>paper<span className={styles.brandAccent}>/</span>preview</span></a>
        <nav className={styles.navigation} aria-label="Main navigation"><a href="#editor">Editor</a><a href="#guide">Writing notes</a></nav>
        <a className={styles.repository} href="https://github.com/a2rp/markdown-editor" target="_blank" rel="noreferrer"><FiGithub aria-hidden="true" /><span>Repository</span></a>
    </header>
);

export default SiteHeader;
