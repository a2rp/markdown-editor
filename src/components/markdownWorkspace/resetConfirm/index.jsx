import { useEffect, useRef } from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const ResetConfirm = ({ onCancel, onConfirm }) => {
    const cancelButtonRef = useRef(null);

    useEffect(() => {
        cancelButtonRef.current?.focus();
        const handleKeyDown = (event) => {
            if (event.key === "Escape") onCancel();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onCancel]);

    return (
        <div className={styles.overlay} onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel(); }}>
            <section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="reset-title" aria-describedby="reset-description">
                <button className={styles.closeButton} type="button" aria-label="Close reset dialog" onClick={onCancel}><FiX aria-hidden="true" /></button>
                <span className={styles.icon}><FiAlertTriangle aria-hidden="true" /></span>
                <h2 id="reset-title">Replace this draft?</h2>
                <p id="reset-description">Your current Markdown will be replaced by the sample document and the saved draft on this device will update.</p>
                <div className={styles.actions}>
                    <button ref={cancelButtonRef} className={styles.cancelButton} type="button" onClick={onCancel}>Keep editing</button>
                    <button className={styles.confirmButton} type="button" onClick={onConfirm}>Restore sample</button>
                </div>
            </section>
        </div>
    );
};

export default ResetConfirm;
