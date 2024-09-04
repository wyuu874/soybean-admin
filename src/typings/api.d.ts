/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  namespace Common {
    /** common params of paginating */
    interface PaginatingCommonParams {
      /** current page number */
      current: number;
      /** page size */
      size: number;
      /** total count */
      total: number;
    }

    /** common params of paginating query list data */
    interface PaginatingQueryRecord<T = any> extends PaginatingCommonParams {
      records: T[];
    }

    /** common search params of table */
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>;

    /**
     * enable status
     *
     * - "1": enabled
     * - "2": disabled
     */
    type EnableStatus = '1' | '2';

    /** common record */
    type CommonRecord<T = any> = {
      /** record id */
      id: number;
      /** record creator */
      createBy: string;
      /** record create time */
      createTime: string;
      /** record updater */
      updateBy: string;
      /** record update time */
      updateTime: string;
      /** record status */
      status: EnableStatus | null;
    } & T;
  }

  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    interface LoginToken {
      token: string;
      refreshToken: string;
    }

    interface UserInfo {
      userId: string;
      userName: string;
      roles: string[];
      buttons: string[];
    }

    /** login log */
    type LoginLog = Common.CommonRecord<{
      ip: string; // IP
      platform: string; // 平台
      os: string; // 操作系统
      browser: string; // 浏览器
      dateRange: string; // 登录时间范围
    }>;

    /** login log search params */
    type LoginLogSearchParams = CommonType.RecordNullable<
      Pick<Api.Auth.LoginLog, 'ip' | 'dateRange'> & Common.CommonSearchParams
    >;

    /** login log list */
    type LoginLogList = Common.PaginatingQueryRecord<LoginLog>;

    /** operation log */
    type OperationLog = Common.CommonRecord<{
      ip: string; // IP
      platform: string; // 平台
      os: string; // 操作系统
      browser: string; // 浏览器
      behavior: string; // 操作行为
      object: string; // 操作对象
      dateRange: string; // 操作时间范围
    }>;

    /** operation log search params */
    type OperationLogSearchParams = CommonType.RecordNullable<
      Pick<Api.Auth.OperationLog, 'ip' | 'behavior' | 'object' | 'dateRange'> & Common.CommonSearchParams
    >;

    /** operation log list */
    type OperationLogList = Common.PaginatingQueryRecord<OperationLog>;
  }

  /**
   * namespace Route
   *
   * backend api module: "route"
   */
  namespace Route {
    type ElegantConstRoute = import('@elegant-router/types').ElegantConstRoute;

    interface MenuRoute extends ElegantConstRoute {
      id: string;
    }

    interface UserRoute {
      routes: MenuRoute[];
      home: import('@elegant-router/types').LastLevelRouteKey;
    }
  }

  /**
   * namespace System
   *
   * backend api module: "system"
   */
  namespace System {
    /** admin role */
    type AdminRole = Common.CommonRecord<{
      name: string; // 角色名称
      description: string; // 角色描述
      isDefault: boolean; // 是否默认角色
    }>;

    /** admin role search params */
    type AdminRoleSearchParams = CommonType.RecordNullable<Pick<AdminRole, 'name'> & Common.CommonSearchParams>;

    /** admin role list */
    type AdminRoleList = Common.PaginatingQueryRecord<AdminRole>;

    /** admin user */
    type AdminUser = Common.CommonRecord<{
      userName: string; // 用户名
      password: string; // 密码
      adminRoleId: string | null; // 角色ID
      adminRoleName: string; // 角色名称
      isDefault: boolean; // 是否默认用户
    }>;

    /** admin user search params */
    type AdminUserSearchParams = CommonType.RecordNullable<
      Pick<AdminUser, 'userName' | 'adminRoleId'> & Common.CommonSearchParams
    >;

    /** admin user list */
    type AdminUserList = Common.PaginatingQueryRecord<AdminUser>;

    /** admin login log */
    type AdminLoginLog = Common.CommonRecord<{
      userName: string; // 用户名
      ip: string; // IP
      platform: string; // 平台
      os: string; // 操作系统
      browser: string; // 浏览器
      dateRange: string; // 登录时间范围
    }>;

    /** admin login log search params */
    type AdminLoginLogSearchParams = CommonType.RecordNullable<
      Pick<AdminLoginLog, 'userName' | 'ip' | 'dateRange'> & Common.CommonSearchParams
    >;

    /** admin login log list */
    type AdminLoginLogList = Common.PaginatingQueryRecord<AdminLoginLog>;

    /** admin operation log */
    type AdminOperationLog = Common.CommonRecord<{
      userName: string; // 用户名
      ip: string; // IP
      platform: string; // 平台
      os: string; // 操作系统
      browser: string; // 浏览器
      behavior: string; // 操作行为
      object: string; // 操作对象
      dateRange: string; // 操作时间范围
    }>;

    /** admin operation log search params */
    type AdminOperationLogSearchParams = CommonType.RecordNullable<
      Pick<AdminOperationLog, 'userName' | 'ip' | 'behavior' | 'object' | 'dateRange'> & Common.CommonSearchParams
    >;

    /** admin operation log list */
    type AdminOperationLogList = Common.PaginatingQueryRecord<AdminOperationLog>;
  }
}
