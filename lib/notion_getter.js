import { getDatabase } from "../lib/notion";


export const getAi = async () => {
    const articles = await getDatabase(rocess.env.NEXT_PUBLIC_NOTION_AI_DATABASE_ID);
    return articles;
}

export const getDesign = async () => {
    const articles = await getDatabase(rocess.env.NEXT_PUBLIC_NOTION_DESIGN_DATABASE_ID);
    return articles;
}

export const getTime = async () => {
    const articles = await getDatabase(rocess.env.NEXT_PUBLIC_NOTION_TIME_DATABASE_ID);
    return articles;
}

export const getTech = async () => {
    const articles = await getDatabase(rocess.env.NEXT_PUBLIC_NOTION_TECH_DATABASE_ID);
    return articles;
}