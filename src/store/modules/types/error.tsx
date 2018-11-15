import { GenericResponseAction } from 'src/lib/common';

export type ErrorAction = GenericResponseAction<
  { statusText: string; status: number },
  string
>;
