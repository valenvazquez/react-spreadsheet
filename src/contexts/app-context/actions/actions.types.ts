export enum EActions {
  UPDATE_CELL_DATA = "UPDATE_CELL_DATA",
  SET_ACTIVE_CELL = "SET_ACTIVE_CELL",
  // SET_IS_TYPING_FORMULA = "SET_IS_TYPING_FORMULA",
}

export interface IAppAction {
  type: EActions;
  payload?: any;
}
