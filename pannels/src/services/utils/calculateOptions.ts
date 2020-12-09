import * as _ from "lodash";
import { ICategoryRes } from "./api/Admin/models";
import { flattenToArray, notHaveChildren, Tree } from "./treeTravers";

type resUserData = {
  id: number;
  username: string;
  email: string;
};

type resCityData = {
  id: number;
  city: string;
  province: string;
};
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
  console.log(data);
  
  if (data) {
    const options = data.map((item) => ({
      value: item.id,
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
