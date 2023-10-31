import React, { useEffect } from 'react'
// import { navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import { setUser } from '../redux/features/userSlice'
export default function ProtectedRoute({children}) {
    const navigate  = useNavigate();
    const dispatch = useDispatch()
    const {user } = useSelector(state => state.user)

    //get user
    const getUser = async() =>{
        try{
            dispatch(showLoading())
            const res = await axios.post('/api/v1/users//getUserData',
            {token : localStorage.getItem('token')},
            {
                headers: {
                Authorization : `Bearer ${ localStorage.getItem('token')}`
            }
            })
            dispatch(hideLoading());
            if(res.data.success){
                dispatch(setUser(res.data.data))
            } else{
                navigate('/login')
                localStorage.clear()
            }
        } catch(error){
            dispatch(hideLoading())
            localStorage.clear();
            console.log(error);

        }
    }

    useEffect(() => {
        if(!user){
            getUser();
        }
    },[user]);
        if(localStorage.getItem("token")){
        return children
    } else {
        navigate('/login');
    }
  
}
