import React, { createContext, Reducer, useContext, useReducer } from "react";
import { EActions, IAppAction } from "./actions/actions.types";
import {
  ICreateContextProps,
  IAppContextProviderProps,
  IAppContextState,
} from "./app-conext.types";

const initState: IAppContextState = {
  data: {},
  activeCell: null,
};

export const AppContext = createContext<
  ICreateContextProps<IAppContextState> | undefined
>(undefined);

const reducer: Reducer<IAppContextState, IAppAction> = (state, action) => {
  switch (action.type) {
    case EActions.SET_ACTIVE_CELL:
      return {
        ...state,
        activeCell: action.payload,
      };
    case EActions.UPDATE_CELL_VALUE:
      const { cell, value } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [cell]: value,
        },
      };
    default:
      throw new Error(`Unhandled action type in app-context`);
  }
};

export const AppContextProvider = ({ children }: IAppContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return context;
};
