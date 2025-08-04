import React, { useState } from 'react';
import './ImageSlider.css';

const images = [
  './images/appleWatch.png'
];

const ImageSlider = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleSlider = () => setIsVisible(!isVisible);

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <>
      <button onClick={toggleSlider}>
        {isVisible ? 'Скрыть слайдер' : 'Показать слайдер'}
      </button>

      <div className={`slider ${isVisible ? 'show' : ''}`}>
        <button className="arrow left" onClick={prevImage}>&lt;</button>

        <img src={images[currentIndex]} alt={`Картинка ${currentIndex + 1}`} />

        <button className="arrow right" onClick={nextImage}>&gt;</button>
      </div>
    </>
  );
};

export default ImageSlider;
