export default function Authordetail({}) {
    return (
      <span className="p-3 align-items-center text-center" style={{width:'90%', margin: 'o auto'}}>
            <div className="row p-2 ">
              <div className="col">
                <img className="w-40" style={{width:'40%'}} src="https://cdn-ak.f.st-hatena.com/images/fotolife/d/duo-taro100/20160218/20160218004611.png" alt="..." />
              </div>
              <div className="col d-flex align-items-center">
                  <h5 className="fw-bolder ">山内太郎</h5>
              </div>
              <div className="card m-4">
                <div className="card-body p-4">
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div className="text-center">
                    エンジニア歴8年です。
                    普段はぬりえアプリのPMと海外向けエンタメプロジェクトのPMを兼任。
                    マネジメントだけでなく、開発業務もゴリゴリやっています。<br></br>
                    Java / Scala / Swift / Go / python / php / MySQL / Vue / React / Typescript / AWS など<br></br>
                  </div>
                </div>
              </div>
            </div>
        </span>
    );
}


