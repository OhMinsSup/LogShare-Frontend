import { GenericResponseAction } from 'src/lib/common';

export type ProgressLodingAction = GenericResponseAction<
  {
    loding: boolean;
  },
  string
>;

export type RssAction = GenericResponseAction<
  {
    xml: string;
  },
  string
>;
