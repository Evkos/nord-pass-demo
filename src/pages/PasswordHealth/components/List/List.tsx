import React, {FC} from 'react';

import {IItem} from '~/types'
import {ItemIcon} from './components/ItemIcon';
import {UpdateModal} from './components/UpdateModal'

import './list-style.scss';

interface IList {
    items: Array<IItem>,
}


export const List: FC<IList> = ({items}) => (
    <ul className="list">
        {
            items.map((item) => (
                <li className="item" key={item.id}>
                    <ItemIcon title={item.title}/>
                    <div>
                        <div className="title">
                            {item.title}
                        </div>
                        <div className="description">
                            {item.description}
                        </div>
                    </div>
                    <UpdateModal item={item}/>
                </li>
            ))
        }
    </ul>
)
