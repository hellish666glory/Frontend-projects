import { useState } from "react";

export function useList() {

  const [list, setList] = useState([])

  /** Создать новый элемент. */
  const createItem = () => {
    setList([...list,
      {id: new Date(), title: '', done: false}])
  };

  /**
   * Установить заголовок элемента.
   *
   * @param id - ID элемента.
   * @param title - Заголовок элемента.
   */

  const setItemTitle = (id, title) => {
    setList(list.map((item) => {
      if (item.id === id) {
        return { ...item, title };
      }
      return item;
    }));
  };

  /**
   * Переключить выполненность элемента.
   *
   * @param id - ID элемента.
   */
  const toggleItem = (id) => {
    setList(list.map((item) => {
      if(item.id === id){
        return { ...item, done: !item.done }
      }
      return item
    }))
  };

  /**
   * Удалить элемент.
   *
   * @param id - ID элемента.
   */

   const deleteItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  return {
    list,
    createItem,
    setItemTitle,
    toggleItem,
    deleteItem,
  };
}
