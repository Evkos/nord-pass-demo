import React, {FC} from 'react';
import {Route, RouteProps, useHistory} from 'react-router-dom';

import {Routes} from '~/constants';

export const PublicRoute: FC<RouteProps> = ({
 path,
 component,
}) => {
  const {push} = useHistory();
  const token = localStorage.getItem('token');

  if (token) {
    push(Routes.PasswordHealth);
  }

  return <Route path={path} component={component}/>
};
