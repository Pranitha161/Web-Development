import { NavLink, Outlet } from "react-router-dom";

function Userprofile(){
    return(
        <div className="d-flex justify-content-center">
            <ul className="nav">
                <li className="nav-item">
                    <NavLink to="articles">Articles</NavLink>
                </li>
            </ul>
            <Outlet/>
        </div>
    )
}
export default Userprofile;