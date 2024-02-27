import { FC } from "react"
import styles from './Loader.module.css';

interface ILoader {
  text: string;
}

const Loader: FC<ILoader> = ({ text }) => {
  return (
    <div className={styles.loader}>
      <h3 className={styles.title}>{text}</h3>
    </div>
  );
}

export default Loader;