import { Button, Carousel, Image, Typography } from 'antd'
import { categories } from 'data/data'
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'


const { Title, Text } = Typography
export default function Categories() {
    const carouselRef = useRef()

    const settings = {
        dots: false,
        infinite: false,
        autoplay: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1600, settings: { slidesToShow: 6 } },  // For very large screens
            { breakpoint: 1400, settings: { slidesToShow: 5 } },  // Adjusting to 5 slides for screens 1400px and below
            { breakpoint: 1200, settings: { slidesToShow: 4 } },  // Adjusting to 4 slides for screens 1200px and below
            { breakpoint: 992, settings: { slidesToShow: 3 } },   // 3 slides for medium screens
            { breakpoint: 768, settings: { slidesToShow: 2 } },   // 2 slides for tablets
            { breakpoint: 576, settings: { slidesToShow: 1 } },   // 1 slide for mobile
        ],
    }

    const nextSlide = () => carouselRef.current.next()
    const prevSlide = () => carouselRef.current.prev()
    return (
        <>
            <section className="bg-white py-5 mb-5">
                <div className="container categories-section">
                    <div className="d-flex justify-content-between align-items-center mb-4 py-5">
                        <Title level={2} className="mb-0">
                            Shop by Categories
                        </Title>
                        <div className="arrow-container">
                            <Button onClick={nextSlide}>Left</Button>
                            <Button onClick={prevSlide}>Right</Button>
                        </div>
                    </div>
                    <Carousel ref={carouselRef} {...settings}>
                        {Object.values(categories).map((category, index) => (
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
        </>
    )
}
