import Head from "next/head";
import Navbar from './navbar'
import Footer from './footer'
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <meta name="description" content="TechnologyとConvenienceを組み合わせた造語。​ITがもたらす便利なものを紹介します。最近はAI関連の記事が多いです。ChatGPT / Google Bard / OpenAI GPT / Replika" />
        <meta property="og:image"  contents="https://cdn-ak.f.st-hatena.com/images/fotolife/d/duo-taro100/20230501/20230501153944.jpg"></meta>
      </Head>
      <Navbar />
      <header className="bg-dark py-1">
        <div className="container px-2 px-lg-5 my-2">
          <div className="text-center text-white">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href={`/`}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href={`/about/`}>
                  AI
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href={`/blog/`}>
                  テクノロジー
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <Footer />
    </>
  )
}