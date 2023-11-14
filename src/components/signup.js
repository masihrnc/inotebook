import React , {useState } from 'react'
import {  useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [ credential , setcredential] = useState({ name :"" ,email : "" , password :"" ,cpassword: "" })
  let history = useNavigate();
 
  const handleSubmit = async(e) =>{
      e.preventDefault();
const {name , email ,password} = credential;
const response = await fetch("http://localhost:5000/api/auth/createuser",
{
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({email  , password , name}),


});
const json = response.json();
console.log(json);
if (json.success) {
  //save the auth token and redirect
  localStorage.getItem('token' , json.authtoken);
  history.push("/")
  props.showAlert("successfully create  credential" , "success");
} else {
  props.showAlert("invalid credential" , "danger");
}
  }
  const onChange = (e) =>{
    setcredential({...credential , [e.target.name]:e.target.value})
}
  return (
    <div>
       <form>
  <div className="form-group" onSubmit={handleSubmit}>
    <label htmlFor="name">NAME</label>
    <input type="text" className="form-control" id="name" aria-describedby="emailHelp"onChange ={onChange}  placeholder="Enter email"/>
    </div>
  <div className="form-group">
    <label htmlFor="Email">Email</label>
    <input type="email" className="form-control" id="Email" aria-describedby="emailHelp"onChange ={onChange}  placeholder="Enter email"/>
    </div>
  <div className="form-group">
    <label htmlFor="Password">Password</label>
    <input type="password" className="form-control" id="Password"onChange ={onChange}  placeholder="Password" minLength={5} required/>
  </div>
  <div className="form-group">
    <label htmlFor="cpassword">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword"onChange ={onChange}  placeholder="confirm Password"  minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
