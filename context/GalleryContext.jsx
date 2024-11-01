import { useState, createContext } from 'react';

// Create gallerys context
export const GalleryContext = createContext();

// Create the gallerys context provider
export const GalleryProvider = ({list, tags, children}) => {
	const [gallerys, setGallery] = useState(list);
	const [tagList, setTagList] = useState(tags);
	const [searchGallery, setSearchGallery] = useState('');
	const [selectGallery, setSelectGallery] = useState('');
	const [detail, setDetail] = useState(null);

	// Search gallerys by gallery title
	const searchGalleryByTitle = gallerys.filter((item) => {
		const titleMatch = item.title.toLowerCase().includes(searchGallery.toLowerCase());
   		const descriptionMatch = item.description.toLowerCase().includes(searchGallery.toLowerCase());
		return titleMatch || descriptionMatch || searchGallery === '';
	});

	// Select gallerys by gallery category
	const selectGalleryByCategory = gallerys.filter((item) => {
		let category = item.tags
		//return category.includes(selectGallery);
		return category.some(cat => cat.name === selectGallery);
	});

	return (
		<GalleryContext.Provider
			value={{
				gallerys,
				tagList,
				setTagList,
				setGallery,
				searchGallery,
				setSearchGallery,
				searchGalleryByTitle,
				selectGallery,
				setSelectGallery,
				selectGalleryByCategory,
				detail,
				setDetail
			}}
		>
			{children}
		</GalleryContext.Provider>
	);
};
