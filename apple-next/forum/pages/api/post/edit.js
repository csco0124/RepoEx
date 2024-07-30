import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {
  if (요청.method == "POST") {
    console.log("요청.body", 요청.body);
    if (요청.body.title == "") {
      return 응답.status(500).json("너 제목 왜 안씀");
    }
    try {
      let changeObj = { title: 요청.body.title, content: 요청.body.content };
      const db = (await connectDB).db("forum");
      let result = await db
        .collection("post")
        .updateOne({ _id: new ObjectId("" + 요청.body._id) }, { $set: changeObj });
      return 응답.status(200).redirect("/list");
    } catch (error) {
      // DB저장시 에러
    }
  }
}
