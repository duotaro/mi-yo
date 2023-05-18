import Aboutdetail from "./about_detail";

export default function Aboutparts({}) {
    return (
    <div className="card h-100">
      <div className="card-body p-4">
        <div className="text-center border-bottom">
            <h5 className="fw-bolder">当ブログについて</h5>
        </div>
        <Aboutdetail />
      </div>
      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
      </div>
    </div>
    );
}


