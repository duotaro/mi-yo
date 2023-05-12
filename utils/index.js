export const createDatabaseId = (genre) =>{

    console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■")
    console.log(genre)
    console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■")

    let databaseId = process.env.NEXT_PUBLIC_NOTION_AI_DATABASE_ID;
    if(genre){
      if(genre == 'ai'){
        databaseId = process.env.NEXT_PUBLIC_NOTION_AI_DATABASE_ID;
      } else if (genre == 'design'){
        databaseId = process.env.NEXT_PUBLIC_NOTION_DESIGN_DATABASE_ID;
      } else if (genre == 'time'){
        databaseId = process.env.NEXT_PUBLIC_NOTION_TIME_DATABASE_ID;
      } else if (genre == 'tech'){
        databaseId = process.env.NEXT_PUBLIC_NOTION_TECH_DATABASE_ID;
      }
    }
    return databaseId
}