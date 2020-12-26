import React from 'react';
import classes from "../../assets/Spinner.module.css";
const spinner = () => (
  <div style = {{paddingTop:'150px', display:'flex', justifyContent:'center'}}><div className={classes.customSpinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
);
export default spinner;