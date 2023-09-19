export enum inputActions {
  CHANGE = "CHANGE",
  BLUR = "BLUR",
  CLEAR = "CLEAR",
}
export type InputActionsType =
  | typeof inputActions.CHANGE
  | typeof inputActions.BLUR
  | typeof inputActions.CLEAR;
