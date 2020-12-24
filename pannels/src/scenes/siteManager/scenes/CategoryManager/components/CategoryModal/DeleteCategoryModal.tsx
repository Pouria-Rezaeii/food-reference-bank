import React from 'react';
import CloseModalIcon from '../../../../../../components/CloseModalIcon';
import Button from '../../../../../../components/Button';
import { EModalActionTypes } from '../../../../../../services/contexts/ModalContext/models';
import { useModalDispatch } from '../../../../../../services/contexts/ModalContext/ModalContext';
import {useQueryCache,useMutation} from "react-query";
import {DeleteFetcher} from "../../../../../../React-Query/Categories/DeleteCategory/fetcher"
import { toast } from "react-toastify";
interface Props{
    id:any
}
const DeleteCategoryModal: React.FC<Props> = ({id}) => {
  const modalDispatch = useModalDispatch()
    const cache=useQueryCache();
  const [mutate,{error}] = useMutation(DeleteFetcher,{
    onSuccess:()=>{
      cache.invalidateQueries("Categories")
    }
  });
  const handleCloseModal = () => {
    modalDispatch({ type: EModalActionTypes.HIDE_MODAL });
  };
  const handleEnterModal = async() => {
      try{
          await mutate(id)
          toast.error("دسته بندی مورد نظر با موفقیت حذف شد.")
      }catch(err){
        toast.error("حذف دسته بندی با مشکل مواجه شد.دوباره سعی نمایید.")
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
            <h4 className="modal-title" id="myModalLabel">آیا میخواهید این دسته بندی حذف شود ؟</h4>
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

export default DeleteCategoryModal
