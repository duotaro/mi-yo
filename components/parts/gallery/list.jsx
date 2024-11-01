import { useContext } from 'react';
import GalleryDetail from './detail';
import { GalleryContext } from '../../../context/GalleryContext'
import GallerysFilter from './filter';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import FullScreenModal from "../../parts/modal/fullscreenModal";
import Image from 'next/image';

const GalleryList = () => {
	const {
		gallerys,
        tagList,
		searchGallery,
		setSearchGallery,
		searchGalleryByTitle,
		selectGallery,
		setSelectGallery,
		selectGalleryByCategory,
        detail,
        setDetail
	} = useContext(GalleryContext);

    const handleModalClose = () => {
        setDetail(null)
    }

    const styles = {
		transform: "translate3d(0, 0, 0)",
		width: '25vw',
		'@media (max-width: 1536px)': {
		  width: '33vw',
		},
		'@media (max-width: 1280px)': {
		  width: '50vw',
		},
		'@media (max-width: 640px)': {
		  width: '100vw',
		},
	};



    console.log("--------DETAIL-----------")
    console.log(detail)
    console.log("-------------------")

	return (
        <>
            <section className="py-5 ">
                <div className="">
                    <div
                        className="
                            flex
                            justify-between
                            border-b border-primary-light
                            dark:border-secondary-dark
                            pb-3
                            gap-3
                            "
                    >
                        <div className="flex justify-between gap-2">
                            <span
                                className="
                                    hidden
                                    sm:block
                                    bg-primary-light
                                    dark:bg-ternary-dark
                                    p-2.5
                                    shadow-sm
                                    rounded-xl
                                    cursor-pointer
                                    "
                            >
                                <MagnifyingGlassIcon className="text-ternary-dark dark:text-ternary-light w-5 h-5"></MagnifyingGlassIcon>
                            </span>
                            <input
                                onChange={(e) => {
                                    setSearchGallery(e.target.value);
                                }}
                                className="font-general-medium 
                                    pl-3
                                    pr-1
                                    sm:px-4
                                    py-2
                                    border 
                                border-gray-200
                                    dark:border-secondary-dark
                                    rounded-lg
                                    text-sm
                                    sm:text-md
                                    bg-secondary-light
                                    dark:bg-ternary-dark
                                    text-primary-dark
                                    dark:text-ternary-light
                                    "
                                id="name"
                                name="name"
                                type="search"
                                required=""
                                placeholder="Search Gallerys"
                                aria-label="Name"
                            />
                        </div>

                        <GallerysFilter setSelectGallery={setSelectGallery} tagList={tagList}/>
                    </div>
                </div>
            </section>
			<div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4" >
				{selectGallery
					? selectGalleryByCategory.map((gallery) => (
							<GalleryDetail
                              gallery={gallery}
							/>
					  ))
					: searchGallery
					? searchGalleryByTitle.map((gallery) => (
							<GalleryDetail
                            gallery={gallery}
							/>
					  ))
					: gallerys.map((gallery) => (
							<GalleryDetail
                            gallery={gallery}
							/>
					  ))}
			</div>
            <FullScreenModal isOpen={detail != null} onClose={handleModalClose} isShowCloseBtn={true} className="text-gray-200">
                {detail && (
                  <div class="h-screen flex flex-col items-center justify-center">
                    <div class="flex items-center h-16 p-4">
                        <h4 class="text-xl font-medium">
                          {detail.title}
                        </h4>
                    </div>
                    <div class="flex-grow relative w-full rounded-lg">
                      {detail.isVideo ? (
                        <video controls className="absolute inset-0 w-full h-full object-contain transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110" style={{}}>
                          <source src={detail.image} type={detail.image.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
                          お使いのブラウザは動画タグをサポートしていません。
                        </video>
                        ) : (
                          <Image
                          alt={detail.title}
                          className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                          style={{ transform: "translate3d(0, 0, 0)" }}
                          // placeholder="blur"
                          // blurDataURL={`/og-image.png`}
                          src={detail.image}
                          layout="fill"
                          objectFit="contain"
                          sizes=""
                        />
                      )}
                    </div>
                    <div class="flex h-16 p-4 items-center justify-between">
                      <div class="flex items-center gap-16">
                        <div>
                          <p class="text-slate-500 text-sm">
                            Views
                          </p>
                          <p class="text-slate-800 font-medium">
                            44,082,044
                          </p>
                        </div>
                        <div>
                          <p class="text-slate-500 text-sm">
                            Downloads
                          </p>
                          <p class="text-slate-800 font-medium">
                            553,031
                          </p>
                        </div>
                      </div>
                      <button class="flex items-center rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          class="h-4 w-4 mr-1.5"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        Share
                      </button>
                    </div>
                  </div>
                )}
                </FullScreenModal>
        </>
	);
};

export default GalleryList;
