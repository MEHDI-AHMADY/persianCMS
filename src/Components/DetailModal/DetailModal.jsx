import React , { useEffect } from "react";
import "./DetailModal.css";
import { IoClose } from "react-icons/io5";

export default function DetailModal({ onHide , children }) {

    useEffect(() => {
        const checkKey = (e) => {
           if(e.keyCode === 27) {
            onHide()
           }
        }

        window.addEventListener('keydown' , checkKey)

        return () => window.removeEventListener('keydown' , checkKey)
    })

  return (
    <div className="modal-parent active">
      <div className="details-modal">
      <IoClose className="shared-close__icon" onClick={onHide}/>
        {children}
      </div>
    </div> 
  );
}
