import Head from "next/head";
import { useContext, useEffect, useState, useRef } from 'react'
import Navbar from './navbar'
import Footer from './footer'
import { AnimatePresence } from 'framer-motion';
import UseScrollToTop from '../hooks/useScrollToTop';
import Cookies from 'js-cookie';
import FullScreenModal from "./parts/modal/fullscreenModal";

export default function Layout({ children }) {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_SITE_PASSWORD) { // 実際のパスワードをここに設定
      Cookies.set('sitePassword', password); 
      setIsAuthenticated(true);
    } else {
      alert('パスワードが間違っています。');
    }
  };

  useEffect(() => {
    const cookie = Cookies.get('sitePassword');
    if (cookie) {
      setIsAuthenticated(true);
    }
    setIsLoading(false); // ローディング完了
  }, []);

  if (isLoading) {
    return (
      <FullScreenModal isOpen={isLoading}>
        <div className='flex space-x-2 justify-center items-center h-screen dark:invert'>
            <span className='sr-only'>Loading...</span>
            <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
          <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
          <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
        </div>
      </FullScreenModal>
    )
  }

  return (
    <AnimatePresence>
      <Head>
        <meta name="description" content="TechnologyとConvenienceを組み合わせた造語。​ITがもたらす便利なものを紹介します。最近はAI関連の記事が多いです。ChatGPT / Google Bard / OpenAI GPT / Replika" />
        <meta property="og:image"  contents="https://cdn-ak.f.st-hatena.com/images/fotolife/d/duo-taro100/20230501/20230501153944.jpg"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
			<div className=" bg-secondary-light dark:bg-primary-dark transition duration-300">
        <Navbar />
        <UseScrollToTop />
        <main>{children}</main>
        <UseScrollToTop />
        <Footer />

        <FullScreenModal isOpen={!isAuthenticated} title={`パスワードを入力してください。`} className="text-gray-200">
          <div class="min-h-screen py-6 flex flex-col justify-center sm:py-12">
            <div class="relative py-3 sm:max-w-xl sm:mx-auto">
              <div
                class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
              </div>
              <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                <div class="max-w-md mx-auto">
                  <div>
                    <h1 class="text-2xl font-semibold text-gray-600">パスワードを入力してください。</h1>
                  </div>
                  <div class="divide-y divide-gray-200">
                    <form onSubmit={handleSubmit} class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <div class="relative">
                        <input autocomplete="off" id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="" />
                        <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                      </div>
                      <div class="relative">
                        <button class="bg-blue-500 text-white rounded-md px-2 py-1">送信</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FullScreenModal>
      </div>
    </AnimatePresence>
  )
}