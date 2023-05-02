import Head from "next/head";
import Navbar from './navbar'
import Footer from './footer'
import { GENRE_LIST, AD_CLIENT_ID } from "../const";
import AdSense from '../components/ads/ad'

export default function Layout({ children }) {
  console.log(GENRE_LIST)
  return (
    <>
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <meta name="description" content="TechnologyとConvenienceを組み合わせた造語。​ITがもたらす便利なものを紹介します。最近はAI関連の記事が多いです。ChatGPT / Google Bard / OpenAI GPT / Replika" />
        <meta property="og:image"  contents="https://cdn-ak.f.st-hatena.com/images/fotolife/d/duo-taro100/20230501/20230501153944.jpg"></meta>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT_ID}`}
          crossOrigin="anonymous"
        ></script>
      </Head>
      <Navbar />
      <AdSense />
      <nav className="navbar navbar-expand navbar-light bg-dark gnav">
        <div className="container-fluid"> 
          <div className="text-center text-white w-100">
            <ul className="navbar-nav nav-justified " style={{width:'100%'}}>
             {GENRE_LIST.map((genre) => {
              return (
                <li className="nav-item" key={genre.name}>
                  <a className="nav-link text-white" aria-current="page" href={genre.url}>
                    {genre.name}
                  </a>
                  <p style={{display: 'none'}}>{genre.url}</p>
                </li>
              )
             })}
            </ul>
          </div>
        </div>
      </nav>
      <main>{children}</main>
      <Footer />
    </>
  )
}