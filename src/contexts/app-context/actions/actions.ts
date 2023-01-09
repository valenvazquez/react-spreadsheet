import { IActiveCell } from "../app-conext.types";
import { EActions, IAppAction } from "./actions.types";

export const setActiveCell = (options: IActiveCell): IAppAction => ({
  type: EActions.SET_ACTIVE_CELL,
  payload: options,
});
