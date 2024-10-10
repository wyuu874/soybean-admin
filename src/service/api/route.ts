import { request } from '../request';

/** get constant routes */
export function fetchGetConstantRoutes() {
  return request<Api.Route.MenuRoute[]>({ url: '/auth/constant-routes' });
}

/** get user routes */
export function fetchGetUserRoutes() {
  return request<Api.Route.UserRoute>({ url: '/auth/user-routes' });
}

/**
 * whether the route is exist
 *
 * @param routeName route name
 */
export function fetchIsRouteExist(routeName: string) {
  return request<boolean>({ url: '/auth/user-route-exists', params: { routeName } });
}
