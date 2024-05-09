"use client";
import React, { ReactNode } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import "./Modal.css";
type ModalProps = {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  children: ReactNode;
};
const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  function modalClose(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.id === "modalcontainer") {
      setModalOpen(false);
    }
  }
  return (<>
 {modalOpen&&<section
      onClick={(e) => {
        modalClose(e);
        e.stopPropagation();
      }}
      id="modalcontainer"
      className="modal-container  flex justify-center items-center pt-[10px] p-5"
    >
      <div className="modal-content w-fit  h-fit  relative flex justify-center items-center">
        <div
        onClick={()=>setModalOpen(false)}
        className="absolute top-1 right-1  font-bold  text-[25px]  rounded-full z-50">
          <RiCloseCircleFill />
        </div>
        {children}
      </div>
    </section>}
  </>
  );
};
export default Modal;
