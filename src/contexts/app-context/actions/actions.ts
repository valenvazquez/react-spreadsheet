import { IActiveCell } from "../app-conext.types";
import { EActions, IAppAction } from "./actions.types";

export const updateCellValue = (cell: string, value: string): IAppAction => ({
  type: EActions.UPDATE_CELL_VALUE,
  payload: {
    cell,
    value,
  },
});

export const setActiveCell = (options: IActiveCell): IAppAction => ({
  type: EActions.SET_ACTIVE_CELL,
  payload: options,
});
