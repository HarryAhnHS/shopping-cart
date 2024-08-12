import { Carousel, IconButton } from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const ImageCarousel = ({images, type}) => {
    return (
        <Carousel
          className={type == 'shop' ? 'rounded-l-lg bg-black' : 'rounded-xl bg-black'}
          prevArrow={({ handlePrev }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={(e) => {
                e.stopPropagation(); // Stop event propagation
                handlePrev();
              }}
              className="!absolute top-2/4 left-4 -translate-y-2/4"
            >
              <ChevronLeftIcon strokeWidth={2} className="w-6 h-6" />
            </IconButton>
          )}
          nextArrow={({ handleNext }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={(e) => {
                e.stopPropagation(); // Stop event propagation
                handleNext();
              }}
              className="!absolute top-2/4 right-4 -translate-y-2/4"
            >
              <ChevronRightIcon strokeWidth={2} className="w-6 h-6" />
            </IconButton>
          )}
          navigation={({ setActiveIndex, activeIndex, length }) => (
            type == 'productPage'
            ?
              <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2" onClick={(e) => e.stopPropagation()}>
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                      activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                    }`}
                    onClick={() => {
                      setActiveIndex(i)
                    }}
                  />
                ))}
              </div>
            :
              null
          )}
        >
          {images.map((img, i) => {
            return (
              <img src={img} className="h-full w-full object-cover" key={i}/>
            )
            }
          )}
        </Carousel>
      );
    
};

export default ImageCarousel;