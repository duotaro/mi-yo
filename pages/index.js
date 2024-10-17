import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getDatabase } from "../lib/notion.js";
import Layout from '../components/layout.js'
import saveFileIfNeeded from "../components/download/index.js"
import { ACCESABLE_IMAGE_PATH } from "../const/index.js";
export const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;

export default function Home({ list }) {

  const router = useRouter();
  const { photoId } = router.query;

  let resList = []

  for(const item of list){
    const entity = new DetailEntity(item)
    resList.push(entity)
  }

  resList = resList.concat(resList)
  resList = resList.concat(resList)
  resList = resList.concat(resList)
  resList = resList.concat(resList)

  return (
    <Layout>
      <Head>
        <title>Misaki Yota Photos</title>
        <meta
          property="og:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
        <meta
          name="twitter:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
      </Head>
      <div className="mx-auto max-w-[1960px] p-4">
        {/* {photoId && (
          <Modal
            images={list}
            onClose={() => {
              setLastViewedPhoto(photoId);
            }}
          />
        )} */}
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4" >
          <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-10 overflow-hidden rounded-lg bg-gray/10 px-6 pb-16 pt-64 text-center text-gray shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0 border shadow-xl">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span className="absolute left-0 right-0 bottom-0 h-[629px] bg-gradient-to-br from-black/0 via-black to-black "></span>
            </div>
            
            <h1 className="mt-8 mb-4 text-xl font-bold uppercase tracking-widest">
              Misaki & Yota
            </h1>
            <p className="max-w-[40ch] text-gray/75 sm:max-w-[32ch]">
              Our incredible Next.js community got together in San Francisco for
              our first ever in-person conference!
            </p>
            <div className="max-w-[40ch] text-gray/75 sm:max-w-[32ch]">
              ここにタグリストとか検索窓
            </div>
          </div>
          {resList.map((item) => (
            <Link
              key={item.id}
              href={`/?photoId=${item.id}`}
              as={`/p/${item.id}`}
              shallow
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              {item.isVideo ? (
               <video width="640" height="360" controls >
                <source src={item.image} type={item.image.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
                お使いのブラウザは動画タグをサポートしていません。
              </video>
              ) : (
                <Image
                alt={item.title}
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: "translate3d(0, 0, 0)" }}
                // placeholder="blur"
                // blurDataURL={`/og-image.png`}
                src={item.image}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
              )}
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);
  let props = []
  for(let item of database){
    props.push(item.properties)
  }


  saveFileIfNeeded(props, "detail")
  return {
    props: {
      list: database
    },
    revalidate: 1,
  };
};

class DetailEntity{
  constructor(item){
    console.log(item)
    this.active = item.properties["active"].checkbox
    this.date = item.properties["date"].date

    this.title = null
    if(item.properties["名前"] && item.properties["名前"].title[0]){
      this.title = item.properties["名前"].title[0].text.content
    }
    this.description = null
    if(item.properties["description"] && item.properties["description"].rich_text[0]){
      this.description = item.properties["description"].rich_text[0].text.content
    }
    this.image = "/image/noimage.png"
    if(item.properties["file"].files[0]){
      //const name = item.properties["image"].files[0].name

      const tmpName = item.properties["file"].files[0].name
      this.isVideo = tmpName.endsWith('.mov') || tmpName.endsWith('.mp4');
      const name = tmpName.replace(/ /g, '_')
      this.image = `/${ACCESABLE_IMAGE_PATH}/detail/${name}`

    }

    console.log(this)
  }

}
