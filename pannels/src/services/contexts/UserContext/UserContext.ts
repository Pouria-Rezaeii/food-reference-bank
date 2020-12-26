import { createContext, Dispatch, useContext } from "react";
import { AppActions } from "./../AppActions";
import { IUserState } from "./models";
const initial: IUserState = {
  username: "",
  isAuth: true,
  rule: "",
};


export const userContext = createContext<IUserState>(initial);
export const userDispatchContext = createContext<Dispatch<AppActions>>(
  () => {}
);

export const useUserState = () => useContext(userContext);
export const useUserDispatch = () => useContext(userDispatchContext);
