import React from "react";
import ArboristTree from "./reactArborist/ArboristTree";
import { Outlet } from "react-router-dom";

function MenuTreeDemoMain() {
  return (
    <div>
      <h4>TREE DEMO</h4>
      <ArboristTree/>
      
    </div>
  );
}

export default MenuTreeDemoMain;