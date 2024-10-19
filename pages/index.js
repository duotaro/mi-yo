import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getDatabase } from "../lib/notion.js";
import Layout from '../components/layout.js'
import saveFileIfNeeded from "../components/download/index.js"
import { ACCESABLE_IMAGE_PATH } from "../const/index.js";
export const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;

import { motion } from 'framer-motion';
import { GalleryProvider } from "../context/GalleryContext.jsx";
import GalleryList from "../components/parts/gallery/list.jsx";

export default function Home({ list }) {

  const router = useRouter();
  const { photoId } = router.query;

  let resList = []
  let tags = []

  for(const item of list){
    const entity = new DetailEntity(item)
    if(entity.image){
      resList.push(entity)
    }
    // entity.tagsが存在する場合に処理を行う
    if (entity.tags && Array.isArray(entity.tags)) {
          for (const tag of entity.tags) {
              // タグがすでに存在しない場合に追加
              if (!tags.includes(tag.name)) {
                  tags.push(tag.name);
              }
          }
    }
  }

  resList.sort((a, b) => new Date(b.date.start) - new Date(a.date.start));

  const styles = {
    width: '25vw',
    '@media (max-width: 1536px)': {
      width: '33vw',
    },
    '@media (max-width: 1280px)': {
      width: '50vw',
    },
    '@media (max-width: 640px)': {
      width: '100vw',
    },
  };

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
      <div className="container mx-auto max-w-[1960px] p-8">
        <GalleryProvider list={resList} tags={tags}>
          <GalleryList />
        </GalleryProvider>
        {/* <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4" >
          {resList.map((item, index) => (
            <motion.div
            className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight" 
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              ease: 'easeInOut',
              duration: 0.9,
              delay: 0.1*0.1*index,
            }}>
            <Link
              key={item.id}
              href={`/?photoId=${item.id}`}
              as={`/p/${item.id}`}
              shallow
            >
              {item.image ? (
                <>
                {item.isVideo ? (
                <video width="640" height="360" controls className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110">
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
                </>
              ) : (
                <div className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-80 border h-40 bg-gray-50 p-6" styles={styles}>
                  {item.title}
                </div>
              )}
            </Link>
            </motion.div>
          ))}
        </div> */}
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
    this.image = null //"/image/noimage.png"
    if(item.properties["file"].files[0]){
      //const name = item.properties["image"].files[0].name

      const tmpName = item.properties["file"].files[0].name
      this.isVideo = tmpName.endsWith('.mov') || tmpName.endsWith('.mp4');
      const name = tmpName.replace(/ /g, '_')
      this.image = `/${ACCESABLE_IMAGE_PATH}/detail/${name}`

    }

    this.tags = item.properties["tag"].multi_select
    this.tag = item.properties["tag"].multi_select[0].name

  }

}
