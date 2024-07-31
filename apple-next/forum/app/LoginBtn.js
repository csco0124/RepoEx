"use client";

import { signIn, signOut } from "next-auth/react";

export default function LoginBtn({ user }) {
  console.log(user);
  return (
    <>
      {user ? (
        <button
          onClick={() => {
            signOut();
          }}
        >
          로그아웃
        </button>
      ) : (
        <button
          onClick={() => {
            signIn();
          }}
        >
          로그인
        </button>
      )}
    </>
  );
}
