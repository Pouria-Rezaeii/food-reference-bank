import { IRoute } from "../../routes";
import { lazy } from "react";
import CompaniesList from "./CompaniesList";

const Apps = lazy(() => import("./Apps"));
const CreateCompany = lazy(() => import("./CreateCompany"));
const EditCompany = lazy(() => import("./EditCompany"));
export const dashboardRoutes: IRoute[] = [
  {
    path: "/dashboard/apps",
    component: Apps,
  },
  {
    path: "/dashboard/create-company",
    component: CreateCompany,
    private: true,
    toHavePermissions: ["company:create"],
  },
  {
    path: "/dashboard/edit-company",
    component: EditCompany,
    private: true,
    toHavePermissions: ["company:edit"],
  },
  {
	  path:"/dashboard/companies-list",
	  component:CompaniesList,
	  private:true,
	  toHavePermissions : ['company:companylist']
  }
];
