import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import moment from "moment"
import { Table , message} from 'antd'

const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const getAppointments = async() =>{
        try{
            const res = await axios.get('/api/v1/doctor/doctor-appointments', {
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
     

    const handleStatus = async(record, status)=>{
        try{
           const res = await axios.post('/api/v1/doctor/updateStatus', {appointmentsId: record._id, status},
           {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
           })
           if(res.data.success){
            message.success(res.data.message);
            getAppointments();
           }
        } catch(error){
            console.log(error)
            message.error('somenthing went wrong')
        }
    };
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
    {
        title: 'Actions',
        dataIndex: 'actions',
        render : (text,record) =>(
            <div className='d-flex'>
                {record.status === "pending" && (
                    <div className='d-flex'>
                        <button className= 'btn btn-success' onClick={()=>handleStatus(record,'approved')}> Approve</button> &nbsp;
                        <button className= "btn btn-danger" onClick={()=>handleStatus(record,'reject')}> Reject</button>
                    </div>
                )}
            </div>
        )
    },
    
    ]
  return (
   <Layout>
        <h1>Appointments Lists</h1>
        <Table columns={columns} dataSource={
            appointments
        } />
        </Layout>
  )
}

export default DoctorAppointments