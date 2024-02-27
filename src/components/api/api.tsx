import md5 from 'md5';
import { sliceIdArray } from '../../utils/additional';
import { standardErrorMessage } from '../../utils/errorMessages';

export const API_URL = 'https://api.valantis.store:41000/';
// функция создания пароль_таймштамп
export const setAuthHeaders = () => {
  const password = 'Valantis';
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return md5(`${password}_${timestamp}`);
};
// функция запроса массива id с сервера
export const fetchData = async () => {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': setAuthHeaders()
      },
      body: JSON.stringify({
        "action": "get_ids",
        "params": {"offset": 0, "limit": 120}
      })
    });
    if (res.ok) {
      const data = await res.json();
      return data.result;
    } else {
      throw new Error(standardErrorMessage);
    }
  } catch (e) {
    console.log(e);
  }
};
// функция получения товаров с разбиением по 100 шт в запросе
export const getGoods = async () => {
    const ids = await fetchData();
    const slicedArray = sliceIdArray(ids, 100);
    const goods = await Promise.all(
      slicedArray.map(async (slice) => {
        try {
          const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Auth': setAuthHeaders()
            },
            body: JSON.stringify({ action: 'get_items', params: { ids: slice } })
          })
          if (res.ok) {
            const data = await res.json();
            return data.result;
          } else {
            throw new Error(standardErrorMessage)
          }
        } catch (e) {
          console.log(e);
        }
      })
    )
    return goods;
};