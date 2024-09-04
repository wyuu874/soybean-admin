import { request } from '../request';

/**
 * GetAdminRoleList
 *
 * @param params 'name'
 */
export function fetchGetAdminRoleList(params?: Api.System.AdminRoleSearchParams) {
  return request<Api.System.AdminRoleList>({
    url: '/admin-roles',
    method: 'get',
    params
  });
}

/**
 * AddAdminRole
 *
 * @param params 'name'
 */
export function fetchAddAdminRole(params: Pick<Api.System.AdminRole, 'name' | 'description'>) {
  return request({
    url: '/admin-roles',
    method: 'post',
    data: params
  });
}

/**
 * fetchEditAdminRole
 *
 * @param id 角色ID
 * @param params 'name'
 */
export function fetchEditAdminRole(id: number, params: Pick<Api.System.AdminRole, 'name' | 'description'>) {
  return request({
    url: `/admin-roles/${id}`,
    method: 'put',
    data: params
  });
}

/**
 * DeleteAdminRole
 *
 * @param id 角色ID
 */
export function fetchDeleteAdminRole(id: number) {
  return request({
    url: `/admin-roles/${id}`,
    method: 'delete'
  });
}

/**
 * GetAdminUserList
 *
 * @param params 'userName' | 'adminRoleId' | 'current' | 'size'
 */
export function fetchGetAdminUserList(params?: Api.System.AdminUserSearchParams) {
  return request<Api.System.AdminUserList>({
    url: '/admin-users',
    method: 'get',
    params
  });
}

/**
 * AddAdminUser
 *
 * @param params 'userName' | 'password' | 'adminRoleId'
 */
export function fetchAddAdminUser(params: Pick<Api.System.AdminUser, 'userName' | 'password' | 'adminRoleId'>) {
  return request({
    url: '/admin-users',
    method: 'post',
    data: params
  });
}

/**
 * EditAdminUser
 *
 * @param id 用户ID
 * @param params 'password' | 'adminRoleId
 */
export function fetchEditAdminUser(id: number, params: Pick<Api.System.AdminUser, 'password' | 'adminRoleId'>) {
  return request({
    url: `/admin-users/${id}`,
    method: 'put',
    data: params
  });
}

/**
 * DeleteAdminUser
 *
 * @param id 用户ID
 */
export function fetchDeleteAdminUser(id: number) {
  return request({
    url: `/admin-users/${id}`,
    method: 'delete'
  });
}

/**
 * GetAdminLoginLog
 *
 * @param params 'userName' | 'ip' | 'dateRange' | 'current' | 'size'
 */
export function fetchGetAdminLoginLog(params?: Api.System.AdminLoginLogSearchParams) {
  return request<Api.System.AdminLoginLogList>({
    url: '/login-logs',
    method: 'get',
    params
  });
}

/**
 * GetAdminOperationLog
 *
 * @param params 'userName' | 'ip' | 'dateRange' | 'behavior' | 'object' | 'current' | 'size'
 */
export function fetchGetAdminOperationLog(params?: Api.System.AdminOperationLogSearchParams) {
  return request<Api.System.AdminOperationLogList>({
    url: '/operation-logs',
    method: 'get',
    params
  });
}

/** GetAdminOperationBehaviorList */
export function fetchGetAdminOperationBehaviorList() {
  return request<Api.System.AdminOperationBehaviorList>({
    url: '/operation-behaviors',
    method: 'get'
  });
}
