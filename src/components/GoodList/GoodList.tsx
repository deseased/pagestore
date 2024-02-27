/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from './GoodList.module.css';
import { getGoods } from "../api/api";
import Good from "../Good/Good";
import { TItem } from "../../utils/types";
import Loader from "../Loader/Loader";
import { getUnique } from "../../utils/additional";

const GoodsList: FC = () => {
  const [goodsList, setGoodsList] = useState<TItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchString, setSearchString] = useState<string>('');
  const [filteredGoods, setFilteredGoods] = useState<TItem[]>([]);
  const [loading, setLoading] = useState(true);
  // получаем и обрабатываем товары
  const getDataFromServer = async () => {
    const products = await getGoods();
    const allProducts= products.flat();
    const uniqueProducts = getUnique(allProducts, 'id');
    setGoodsList(uniqueProducts);
    setFilteredGoods(uniqueProducts);
    setTotalPages(Math.ceil(uniqueProducts.length / 50));
    setLoading(!loading);
  }
  // получение данных при монтировании компонента
  useEffect(() => {
    getDataFromServer();
  }, [])
  // функция, фильтрующая товары на основе строки в инпуте
  const filterGoods = (str: string) => {
    const filtered = goodsList.filter((product: TItem) => {
      const productNameMatch = product.product.toLowerCase().includes(str.toLowerCase());
      const idMatch = product.id.toLowerCase().includes(str.toLowerCase());
      const brandMatch = product.brand && product.brand.toLowerCase().includes(str.toLowerCase());
      const priceMatch = product.price && product.price.toString().toLowerCase().includes(str.toLowerCase());

      return productNameMatch || idMatch || brandMatch || priceMatch;
    });

    setFilteredGoods(filtered);
    setTotalPages(Math.ceil(filtered.length / 50));
    setPage(1);
  };
  // хэндлер для фильтрации
  const handleFilterGoods = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchString(evt.target.value);
    filterGoods(evt.target.value);
  };
  // функция пагинации
  const setPagination = (array: TItem[], length: number, pageNumber: number) => {
    return array.slice((pageNumber - 1) * length, pageNumber * length);
  }
  // функция переключения страницы
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  if (loading) {
    return <Loader text="Загрузка товаров..." />
  }

  return (
    <div className={styles.goods}>
      <div className={styles.goods__inputWrapper}>
        <input
          type="text"
          name="goodsFilter"
          placeholder="Поиск товара"
          value={searchString}
          onChange={handleFilterGoods}
          className={styles.goods__input}
        />
      </div>
      <ul className={styles.goods__list}>
        {setPagination(filteredGoods, 50, page).map((item: TItem) => (
          <Good
            item={item}
            key={item.id}
          />
        ))}
      </ul>
      <div className={styles.goods__buttons}>
        <button
          type="button"
          className={styles.goods__button}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >

          Предыдущая страница
        </button>
        <div>{page}/{totalPages}</div>
        <button
          type="button"
          className={styles.goods__button}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Следующая страница
        </button>
      </div>
    </div>
  )
};

export default GoodsList;