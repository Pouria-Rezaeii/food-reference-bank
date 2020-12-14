import { AppActions } from "./../AppActions";
import { IUserState } from "./models";
import React from "react";
import { EUserActionTypes } from "./models";
export const userReducer: React.Reducer<IUserState, AppActions> = (
  userState,
  action
) => {
  switch (action.type) {
    case EUserActionTypes.LOGIN:console.log("asasas");
    
      return { ...action.payload, isAuth: true };
    case EUserActionTypes.LOGOUT:
      return { isAuth: false } as IUserState;
    default:
      return { ...userState };
  }
};
