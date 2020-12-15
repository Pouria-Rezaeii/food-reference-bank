export interface IAdminCreateCompanyFormikState {
    address: string;
    category:number;
    category_title:string;
    city :string, 
    description:string
    email:string;
    location:string;
    logo:string
    manager_name:string
    name: string;
    phone_number: string;
    postal_code :number, 
    username: string;
    website:string;
    user:number;
  }

  export interface IUserCreateCompanyFormikState{
    // user:string|undefined, 
    name:string,
    manager_name:string,
    phone_number:string,
    website:string,
    address:string,
    location:string,
    logo:string,
    category_title:string,
    description:string,
    city:string,
    postal_code:number, 
  }
  // export interface ICompanyikState {
  //   name: string;
  //   phone_number: string;
  //   company_number: string;
  //   zip_code: string;
  // }
  export interface ICalanderDate {
    year: number;
    month: number;
    day: number;
  }
  