import * as _ from "lodash";
import { ICategoryRes } from "./api/Admin/models";
import { flattenToArray, notHaveChildren, Tree } from "./treeTravers";

interface  resUserData {
  user_id: number;
  username: string;
  email: string;
};

interface  resCityData  {
  id: number;
  city: string;
  province: string;
};

interface  resCategoryData{
  children:resCategoryData[]
  id: number
  parent: number
  title: string
  type: string
}

export const calculateLeafs = (data: ICategoryRes[]) => {
  if (data) {
    const notHaveChildrenArray = data.map((d) =>
      Tree.reduce(notHaveChildren, [], d)
    );
    const flattenVersion = _.flatten(notHaveChildrenArray);
    const options = flattenVersion.map((item) => ({
      value: item.id,
      label: item.title,
      // parent_title: item.parent_title,
    }));
    return options;
  }
};
export const calculateFlatten = (data: ICategoryRes[]) => {
  
  if (data) {
    const flattenTree = data.map((d) => Tree.reduce(flattenToArray, [], d));
    const flattenVersion = _.flatten(flattenTree);
    const options = flattenVersion.map((item) => ({
      value: item.id,
      label: item.title,
      // parent_title: item.parent_title,
    }));
    return options;
    // return flattenTree
  }
};

export const calculateCategoryOptions = (data: resCategoryData[]) => {
  if (data) {
  console.log(data);

    const options = data.map((item) => ({
      value: item.id,
      label: item.title,
    }));
    return options;
  }
};

export const calculateCityOptions = (data: resCityData[]) => {
  if (data) {
    const options = data.map((item) => ({
      value: item.id,
      label: item.city,
    }));
    return options;
  }
};

export const calculateUserOptions = (data: resUserData[]) => {
  if (data) {
    const options = data.map((item) => ({
      value: item.user_id,
      label: item.username,
    }));
    return options;
  }
};

interface resProvinceData {
  provinces: string[]; ///what type ?
}

export const calculateProvinceOptions = (data: resProvinceData) => {
  if (data) {
    const options = data.provinces.map((item) => ({
      value: item,
      label: item,
    }));
    return options;
  }
};
