import { GENRE_LIST } from "../../../const";
import Link from "next/link";

export default function Menu({ }) {
  return (
    <>
      <div className="card h-100">
        <div className="card-body p-4">
        <div className="text-center border-bottom">
            <h5 className="fw-bolder">blog Menu</h5>
        </div>
        <table class="table">
            <tbody>
            {GENRE_LIST.map((genre) => {
            return (
                <tr className="list-unstyled" key={genre.name}>
                <th scope="row"><i className={genre.icon}></i></th>
                <td>
                    <a className="link-black"  aria-current="page" href={genre.url}>
                    {genre.name}
                    </a>
                </td>
                </tr>
            )
            })}
            <tr className="list-unstyled" >
                <th scope="row"><i class="bi bi-key-fill"></i></th>
                <td>
                <Link href={`/privacy/`} className="link-black"  aria-current="page" >
                    プライバシーポリシー
                </Link>
                </td>
            </tr>
            <tr className="list-unstyled" >
                <th scope="row"><i class="bi bi-bookmark-check"></i></th>
                <td>
                <Link href={`/terms/`} className="link-black"  aria-current="page" >
                    利用規約
                </Link>
                </td>
            </tr>
            <tr className="list-unstyled" >
                <th scope="row"><i class="bi bi-envelope-check"></i></th>
                <td>
                <Link href={`/contact/`} className="link-black"  aria-current="page" >
                    Contact
                </Link>
                </td>
            </tr>
            </tbody>
        </table>
        </div>
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
        </div>
      </div>
    </>
  );
}