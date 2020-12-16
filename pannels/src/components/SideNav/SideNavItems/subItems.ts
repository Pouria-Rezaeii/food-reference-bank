import { IMenuItem } from "../types";

const adminDashboardItems: IMenuItem[] = [
  {
    path: "/dashboard/create-company",
    title: "ثبت شرکت",
    toHavePermissions: ["company:create"],
  },
  {
    path: "/dashboard/edit-company",
    title: "ویرایش شرکت",
    toHavePermissions: ["company:edit"],
  },
  {
	  path:"/dashboard/companies-list",
	  title : 'لیست شرکت‌ها',
	  toHavePermissions :["company:companylist"]
  },
  {
    path:"/dashboard/create-userCompany",
    title:"ثبت شرکت",
    toHavePermissions:["companyByUser:create"]
  }

  // {
  //   path: "/felan",
  //   title: "Analytical",
  //   toHavePermissions: [],
  // },
  // {
  //   path: "/bisar",
  //   title: "Demographical",
  //   toHavePermissions: [],
  // },
  // {
  //   path: "/felanbisar",
  //   title: "Modern",
  //   toHavePermissions: [],
  // },
];

const siteManagementItems: IMenuItem[] = [
  {
    path: "/site-manager/slider",
    title: "اسلایدر اصلی",
    toHavePermissions: ["main-site:edit"],
  },
  {
    path: "/site-manager/category-manager",
    title: "دسته بندی‌ها",
    toHavePermissions: ["main-site:edit"],
  },
];

const companyPageManageitems : IMenuItem[] =[
	{
		path : "/company-page-manager/slider" ,
		title : "اسلایدر شرکت",
		toHavePermissions :["company:manage-site"]
  },
  {
		path : "/company-page-manager/products" ,
		title : "محصولات شرکت",
		toHavePermissions :["company:products"]
	}
]

export { adminDashboardItems, siteManagementItems , companyPageManageitems };
