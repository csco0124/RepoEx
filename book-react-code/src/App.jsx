import { useState } from "react";
import axios from "axios";

export const App = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onClickFetchUser = () => {
    setIsLoading(true);
    setIsError(false);

    axios
      .get("https://04b4f544-7554-42de-873b-3ee82d6b5e12.mock.pstmn.io/list")
      .then((result) => {
        const users = result.data.map((user) => ({
          id: user.id,
          name: `${user.lastname} ${user.firstname}`, // 성과 이름을 결합하도록 변환
          age: user.age,
        }));
        setUserList(users); // 사용자 목록 State 업데이트
      })
      .catch(() => setIsError(true)) // 에러 발생 시 에러 플래그 on
      .finally(() => setIsLoading(false)); // 처리 완료 후 로딩 플래스 off
  };

  return (
    <div>
      <button onClick={onClickFetchUser}>사용자 정보 얻기</button>
      {/* 에러 발생 시 에러 메시지 표시 */}
      {isError && <p style={{ color: "red" }}>에러가 발생했습니다</p>}
      {/* 로딩 중에는 표시 전환 */}
      {isLoading ? (
        <p>데이터를 가져오고 있습니다</p>
      ) : (
        userList.map((user) => (
          <p key={user.id}>{`${user.id}:${user.name}(${user.age}세)`}</p>
        ))
      )}
    </div>
  );
};
