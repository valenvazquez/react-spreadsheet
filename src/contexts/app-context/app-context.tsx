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
  isTypingFormula: false,
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
    case EActions.UPDATE_CELL_DATA:
      const { cell, ...payload } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [cell]: {
            ...state.data[cell],
            ...payload,
          },
        },
      };
    // case EActions.SET_IS_TYPING_FORMULA:
    //   return {
    //     ...state,
    //     isTypingFormula: action.payload,
    //   };
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
