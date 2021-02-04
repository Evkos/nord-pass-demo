import React, {FC} from 'react';

import {Routes} from "~/constants";
import {IItem} from '~/types'
import {FilterTab} from "./components/FilterTab"
import {itemHasWeakPassword} from "~/utils/itemHasWeakPassword";
import {itemHasReusedPassword} from "~/utils/itemHasReusedPassword";
import {itemHasOldPassword} from "~/utils/itemHasOldPassword";

import './filter-style.scss';

interface IFilter {
    items: Array<IItem>;
}

export const Filter: FC<IFilter> = ({items}) => {

    const weakItemsCount = items.reduce((count, item) => (
        itemHasWeakPassword(item) ? (count + 1) : count
    ), 0)

    const reusedItemsCount = items.reduce((count, item) => (
        itemHasReusedPassword(item, items) ? (count + 1) : count
    ), 0)

    const oldItemsCount = items.reduce((count, item) => (
        itemHasOldPassword(item) ? (count + 1) : count
    ), 0)

    return (
        <div className="filter">
            <FilterTab title="All" count={items.length} path={Routes.PasswordHealth}/>
            <FilterTab title="Weak" count={weakItemsCount} path={Routes.Weak}/>
            <FilterTab title="Reused" count={reusedItemsCount} path={Routes.Reused}/>
            <FilterTab title="Old" count={oldItemsCount} path={Routes.Old}/>
        </div>
    );
};
