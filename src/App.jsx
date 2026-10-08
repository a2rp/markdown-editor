import { FiArrowRight, FiCheck, FiDatabase, FiShield } from "react-icons/fi";
import MarkdownWorkspace from "./components/markdownWorkspace/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import SiteFooter from "./components/siteFooter/index.jsx";
import BackToTop from "./components/backToTop/index.jsx";
import styles from "./App.module.css";

const App = () => (
    <div className={styles.appShell} id="top">
        <SiteHeader />
        <main>
            <section className={styles.hero} aria-labelledby="hero-title">
                <div className={styles.heroInner}>
                    <div className={styles.heroCopy}>
                        <p className={styles.heroLabel}><FiDatabase aria-hidden="true" /> A calm place to write</p>
                        <h1 id="hero-title">Words in.<br /><span>Structure out.</span></h1>
                        <p className={styles.heroDescription}>Draft in Markdown and watch the page take shape beside it. Tables, task lists, links, and code blocks are ready in a clean writing space.</p>
                        <a className={styles.heroButton} href="#editor">Start writing <FiArrowRight aria-hidden="true" /></a>
                        <div className={styles.heroPromise}><FiShield aria-hidden="true" /><span>Your draft stays on this device.</span></div>
                    </div>
                    <div className={styles.heroArtwork} aria-label="Sample Markdown and rendered preview" role="img">
                        <div className={styles.artworkTop}><span>release-notes.md</span><FiCheck aria-hidden="true" /></div>
                        <div className={styles.artworkColumns}>
                            <div className={styles.sourceSample}><span># Release notes</span><span>## This week</span><span>- [x] New editor</span><span>- [ ] Update guide</span><span>&gt; Ready to share.</span></div>
                            <div className={styles.renderSample}><strong>Release notes</strong><i /><b>This week</b><span>✓ New editor</span><span>○ Update guide</span><em>Ready to share.</em></div>
                        </div>
                        <div className={styles.artworkBottom}><span>Markdown</span><span>Preview</span><span>Autosaved</span></div>
                    </div>
                </div>
                <div className={styles.heroFoot}><span>Write once. Read it as it will appear.</span><span>GFM <i /> PRIVATE <i /> READY TO EXPORT</span></div>
            </section>
            <MarkdownWorkspace />
            <section className={styles.guide} id="guide" aria-labelledby="guide-title">
                <div className={styles.guideHeading}><p>Before you begin</p><h2 id="guide-title">A few notes about your draft.</h2></div>
                <div className={styles.guideGrid}>
                    <article><span>01</span><div><h3>Saved in this browser</h3><p>Your latest draft is autosaved to local storage on this device. It is not sent to a server. Restore sample replaces the saved draft.</p></div></article>
                    <article><span>02</span><div><h3>Safe live preview</h3><p>GitHub-flavored Markdown features render as you type. Embedded raw HTML is shown as text instead of being executed.</p></div></article>
                    <article><span>03</span><div><h3>Export whenever you like</h3><p>Copy the source Markdown or download it as a .md file. The preview is for reading; the source document is what gets exported.</p></div></article>
                </div>
            </section>
        </main>
        <SiteFooter />
        <BackToTop />
    </div>
);

export default App;
