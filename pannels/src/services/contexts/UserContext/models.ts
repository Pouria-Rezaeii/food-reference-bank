export interface IUserState {
  username: string;
  isAuth: boolean;
  rule: "user" | "company" | "admin" | "adminCompany" | "";
}
//-----------user acitions------------------
export enum EUserActionTypes {
  LOGIN,
  LOGOUT,
}
interface ILoginAction {
  type: EUserActionTypes.LOGIN;
  payload: IUserState;
}
interface ILogoutAction {
  type: EUserActionTypes.LOGOUT;
}

export type UserActions = ILoginAction | ILogoutAction;
