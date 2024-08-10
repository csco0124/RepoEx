import { useState, useEffect, useCallback } from 'react';
import Slide from './Slide';
import './style.css';

interface SlideshowProps {
  images: string[];
}

const Slideshow = ({ images }: SlideshowProps) => {
  // 현재 슬라이드의 인덱스를 상태로 관리
  const [slideIndex, setSlideIndex] = useState(0);

  // 슬라이드 전환을 처리하는 콜백 함수
  const plusSlides = useCallback(
    (n: number) => setSlideIndex((prevIndex) => (prevIndex + n + images?.length) % images?.length),
    [images?.length]
  );

  // 이미지 자동 전환을 위한 useEffect
  useEffect(() => {
    let animationFrameId: number;

    // 이미지 전환 애니메이션 함수
    const animate = () => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % images?.length);
      animationFrameId = requestAnimationFrame(animate);
    };

    // 초기 애니메이션 시작
    animationFrameId = requestAnimationFrame(animate);

    // 컴포넌트 언마운트 시 애니메이션 정리
    return () => cancelAnimationFrame(animationFrameId);
  }, [images?.length]);

  return (
    <div className="slideshow-container">
      {/* 이미지 배열을 순회하며 Slide 컴포넌트를 렌더링 */}
      {images?.map((image, index) => (
        <Slide key={index} imageUrl={image} isActive={index === slideIndex} />
      ))}

      {/* 이전 화살표 */}
      <a className="prev" onClick={() => plusSlides(-1)}>
        &#10094;
      </a>

      {/* 다음 화살표 */}
      <a className="next" onClick={() => plusSlides(1)}>
        &#10095;
      </a>
    </div>
  );
};

export default Slideshow;
