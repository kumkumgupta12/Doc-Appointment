import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import '../styles/HomePageStyle.css'
import axios from 'axios'
import moment from "moment"
import { Table } from 'antd'
const Appointments = () => {

    const [appointments, setAppointments] = useState([]);
    const getAppointments = async() =>{
        try{
            const res = await axios.get('/api/v1/users/user-appointments', {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });

            if(res.data.success){
                setAppointments(res.data.data);
            }
        } catch(error){
            console.log(error)
        }
    };

    useEffect(() =>{
        getAppointments();
    }, []);
     
    const columns = [
        {
            title: 'ID',
        dataIndex: '_id'
    },
    // {
    //     title: 'Name',
    //     dataIndex: 'name',
    //      render:(text,record) =>(
    //         <span>
    //         {record.doctorId.firstName} {record.doctorId.lastName}
    //         </span>
    //      )
    // },
    // {
    //     title: 'Phone',
    //     dataIndex: 'phone',
    //      render:(text,record) =>(
    //         <span>
    //         {record.userInfo.phone}
    //         </span>
    //      )
    // },
    {
        title: 'Date & Time',
        dataIndex: 'date',
         render:(text,record) =>(
            <span>
            {moment(record.date).format('DD-MM-YYYY')} &nbsp;
            {moment(record.time).format('HH:mm')}
            </span>
         )
    },
    {
        title: 'status',
        dataIndex: 'status',
    },
    
    ]
  return (
   <Layout>
        <h1 className='list'>Appointments Status</h1>
        <Table columns={columns} dataSource={
            appointments
        } />
        </Layout>
  )
}

export default Appointments