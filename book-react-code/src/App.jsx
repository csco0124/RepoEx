export const App = () => {
  const onClickButton = () => {
    alert();
  };

  return (
    <>
      {console.log("TEST")}
      <h1>aaaaaaa</h1>
      <h1>aaaaaaa</h1>
      <button onClick={onClickButton}>버튼</button>
    </>
  );
};
