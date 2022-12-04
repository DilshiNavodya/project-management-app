import React,{ Fragment } from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import { X } from "react-feather";
import ClickableDiv from 'react-clickable-div'

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onCloseModal} />;
};

const ModelOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <ClickableDiv className={styles.closebtn} onClick={props.onCloseModal}><X/></ClickableDiv>  
      </div>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

function Modal(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onCloseModal={props.onCloseModal} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModelOverlay onCloseModal={props.onCloseModal}>{props.children}</ModelOverlay>,
        portalElement
      )}
    </Fragment>
  );
}
export default Modal;
