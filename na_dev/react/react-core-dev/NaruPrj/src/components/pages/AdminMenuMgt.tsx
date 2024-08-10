import React, { useState, createContext, useRef } from "react";
import TreeView from "./exam/menu-tree/TreeView"
import MenuDepth from "../common/MenuDepth";

const ChildContext = createContext<{ show: boolean; setShow: React.Dispatch<React.SetStateAction<boolean>> }>({
    show: false,
    setShow: () => {},
});
const AdminMenuMgt = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const childRef = useRef<{ setDummyData: () => void }>(null);
    const contextValue = {
        show,
        setShow,
    };

    const handleSet = () => {
        if (childRef.current) {
            childRef.current.setDummyData();
          }
    }

    return (
        <div className="content">
            <MenuDepth />
            <div className="cont-item pd0">
                <ChildContext.Provider value={contextValue}>
                    <TreeView ref={childRef}/>
                </ChildContext.Provider>
            </div>
            <div className="btn-area one">
                <button className="btn btn-lg btn-primary" onClick={handleSet}>저장하기</button>
            </div>
        </div>
    )
}

export default AdminMenuMgt;
export { ChildContext };
