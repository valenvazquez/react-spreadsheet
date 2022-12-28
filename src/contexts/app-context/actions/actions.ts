import { IActiveCell, ICellData } from "../app-conext.types";
import { EActions, IAppAction } from "./actions.types";

export const updateCellData = (
  cell: string,
  { value, formula }: Partial<ICellData>
): IAppAction => ({
  type: EActions.UPDATE_CELL_DATA,
  payload: {
    cell,
    value,
    formula,
  },
});

export const setActiveCell = (options: IActiveCell): IAppAction => ({
  type: EActions.SET_ACTIVE_CELL,
  payload: options,
});

// export const setIsTypingFormula = (isTyping: boolean): IAppAction => ({
//   type: EActions.SET_IS_TYPING_FORMULA,
//   payload: isTyping,
// });
