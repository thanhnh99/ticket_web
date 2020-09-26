import { ROUTES_ALL } from '../configs/routes';
import { some } from '../constants';
import { PermissionType, Role, RoutesTabType } from '../models/permission';

export interface HeaderProps {
  noSticky?: boolean;
}
export function flatRoutes(list: RoutesTabType[]): RoutesTabType[] {
  let listTerm: RoutesTabType[] = [];
  list.forEach((route) => {
    if (route.subMenu) {
      listTerm = listTerm.concat(flatRoutes(route.subMenu));
    }
    if (route.hiddenMenu) {
      listTerm = listTerm.concat(flatRoutes(route.hiddenMenu));
    }
    if (route.path) {
      listTerm = listTerm.concat(route);
    }
  });
  return listTerm;
}

function getMapRelationsRoutes(list: RoutesTabType[], hashMap: some[], parent?: RoutesTabType) {
  list.forEach((route) => {
    if (route.component) {
      hashMap.push({ child: route, parent: route });
    }
    if (parent) {
      hashMap.push({ child: route, parent });
    }
    if (route.subMenu) {
      getMapRelationsRoutes(route.subMenu, hashMap, route);
    }
    if (route.hiddenMenu) {
      getMapRelationsRoutes(route.hiddenMenu, hashMap, route);
    }
  });
}
export function comparePathName(pathName: string, pathNameCompare: string) {
  if (pathNameCompare && pathName) {
    const child = pathNameCompare?.split('/');
    const path = pathName?.split('/');
    if (child.length === path.length) {
      let tmp = child;
      child.forEach((element: string, i: number) => {
        if (element.includes(':')) {
          tmp = [...tmp.slice(0, i), path[i], ...tmp.slice(i + 1)];
        }
      });
      if (tmp.join('/') === pathName) {
        return true;
      }
      return false;
    }
    return false;
  }
  return false;
}

function getParentHistoryPath(list: RoutesTabType[], hashMap: some[], pathName: string) {
  hashMap.forEach((obj: some, index: number) => {
    const isConstant = list.findIndex((one) => one?.name === obj.parent?.name);
    if (comparePathName(pathName, obj.child.path) && isConstant === -1) {
      list.push(obj.parent);
      if (!obj.parent.isModule) {
        getParentHistoryPath(list, hashMap, obj.parent?.path);
      }
    }
  });
}

function getChildHistoryPath(list: RoutesTabType[], hashMap: some[], pathName: string) {
  hashMap.forEach((obj: some, index: number) => {
    const isConstant = list.findIndex((one) => one?.name === obj.child?.name);
    if (comparePathName(pathName, obj.parent.path) && isConstant === -1) {
      list.push(obj.child);
      getChildHistoryPath(list, hashMap, obj.child?.path);
    }
  });
}

export function getListRoutesContain(list: RoutesTabType[], pathName: string): some[] {
  let listRouter: RoutesTabType[] = [];
  const hashMap: some[] = [];
  getMapRelationsRoutes(list, hashMap);
  getParentHistoryPath(listRouter, hashMap, pathName);
  listRouter = listRouter
    .filter((route: RoutesTabType) => route.disableInBreadcrumb !== true)
    .map((route: RoutesTabType, index: number) => {
      return { ...route, backStep: index };
    })
    .reverse();
  return listRouter;
}

export function getAllRoutesContain(list: RoutesTabType[], pathName: string): some[] {
  let listRouter: RoutesTabType[] = [];
  const hashMap: some[] = [];
  getMapRelationsRoutes(list, hashMap);
  getParentHistoryPath(listRouter, hashMap, pathName);
  listRouter = listRouter
    .filter((route: RoutesTabType) => route.disableInBreadcrumb !== true)
    .map((route: RoutesTabType, index: number) => {
      return { ...route, backStep: index };
    })
    .reverse();
  getChildHistoryPath(listRouter, hashMap, pathName);
  listRouter = listRouter
    .reverse()
    .filter((route: RoutesTabType) => route.disableInBreadcrumb !== true);
  return listRouter.reverse();
}

export function getCurrentRoute(pathName: string, listRouter: RoutesTabType[]) {
  const listRoutes = flatRoutes(listRouter);
  return listRoutes.find((route: RoutesTabType) => {
    const path = route.path?.split('/');
    const currentPath = pathName.split('/');

    if (path && path.length === currentPath.length) {
      let tmp = path;
      path.forEach((element: string, i: number) => {
        if (element.includes(':')) {
          tmp = [...tmp.slice(0, i), currentPath[i], ...tmp.slice(i + 1)];
        }
      });
      if (tmp.join('/') === pathName) {
        return true;
      }
    }
    return route.path === pathName;
  });
}

/* ---------------Permission--------------*/

export function hasPermission(listRole?: Role[], routePermission?: some) {
  let check = true;
  listRole &&
    routePermission &&
    listRole.forEach((role: Role) => {
      let count = 0;
      role?.role.forEach((per: PermissionType) => {
        if (routePermission?.[`${role.module}`]?.listFeature?.[`${per}`]?.isActive === true) {
          count += 1;
        }
      });
      if (count !== role?.role?.length) {
        check = false;
      }
    });
  return check;
}

export function getListRoutesActivate(listRoutes?: RoutesTabType[], routePermission?: some) {
  let list: RoutesTabType[] = [];
  if (routePermission) {
    listRoutes &&
      listRoutes.forEach((route: RoutesTabType) => {
        if (route.path) {
          if (route.listRole) {
            if (hasPermission(route.listRole, routePermission)) {
              list.push(route);
            }
          } else {
            list.push(route);
          }
        }
      });
  } else {
    list = listRoutes || [];
  }
  return list;
}

export function getCurrentRole(roles?: Role[] | string, routePermission?: some) {
  const listRouteActive = flatRoutes(ROUTES_ALL);
  if (roles && routePermission) {
    if (typeof roles === 'string') {
      const currentRoute = listRouteActive.find((v) => v.path === roles);
      return hasPermission(currentRoute?.listRole, routePermission);
    }
    return hasPermission(roles, routePermission);
  }
  return true;
}
