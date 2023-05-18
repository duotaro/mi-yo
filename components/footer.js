import Link from "next/link.js";

export default function Footer({  }) {
  return (
    <footer className="py-3 bg-dark">
        <div className="container">
          <div className="row m-0 text-center text-white">
            <div className="col">
              <Link href={`/privacy/`} className="link" >プライバシーポリシー</Link>
            </div>
            <div className="col">
              <Link href={`/terms/`} className="link" >利用規約</Link>
            </div>
            <div className="col">
              <Link href={`/about/`} className="link" >About</Link>
            </div>
            <div className="col">
              <Link href={`/contact/`} className="link" >Contact</Link>
            </div>
          </div>
          <div className="row ">
            <p className="m-0 pt-5 text-center text-white">&copy; Techvenience 2023</p>
          </div>
        </div>
    </footer>
  );
}