import React, { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import '../App.css'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
    const navigate = useNavigate()

const [userdetails,setuserdetails]= useState({email:"",Password:""})

console.log(userdetails);
const handlelogin=()=>{
    if(userdetails.email && userdetails.Password){
        toast.success("Succesfully logedin")
        navigate('/Home')

    }else{
toast.warning("Please Fill The Form Completely")
    }
}

    return (
        <>

            <div style={{ height: "100vh" }} className='main w-100 d-flex justify-content-center align-item-center  '>


                <div style={{ height: "80vh", }} className='login rounded mt-5 w-50 p-3'>
                    <div className='text-center'><i  class="fa-brands fa-slack"></i>
                        <div><h5>Slack</h5></div></div>
                    <h2 style={{ opacity: '1', textAlign: "center" }}>Login</h2>
                    <h5 className='' style={{ opacity: '1', textAlign: "center" }}>Enter the details to login!!!</h5>
                    <hr />

                    <input type="email" className='form-control mb-2 mt-' placeholder='Enter the Registered email' value={userdetails.email} onChange={(e)=>setuserdetails({...userdetails,email : e.target.value})}  />
                    <input type="text" className='form-control mb-2' placeholder='Password' value={userdetails.Password} onChange={(e)=>setuserdetails({...userdetails,Password : e.target.value})} />
                    <div className='d-flex justify-content-between'>
                        <div><button className='btn btn-primary' onClick={handlelogin}>Login</button></div>
                        <div><a style={{ color: 'black' }} href="">Forgot Password?</a></div>
                    </div>
                    <hr />


                    <div className='text-center mt-3 container '>
                       <div>
                            <GoogleLogin 
                                onSuccess={credentialResponse => {
                                    const ResponseDecoded = jwtDecode(credentialResponse.credential);
                                    console.log(ResponseDecoded);
                                    sessionStorage.setItem("userName", ResponseDecoded.name);
                                    sessionStorage.setItem("Image", ResponseDecoded.picture)
                                    navigate('/Home')
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />;
                       </div>
                    </div>
                </div>
            </div>

            <ToastContainer position='top-center' theme='colored' autoClose={2000} />
        </>
    )
}

export default Login