import { request } from '../request';

/**
 * Login
 *
 * @param userName User name
 * @param password Password
 */
export function fetchLogin(userName: string, password: string) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/login',
    method: 'post',
    data: {
      userName,
      password
    }
  });
}

/** Get user info */
export function fetchGetUserInfo() {
  return request<Api.Auth.UserInfo>({ url: '/auth/profile' });
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/refresh-token',
    method: 'post',
    data: {
      refreshToken
    }
  });
}

/**
 * return custom backend error
 *
 * @param code error code
 * @param msg error message
 */
export function fetchCustomBackendError(code: string, msg: string) {
  return request({ url: '/auth/error', params: { code, msg } });
}

/**
 * Change password
 *
 * @param oldPassword 旧密码
 * @param newPassword 新密码
 * @param confirmPassword 确认密码
 */
export function fetchChangePassword(oldPassword: string, newPassword: string, confirmPassword: string) {
  return request({
    url: '/auth/password',
    method: 'put',
    data: {
      oldPassword,
      newPassword,
      confirmPassword
    }
  });
}

/**
 * GetLoginLogList
 *
 * @param params 'current' | 'size' | 'ip' | 'dateRange'
 */
export function fetchGetLoginLogList(params?: Api.Auth.LoginLogSearchParams) {
  return request<Api.Auth.LoginLogList>({
    url: '/auth/login-logs',
    method: 'get',
    params
  });
}

/**
 * GetOperationlogList
 *
 * @param params 'current' | 'size' | 'ip' | 'behavior' | 'object' | 'dateRange'
 */
export function fetchGetOperationlogList(params?: Api.Auth.OperationLogSearchParams) {
  return request<Api.Auth.OperationLogList>({
    url: '/auth/operation-logs',
    method: 'get',
    params
  });
}
