// ф-ция разбиения получаемых данных на массивы с определенным количеством элементов
export const sliceIdArray = (array: string[], limit: number) => {
    const sliced = [];
    for (let i = 0; i < array.length; i += limit) {
      sliced.push(array.slice(i, i + limit));
    }
    return sliced;
  };
  // функция получения уникальных продуктов
  export const getUnique = <T>(arr: T[], key: keyof T): T[] => {
    const notUnique: { [key: string]: boolean } = {};
    return arr.filter((item) => {
      const value = item[key];
      if (!notUnique[value as string]) {
        notUnique[value as string] = true;
        return true;
      }
      return false;
    });
  };
  