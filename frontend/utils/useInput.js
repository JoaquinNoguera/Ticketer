import React, { useState, useEffect} from "react";

export default function useInput({ init, ...otherProps }) {

  const [ value, setValue ] = useState(init);

  const input = <input 
  { ...otherProps } 
  onChange={e=> {
    if(e.target.className === "warn") e.target.className="";
    setValue(e.target.value)
  }}
  />

  return [ value, input ];
}