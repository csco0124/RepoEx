import { connectDB } from "@/util/database";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(요청, 응답) {
  let session = await getServerSession(요청, 응답, authOptions);
  if (session) {
    요청.body.author = session.user.email;
  }
  if (요청.method == "POST") {
    console.log("요청.body", 요청.body);
    if (요청.body.title == "") {
      return 응답.status(500).json("너 제목 왜 안씀");
    }
    try {
      const db = (await connectDB).db("forum");
      let result = await db.collection("post").insertOne(요청.body);
      return 응답.status(200).redirect("/list");
    } catch (error) {
      // DB저장시 에러
    }
  }
}
