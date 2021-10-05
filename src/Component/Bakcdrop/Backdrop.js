import React from "react";
import classes from './Backdrop.module.css';


const Backdrop = (props) => {
    return(
        <div className={props.show?[classes.Backdrop,classes.visible].join(' '):classes.Backdrop}
        onClick={props.clicked}>
        </div>
    )
}

export default Backdrop;