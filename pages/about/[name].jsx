// components/ProfilePage.js
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import Image from 'next/image';
import { ACCESABLE_IMAGE_PATH } from '../../const';
import { getDatabase } from '../../lib/notion';
import saveFileIfNeeded from '../../components/download';

const ProfilePage = ({profileList}) => {

  const router = useRouter();
  const { name } = router.query; // URLからnameを取得

  let about = {}
  for(const p of profileList){
    const entity = new AboutEntity(p)
    if(entity.id == name){
        about = entity
    }

  }


  console.log(about)

  return (
    <Layout>
      <section className="relative block h-[500px]">
        <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&auto=format&fit=crop&w=2710&q=80')"
        }}>
          <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{ transform: 'translateZ(0px)' }}>
          <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-5 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-secondary-dark dark:text-ternary-light w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                  <div className="relative w-[200px] h-[200px] lg:w-[300px] lg:h-[300px]">
                    <Image alt="..." src={about.image} className="shadow-xl rounded-full  align-middle border-none absolute -mt-16 " fill sizes="100vw" style={{objectFit: "cover"}}/>
                  </div>
              </div>
              <div className="text-center ">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {about.name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold ">
                  
                <div className="flex justify-center py-4">
                    <div className="mr-4 px-3 text-center">
                      <span className="text-xl font-bold block  tracking-wide text-blueGray-600">{about.birthday}</span><span className="text-sm text-blueGray-400">birthday</span>
                    </div>
                    <div className="mr-4 px-3 text-center">
                      <span className="text-xl font-bold block  tracking-wide text-blueGray-600">{about.age}</span><span className="text-sm text-blueGray-400">age</span>
                    </div>
                    <div className="lg:mr-4 px-3 text-center">
                      <span className="text-xl font-bold block  tracking-wide text-blueGray-600">{about.height}</span><span className="text-sm text-blueGray-400">height</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      An artist of considerable range, Jenna the name taken by
                      Melbourne-raised, Brooklyn-based Nick Murphy writes,
                      performs and records all of his own music, giving it a
                      warm, intimate feel with a solid groove structure. An
                      artist of considerable range.
                    </p>
                    <a href="#pablo" className="font-normal text-pink-500">Show more</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </section>
    </Layout>
  );
};

export default ProfilePage;

export const getStaticPaths = async () => {
    let database = await getDatabase("1252fba0169180049c27f54cddb217ff");

    // {detailId: detail.id, detail:page, locale: detail.properties["locale"].title[0].plain_text}
    let resList = []
    for(let item of database){
      let res = {name : item.properties["id"].title[0].text.content}
      resList.push({params: res})
    }

   return {
        paths: resList,
        fallback: false,
    };
};

export const getStaticProps = async () => {
    const database = await getDatabase("1252fba0169180049c27f54cddb217ff");
    let props = []
    for(let item of database){
      props.push(item.properties)
    }
  
  
    saveFileIfNeeded(props, "about")
    return {
      props: {
        profileList: database
      },
      revalidate: 1,
    };
  };



class AboutEntity{
    constructor(item){
    //   this.active = item.properties["active"].checkbox
  
      this.id = null
      if(item.properties["id"] && item.properties["id"].title[0]){
        this.id = item.properties["id"].title[0].text.content
      }
      this.name = null
      if(item.properties["name"] && item.properties["name"].rich_text[0]){
        this.name = item.properties["name"].rich_text[0].text.content
      }
      this.birthday = null
      if(item.properties["birthday"] && item.properties["birthday"].rich_text[0]){
        this.birthday = item.properties["birthday"].rich_text[0].text.content
      }
      this.height = null
      if(item.properties["height"] && item.properties["height"].rich_text[0]){
        this.height = item.properties["height"].rich_text[0].text.content
      }

      this.image = null //"/image/noimage.png"
      if(item.properties["file"].files[0]){
        //const name = item.properties["image"].files[0].name
  
        const tmpName = item.properties["file"].files[0].name
        const name = tmpName.replace(/ /g, '_')
        this.image = `/${ACCESABLE_IMAGE_PATH}/about/${name}`
  
      }

      this.calculateAge()
    }



    calculateAge() {
        // birthdayは"YYYY-MM-DD"形式の文字列であると仮定
        const birthDate = new Date(this.birthday);
        const today = new Date();
      
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
      
        // 誕生日がまだ来ていない場合は1歳引く
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
      
        this.age = age;
      }
  
  }
  
