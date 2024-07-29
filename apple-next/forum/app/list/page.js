import { connectDB } from "@/util/database";
import Link from "next/link";

export default async function List() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  return (
    <div className="list-bg">
      {result.map((a, i) => {
        return (
          <div className="list-item" key={i}>
            <Link href={`/detail/${a._id}`}>
              <h4>{a.title}</h4>
            </Link>
            <p>{a.content}</p>
          </div>
        );
      })}
    </div>
  );
}
