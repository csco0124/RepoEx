import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Edit(props) {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").findOne({ _id: new ObjectId("" + props.params.id) });
  console.log(result);

  return (
    <div className="p-20">
      <h4>수정페이지</h4>
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="글제목" value={result.title} />
        <input name="content" placeholder="글내용" value={result.content} />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
