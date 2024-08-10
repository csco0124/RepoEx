import ComplexTree from "./exam/complex-tree/ComplexTree";
import MenuDepth from '../common/MenuDepth';
import {useState} from "react";

const ComplexTreeExam = () => {

  const [title, setTitle] = useState<string>('');

  const titleHandler = (title: string) :void => {
    setTitle(title);
  }

  return (
    <div className="content">
      <MenuDepth />
      <div className="cont-item">
        <div className="">
          <h3 className="h3-title">{title}</h3>
          <ComplexTree titleHandler={titleHandler as (title: string) => void} />
        </div>
      </div>
      <div className="container mt-4">
        <h2 className="mb-4">react-complex-tree 라이브러리 장단점 및 히스토리</h2>
        <p>
          <a href="https://rct.lukasbach.com/" target="_blank">공식문서 : https://rct.lukasbach.com/</a>
          <br /><br />
          라이브러리를 사용하기에 앞서 react-complex-tree를 구성하는 컴포넌트는 크게 2가지가 있다.
          <br /><br />
        </p>

        <h3>ControlledTreeEnvironment</h3>
        <p>
          데이터 중심의 트리 구성을 하기 위해 적합 UI 핸들링 및 데이터 조작을 각각 전부 구현해 주어야 함.
        </p>
        <br />
        <h3>UncontrolledTreeEnvironment</h3>
        <p>
          정적인 데이터로 트리를 표현하기에 적합. 트리 UI의 핸들링을 라이브러리에서 제공하는 컴포넌트로 제어.
        </p>
        <br />
        <h3>장점</h3>
        <ul>
          <li>정적인 데이터로 표현하기에는 적합하다.</li>
          <li>Darg &amp; Drop 기능, filter 기능, 트리의 노드를 클릭했을 때의 이벤트 핸들링 등을 라이브러리에서 제공한다.</li>
        </ul>
        <br />
        <h3>단점</h3>
        <ul>
          <li>데이터 중심의 트리 구성을 하기 위해 적합하지 않다. UI 핸들링 및 데이터 조작을 각각 전부 구현해 주어야 한다.</li>
          <li>react-dnd 라이브러리와 충돌이 있다. react-dnd를 사용하는 라이브러리가 있다면 충돌로 인해 complex-tree 라이브러리의 Dnd 기능을 사용할 수 없다.</li>
          <li>예제 및 레퍼런스들이 거의 UncontrolledTreeEnvironment 위주로 되어 있어 프로젝트에 사용하기에는 어려움이 있을듯 싶다.</li>
        </ul>
      </div>
    </div>
  )
}

export default ComplexTreeExam;
