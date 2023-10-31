import React from 'react'

import {Form, Input,message} from 'antd';
import  "../styles/register_style.css";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import {useDispatch} from "react-redux"
import { showLoading, hideLoading } from '../redux/features/alertSlice';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  //form handler
    const onfinishHandler = async (values) => {
      try{
        dispatch(showLoading());
        const res = await axios.post("/api/v1/users/register", values);
        dispatch(hideLoading());
        if(res.data.success){
          message.success('Register succesfully')
          navigate('/login')
        } else {
          message.error(res.data.message);
        }
      } catch(error){
        dispatch(hideLoading());
        console.log(error)
        message.error('something went wrong')
  
      }
    };
    return (
      <>
          <div className="form-container">
            <Form layout="vertical" onFinish={onfinishHandler} className='register-form card p-5'>
              <h2 className="text-center">Register Yourself</h2>
              <Form.Item label="Name" name="name">
                <Input type="text" required />
              </Form.Item>
  
              <Form.Item label="Email" name="email">
                <Input type="email" required />
              </Form.Item>
  
              <Form.Item label="Password" name="password">
                <Input type="password" required />
              </Form.Item>
  
              <Form.Item label="Phone" name="phone">
                <Input type="tel" required />
              </Form.Item>
  
              <Link to="/login" className="ms-2 ">Login here</Link>
  
              <button className='btn btn-primary' type = "submit">Register</button>
  
  
              <h4 className="text-center tagline">Be Healthy ...Be happy</h4>
            </Form>
          </div>
      </>
    )
  }


export default Register;

