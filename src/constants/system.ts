import { transformRecordToOption } from '@/utils/common';

export const adminMenuTypeRecord: Record<Api.System.AdminMenuType, App.I18n.I18nKey> = {
  0: 'page.system.adminMenu.type.constantRoute',
  1: 'page.system.adminMenu.type.defaultRoute',
  2: 'page.system.adminMenu.type.permissionRoute'
};

export const adminMenuTypeOptions = transformRecordToOption(adminMenuTypeRecord);
