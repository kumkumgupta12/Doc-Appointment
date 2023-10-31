//created an array/list of all menu which should be present in our menu


export const userMenu = [
   { 
    name: 'Home',
    path: '/',
    icon : "fa-solid fa-house",
},
{
    name: 'Appointment',
    path: '/appointment',
    icon: 'fa-solid fa-list'
},
{
    name:'Apply Doctor',
    path:'/apply-doctor',
    icon: 'fa-solid fa-user-doctor'
},
{
    name: 'Profile',
    path: '/profile',
    icon: 'fa-solid fa-user'
},

];

//map this file to layout file


//admin menu
export const adminMenu = [
    { 
     name: 'Home',
     path: '/',
     icon : "fa-solid fa-house",
 },
 
 {
     name:' Doctors',
     path:'/admin/doctors',
     icon: 'fa-solid fa-user-doctor'
 },
 {
    name: 'users',
    path: '/admin/users',
    icon: 'fa-solid fa-user'
},
 {
     name: 'Profile',
     path: '/doctor/profile/:id',
     icon: 'fa-solid fa-user'
 },
 
 ];