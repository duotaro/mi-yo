export const DOMAIN = 'https://eurekayamauchi.github.io'
export const BASE_URL = 'https://eurekayamauchi.github.io'

export const GENRES = ['ai', 'design', 'time', 'tech']

export const GENRE_LIST = [
    {
        name: 'Home',
        genre: '',
        url : `${DOMAIN}`,
        src: 'https://cdn-ak.f.st-hatena.com/images/fotolife/d/duo-taro100/20230501/20230501154023.jpg'
    },
    {
        name: 'AI',
        genre: 'ai',
        url : `${DOMAIN}/blog/ai`,
        src: 'https://cdn-ak.f.st-hatena.com/images/fotolife/d/duo-taro100/20230501/20230501154023.jpg'
    },
    {
        name: 'デザイン',
        genre: 'design',
        url : `${DOMAIN}/blog/design`,
        src: 'https://cdn-ak.f.st-hatena.com/images/fotolife/d/duo-taro100/20230501/20230501153952.jpg'
    },
    {
        name: '時間管理',
        genre: 'time',
        url : `${DOMAIN}/blog/time`,
        src: 'https://cdn-ak.f.st-hatena.com/images/fotolife/d/duo-taro100/20230501/20230501154006.jpg'
    },
    {
        name: 'Technology',
        genre: 'tech',
        url : `${DOMAIN}/blog/tech`,
        src: 'https://cdn-ak.f.st-hatena.com/images/fotolife/d/duo-taro100/20230501/20230501155201.jpg'
    }
]

export const AD_CLIENT_ID = process.env.NEXT_PUBLIC_AD_CLIENT_ID