import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';


const GalleryDetail = ({ gallery }) => {

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
			className="group relative mb-5 block w-full " 
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
                {gallery.isVideo ? (
                <video width="640" height="360" controls className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110" styles={styles}>
                  <source src={gallery.image} type={gallery.image.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
                  お使いのブラウザは動画タグをサポートしていません。
                </video>
                ) : (
                  <Image
                  alt={gallery.title}
                  className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  // placeholder="blur"
                  // blurDataURL={`/og-image.png`}
                  src={gallery.image}
                  width={720}
                  height={480}
                  sizes="(max-width: 640px) 100vw,
                    (max-width: 1280px) 50vw,
                    (max-width: 1536px) 33vw,
                    25vw"
                />
                )}
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
