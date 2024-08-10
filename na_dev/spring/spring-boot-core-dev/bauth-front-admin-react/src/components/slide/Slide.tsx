interface SlideProps {
  imageUrl: string;
  isActive: boolean;
}

const Slide = ({ imageUrl, isActive }: SlideProps) => (
  <div className={`slide ${isActive ? 'fade' : ''}`}>
    <img src={imageUrl} alt="Image" />
  </div>
);

export default Slide;
