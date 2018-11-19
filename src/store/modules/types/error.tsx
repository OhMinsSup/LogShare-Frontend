import { GenericResponseAction } from 'src/lib/common';

export type ErrorAction = GenericResponseAction<
  { error: boolean; status: number | null },
  string
>;
