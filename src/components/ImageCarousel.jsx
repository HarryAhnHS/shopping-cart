import { Carousel } from "@material-tailwind/react";

const ImageCarousel = ({images, type}) => {
    return (
        type === 'shop' 
        ?
          <Carousel
              className="rounded-l-lg bg-black"
              navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                  {new Array(length).fill("").map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                        activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                      }`}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
              )}
            >
              {images.map((img, i) => {
                return (
                  <img src={img} className="h-full w-full object-cover" key={i}/>
                )
                }
              )}
            </Carousel>
        : 
          <Carousel
            className="rounded-xl bg-black"
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                      activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
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