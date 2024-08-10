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
            - react-dnd-treeview 장점
            <br />
            <hr />
            <div>
                <div>
                    1. 트리 node를 개발자가 커스터마이징 할 수 있습니다. (트리 내부의 node를 사용자 정의 컴포넌트로 사용이 가능합니다.) <br />
                    2. 드래그 앤 드롭 기능이 내장되어 있습니다. (복잡한 트리 구조에 대한 계산을 라이브러리가 대신 계산해서 랜더링 합니다. 별도의 재귀함수를 만들지 않아도 됩니다.) <br />
                    3. 예제가 다양하여 여러가지 응용이 가능합니다. (전부 펼치기,접기, node추가하기, node꾸미기, 검색하기 등 여러가지 예제를 참고해서 기능을 구현할 수 있습니다.) <br />
                </div>
            </div>
            <br />
            - react-dnd-treeview 단점
            <br />
            <hr />
            <div>
                <div>
                    1. 드래그 자체를 처리하는 로직은 모듈안에 있어서 드래그 시작과 끝에서만 사용자가 작업할 수 있습니다. (드래그 도중에 이벤트 처리 불가) <br />
                    2. 랜더링 자체는 같은 컴포넌트를 반복해서 만들지만 결과물은 ul 안에 li안에 ul이 들어간 부모 자식 형태로 랜더링 됩니다. <br />
                        (계층이 깊어지면 부모 선택시 자식에 조건부 랜더링을 하는 로직이 복잡해집니다.) <br />
                    3. 라이브러리는 이론상으로 depth가 무한대로 늘어나지만 특정 depth까지만 사용할 수 있게 사용자가 컨트롤하는 방법에 제약이 많습니다. <br />
                        (1번의 단점때문에 드래그 도중에 유효성 검사를 할 수가없어서 드롭 직후에 따로 유효성검증 로직을 사용해야 하는 불편함이 있습니다.) <br />
                    4. 내장된 React-dnd 모듈의 경우 이 모듈 이외의 다른 dnd 라이브러리와 충돌이 날 가능성이 높아 동시에 사용이 불가능합니다. 
                    (같은 React-dnd 모듈끼리는 provider로 감싸면 동작하는데 문제가없으나 몇 몇 다른 라이브러리의 dnd기능이 동작하지않는 현상이 있습니다.)
                </div>
            </div>
        </div>
    )
}

export default AdminMenuMgt;
export { ChildContext };

