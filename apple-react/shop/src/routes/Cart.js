import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, increase } from "../store/userSlice";
import { addCount } from "../store/cartSlice";
import { memo, useMemo, useState } from "react";

// memo : 해당 컴포넌트에 전송되는 props가 변할 때만 재렌더링해줌
// props가 많은 경우 모두 비교하기 때문에, props가 많으면 오히려 성능이 떨어질 수 있음
const Child = memo(function () {    
  console.log("Child..............");
  return <div>Cart의 자식...</div>;
});

function 함수(){
  return '';
}

function Cart() {
  let user = useSelector((state) => {
    return state.user;
  });
  let cart = useSelector((state) => {
    return state.cart;
  });
  let dispatch = useDispatch();

  let [count, setCount] = useState(0);
  let result = useMemo(()=>{return 함수()})   // useMemo : 컴포넌트 렌더링시 한번만 실행
  return (
    <div>
      <Child count={count}></Child>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      {user.name} {user.age}의 장바구니
      <button
        onClick={() => {
          dispatch(changeName("park"));
        }}
      >
        이름변경
      </button>
      <button
        onClick={() => {
          dispatch(increase(1));
        }}
      >
        나이 1씩 증가
      </button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((a, i) => {
            return (
              <tr key={i}>
                <td>{i}</td>
                <td>{a.name}</td>
                <td>{a.count}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(addCount(a.id));
                    }}
                  >
                    +
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
export default Cart;
