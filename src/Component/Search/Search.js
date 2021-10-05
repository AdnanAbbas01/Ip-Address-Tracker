import React from "react";

import classes from './Search.module.css';

const Search = (props) => {
    return(
       <div className={classes.main}>
         <h1>IP Address Tracker</h1>
         <div className={classes.inbtn}>
         <input 
         type='text' 
         className={classes.input} 
         placeholder='Please enter the ip address'
         onChange={props.changed} />
         <button className={classes.btn}
         onClick={props.clicked}><i className="fas fa-angle-right"></i></button>
         </div>
         <div className={props.show?classes.none:classes.details}>
          <div className={classes.detailsSub}>
            <p>IP ADDRESS</p>
            <h2>{props.ipAddress}</h2>
          </div>
          <div className={classes.detailsSub}>
            <p>LOCATION</p>
            <h2>{props.country}, {props.city}</h2>
          </div>
          <div className={classes.detailsSub}>
            <p>TIMEZONE</p>
            <h2>{props.timezone}</h2>
          </div>
          <div className={[classes.detailsSub,classes.lastSub].join(' ')}>
            <p>ISP</p>
            <h2>{props.isp}</h2>
          </div>
         </div>
       </div> 
    )
}

export default Search;