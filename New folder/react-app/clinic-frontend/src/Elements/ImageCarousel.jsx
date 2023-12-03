import React, { useState } from "react";
import styles from "../Elements/ImageCarousel.module.css";

const ImageCarousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.slideContainer}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={
              index === currentSlide
                ? `${styles.slide} ${styles.activeCar}`
                : styles.slideCar
            }
          >
            {index === currentSlide && (
              <>
                <img src={slide.image} alt="slide" />
                <div className={styles.textOverlayCar}>
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className={styles.leftArrow}>
        {"<"}
      </button>
      <button onClick={nextSlide} className={styles.rightArrowCar}>
        {">"}
      </button>
    </div>
  );
};

export default ImageCarousel;
