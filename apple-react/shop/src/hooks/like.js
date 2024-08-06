import { useState } from "react";

export function useLike() {   // custom hook 사용시에는 함수이름은 무조건 use 로 시작
  let [like, setLike] = useState(0);
  function addLike() {
    setLike((a) => a + 1);
  }

  return [like, addLike];
}
