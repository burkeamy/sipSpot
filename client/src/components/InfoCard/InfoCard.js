import React from "react";

export const InfoCard = (props) => (
  <div className="card">
    <div className="card-header" style={{backgroundColor: "white"}}>
      <h5>{props.title}</h5>
    </div>
    <div className="card-body">
      {props.children}
    </div>
  </div>
);
