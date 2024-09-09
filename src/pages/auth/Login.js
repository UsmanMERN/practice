import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from 'config/firebase';
import { Button, Checkbox, Col, Form, Image, Input, Row, Spin, Typography } from 'antd';
import { useAuthContext } from 'contexts/AuthContext';

// assets
import LoginImage from "assets/images/signup.svg";

const { Title, Text } = Typography
const initialState = { email: "", password: "" }
export default function Register() {
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = state
        setIsProcessing(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                readUserProfile(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                let errorMessage
                switch (errorCode) {
                    case 'auth/email-already-in-use': return errorMessage = "An account with this email already exists. Please log in.";
                    case 'auth/invalid-email': return errorMessage = "The email address is not valid.";
                    case 'auth/operation-not-allowed': return errorMessage = "Email/password accounts are not enabled. Please contact support.";
                    case 'auth/weak-password': return errorMessage = "The password is too weak. Please choose a stronger password.";
                    default: errorMessage = "An error occurred during registration. Please try again.";
                }

                setIsProcessing(false)
                return window.toastify(errorMessage, 'error')
            })
    }

    const readUserProfile = async (userCredential) => {
        const { uid } = userCredential
        try {
            const docRef = doc(firestore, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                let user = docSnap.data()
                dispatch({ type: "USER_LOGGED_IN", payload: { user } })
                navigate("/")
                return window.toastify("user login successfull", 'success')
            } else {
                console.log("No such document!");
                return window.toastify("something went wrong while login the user", 'error')
            }
        } catch (error) {
            console.error(error);
            window.toastify("An error occurred during registration. Please try again.", "error")
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <>
            <Row className="min-vh-100">
                <Col xs={24} md={12} lg={16} className="p-0 d-none d-md-block">
                    <Image src={LoginImage} alt="Krist brand image" preview={false} className="h-100 w-100 object-fit-cover" height={"100vh"} width={"100%"} />
                </Col>
                <Col xs={24} sm={{ span: 16, offset: 4 }} md={{ span: 12, offset: 0 }} lg={8} className="d-flex flex-column justify-content-center p-4 p-md-5">
                    <div className="text-center text-md-start mb-3">
                        <Title level={2} className='fw-bold mb-0'>Welcome 👋  </Title>
                        <Text className='text-muted'> Please login here </Text>
                    </div>

                    <Form className="w-100" layout='vertical' onSubmitCapture={handleSubmit}>
                        <Form.Item label="Email Address" className='mb-3 p-0'>
                            <Input type='email' placeholder='Enter your Email' className=' w-100' name='email' onChange={handleChange} size='large' />
                        </Form.Item>
                        <Form.Item label="Password" className='mb-3'>
                            <Input.Password type='text' placeholder='Enter your Password' className='w-100' name='password' onChange={handleChange} size='large' />
                        </Form.Item>
                        <Form.Item>
                            <div className="d-flex justify-content-between">
                                <Checkbox>Remember me</Checkbox>
                                <Link to={"/auth/register"} className='text-decoration-none text-dark'><span className='fw-bold'>Register here</span></Link>
                            </div>
                        </Form.Item>
                        <div className="d-flex justify-content-center align-items-center mt-2 w-100">
                            <Button type="primary" htmlType="submit" className='w-100 bg-dark' size='large' disabled={isProcessing} classNames={"text-white"}>
                                {isProcessing ? <Spin className='text-white' /> : "Login"}
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </>
    );
}
