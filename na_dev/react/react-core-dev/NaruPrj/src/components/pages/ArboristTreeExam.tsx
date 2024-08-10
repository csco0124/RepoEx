import Side from "../layout/Side";
import MenuDepth from '../common/MenuDepth';
import {useState} from "react";

const ArboristTreeExam = () => {

  // const [title, setTitle] = useState<string>('');

  // const titleHandler = (title: string) :void => {
  //   setTitle(title);
  // }

  return (
    <div className="content">
      <MenuDepth />
      <div className="cont-item">
        <div className="">
          <h3 className="h3-title">{/* {title} */}</h3>
          <Side></Side>
        </div>
      </div>
      <div className="container mt-4">
        <h2 className="mb-4">React-Arborist 라이브러리 장단점 및 히스토리</h2>
        <p>
          <a href="https://github.com/brimdata/react-arborist" target="_blank">관련 Git 주소: https://github.com/brimdata/react-arborist</a>
          <br /><br />
        </p>
        <h3>장점</h3>
        <ul>
          <li>- 상호작용성</li>
          <li>클릭, 드래그 앤 드롭, 확대/축소 등 다양한 사용자 상호작용을 처리하기 위한 이벤트 시스템을 제공합니다. 이를 통해 사용자와의 인터랙션을 효과적으로 구현할 수 있습니다.</li>
        </ul>
        <br />
        <h3>단점</h3>
        <ul>
          <li>- 커스터 마이징의 제한</li>
          <li>React Arborist는 이미 정의된 트리 컴포넌트 구조를 따라야 하기 때문에 일부 특수한 요구사항이나 커스텀 UI 디자인을 구현하기에 제한이 있을 수 있습니다.</li>
        </ul>
      </div>
    </div>
  )
}

export default ArboristTreeExam;
