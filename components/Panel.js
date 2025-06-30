import styles from '../styles/Panel.module.css';

export default function Panel({ children, color = 'blue' }) {
  return (
    <div className={`${styles.panel} ${styles[color]}`}>
      <div className={styles.panelContent}>
        {children}
      </div>
    </div>
  );
}
