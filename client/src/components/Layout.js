import React from 'react'
import '../styles/LayoutStyle.css'
import {  adminMenu, userMenu } from '../Data/data.js';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {Badge, message} from 'antd'
import { useSelector } from 'react-redux';


const Layout = ({children}) => {
    const {user} = useSelector(state => state.user)
    const location = useLocation();
    const navigate = useNavigate();
    //logout functioning
    const handleLogout = () =>{
        localStorage.clear()
        message.success('logout succesfully')
        navigate('/login')
    };
    //===============doctor menu==================
   const doctorMenu = [
        { 
         name: 'Home',
         path: '/',
         icon : "fa-solid fa-house",
     },
     {
         name: 'Appointment',
         path: '/doctor-appointments',
         icon: 'fa-solid fa-list'
     },
     {
         name: 'Profile',
         path: `/doctor/profile/${user && user._id}`,
         icon: 'fa-solid fa-user'
     },
     
     ];

    //rendering menu list
    console.log(user&&user.isDoctor);
    const SideBarMenu = user && user.isAdmin ? adminMenu : user&&user.isDoctor ? doctorMenu : userMenu;
  return (
    <>
    <div className='main'>
    <div className='Layout'>
    <div className='sidebar'>
    <div className='logo'>
        <h6>Your Sanjeevani</h6>
        <hr />
        </div>
    <div className='menu'>
    {/* maping menus */}
        {SideBarMenu.map(menu =>{
            const isActive= location.pathname === menu.path
            return (
                <>
                <div className={`menu-item ${ isActive && 'active'}`}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                </div>
                </>
            );
        })}
        <div className={`menu-item`} onClick={handleLogout}>
                    <i className='fa-solid fa-right-from-bracket'></i>
                    <Link to="/login">Logout</Link>
                </div>
        </div>
        </div>
        <div className='content'>
        <div className='header'>
            <div className='header-content' style={{cursor : "pointer"}}>
            <Badge count={user &&user.Notification.length} 
            onClick={()=>{
                navigate('/notification');
                }}
                
                >
                <i className='fa-solid fa-bell'></i>
            </Badge>
            <Link to='/profile'>{user &&user.name}</Link>
            </div>
        </div>
        <div className='body'>{children}</div>
    </div>
        </div>
    </div>
    </>
  )
}

export default Layout;