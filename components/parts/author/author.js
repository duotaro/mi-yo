import Authordetail from "./author_detail";
export default function Author({}) {
    return (
        <div className="card h-100">
          <div className="card-body p-4">
            <div className="text-center border-bottom">
              <h5 className="fw-bolder">著者</h5>
            </div>
            <Authordetail />
          </div>
          <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
            {/* sns */}
          </div>
        </div>
    );
}


