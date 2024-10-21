import Head from "next/head";
import Layout from '../../components/layout'
import React, { useContext } from 'react';
import Calender from "../../components/parts/plans/calender";

export default function CalendarPage({ list }) {
  return (
    <Layout >
      <Head>
        <title>予定表</title>
      </Head>

      <div className="container mx-auto max-w-[1960px] p-8">
          <Calender list={[]}/>
      </div>
    </Layout>
  );
}

// export const getStaticProps = async (context) => {
//   const files = await getDatabase("11aa8c0ecf8c803e8289cb5bd9a5f80a")
//   const list = await getDatabase("8d87080f73f14e8a9e7ba934c1d928c6")
  
//   console.log(files)
//   let props = []
//   for(let item of files){
//     props.push(item.properties)
//   }

//   await saveImageIfNeeded(props, "calendar")
//   await savePdfIfNeeded(props, "calendar")
//   // if(props && props.length){
//   //   //await saveImageIfNeeded(props, "calendar")
//   //   await savePdfIfNeeded(props, "calendar")
//   // }
//   console.log(props)
  

//   return {
//     props: {
//       files: files[0],
//       list: list
//     },
//     revalidate: 1
//   };
// };
