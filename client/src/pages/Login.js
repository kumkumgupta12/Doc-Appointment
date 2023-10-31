import React from 'react'
import {Form, Input, message} from 'antd';
import  "../styles/register_style.css";
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from "react-redux";
import { showLoading, hideLoading } from '../redux/features/alertSlice';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
    //form handler
 const onfinishHandler = async(values) =>{
    try{
      dispatch(showLoading())
      const res = await axios.post('/api/v1/users/login', values)
      window.location.reload();
      dispatch(hideLoading())
      if(res.data.success){
        localStorage.setItem("token", res.data.token);
        message.success('login successfully')
        navigate('/')
      } else {
        message.error(res.data.message)
      }
    }catch(error){
      dispatch(hideLoading());
      console.log(error)
      message.error('something went wrong')
    }
  }
  return (
    <>
        <div className="form-container">
          <Form layout="vertical" onFinish={onfinishHandler} className='register-form card p-5'>
            <h2 className="text-center">Login here</h2>
            

            <Form.Item label="Email" name="email">
              <Input type="email" required />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input type="password" required />
            </Form.Item>

            <Form.Item label="Phone" name="phone">
              <Input type="tel" required />
            </Form.Item>

            <Link to="/login" className="ms-2 ">Register YourSelf</Link>

            <button className='btn btn-primary' type = "submit">Register</button>


            <h4 className="text-center tagline">Be Healthy ...Be happy</h4>
          </Form>
        </div>
    </>
  )
}

export default Login;