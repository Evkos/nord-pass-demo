import {IItem} from '~/types'

export const itemHasReusedPassword = (item: IItem, itemList: Array<IItem>) => {
  const reusedItems = itemList.filter((listItem) => (
    listItem.password === item.password
  ))

  return reusedItems.length > 1;
};
