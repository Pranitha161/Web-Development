import { useForm } from "react-hook-form";
import {useDispatch, useSelector} from 'react-redux'
import { userAuthorLoginThunk } from "../redux/userAuthorSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Login() {
  let { register, handleSubmit } = useForm();
  let dispatch=useDispatch()
  let navigate=useNavigate()
  let {loginUserStatus,currentUser,errorOccurred,errMsg}=useSelector((state)=>state.userAuthoruserAuthorLoginReducer)
  function handleFormSubmit(userobj) {
    dispatch(userAuthorLoginThunk(userobj))
  }
  useEffect(()=>{
    // console.log(loginUserStatus)
    if(loginUserStatus===true){
      if(currentUser.usertype==='user'){
        navigate('/userprofile')
      }
    if(currentUser.usertype==='author'){
    navigate('/authorprofile')
  }
}
  },[loginUserStatus])
   
  return (
    <div>
      <h1 className="display-1 text-info text-center">SignIn</h1>
      <form className="w-50 mx-auto mt-5" onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          <div className="d-flex justify-content-center">

            <input type="radio" name="usertype" value="user" {...register('usertype',{required:true})}/>
            <label htmlFor="user" className="me-4">User</label>
            <input type="radio" name="usertype" value="author" {...register('usertype',{required:true})}/>
            <label htmlFor="user" className="me-4">Author</label>
            <input type="radio" name="usertype" value="admin" {...register('usertype',{required:true})}/>
            <label htmlFor="user" className="me-4">Admin</label>
          </div>
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            {...register("username")}
          />
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            {...register("password")}
          />
        </div>
        <button className="btn btn-success d-flex mx-auto mt-4">Login</button>
      </form>
    </div>
  );
}

export default Login;
