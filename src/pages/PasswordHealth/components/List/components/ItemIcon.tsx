import React, { FC } from 'react';

interface IItemIcon {
  title: string,
}

export const ItemIcon: FC<IItemIcon> = ({title}) => (
  <div className="item-icon">
    {title.substring(0, 2)}
  </div>
);
