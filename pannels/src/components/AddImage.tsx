import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import PicCart from "../scenes/siteManager/scenes/CategoryManager/components/CategoryModal/PicCart";
import Button from "./Button";
import { useUserState } from "../services/contexts/UserContext/UserContext";
import { toast } from "react-toastify";
interface IProps {
  url: string;
  onSubmit: (image: File) => Promise<any>;
}
interface IFileWithPreview extends File {
  preview: any;
}
const AddImage: React.FC<IProps> = ({ onSubmit, url }) => {
  const userState = useUserState();
  const [files, setFiles] = useState<File[]>([]);
  const [showImage, setshowImage] = useState(true);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const handleRemove = (index: number) => {
    const newFiles = files.filter((item, i) => index !== i);
    setFiles(newFiles);
    console.log(newFiles);
  };
  const handleSend = async (file: File) => {
    try {
      setFiles([]);
      await onSubmit(file);
      userState.rule === "admin" || userState.rule === "adminCompany"
        ? toast.info("اسلایدر با موفقیت اضافه شد.")
        : toast.info("در خواست افزودن اسلایدر مورد نظر برای مدیریت ارسال شد.");
    } catch (e) { }
  };
  const thumbs = (files as Array<IFileWithPreview>).map((file, index) => (
    <React.Fragment key={file.size}>
      <PicCart image={file.preview} />
      <Button
        onClick={() => {
          setshowImage(false);
          handleSend(file);
        }}
        className="ml-2 "
        type="success"
        text="ارسال"
      />
      <Button onClick={() => handleRemove(index)} type="danger" text="حذف" />
    </React.Fragment>
  ));
  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      (files as Array<IFileWithPreview>).forEach((file) =>
        URL.revokeObjectURL(file.preview)
      );
    },
    [files]
  );
  return (
    <div className="col-12 col-md-6 col-lg-3" style={{ cursor: 'pointer' }}>
      <section className="container">
        <div className="row">
          {!!thumbs.length && <div className="col-12">{thumbs}</div>}{" "}
          {!thumbs.length && <div className="col-12" style={{ marginRight: "3px" }}>
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>
                تصویر مورد نظر خود را انتخاب کنید یا در این محل بکشید. فرمتهای
                jpeg و png پشتیبانی میشود
              </p>
              <span className="fa fa-plus"></span>
            </div>
          </div>}
        </div>
      </section>
    </div>
  );
};
export default AddImage;
