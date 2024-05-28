import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import { resetState } from "../redux/userAuthorSlice";
function Nav(){
    let dispatch=useDispatch()
    let {currentUser,loginUserStatus,errorOccurred,errMsg}=useSelector((state)=>state.userAuthoruserAuthorLoginReducer)
    function signOut(){
        localStorage.removeItem('token')
        dispatch(resetState())
    }
    return(
        <div className=" d-flex justify-content-end">
            
            {loginUserStatus===false?(<>
                <ul className="nav">
                <li className="nav-item"><NavLink className="nav-link" to=''>Home</NavLink></li>
            </ul>
            <ul className="nav">
                <li className="nav-item"><NavLink className="nav-link" to="signup">SingUp</NavLink></li>
            </ul>
            <ul className="nav">
                <li className="nav-item"><NavLink className="nav-link" to="signin">SignIn</NavLink></li>
            </ul></>):( <ul className="nav">
                <li className="nav-item"><NavLink className="nav-link" onClick={signOut} to="signin">
                    <p>Welcome,{currentUser.username}</p>Signout</NavLink></li>
            </ul>)}
            
        </div>
    )
}
export default Nav;