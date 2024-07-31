"use client";

import { useState } from "react";

export default function Comment({_id}) {
  let [comment, setComment] = useState("");
  return (
    <div>
      <div>댓글목록</div>
      <input onChange={(e) => {setComment(e.target.value);}}/>
      <button
        onClick={() => {
          fetch("/api/comment/new", { method: "POST", body: JSON.stringify({_id, comment}) });
        }}
      >
        댓글전송
      </button>
    </div>
  );
}
