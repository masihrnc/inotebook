import React   from 'react'
import {
 Link  , useLocation
    }from "react-router-dom"

 

  
const Navbar = () => {
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
    <form className="d-flex">
    <Link  class="btn btn-primary mx-2 " to="/login" role="button" >Login</Link>
     <Link class="btn btn-secondary mx-2" to= "/signup" role="button" >Signup</Link>
    </form>
  </div>
</nav>
  )
}

export default Navbar
