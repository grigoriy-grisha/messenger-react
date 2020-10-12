import React, { useEffect } from "react";
import ReactDOM from "react-dom";
interface IProp {
  closeModal: (e: React.MouseEvent) => void;
  deleteSome: () => void;
}
const Modal: React.FC<IProp> = ({ closeModal, deleteSome }) => {
  const el: HTMLDivElement = document.createElement("div");
  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  return ReactDOM.createPortal(
    <div className="modal" onClick={closeModal}>
      <div className="parrent modal__window">
        <div className="modal__header">
          <h2 className="modal__title">Вы уверены?</h2>
          <span className="modal__close">X</span>
        </div>
        <div className="modal__buttons">
          <button className="toolbar__button canceling">Отмена</button>
          <button className="toolbar__button ma-l-10" onClick={deleteSome}>
            удалить
          </button>
        </div>
      </div>
    </div>,
    el
  );
};
export default Modal;
