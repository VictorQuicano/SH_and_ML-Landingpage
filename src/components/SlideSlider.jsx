import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SlideSlider = ({ items = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index) => {
      if (isTransitioning || items.length === 0) return;

      setIsTransitioning(true);
      setCurrentIndex(index);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    },
    [isTransitioning, items.length]
  );

  const goToNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % items.length;
    goToSlide(nextIndex);
  }, [currentIndex, items.length, goToSlide]);

  const goToPrevious = useCallback(() => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    goToSlide(prevIndex);
  }, [currentIndex, items.length, goToSlide]);

  // Auto-advance every 30 seconds
  useEffect(() => {
    if (items.length === 0) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000); // 5000 ms = 5 segundos

    return () => clearInterval(interval);
  }, [goToNext, items.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [goToPrevious, goToNext]);

  if (items.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-gray-100 rounded-lg !p-8 text-center">
        <p className="!text-gray-500">No hay elementos para mostrar</p>
      </div>
    );
  }

  const currentItem = items[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto !bg-transparent rounded-lg shadow-lg overflow-hidden">
      {/* Main slider container */}
      <div className="relative h-96 !bg-transparent overflow-hidden">
        {/* Slides container with horizontal slide effect */}
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-full h-full relative">
              <img
                src={item.path}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25ibGU8L3RleHQ+PC9zdmc+";
                }}
              />
              {/* Gradient overlay for better text readability */}
              <div className="!absolute !inset-0 !bg-gradient-to-t !from-black/20 !to-transparent" />
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        {items.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              disabled={isTransitioning}
              className="!absolute !left-4 !top-1/2 !-translate-y-1/2 !bg-white/80 !hover:bg-white !text-gray-800 !p-2 !rounded-full !shadow-lg !transition-all !duration-200 !hover:scale-110 !hover:cursor-pointer !disabled:opacity-50 !disabled:cursor-not-allowed"
              aria-label="Slide anterior"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={goToNext}
              disabled={isTransitioning}
              className="!absolute !right-4 !top-1/2 !-translate-y-1/2 !bg-white/80 !hover:bg-white !text-gray-800 !p-2 !rounded-full !shadow-lg !transition-all !duration-200 !hover:cursor-pointer !hover:scale-110 !disabled:opacity-50 !disabled:cursor-not-allowed"
              aria-label="Siguiente slide"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Slide indicators */}
        {items.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex !space-x-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-white scale-110"
                    : "bg-white/50 hover:bg-white/80"
                } disabled:cursor-not-allowed`}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content section */}
      <div className="!p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {currentItem.name}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {currentItem.description}
        </p>

        {/* Slide counter */}
        {items.length > 1 && (
          <div className="mt-4 text-sm text-gray-400">
            {currentIndex + 1} de {items.length}
          </div>
        )}
      </div>
    </div>
  );
};
export default SlideSlider;
