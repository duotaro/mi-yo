// components/FullScreenModal.js
import { useEffect } from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
const FullScreenModal = ({ isOpen, onClose, title, className, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // モーダルオープン時にスクロールを無効にする
    } else {
      document.body.style.overflow = 'unset'; // モーダルクローズ時にスクロールを有効に戻す
    }

    return () => {
      document.body.style.overflow = 'unset'; // コンポーネントがアンマウントされるとき
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }} 
    transition={{ duration: 0.5 }} className={`fixed inset-0 flex items-center justify-center z-50 min-w-ful ${className}`}>
      {/* 背景 */}
      <div className="absolute inset-0 bg-black opacity-50 backdrop-filter backdrop-blur-sm" />
      
      {/* モーダルコンテンツ */}
      <div className="relative backdrop-filter backdrop-blur rounded-lg shadow-lg p-4 w-full h-full max-w-full overflow-auto">
        {/* <button className="absolute top-4 right-2 text-white" onClick={onClose}><XCircleIcon className='w-8 h-8' /></button> */}  
        <div className="">
          {children} {/* ここに子要素を表示 */}
        </div>
      </div>
    </motion.div>
  );
};

export default FullScreenModal;
