import Head from "next/head.js";
import Link from "next/link.js";
import { getDatabase } from "../lib/notion.js";
import Layout from '../components/layout.js'
export const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;
import { GENRE_LIST } from "../const/index.js";
import AdSense from '../components/ads/ad'

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
  const tagList = getCategoryList(GENRE_LIST)

  return (
    <Layout>
      <Head>
        <title>Techvenience - トップ -</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mt-5">
        <div className="row">
          <section className="col-lg-8">
            <div className="row gx-4 gx-lg-5 row-cols-sm-2 row-cols-1 justify-content-center">
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
                            <img className="card-img-top border-bottom img-responsive" src={post.properties.Src.rich_text[0].href} alt="..." />
                            <div className="card-body p-4">
                                <div className="text-center">
                                    <h5 className="fw-bolder"><Text text={post.properties.Name.title} /></h5>
                                    <p>作成日 {createtDate} / 更新日 {lastEditDate}</p>
                                </div>
                            </div>
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div className="text-center">
                                  <a className="btn btn-outline-dark mt-auto link" href={`${post.properties.Endpoint.url}/`}>記事一覧</a>
                                </div>
                            </div>
                        </div>
                    </div>
                );
              })}
            </div>
          </section>
          {/* Side widgets*/}
          <section className="col-lg-4">
            {/* Search widget*/}
            {/* <div className="card mb-4">
                <div className="card-header bg-dark text-white">Search</div>
                <div className="card-body">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Enter search term..." aria-label="Enter search term..." aria-describedby="button-search" />
                        <button className="btn btn-primary" id="button-search" type="button">Go!</button>
                    </div>
                </div>
            </div> */}
            {/* Categories widget*/}
            <div className="card mb-4">
              <div className="card-header  bg-dark text-white">Categories</div>
              <div className="card-body">
                  <div className="row">
                      <div className="container">
                          <div className="row">
                            {tagList.map((tag) => {
                              return (
                                <div className="col-3" style={{width:'fit-content'}} key={tag.name}>
                                  <a href={tag.url} className="col bi-star-fill btn btn-outline-secondary m-1"  key={tag.name}>
                                    {tag.name}
                                  </a>
                                </div>
                              )
                            })}
                          </div>
                      </div>
                  </div>
              </div>
            </div>
            {/* Side widget*/}
            {/* <div className="card mb-4">
                <div className="card-header  bg-dark text-white">スポンサードリンク</div>
                <div className="card-body"> */}
                {/* 　<AdSense slot={'test'}/> */}
                {/* </div>
            </div> */}
          </section>
        </div>{/* .row */}
      </div>{/* .container */}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);
  database.reverse();
  return {
    props: {
      posts: database
    },
    revalidate: 1,
  };
};


const getCategoryList = (posts) => {

  let tagList = []
  let tagNameList = []
  
  posts.map((tag) => {
    if(tag.name == 'Home'){
      return false;
    }
    if(tagNameList.indexOf(tag.name) < 0){
      tagList.push(tag)
      tagNameList.push(tag.name)
    }
  })
  return tagList
}