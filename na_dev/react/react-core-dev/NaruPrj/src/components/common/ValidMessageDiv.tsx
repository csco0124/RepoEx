import React from "react";

const ValidMessageDiv = ({children, validType, message} : any) => {
  return (
    <div className={`form-input ${validType}`}>
      {children}
      {message &&  (<p className="message">{message || 'message is a required field'}</p>)}
    </div>
  )
}

export default ValidMessageDiv;