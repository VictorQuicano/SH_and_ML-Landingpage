import { useState, useEffect } from "react";

const Slider = ({ images = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-slide cada 5 segundos
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-gray-200 rounded-lg flex items-center justify-center h-64">
        <p className="text-gray-500">No hay imágenes para mostrar</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
      {/* Contenedor de imágenes */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <div
          className="flex !transition-transform !duration-500 !ease-in-out !h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((imagePath, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              <img
                src={imagePath}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
        /* Flechas de navegación */
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              disabled={isTransitioning}
              className="!absolute !left-4 !top-1/2 !transform !-translate-y-1/2 !bg-black !bg-opacity-50 !hover:bg-opacity-70 !text-white !p-2 !rounded-full !transition-all !duration-200 !disabled:opacity-50 !disabled:cursor-not-allowed !z-10 !hover:cursor-pointer"
              aria-label="Slide anterior"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              disabled={isTransitioning}
              className="!absolute !right-4 !top-1/2 !transform !-translate-y-1/2 !bg-black !bg-opacity-50 !hover:bg-opacity-70 !text-white !p-2 !rounded-full !transition-all !duration-200 !disabled:opacity-50 !disabled:cursor-not-allowed !z-10 !hover:cursor-pointer"
              aria-label="Siguiente slide"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>
      {/* Indicadores de puntos */}
      {images.length > 1 && (
        <div className="!absolute !bottom-4 !left-1/2 !transform !-translate-x-1/2 !flex !space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`!w-3 !h-3 !rounded-full !transition-all !duration-200 !hover:cursor-pointer ${
                index === currentSlide
                  ? "!bg-white !scale-110"
                  : "!bg-white !bg-opacity-50 !hover:bg-opacity-75"
              } disabled:cursor-not-allowed`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      )}
      {/* Contador de slides */}
      {images.length > 1 && (
        <div className="!absolute !top-4 !right-4 !bg-black !bg-opacity-50 !text-white !px-3 !py-1 !rounded-full !text-sm">
          {currentSlide + 1} / {images.length}
        </div>
      )}
    </div>
  );
};
export default Slider;
