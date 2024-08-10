import $api from "../../../common/CommonAxios";

function TestAjax() {
  const getTestJsonData = () => {
    $api.post("/api/test/get_test_json_data", {
        username: "111",
        password: "222",
      }).then(response => { // response
        alert("length : " + response.data.length);
      }).catch(error => {   // 오류발생시 실행
        console.log("오류발생", error);
      }).then(function () {         // 항상 실행
        console.log("무조건 실행...");
      });
  };

  const getDbTestData = () => {
    $api.post("/api/test/get_db_test_data", {
      
    }).then(response => { // response
      alert("length : " + response.data.length);
    }).catch(error => {   // 오류발생시 실행
      console.log("오류발생", error);
    }).then(function () {         // 항상 실행
      console.log("무조건 실행...");
    });
  }

  return (
    <div>
      <button onClick={getTestJsonData}>Ajax 통신 테스트</button><br />
      <button onClick={getDbTestData}>DB SELECT 테스트</button>
    </div>
  );
}

export default TestAjax;