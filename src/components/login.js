import React , {useState } from 'react'
import {  useNavigate } from 'react-router-dom';

const Login = () => {
    const [ credential , setcredential] = useState({ email : "" , password :"" })
    let history = useNavigate();
   
    const handleSubmit = async(e) =>{
        e.preventDefault();

const response = await fetch("http://localhost:5000/api/auth/Login",
{
method: "POST",
headers: {
 "Content-Type": "application/json",
 },
 body: JSON.stringify({email : credential.email , password : credential.password}),


});
const json = response.json();
console.log(json);
if (json.success) {
    //save the auth token and redirect
    localStorage.getItem('token' , json.authtoken);
    props.showAlert("login successfully" , "success");
    history.push("/")
   
} else {
  props.showAlert("invalid credential" , "danger");
}
    }
    const onChange = (e) =>{
        setcredential({...credential , [e.target.name]:e.target.value})
    }
  return (
    <div>
       <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" name="email"  value={credential.email} 
    onChange={onChange} aria-describedby="emailHelp"
     placeholder="Enter email"/>
    </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" name= "password"
     value={credential.password} placeholder="Password" onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
