import React from 'react';
import { Redirect } from 'umi';
import pathToRegexp from 'path-to-regexp';
// import { connect } from 'dva';
import Authorized from '@/utils/Authorized';
import { getAuthority } from '@/utils/authority';
import Exception403 from '@/pages/Exception/403';
// import { notification, Button, message } from 'antd-mobile';


function AuthComponent({ children, location, route: { routes }, }) {
  const auth = getAuthority();
  const isLogin = auth && auth[0] !== 'guest';

  const getRouteAuthority = (path, routeData) => {
    console.log(path, routeData);
    let authorities;
    routeData.forEach(route => {
      console.log(route);
      // match prefix
      if (pathToRegexp(`${route.path}(.*)`).test(path)) {
        authorities = route.authority || authorities;

        // get children authority recursively
        if (route.routes) {
          authorities = getRouteAuthority(path, route.routes) || authorities;
        }
      }
    });
    return authorities;
  };

  getRouteAuthority(location.pathname, routes);
  
  // getRouteAuthority(location.pathname, routerData)
  return (
    <Authorized
        // authority={getRouteAuthority(location.pathname, routerData)}
        noMatch={isLogin ? <Exception403 /> : <Redirect to="/user/login" />}
    >
        
    </Authorized>
  );
}

export default AuthComponent;
