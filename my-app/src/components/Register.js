import {useForm} from "react-hook-form"
import axios from 'axios'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Register(){
    let navigate=useNavigate();
    let {register,handleSubmit}=useForm();
    let [err,setErr]=useState('')

    async function handleFormSubmit(userobj){
       let res= await axios.post('http://localhost:4000/user-api/users',userobj)
       console.log(res.data.Message)
       if(res.data.Message==='User created'){
            navigate('/signin')
       }else{
        setErr(res.data.message)
       }
    }
    return(
        <div>
            {err && err.length !== 0 && <p className="text-danger">Error in Register: {err}</p>}
            <h1 className="display-1 text-center text-info"> SignUp</h1>
            <form className="w-50 mx-auto mt-5" onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="d-flex justify-content-center">
                <input type="radio" name="usertype" value="author"  {...register('usertype')}    />
                <label htmlFor="author" className="me-4">Author</label>
                <input type="radio"  name="usertype" value="user"  {...register('usertype')}    />
                <label htmlFor="user">User</label>
                </div>
                <div>
                <label className="form-label" htmlFor="username">Username</label>
                <input type="text" id="username" className="form-control"    {...register('username')}/>
                <label className="form-label" htmlFor="password">Password</label>
                <input type="password" id="password" className="form-control"    {...register('password')}/>
                    <label className="form-label" htmlFor="email">Email</label>
                <input type="email" id="email" className="form-control"    {...register('email')}/>
                </div>
               <button className="btn btn-success d-flex mx-auto mt-4">Register</button>
            </form>
            <div><p className="text center">Already Registered</p><Link to={'/signin'}>login</Link></div>
        </div>
    )
}
export default Register;

