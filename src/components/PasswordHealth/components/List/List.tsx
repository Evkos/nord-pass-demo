import {FC} from 'react';
import {IItem} from "~/services/getUserItems";
import ItemIcon from './components/ItemIcon';
import {UpdateModal} from './components/UpdateModal'

import './list-style.scss';

interface IList {
    items: Array<IItem>,
}


const List: FC<IList> = ({items}) => (
    <ul className="list">
        {
            items.map((item) => (
                <li className="item">
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

export default List;
