import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="relative group overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => openModal(index)}
          >
            <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium">
                    {index + 1} из {images.length}
                  </span>
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 bg-chinese-red/80 rounded-full flex items-center justify-center">
                      <Icon name="Eye" size={16} className="text-white" />
                    </div>
                    <div className="w-8 h-8 bg-chinese-gold/80 rounded-full flex items-center justify-center animate-sparkle">
                      ✨
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-10 text-white hover:text-chinese-gold hover:bg-chinese-red/20"
              onClick={closeModal}
            >
              <Icon name="X" size={24} />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-chinese-gold hover:bg-chinese-red/20"
              onClick={prevImage}
            >
              <Icon name="ChevronLeft" size={32} />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-chinese-gold hover:bg-chinese-red/20"
              onClick={nextImage}
            >
              <Icon name="ChevronRight" size={32} />
            </Button>

            {/* Main Image */}
            <div className="relative">
              <img
                src={images[currentIndex]}
                alt={`Gallery ${currentIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-lg animate-fade-in"
              />
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full">
                <span className="text-sm font-medium">
                  {currentIndex + 1} / {images.length}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex justify-center mt-4 space-x-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    index === currentIndex 
                      ? 'border-chinese-gold scale-110' 
                      : 'border-transparent hover:border-chinese-red/50'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Background Click to Close */}
          <div 
            className="absolute inset-0 -z-10"
            onClick={closeModal}
          />
        </div>
      )}
    </>
  );
};

export default ImageGallery;