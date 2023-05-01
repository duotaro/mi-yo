import Head from "next/head.js";
import Link from "next/link.js";
import { getDatabase } from "../lib/notion.js";
import Layout from '../components/layout.js'
export const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;

export const Text = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        className={[
          bold ? styles.bold : "",
          code ? styles.code : "",
          italic ? styles.italic : "",
          strikethrough ? styles.strikethrough : "",
          underline ? styles.underline : "",
        ].join(" ")}
        style={color !== "default" ? { color } : {}}
        key={text.content}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    );
  });
};

export default function Home({ posts }) {
  console.log(posts[0].properties.Src.rich_text[0].href)
  console.log(posts[0].properties.Endpoint)
  console.log(posts[0].properties.Dispaly)

  return (
    <Layout>
      <Head>
        <title>Techvenience - トップ -</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {posts.map((post) => {
                      if(!post.properties.Dispaly.checkbox){
                        return
                      }
                      const createtDate = new Date(post.created_time).toLocaleString(
                        "ja",
                        {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        }
                      );
                      const lastEditDate = new Date(post.last_edited_time).toLocaleString(
                        "ja",
                        {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        }
                      );
                      return (
                          <div className="col mb-5" key={post.id}>
                              <div className="card h-100">
                                  <img className="card-img-top border-bottom" src={post.properties.Src.rich_text[0].href} alt="..." />
                                  <div className="card-body p-4">
                                      <div className="text-center">
                                          <h5 className="fw-bolder"><Text text={post.properties.Name.title} /></h5>
                                          <p>作成日 {createtDate} / 更新日 {lastEditDate}</p>
                                      </div>
                                  </div>
                                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                      <div className="text-center">
                                        <a className="btn btn-outline-dark mt-auto link"  href={`${post.properties.Endpoint.url}/`}>記事一覧</a>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      );
                    })}
                </div>
            </div>
        </section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database
    },
    revalidate: 1,
  };
};
