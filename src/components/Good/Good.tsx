import { FC } from "react";
import styles from './Good.module.css';
import { TItem } from "../../utils/types";

interface IGood {
  item: TItem;
}

const Good: FC<IGood> = ({ item }) => {

  return (
    <li key={item.id} className={styles.good}>
      <p className={styles.good__brand}>{item.brand}</p>
      <p className={styles.good__name}>{item.product}</p>
      <p className={styles.good__price}>Стоимость: {item.price}</p>
      <p className={styles.good__id}>Артикул: {item.id}</p>
    </li>
  )
};

export default Good;