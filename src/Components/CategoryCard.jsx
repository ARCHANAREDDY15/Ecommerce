import Card from 'react-bootstrap/Card';
import './CategoryCard.css';

function CategoryCard({fileName, categoryName}) {
  return (
    <Card className="category-card text-white shadow-lg">
      <Card.Img
        src={`/${fileName}`}
        alt={`${categoryName} category`}
        className="category-image"
      />
      <Card.ImgOverlay className="category-overlay">
        <Card.Title className="category-title">{categoryName}</Card.Title>
        <div className="category-hover-text">Shop Now</div>
      </Card.ImgOverlay>
    </Card>
  );
}

export default CategoryCard;
