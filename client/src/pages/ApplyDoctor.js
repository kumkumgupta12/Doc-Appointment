import React from 'react'
import Layout from'./../components/Layout.js'
import {useSelector, useDispatch} from 'react-redux'
import { message } from 'antd'
import axios from 'axios';
import '../styles/HomePageStyle.css'
import {useNavigate} from 'react-router-dom'
import {Form, Row,Col, Input,TimePicker} from 'antd';
import moment from "moment"
import {showLoading, hideLoading} from '../redux/features/alertSlice'
const ApplyDoctor = () => {
  const {user} = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //handle form
    const handleFinish = async(values) =>{
        try{
            dispatch(showLoading())
            const res =  await axios.post('/api/v1/users/apply-doctor',
             {...values,
                 userId:user._id,
                 timings: [
                    moment(values.timings[0]).format("HH:mm"),
                    moment(values.timings[1]).format("HH:mm"),
                  ],
                }, 
                {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                },
            }
            );
            dispatch(hideLoading());
            if(res.data.success){
                message.success(res.data.message);
                navigate('/')
            } else {
                message.error(res.data.success)
            }
        } catch(error){
            dispatch(hideLoading());
            console.log(error)
            message.error('something went wrong')
        }
    };
  return (
    <Layout>
        <h1 className='list ' >Apply For Doctor Position</h1>
        <Form layout='vertical' onFinish={handleFinish} className='m-3'>
            <Row gutter={20}>
                <h4 className='text-light'>Personal Details:</h4>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="First Name"  name = "firstName" required rules={[{required:true}]}>
                        <Input type="text" placeholder="your name"/>
                    </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Last Name"  name = "lastName" required rules={[{required:true}]}>
                        <Input type="text" placeholder="last name"/>
                    </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Phone"  name = "phone" required rules={[{required:true}]}>
                        <Input type="text" placeholder="Phone no."/>
                    </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="email id"  name = "email" required rules={[{required:true}]}>
                        <Input type="text" placeholder="your email"/>
                    </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Website url"  name = "website" >
                        <Input type="text" placeholder="your website"/>
                    </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Address"  name = "address" required rules={[{required:true}]}>
                        <Input type="text" placeholder="your address"/>
                    </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Specialization"  name = "specialization" required rules={[{required:true}]}>
                        <Input type="text" placeholder="your specialization"/>
                    </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Experience"  name = "experience" required rules={[{required:true}]}>
                        <Input type="text" placeholder="your experience"/>
                    </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="fees"  name = "fees" required rules={[{required:true}]}>
                        <Input type="text" placeholder="your experience"/>
                    </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="status"  name = "status" required rules={[{required:true}]}>
                        <Input type="text" placeholder="your experience"/>
                    </Form.Item>
                </Col>


                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Timing of availaibility"  name = "timings" >
                       <TimePicker.RangePicker format=" HH:mm" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}></Col>
                <Col xs={24} md={24} lg={8}>
                <button className="btn btn-primary"> Submit</button>
                </Col>
            </Row>
        </Form>
    </Layout>
  )
}

export default ApplyDoctor;