"use client";

import { useEffect, useState } from "react";

export default function Comment({ _id }) {
  let [comment, setComment] = useState("");
  let [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/comment/list?id=" + _id).then(r => r.json())
      .then((result) => {
        console.log("result2", result);
        setData(result);
      });
  }, []);
  return (
    <div>
      <div>댓글목록</div>
      { 
           data.length > 0 ?
           data.map((a,i)=>
             <p key={i}>{a.content}</p>
           )
           : '댓글없음'
        }
      <input
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button
        onClick={() => {
          fetch("/api/comment/new", {
            method: "POST",
            body: JSON.stringify({ _id, comment }),
          });
        }}
      >
        댓글전송
      </button>
    </div>
  );
}
