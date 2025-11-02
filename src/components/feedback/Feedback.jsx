import styles from './Feedback.module.css'

const Feedback = ({ good, neutral, bad, total, positive }) => {

    return (
        <div className={styles.feedCont}>
            <p className={styles.feedText}>Good: {good}</p>
            <p className={styles.feedText}>Neutral: {neutral}</p>
            <p className={styles.feedText}>Bad: {bad}</p>
            <p className={styles.feedText}>Total: {total}</p>
            <p className={styles.feedText}>Positive: {positive}%</p>
        </div>
    );
};

export default Feedback;