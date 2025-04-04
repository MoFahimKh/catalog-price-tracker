import styles from "./style.module.scss";

const VerticalLinesDiv = () => {
  return (
    <div className={styles.linesContainer}>
      {[...Array(5)].map((_, i) => (
        <div key={i} className={`${styles.line} ${styles[`line-${i + 1}`]}`} />
      ))}
    </div>
  );
};

export default VerticalLinesDiv;
