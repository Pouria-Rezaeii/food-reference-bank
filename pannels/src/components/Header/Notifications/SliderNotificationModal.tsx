import React, { useState } from "react";
import CloseModalIcon from "../../CloseModalIcon";
import Button from "../../Button";
import { EModalActionTypes } from "../../../services/contexts/ModalContext/models";
import { useModalDispatch } from "../../../services/contexts/ModalContext/ModalContext";
import { baseAdminUrl } from "../../../services/utils/api/Admin";
import { useMutation } from "react-query";
import { axiosInstance as axios } from "../../../services/axios/axios";
import { useQueryCache } from "react-query";

// bookmarked by pouria

interface IProps {
  notify: any;
}

interface IChoice {
  status: string;
  description_admin: string;
}

const SliderNotificationModal: React.FC<IProps> = ({ notify }) => {
  const [description, setDescription] = useState<string>("");
  const modalDispatch = useModalDispatch();
  const queryCache = useQueryCache();

  const handleCloseModal = () => {
    modalDispatch({ type: EModalActionTypes.HIDE_MODAL });
  };

  const sendData = async (choice: IChoice) => {
    const res = await axios.patch(
      `${baseAdminUrl}/company_slider/${notify.id}/`,
      choice
    );
    return res.data;
  };

  const [mutate] = useMutation(sendData, {
    onSuccess: () => {
      queryCache.invalidateQueries("companySliderImage");
      queryCache.invalidateQueries("Companysliders");
      modalDispatch({ type: EModalActionTypes.HIDE_MODAL });
    },
  });

  const sumbitChoiceHandle = (status: string) => {
    const choice = { status: status, description_admin: description };
    try {
      mutate(choice);
    } catch {}
  };

  return (
    <div>
      <div className="modal-backdrop show"></div>
      <div id="myModal" className="modal show " style={{ display: "block" }}>
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel">
                درخواست تغییر عکس اسلایدر
              </h4>
              <CloseModalIcon handleCloseModal={handleCloseModal} />
            </div>
            <div
              className="modal-body"
              style={{ minHeight: "200px", paddingBottom: "30px" }}
            >
              <div className="notifInfo">
                <p>نام شرکت : {notify.name} </p>
                <p>نام مدیر شرکت : {notify.manager_name} </p>
                <p>عنوان دسته بندی : {notify.category_title} </p>
                <p>شهر : {notify.city} </p>
                <p>تلفن : {notify.phone} </p>
              </div>
              <div style={{ background: notify.image }}>
                <img
                  src={notify.image}
                  style={{ width: "100%", marginBottom: "30px" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "25px",
                }}
              >
                <textarea
                  style={{ width: "80%", padding: "5px 15px" }}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  placeholder="این پیام برای شرکت مورد نظر نمایش داده خواهد شد..."
                ></textarea>
              </div>
              <div
                className="notidControls"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                <Button
                  type="success"
                  text="تایید"
                  onClick={() => sumbitChoiceHandle("a")}
                />
                <Button
                  type="danger"
                  text="رد"
                  onClick={() => sumbitChoiceHandle("r")}
                />
              </div>
            </div>
            <div className="modal-footer">
              <Button onClick={handleCloseModal} type="danger" text="بستن" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderNotificationModal;
