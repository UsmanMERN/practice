import { Button, Checkbox, Col, Form, Image, Input, Row, Spin, Typography } from 'antd'
import React, { useState } from 'react'

import LoginImage from "assets/images/loginpage.png";
import { useAuthContext } from 'contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from 'config/firebase';
import { doc, setDoc } from 'firebase/firestore';

const { Title, Text } = Typography
const initialState = { firstName: "", lastName: "", email: "", password: "" }
export default function Register() {
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = () => {

        const { email, password } = state
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                createUserProfile(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    const createUserProfile = async (userCredential) => {
        const { uid } = userCredential
        const { email, firstName, lastName } = state
        const user = { email, firstName, lastName, fullName: firstName + " " + lastName, status: "active", roles: ['customer'], uid }

        await setDoc(doc(firestore, "users", uid), user);

        dispatch({ type: "USER_LOGGED_IN", payload: user })
        window.toastify("Register successfull", 'success')
    }
    return (
        <>
            <Row className="min-vh-100">
                <Col xs={24} md={12} lg={16} className="p-0 d-none d-md-block">
                    <Image src={LoginImage} alt="Krist brand image" preview={false} className="h-100 w-100 object-fit-cover" height={"100vh"} width={"100%"} />
                </Col>
                <Col xs={24} sm={{ span: 16, offset: 4 }} md={{ span: 12, offset: 0 }} lg={8} className="d-flex flex-column justify-content-center p-4 p-md-5">
                    <div className="text-center text-md-start mb-3">
                        <Title level={2} className='fw-bold mb-0'>Create New Account </Title>
                        <Text className='text-muted'> Please enter details </Text>
                    </div>

                    <Form className="w-100" layout='vertical' onSubmitCapture={handleSubmit}>
                        <Form.Item label="First Name" className='mb-3 p-0'>
                            <Input type='text' placeholder='Enter your First Name' className=' w-100' name='firstName' onChange={handleChange} size='large' />
                        </Form.Item>
                        <Form.Item label="Last Name" className='mb-3 p-0'>
                            <Input type='text' placeholder='Enter your Last Name' className=' w-100' name='lastName' onChange={handleChange} size='large' />
                        </Form.Item>
                        <Form.Item label="Email Address" className='mb-3 p-0'>
                            <Input type='email' placeholder='Enter your Email' className=' w-100' name='email' onChange={handleChange} size='large' />
                        </Form.Item>
                        <Form.Item label="Password" className='mb-3'>
                            <Input.Password type='text' placeholder='Enter your Password' className='w-100' name='password' onChange={handleChange} size='large' />
                        </Form.Item>
                        <Form.Item>
                            <div className="d-flex justify-content-between mb-3">
                                <Checkbox>I agree to the <span className='fw-bold'>Terms & Conditions</span></Checkbox>
                                <Link to={"/auth/login"} className='text-decoration-none text-dark'>Login</Link>
                            </div>
                        </Form.Item>
                        <div className="d-flex justify-content-center align-items-center mt-2 w-100">
                            <Button type="primary" htmlType="submit" className='w-100 bg-dark' size='large' disabled={isProcessing} classNames={"text-white"}>
                                {isProcessing ? <Spin className='text-white' /> : "Signup"}
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </>

    )
}
