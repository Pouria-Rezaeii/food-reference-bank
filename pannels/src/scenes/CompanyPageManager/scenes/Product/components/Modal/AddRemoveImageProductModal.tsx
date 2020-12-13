import React, { useState } from "react";
import AddImage from "../../../../../../components/AddImage";
import CloseModalIcon from "../../../../../../components/CloseModalIcon";
import SliderCard from "../../../../../../components/SliderCard";
import { useMutation, useQueryCache, useQuery } from "react-query";
import { axiosInstance } from "../../../../../../services/axios/axios";
import { useModalDispatch } from "../../../../../../services/contexts/ModalContext/ModalContext";
import { EModalActionTypes } from "../../../../../../services/contexts/ModalContext/models";

// bookmarked by parisa:)

const AddRemoveImageProductModal = (ProductId: number) => {
  console.log('pp', ProductId);
  
  const queryCache = useQueryCache();
  const modalDispatch = useModalDispatch();

  const handleCloseModal = () => {
    modalDispatch({ type: EModalActionTypes.HIDE_MODAL });
  };

  const getImgProductData = async () => {
    const res = await axiosInstance.get(
      `store/my_company/product_image/${ProductId}`
    );
    return res.data;
  };
  const { data } = useQuery("CompanyImgProduct", getImgProductData);
  console.log(data);

  const [sureDelete, setSureDelete] = useState(false);
  const [wantDeletedItemId, setWantDeletedItemId] = useState(-1);
  const handleSureDelete = (id: number) => {
    setSureDelete(true);
    setWantDeletedItemId(id);
  };

  const deletePRImage = async (ImgId: number) => {
    const res = await axiosInstance.delete(
      `store/my_company/product_image/${ProductId}/${ImgId}`
    );
    return res.data;
  };

  const [mutate2] = useMutation(deletePRImage, {
    onSuccess: () => {
      queryCache.invalidateQueries("CompanyImgProduct");
    },
  });

  const handleDeleteImg = async (ImgId: number) => {
    try {
      mutate2(ImgId);
    } catch (err) {}
  };

  const handleIgnoreSureDelete = () => {
    setSureDelete(false);
    setWantDeletedItemId(-1);
  };

  const sendPRImage = async (image: File) => {
    const fd = new FormData();
    fd.append("image", image);
    await axiosInstance.post(
      `store/my_company/product_image/${ProductId}/`,
      fd
    );
  };

  const [mutate1] = useMutation(sendPRImage, {
    onSuccess: () => {
      queryCache.invalidateQueries("CompanyImgProduct");
    },
  });

  const handleSendImg = (image: File) => {
    try {
      mutate1(image);
    } catch {}
    return new Promise((res) => res());
  };

  return (
    <div>
      <div className="modal-backdrop show"></div>
      <div id="myModal" className="modal show " style={{ display: "block" }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel">
                اضافه کردن محصول جدید{" "}
              </h4>
              <CloseModalIcon handleCloseModal={handleCloseModal} />
            </div>
            <div
              className="modal-body"
              style={{ minHeight: "200px", padding: "40px" }}
            >
              {/* {!data && <SliderLoaders />} */}
              {data && (
                <>
                  {data.map((item) => (
                    <div className="col-lg-3 col-md-6">
                      <SliderCard
                        {...item}
                        isSureState={
                          item.id === wantDeletedItemId && sureDelete
                        }
                        onDelete={handleDeleteImg}
                        onSureDelete={handleSureDelete}
                        onIgnoreSureDelete={handleIgnoreSureDelete}
                      />
                    </div>
                  ))}
                  <AddImage url="/" onSubmit={handleSendImg} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddRemoveImageProductModal;
