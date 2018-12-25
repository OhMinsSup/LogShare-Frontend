import { baseCreators } from '../base';
import { GenericResponseAction } from 'src/lib/common';
import { History } from 'history';

export type EntireRssPayload = {
  history: History;
};
export type UserRssPayload = {
  username: string | null;
  history: History;
};
export type ProgressLodingAction = GenericResponseAction<
  {
    loding: boolean;
  },
  string
>;
export type SetWidthAction = ReturnType<typeof baseCreators.setWidth>;
export type SetCommonMenuAction = ReturnType<typeof baseCreators.setCommonMenu>;
export type SetProfileUpdateModalAction = ReturnType<
  typeof baseCreators.setProfileUpdateModal
>;
export type RssAction = GenericResponseAction<
  {
    xml: string;
  },
  string
>;
export type SetCategoryMenuAction = ReturnType<
  typeof baseCreators.setCategoryMenu
>;
