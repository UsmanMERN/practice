import React, { useRef } from 'react';
import { Button, Carousel, Image, Typography } from 'antd';
import { LeftOutlined, RightOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { categories } from 'data/data';

const { Title } = Typography;

const CustomArrow = ({ direction, onClick }) => (
    <Button
        type={direction === 'next' ? "primary" : "default"}
        shape="square"
        icon={direction === 'next' ? <RightOutlined /> : <LeftOutlined />}
        onClick={onClick}
        className={`custom-arrow ${direction}-arrow`}
    />
);

export default function Categories() {
    const categoriesArray = Object.values(categories);
    const carouselRef = useRef();

    const nextSlide = () => carouselRef.current.next();
    const prevSlide = () => carouselRef.current.prev();

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1400, settings: { slidesToShow: 4 } },
            { breakpoint: 992, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 576, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <section className="bg-white py-5 mb-5">
            <div className="container categories-section">
                <div className="d-flex justify-content-between align-items-center mb-4 py-5">
                    <Title level={2} className="mb-0">
                        <ShoppingOutlined className="mr-2" /> Shop by Categories
                    </Title>
                    <div className="arrow-container">
                        <CustomArrow direction="prev" onClick={prevSlide} />
                        <CustomArrow direction="next" onClick={nextSlide} />
                    </div>
                </div>
                <Carousel ref={carouselRef} {...settings}>
                    {categoriesArray.map((category, index) => (
                        <div key={index} className="px-2">
                            <div className="category-image-container">
                                <Image src={category.imageUrl} alt={category.name} className="category-image" width="100%" height={350} preview={false} />
                                <div className="category-overlay">
                                    <Link className='w-50 mb-5 fw-medium' to={`/products?category=${encodeURIComponent(category.slug)}`}>
                                        <Button type="primary" className="w-100 bg-white fw-medium text-primary" size="large">
                                            {category.name}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    );
}