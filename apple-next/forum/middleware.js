import { NextResponse } from "next/server";

// 미들웨어 (스프링 인터셉터 같은 부분)
// export default가 아님
export async function middleware(request) {
  /*
  console.log(request.nextUrl);
  console.log(request.coolies);
  console.log(request.headers);

  NextResponse.next(); // 통과
  NextResponse.redirect(...); // 다른 페이지로 강제 이동 (주소창도 변경)
  NextResponse.rewrite(...); // 다른 페이지로 강제 이동 (주소창은 유지)
  */

  // /list 페이지 접속기록 사용자 몰래 저장하기
  if (request.nextUrl.pathname.startsWith("/list")){   // /list 로 시작하는 url인 경우
    console.log(request.headers.get("sec-ch-ua-platform"))
    NextResponse.next();
  }

}
