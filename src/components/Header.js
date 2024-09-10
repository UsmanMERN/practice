import React, { useEffect, useState } from 'react'
import { Avatar, Badge, Button, Dropdown, Empty, Image, List, Space } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { DeleteOutlined } from "@ant-design/icons"

import CartIcon from "assets/icons/cart-2.svg"
import wishlistIcon from "assets/icons/wishlist.svg"

import { wishList as wishListDummyData } from 'data/data'
const WishlistDrop = ({ wishList }) => {
    console.log('wishList', wishList)
    return (
        <div className="card dropdown-card" style={{
            minWidth: "500px"
        }}>
            {
                wishList.length > 0 ? <List
                    itemLayout="horizontal"
                    dataSource={wishList}
                    renderItem={(item, index) => (
                        <List.Item actions={[<div key="list-loadmore-more" className='me-4'><DeleteOutlined className='text-danger fs-5' /></div>]}>
                            <List.Item.Meta
                                avatar={<Avatar src={item.image} shape="square" size={110} />}
                                title={<Link to={`product/${item.name}`}>{item.name}</Link>}
                            />
                        </List.Item>
                    )}
                /> : <Empty description="No Items found in wish list" />
            }
        </div>
    )
}

export default function Header() {
    const navigate = useNavigate()
    const [isWishListDropdownOpen, setIsWishListDropdownOpen] = useState(false)

    console.log('isWishListDropdownOpen', isWishListDropdownOpen)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 992) {
                setIsWishListDropdownOpen(false)
            }
        }
        window.addEventListener('resize', handleResize)
    })
    return (
        <>
            <nav className="navbar bg-body-light navbar-expand-lg sticky-top shadow-lg">
                <div className="container">
                    <a className="navbar-brand" href="/">Offcanvas navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end justify-content-md-center align-items-md-center flex-grow-1 p-0 m-0">
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
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li><a className="dropdown-item" href="/">Something else here</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <div className="d-md-flex d-none flex-md-row" >
                                <Space size={'middle'} >
                                    <Dropdown placement="bottomRight" trigger={"click"} open={isWishListDropdownOpen} onOpenChange={(visible) => setIsWishListDropdownOpen(visible)} dropdownRender={() => <WishlistDrop wishList={wishListDummyData} />}>
                                        <Badge count={12}><Image src={wishlistIcon} height={30} width={30} preview={false} /></Badge>
                                    </Dropdown>
                                    <Dropdown placement="bottomRight" trigger={"click"}>
                                        <Badge count={12}><Image src={CartIcon} height={30} width={30} preview={false} /></Badge>
                                    </Dropdown>
                                    <Button type='primary' onClick={() => navigate("/dashboard")}>Dashboard</Button>
                                </Space>
                            </div>
                            <div className="d-flex d-md-none flex-md-row" >
                                <Space size={'middle'} direction='vertical'>
                                    <Dropdown placement="bottomRight" dropdownRender={() => <WishlistDrop wishList={wishListDummyData} />}>
                                        <Badge count={12}><Image src={wishlistIcon} height={30} width={30} preview={false} /></Badge>
                                    </Dropdown>
                                    <Dropdown placement="bottomRight" trigger={"click"}>
                                        <Badge count={12}><Image src={CartIcon} height={30} width={30} preview={false} /></Badge>
                                    </Dropdown>
                                    <Button type='primary' onClick={() => navigate("/dashboard")}>Dashboard</Button>
                                </Space>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>


        </>
    )
}
