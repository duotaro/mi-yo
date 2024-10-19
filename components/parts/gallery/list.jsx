import { useContext } from 'react';
import GalleryDetail from './detail';
import { GalleryContext } from '../../../context/GalleryContext'
import GallerysFilter from './filter';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';

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
	} = useContext(GalleryContext);


	console.log("-----console.log(gallerys)----")
	console.log(gallerys)

	return (
        <>
            <section className="py-5 ">
                {/* <div className="text-center">
                    <p className="font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">
                        Gallery
                    </p>
                </div> */}

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
        </>
	);
};

export default GalleryList;
