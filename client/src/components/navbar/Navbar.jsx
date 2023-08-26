import "./navbar.css"
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleLogout =()=>{
    localStorage.clear();
    window.location.reload(false);
  }


  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to='/' style={{color:"inherit", textDecoration:"none"}} >
        <span className="logo">Ballin On Budget</span>
        </Link>

      {user ? 
      (<div><h2>Hello , {user.username}</h2> 
        <button className="logout-btn" onClick={handleLogout}>
          Logout
          </button>
          </div>)
      :  (<div className="navItems">
         
         <Link to={'/register'}>
          <button className="navButton">Register</button>
         </Link>
         
          <Link to={'/login'}>
          <button className="navButton">Login</button>
          </Link>
        </div>)}
      </div>
    </div>
  )
}

export default Navbar