export const GENRE_LIST = [
    {
        name: 'Home',
        url : process.env.NEXT_PUBLIC_DOMAIN
    },
    {
        name: 'AI',
        url : `${process.env.NEXT_PUBLIC_DOMAIN}/ai_posts`
    },
    {
        name: 'デザイン',
        url : `${process.env.NEXT_PUBLIC_DOMAIN}/css_posts`
    },
    {
        name: '時間管理',
        url : `${process.env.NEXT_PUBLIC_DOMAIN}/time`
    },
    {
        name: 'Book',
        url : `${process.env.NEXT_PUBLIC_DOMAIN}/books`
    },
    {
        name: 'Movies',
        url : `${process.env.NEXT_PUBLIC_DOMAIN}/movies`
    },
    {
        name: 'Technology',
        url : `${process.env.NEXT_PUBLIC_DOMAIN}/tech`
    }
]

export const AD_CLIENT_ID = process.env.NEXT_PUBLIC_AD_CLIENT_ID