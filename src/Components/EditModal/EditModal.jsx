import React, { useEffect } from "react";
import "./EditModal.css";
import { IoClose } from "react-icons/io5";

export default function EditModal({ children, onClose, onSubmit }) {
  useEffect(() => {
    const checkKey = (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };

    window.addEventListener("keydown", checkKey);

    return () => window.removeEventListener("keydown", checkKey);
  });

  return (
    <div className="modal-parent active">
      <form className="edit-modal-form">
      <IoClose className="shared-close__icon" onClick={onClose}/>
        
        <h1>اطلاعات جدید را وارد نمایید</h1>

        {children}

        <button className="edit-form-submit" onClick={onSubmit}>ثبت اطلاعات جدید</button>
      </form>
    </div>
  );
}
