import { transformRecordToOption } from '@/utils/common';

export const yesOrNoRecord: Record<CommonType.YesOrNo, App.I18n.I18nKey> = {
  Y: 'common.yesOrNo.yes',
  N: 'common.yesOrNo.no'
};

export const yesOrNoOptions = transformRecordToOption(yesOrNoRecord);

export const enableStatusRecord: Record<CommonType.EnableStatus, App.I18n.I18nKey> = {
  1: 'common.enableStatus.enabled',
  2: 'common.enableStatus.disabled'
};

export const enableStatusOptions = transformRecordToOption(enableStatusRecord);
