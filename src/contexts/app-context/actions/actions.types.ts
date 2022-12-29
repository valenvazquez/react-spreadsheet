export enum EActions {
  UPDATE_CELL_VALUE = "UPDATE_CELL_VALUE",
  SET_ACTIVE_CELL = "SET_ACTIVE_CELL",
}

export interface IAppAction {
  type: EActions;
  payload?: any;
}
