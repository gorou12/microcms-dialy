import Link from "next/link";
import { client } from "@/libs/microcms";

type Props = {
  id: string;
  title: string;
};

async function getBlogPosts(): Promise<Props[]> {
  const data = await client.get({
    endpoint: 'blog',
    queries: {
      fields: 'id,title',
      limit: 5,
    },
  });
  return data.contents;
}

export default async function Home() {
  const posts = await getBlogPosts();
  
  return (
    <article>
      <h1 className="text-3xl font-bold">ブログ記事一覧</h1>
      <div className="grid gap-6">
        {posts.map((post)=>(
          <div key={post.id} className="card-title">
            <Link href={`/blog/${post.id}`}>
              {post.title}
            </Link>
          </div>
        ))}
      </div>
    </article>
  );
}
