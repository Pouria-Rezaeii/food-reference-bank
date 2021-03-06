import React, {useCallback, useMemo} from "react";
import {CellProps, HeaderProps, useColumnOrder, useExpanded, useFilters, useFlexLayout, useGroupBy, usePagination, useResizeColumns, useRowSelect, useSortBy, useTable} from "react-table";
import useSWR from "swr";
import Button from "../../../../components/Button";
import {CircleButton} from "../../../../components/CircleButton";
import {ReactTable} from "../../../../components/Table/ReactTable";
import TableContainer from "../../../../components/Table/TableContainer";
import {useModalDispatch} from "../../../../services/contexts/ModalContext/ModalContext";
import {EModalActionTypes} from "../../../../services/contexts/ModalContext/models";
import {ICategoryRes} from "../../../../services/utils/api/Admin/models";
import {renameProp, Tree} from "../../../../services/utils/treeTravers";
import CreateCategoryModal from "./components/CategoryModal/CreateCategoryModal";
import EditCategoryModal from "./components/CategoryModal/EditCategoryModal";
import {TCategoryTableData} from "./models";
import {useQuery,useMutation,useQueryCache} from "react-query";
import {GetFetcher} from "../../../../React-Query/Categories/GetCategories/fetcher";
import {DeleteFetcher} from "../../../../React-Query/Categories/DeleteCategory/fetcher";
import { toast } from "react-toastify";
import DeleteCategoryModal from "./components/CategoryModal/DeleteCategoryModal"
const hooks = [
  useColumnOrder,
  useFilters,
  useGroupBy,
  useSortBy,
  useExpanded,
  useFlexLayout,
  usePagination,
  useResizeColumns,
  useRowSelect,
];

const Index = () => {
  const modalDispatch = useModalDispatch();
  const cache=useQueryCache();
  const {data}=useQuery("Categories",GetFetcher);
  const [mutate,{error}] = useMutation(DeleteFetcher,{
    onSuccess:()=>{
      cache.invalidateQueries("Categories")
    }
  });
  const rows = useMemo(() => {
    if (data) {
      const newData = data.map((d) => {
        return Tree.mapChangeChildrenName(renameProp, d);
      });
      return newData;
    }
    return [];
  }, [data]);

  const openEditCategoryModal = useCallback(
    (modalProps: TCategoryTableData) => {
      modalDispatch({
        type: EModalActionTypes.SHOW_MODAL,
        payload: {
          component: EditCategoryModal,
          props: {
            ...modalProps,
          },
        },
      });
    },
    [modalDispatch]
  );
  const openCreateCategoryModal = () => {
    modalDispatch({
      type: EModalActionTypes.SHOW_MODAL,
      payload: {
        component: CreateCategoryModal,
        props: {},
      },
    });
  };
  const handleCreateCategory = () => {
    openCreateCategoryModal();
  };
  const handleDeleteCategory = async (id: Pick<ICategoryRes,"id"> | number) => {
    modalDispatch({type:EModalActionTypes.SHOW_MODAL,payload:{
      component:DeleteCategoryModal,
      props:{id:id}
    }})
  };
  const handleEditCategory = useCallback(
    (data: TCategoryTableData) => {
      openEditCategoryModal(data);
    },
    [openEditCategoryModal]
  );
  const columns = React.useMemo(
    () => [
      {
        // Build our expander column
        id: "expander", // Make sure it has an ID
        accessor: "expander",
        Header: ({
          getToggleAllRowsExpandedProps,
          isAllRowsExpanded,
        }: HeaderProps<object>) => (
          <span {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? (
              <i className="fas fa-minus-square"></i>
            ) : (
              <i className="fas fa-plus-square"></i>
            )}
          </span>
        ),
        Cell: ({ row }: CellProps<object>) =>
          // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
          // to build the toggle for expanding a row
          row.canExpand ? (
            <span
              {...row.getToggleRowExpandedProps({
                style: {
                  // We can even use the row.depth property
                  // and paddingLeft to indicate the depth
                  // of the row
                  paddingRight: `${row.depth * 2}rem`,
                },
              })}
            >
              {row.isExpanded ? (
                <i className="fas fa-minus-square"></i>
              ) : (
                <i className="fas fa-plus-square"></i>
              )}
            </span>
          ) : null,
      },
      {
        // {...row.getToggleRowExpandedProps({
        //   style: { paddingRight: `${row.depth * 2} rem` },
        // })} : ''}
        Header: "?????? ???????? ????????",
        accessor: "title",
        Cell: ({
          row: { canExpand, original, ...row },
        }: CellProps<TCategoryTableData>) => {
          return (
            <span
              {...row.getToggleRowExpandedProps({
                style: { paddingRight: `${row.depth * 2}rem` },
              })}
              className={`${canExpand ? "font-bold" : ""}`}
            >
              {original.title}
            </span>
          );
        },
      },
      {
        Header: "?????? ???????? ???????? ??????",
        accessor: "parent_title",
        Cell: ({
          row: {
            original: { parent_title },
            ...row
          },
        }: CellProps<TCategoryTableData>) => {
          return (
            <span
              {...row.getToggleRowExpandedProps({
                style: { paddingRight: `${row.depth * 2}rem` },
              })}
            >
              {parent_title ? parent_title : "??????????"}
            </span>
          );
        },
      },
      {
        Header: "??????????????",
        accessor: "options",
        Cell: ({ row: { original } }: CellProps<TCategoryTableData>) => {
          const { id } = original;
          return (
            <>
              <CircleButton
                onClick={() => handleDeleteCategory(id)}
                icon="icon-trash "
                type="danger"
                className="ml-2"
              />
              <CircleButton
                onClick={() => handleEditCategory(original!)}
                icon="icon-pencil"
                type="warning"
              />
            </>
          );
        },
      },
    ],
    [handleEditCategory]
  );

  // const data = React.useMemo(() => makeData(5, 5, 5), []);
  const tableInstance = useTable<object>({ columns, data: rows }, ...hooks);

  return (
    <div>
      <div className="card">
        <div className="card-body px-4">
          <TableContainer
            {...tableInstance}
            tool={() => (
              <Button
                onClick={handleCreateCategory}
                text="?????????? ???????? ????????"
                type="info"
                className="ml-auto d-block mr-5"
              />
            )}
          >
            <ReactTable {...tableInstance} />
          </TableContainer>
        </div>
      </div>
    </div>
  );
};
{
  /* <Table<ICategory>
            entryData={getCategories()}
            columns={[
              { path: "id", label: "??????????", type: "number" },
              { path: "name", label: "????????????", type: "text" },
            ]}
            features={{
              paginating: true,
              defaultPageSize: 3,
              filtering: true,
              tableSizing: true,
              hasAction: true,
              addable: true,
              editable: true,
              deletable: true,
            }}
            toBeRenderedModal={EditCategoryModal}
          /> */
}
export default Index;
