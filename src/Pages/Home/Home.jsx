import './Home.css'
import React, { useState, useEffect } from 'react'
import Carousel from '../../Components/Carousel/Carousel';
import CategoryCard from '../../Components/CategoryCard';
import axios from 'axios';
import ProductCard from '../../Components/ProductCard';

function Home() {
    const [storeProducts, setStoreProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getProducts() {
            try {
                setLoading(true);
                let response = await axios.get('https://dummyjson.com/products?limit=15');
                setStoreProducts(response.data.products);
                setError(null);
            } catch (err) {
                setError('Failed to load products. Please try again later.');
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        }
        getProducts();
    }, []);

    const categories = [
        { fileName: 'food.png', categoryName: 'Food' },
        { fileName: 'Clothes.png', categoryName: 'Clothes' },
        { fileName: 'kitchen.png', categoryName: 'Kitchen Appliances' },
        { fileName: 'furniture.png', categoryName: 'Furniture' },
        { fileName: 'electronics.png', categoryName: 'Electronics' },
        { fileName: 'beauty.png', categoryName: 'Beauty' }
    ];

    return (
        <div className="home-page">
            {/* Hero Carousel */}
            <section className="hero-section">
                <Carousel />
            </section>

            {/* Categories Section */}
            <section className="categories-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Shop by Category</h2>
                        <p className="section-subtitle">Discover products from your favorite categories</p>
                    </div>
                    <div className="categories-grid">
                        {categories.map((category, index) => (
                            <CategoryCard
                                key={index}
                                fileName={category.fileName}
                                categoryName={category.categoryName}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="products-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Featured Products</h2>
                        <p className="section-subtitle">Handpicked products just for you</p>
                    </div>

                    {loading && (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <p>Loading amazing products...</p>
                        </div>
                    )}

                    {error && (
                        <div className="error-container">
                            <p className="error-message">{error}</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => window.location.reload()}
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {!loading && !error && (
                        <div className="products-grid">
                            {storeProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Start Shopping?</h2>
                        <p>Join thousands of satisfied customers and discover your next favorite product.</p>
                        <button className="btn btn-primary btn-lg">Shop Now</button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
