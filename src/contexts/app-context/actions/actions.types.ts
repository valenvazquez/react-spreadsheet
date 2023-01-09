export enum EActions {
  SET_ACTIVE_CELL = "SET_ACTIVE_CELL",
}

export interface IAppAction {
  type: EActions;
  payload?: any;
}
