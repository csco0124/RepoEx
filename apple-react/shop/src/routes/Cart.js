import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, increase } from "../store/userSlice";
import { addCount } from "../store/cartSlice";
function Cart() {
  let user = useSelector((state) => {
    return state.user;
  });
  let cart = useSelector((state) => {
    return state.cart;
  });
  let dispatch = useDispatch();


  return (
    <div>
      {user.name} {user.age}의 장바구니
      <button onClick={() => {dispatch(changeName('park'))}}>이름변경</button>
      <button onClick={()=>{dispatch(increase(1))}}>나이 1씩 증가</button>
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
          {cart.map((a, i)=>{
            return (
              <tr key={i}>
                <td>{i}</td>
                <td>{a.name}</td>
                <td>{a.count}</td>
                <td><button onClick={() => {dispatch(addCount(a.id))}}>+</button></td>
              </tr>
            )
          })}
          
        </tbody>
      </Table>
    </div>
  );
}
export default Cart;
