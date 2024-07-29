import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Detail() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").findOne({ _id: new ObjectId("66a675b6727078c3cfa832bb") });
  console.log(result);
  return (
    <div>
      <h4>상세페이지임</h4>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
    </div>
  );
}
