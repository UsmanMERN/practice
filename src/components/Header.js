import { Avatar, Badge, Button, Dropdown, Empty, Image, List, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { DeleteOutlined } from "@ant-design/icons"
// import { wishlistItems as wishlistDummyData } from '../data/data'
import { Link } from 'react-router-dom'

import { HeartOutlined } from "@ant-design/icons"

const { Text } = Typography

const WishlistDropDown = ({ wishlist }) => {
    return (<div className="card header-card">
        {wishlist.length > 0 ? <List
            itemLayout="horizontal"
            dataSource={wishlist}
            renderItem={(item, index) => {
                console.log(item)
                return (
                    <List.Item actions={[<DeleteOutlined style={{ color: 'red' }} />]}>
                        <List.Item.Meta
                            className='d-flex justify-content-center align-items-center px-2'
                            avatar={<Image src={item.image} shape="square" size="large" preview={false} height={100} width={100} className='object-fit-cover rounded-2' />}
                            title={<Link to={`/product?category=${encodeURIComponent(item.name)}`} className='ps-4 text-decoration-none fs-6'>{item.name}</Link>}
                        />
                    </List.Item>
                )
            }} /> : <Empty description="No wishlist found add to show here " />}
    </div>)
}

export const wishlistDummyData = [
    { id: 1, key: '1', name: 'Product 1', image: 'https://picsum.photos/200/300' },
    { id: 2, key: '2', name: 'Product 2', image: 'https://picsum.photos/200/300' },
    { id: 3, key: '3', name: 'Product 3', image: 'https://picsum.photos/200/300' },
];

export default function Header() {
    const [isWishlistDropdownVisible, setWishlistDropdownVisible] = useState(false);
    const [isCartDropdownVisible, setCartDropdownVisible] = useState(false);
    const [isShopDropdownVisible, setShopDropdownVisible] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 992) {
                setWishlistDropdownVisible(false);
                setCartDropdownVisible(false);
                setShopDropdownVisible(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-center align-items-baseline">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Link</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/">Action</a></li>
                                <li><a className="dropdown-item" href="/">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/">Something else here</a></li>
                            </ul>
                        </li>
                    </ul>
                    <div className="d-flex" >
                        <Dropdown trigger={['click']} placement="bottomLeft" dropdownRender={() => <WishlistDropDown wishlist={wishlistDummyData} />} open={isWishlistDropdownVisible} onOpenChange={(visible) => setWishlistDropdownVisible(visible)}>
                            <Badge count={wishlistDummyData?.length} showZero style={{ marginTop: "8px" }}>
                                <Text className='fs-4' style={{ cursor: "pointer" }}><HeartOutlined /></Text>
                            </Badge>
                        </Dropdown>
                        <Dropdown trigger={['click']} placement="bottomLeft" dropdownRender={() => <WishlistDropDown wishlist={wishlistDummyData} />} open={isWishlistDropdownVisible} onOpenChange={(visible) => setWishlistDropdownVisible(visible)}>
                            <Badge count={wishlistDummyData?.length} showZero style={{ marginTop: "8px" }}>
                                <Text className='fs-4' style={{ cursor: "pointer" }}><HeartOutlined /></Text>
                            </Badge>
                        </Dropdown>
                        <Button type='primary'>
                            <Link to={"/dashboard"} className='text-decoration-none'>Dashboard</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>

    )
}
