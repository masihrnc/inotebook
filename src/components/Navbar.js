import React   from 'react'
import {
 Link  , useLocation ,useNavigate
    }from "react-router-dom"



const Navbar = () => {
  let navigate = useNavigate();
  const handlelogout =() => {
    localStorage.removeItem ('token');
    navigate('/login');
  }
  let location = useLocation();
 /* React.useEffect(() => {
    console.log(location);
     }, [location]);*/
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link className="navbar-brand" to="#">iNoteBook</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" 
  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className={`nav-link ${location.pathname==="/"? "active" : ""}`}  to="/">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${location.pathname==="/aboutus"? "active" : ""}`} to="/aboutus">Aboutus</Link>
      </li>
      
    </ul>
   { localStorage.getItem ('token')?
    <form className="d-flex">
    <Link  class="btn btn-primary mx-2 " to="/login" role="button" >Login</Link>
     <Link class="btn btn-secondary mx-2" to= "/signup" role="button" >Signup</Link>
    </form> : <button onClick={handlelogout} className="btn btn-primary">Logout</button>}
  </div>
</nav>
  )
}

export default Navbar
