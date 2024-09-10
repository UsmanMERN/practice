import React from 'react'
import { Button, Col, Image, Row, Typography } from 'antd'

import HeroImage from "assets/images/hero.png"
import { Link } from 'react-router-dom'

const { Text, Title } = Typography
export default function Hero() {
    return (
        <section className='bg-light min-vh-75 '>
            <div className="container py-5">
                <Row>
                    <Col xs={24} md={12} className='order-2 order-md-1 d-flex justify-content-center align-items-center'>
                        <div className="">
                            <div className="p-4 p-md-5 text-center text-lg-start">
                                <Text className="text-uppercase mb-3 d-block hero-subtitle">Classic Exclusive</Text>
                                <Title level={1} className="mb-4 hero-title">Women's Collection</Title>
                                <Text className="h3 mb-4 d-block hero-offer">UP TO 40% OFF</Text>
                                <Link to={"/products"}>
                                    <Button type="primary" size="large" className="hero-button d-inline-flex align-items-center">
                                        Shop Now
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} md={12} className=' d-flex justify-content-center order-1 order-md-2 d-flex justify-content-center align-items-center'>
                        <Image src={HeroImage} preview={false} className=' object-fit-contain' />
                    </Col>
                </Row>
            </div>
        </section>
    )
}
