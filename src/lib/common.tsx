export type GenericResponseAction<D, M> = {
  type: string;
  payload: D;
  meta: M;
};
