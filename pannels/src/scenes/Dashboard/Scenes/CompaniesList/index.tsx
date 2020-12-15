import React, { useCallback, useEffect, useState } from "react";
import {
  CellProps,
  useColumnOrder,
  useExpanded,
  useFilters,
  useFlexLayout,
  useGroupBy,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { toast } from "react-toastify";
import { ReactTable } from "../../../../components/Table/ReactTable";
import TableContainer from "../../../../components/Table/TableContainer";
import { ICompanyRes } from "../../../../services/utils/api/models";
import { TCompanyTableData } from "./components/models";
import { useQuery } from "react-query";
import { GetFetcher } from "../../../../React-Query/Companies/GetCompanies/fetcher";
import CompanyListModal from "./CompanyListModal";
import {useModalDispatch} from "../../../../services/contexts/ModalContext/ModalContext"
import {EModalActionTypes} from "../../../../services/contexts/ModalContext/models"
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
  const { data } = useQuery("CompaniesList", GetFetcher);
  const modalDispatch=useModalDispatch()
  // const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(-1);
  const handleStatusClick = useCallback(
    async (original: TCompanyTableData) => {
      setClicked(original.identifier!);
      // setLoading(true);
      modalDispatch({type:EModalActionTypes.SHOW_MODAL,payload:{
        component:CompanyListModal,
        props:{id:original.id!,status:original.status}
      }})

    },
    []
  );
  const columns = React.useMemo(
    () => [
      {
        Header: "شماره",
        accessor: "identifier",
      },
      {
        Header: "نام شرکت",
        accessor: "name",
      },
      {
        Header: "مدیر شرکت",
        accessor: "manager_name",
      },
      {
        Header: "شماره تلفن",
        accessor: "phone_number",
      },
      {
        Header: "ایمیل",
        accessor: "email",
      },

      {
        Header: "وضعیت",
        accessor: "status",
        Cell: ({ row: { original } }: CellProps<TCompanyTableData>) => {
          const buttonText = original.status === "s" ? "معلق" : "فعال";
          const buttonClass = original.status === "s" ? "red" : "#00aa00";
          return (
            <div
              style={{
                width: "50px",
                height: "30px",
                borderRadius: "100px",
                backgroundColor: buttonClass,
                display: "flex",
                alignItems: "center",
                justifyContent:
                  original.status === "s" ? "flex-end" : "flex-start",
                padding: "2px",
                boxShadow: "1px 1px 8px #888888",
                cursor:"pointer"
              }}
              onClick={() => handleStatusClick(original)}
            >
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  transition: "all 5s",
                }}
              ></div>
            </div>
            // <Button   {loading ? <Spinner /> : text}
            //   loading={clicked === original.identifier! && loading}
            //   onClick={() => handleStatusClick(original)}
            //   text={buttonText}
            //   type={buttonClass}
            // />
          );
        },
      },
    ],
    [clicked, handleStatusClick]
  );
  const [companies, setCompanies] = useState<TCompanyTableData[]>([]);
  useEffect(() => {
    if (data) {
      const tableData = (data as ICompanyRes[]).map((item, index) => {
        const itemEntrie = Object.entries(item).map(([key, value]) => {
          if (!value) return [key, "ندارد"];
          return [key, value];
        });
        return {
          identifier: index + 1,
          ...Object.fromEntries(itemEntrie),
        };
      });
      setCompanies(tableData);
    }
  }, [data]);

  const tableInstance = useTable<TCompanyTableData>(
    {
      columns,
      data: companies,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    ...hooks
  );

  return (
    <>
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-body">
            <h4 className="card-title">لیست شرکت‌ها</h4>
            <h5 className="card-subtitle">
              در اینجا میتوانید لیست شرکت‌ها را مشاهده کنید
            </h5>
            <TableContainer<TCompanyTableData> {...tableInstance}>
              <ReactTable<TCompanyTableData> {...tableInstance} />
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
};
export default Index;
