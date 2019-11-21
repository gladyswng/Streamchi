import React from "react";
import ReactDOM from "react-dom";

const Modal = props => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      <div
        onClick={e => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    // If try to attach this to the body or give a direct reference to the body, the portal is going to replace all the current contnet to the body, so we should create a new div with id in html and target that div to render our modals
    document.querySelector("#modal")
  );
};

export default Modal;
