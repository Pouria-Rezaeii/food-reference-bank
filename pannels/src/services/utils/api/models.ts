import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "../../axios/axios";

export type IReqFunction<U, T = void, Y = void> = (
  t: T,
  params: Y
) => Promise<{
  data: U;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}>;
export interface ICompnayProducts{
    id: number
    company: number
    name: string
    cost: number,
    description: string,
    category: number,
    category_title: string,
    status: "active" | "suspension",
    main_fields: string,
    more_fields: string,
    images: []
}

export interface ICompanyRes {
  id: number;
  user: number;
  username: string;
  email: string;
  mobile_number: string;
  name: string;
  manager_name: string;
  phone_number: string;
  website: string;
  address: string;
  location: [number, number];
  logo: string | null;
  category: number | null;
  category_title: string;
  description: string;
  status: "s" | "a" | "c";
  [index: string]: string | number | null | [number, number];
}

export interface ICityRes{
  id: number,
  city: string,
  province: string
}

//     fetch('http://bank.pythonanywhere.com/auth/login/', {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify({username :'admin', password :'admin'}) // body data type must match "Content-Type" header
// }).then((res)=>res.json())

// const test : IReqFunction<string> = (a ,b ) => {
//     return axiosInstance.get('dagadgadg')
// }
