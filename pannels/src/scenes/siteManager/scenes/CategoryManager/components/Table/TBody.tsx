import React, { useState, PropsWithChildren } from "react";
import { ICategory, IDefaultItem, column, features, pageAction } from "./model";

interface IProps<T extends IDefaultItem> {
  data: T[];
  columns: column[];
  startPage: number;
  pageAction: pageAction<T>;
  setPageAction: any;
  features: features;
  onEdit: any;
  onSave: any;
  onDelete: any;
  onCancel: any;
  inputErrors: any;
}
const TBody = <T extends IDefaultItem>({
  data,
  columns,
  startPage,
  pageAction,
  setPageAction,
  features,
  onEdit,
  onSave,
  onDelete,
  onCancel,
  inputErrors,
}: PropsWithChildren<IProps<T>>) => {
  const handleChange = (
    e: React.FormEvent<HTMLInputElement>,
    item: T,
    column: column
  ) => {
    const editedItem = { ...item, [column.path]: e.currentTarget.value };
    setPageAction({ status: pageAction.status, element: editedItem });
  };

  return (
    <tbody>
      {data.map((item, index) => (
        <tr key={item.id}>
          <th key={index + 1} scope="row">
            {startPage + index + 1}
          </th>
          {columns.map((column) => (
            <td key={`r${item.id}d${column.path}`}>
              {pageAction.status && (pageAction.element as T).id === item.id ? (
                <input
                  className={
                    inputErrors[column.path]
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  value={(pageAction.element as T)[column.path] as string}
                  onChange={(e) => handleChange(e, item, column)}
                  type={column.type}
                />
              ) : (
                item[column.path]
              )}
            </td>
          ))}
          {features.hasAction && (
            <td className="text-center" key={`r${item.id}dACTION`}>
              {(features.editable || features.addable) &&
                pageAction.status &&
                (pageAction.element as T).id === item.id && (
                  <i
                    className="icon-check text-success"
                    onClick={() => onSave(item)}
                  />
                )}

              {(features.editable || features.addable) &&
                pageAction.status &&
                (pageAction.element as T).id === item.id && (
                  <i
                    className="icon-cross2 text-danger"
                    onClick={() => onCancel(item)}
                  />
                )}
              {features.deletable &&
                !(
                  pageAction.status && (pageAction.element as T).id === item.id
                ) && (
                  <i
                    className="icon-trash text-danger"
                    style={{marginRight:"10px"}}
                    aria-hidden="true"
                    onClick={() => onDelete(item)}
                  />
                )}
              {features.editable &&
                !(
                  pageAction.status && (pageAction.element as T).id === item.id
                ) && (
                  <i
                    className="  icon-pencil text-info"
                    aria-hidden="true"
                    onClick={() => onEdit(item)}
                  />
                )}
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};
export default TBody;
