const selectOptions = [
	'Web Application',
	'Mobile Application',
	'UI/UX Design',
	'Branding',
];

const GallerysFilter = ({ setSelectGallery, tagList }) => {
	return (
		<select
			onChange={(e) => {
				setSelectGallery(e.target.value);
			}}
			className="font-general-medium 
                px-4
                sm:px-6
                py-2
                border
                dark:border-secondary-dark
                rounded-lg
                text-sm
                sm:text-md
                dark:font-medium
                bg-secondary-light
                dark:bg-ternary-dark
                text-primary-dark
                dark:text-ternary-light
            "
		>
			<option value={setSelectGallery} className="text-sm sm:text-md">
				All Gallerys
			</option>

			{tagList.map((option) => (
				<option className="text-normal sm:text-md" key={option}>
					{option}
				</option>
			))}
		</select>
	);
};

export default GallerysFilter;
