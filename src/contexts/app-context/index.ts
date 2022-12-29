export type {
  IActiveCell,
  IAppContextProviderProps,
  IAppContextState,
} from "./app-conext.types";
export { AppContext, AppContextProvider, useAppContext } from "./app-context";
export type { EActions, IAppAction } from "./actions/actions.types";
export { setActiveCell, updateCellValue } from "./actions/actions";
