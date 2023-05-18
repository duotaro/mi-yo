export const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;
import POPULAR from '../popular/list.js'
import RECOMMEND from '../recommend/list.js'
export default function Side({ }) {
  return (
      <>
        <div className="card mb-4">
            <div className="card-header  bg-dark text-white">sns</div>
            
        </div>
        <div className="card mb-4">
            <div className="card-header  bg-dark text-white">人気記事</div>
            <POPULAR />
        </div>
        <div className="card mb-4">
            <div className="card-header  bg-dark text-white">おすすめ記事</div>
            <RECOMMEND />
        </div>
    </>
  );
}