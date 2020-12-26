import React from 'react';
import CloseModalIcon from '../../../../components/CloseModalIcon';
import Button from '../../../../components/Button';
import { EModalActionTypes } from '../../../../services/contexts/ModalContext/models';
import { useModalDispatch } from '../../../../services/contexts/ModalContext/ModalContext';
import {useQueryCache,useMutation} from "react-query";
import {EditFetcher} from "../../../../React-Query/Companies/EditCompany/fetcher"
import { toast } from "react-toastify";
interface Props{
    id:any,
    status:any
}
const CompanyListModal: React.FC<Props> = ({id,status}) => {
  const modalDispatch = useModalDispatch()
    console.log(id,status);
    const cache=useQueryCache();
    const [mutate] = useMutation(EditFetcher,{
      onSuccess:()=>{
        cache.invalidateQueries("CompaniesList")
      }
    });
const statusName=status==="a" ? "غیر فعال": "معلق"
  const handleCloseModal = () => {
    modalDispatch({ type: EModalActionTypes.HIDE_MODAL });
  };
  const handleEnterModal = async() => {
      try{
          if(status==="a"){
              await mutate({id:id!,status: "s"})
              toast.success("وضعیت شرکت غیرفعال شد");
          }
          if(status==="s"){
              await mutate({id:id!,status: "a"})
              toast.success("وضعیت شرکت فعال شد");
          }

      }catch(err){
        toast.error("تغییر وضعیت شرکت صورت نپذیرفت");
      }
        handleCloseModal()
  };
  return (
    <div>
      <div className="modal-backdrop show"></div>
      <div
        id="myModal"
        className="modal show "
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
            <h4 className="modal-title" id="myModalLabel">آیا میخواهید وضعیت شرکت {statusName} شود؟</h4>
              <CloseModalIcon handleCloseModal={handleCloseModal} />
            </div>
            <div className="modal-footer" style={{justifyContent:"space-around" }}>
              <Button onClick={handleEnterModal} type="success" text="بله" />
              <Button onClick={handleCloseModal} type="danger" text="خیر" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyListModal
