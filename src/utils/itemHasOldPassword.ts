import {IItem} from "~/services/getUserItems";

const itemHasOldPassword = (item: IItem) => {
    const createdAtDate = new Date(item.createdAt).getTime();
    const todayDate = new Date().getTime();
    const thirtyDaysInMilliseconds = 2592000000;

    return (todayDate - createdAtDate) > thirtyDaysInMilliseconds;
};

export default itemHasOldPassword;
