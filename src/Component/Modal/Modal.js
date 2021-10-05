import React from "react";
import classes from './Modal.module.css';

const modal = (props) => {
    return(
        <div className={props.show?[classes.modal,classes.visible].join(' '):classes.modal}>
          {props.children}
        </div>
    )
}

export default modal;