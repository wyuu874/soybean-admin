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
