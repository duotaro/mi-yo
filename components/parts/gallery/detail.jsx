import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowsPointingOutIcon } from "@heroicons/react/16/solid";
import { GalleryContext } from '../../../context/GalleryContext'
import { useContext } from 'react';

const GalleryDetail = ({ gallery }) => {
  const {
		setDetail
	} = useContext(GalleryContext);

  const handleClick = (e) => {
    setDetail(gallery)
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

	return (
		<motion.div
			className="group relative mb-5 block w-full z-10" 
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, delay: 1 }}
			transition={{
				ease: 'easeInOut',
				duration: 0.7,
				delay: 0.15,
			}}
		>
              {gallery.image ? (
                <>
                <div className="relative ">
                  {gallery.isVideo ? (
                  <video controls className="transform w-full rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110" styles={styles}>
                    <source src={gallery.image} type={gallery.image.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
                    お使いのブラウザは動画タグをサポートしていません。
                  </video>
                  ) : (
                    <Image
                    alt={gallery.title}
                    className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    placeholder="blur"
                    blurDataURL={`/image/loading.gif`}
                    src={gallery.image}
                    width={720}
                    height={480}
                    sizes="(max-width: 640px) 100vw,
                      (max-width: 1280px) 50vw,
                      (max-width: 1536px) 33vw,
                      25vw"
                  />
                  )}
                  <button
                    onClick={handleClick} // モーダル表示のロジックを実装する関数
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-200"
                  >
                    <ArrowsPointingOutIcon className="w-5 h-5"/>
                  </button>
                </div>
                </>
              ) : (
				<></>
                // <div className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-80 border h-40 bg-gray-50 p-6" styles={styles}>
                //   {gallery.title}
                // </div>
              )}
		</motion.div>
	);
};

export default GalleryDetail;
