
import { IRoute } from "../../routes";
import { lazy } from "react";

const Slider = lazy(() => import("./Slider"));
const Product = lazy(() => import("./Product"));
export const companyPageManagerRoutes: IRoute[] = [
  {
    path: "/company-page-manager/slider",
    component: Slider,
  },
  {
    path: "/company-page-manager/products",
    component: Product,
  },
];
