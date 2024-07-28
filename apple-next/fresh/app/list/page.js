export default function List() {
  let 상품 = ["Tomatoes", "Pasta", "Coconut"];
  return (
    <div>
      <h4 className="title">상품목록</h4>
      {상품.map((a, i) => {
        console.log(a, i);
        return (
          <div className="food" key={i}>
            <img src="" />
            <h4>{a} $40</h4>
          </div>
        );
      })}
    </div>
  );
}
