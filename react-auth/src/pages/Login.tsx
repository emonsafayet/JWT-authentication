import { SyntheticEvent, useState } from "react";
import { Navigate  } from "react-router-dom"; 

const Login =()=>{
    const [email,setEmail] = useState('');
    const [password,setpassword] = useState('');
    const [navigate,setNavigate] = useState(false);

    const submit=async (e:SyntheticEvent)=>{
        e.preventDefault();

        await fetch('http://localhost:28800/api/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            credentials:"include",
            body:JSON.stringify({ 
             email,
             password
            })
        }); 
        setNavigate(true);
    }
    if(navigate)
    {
        return <Navigate  to="/"/>
    }
    return(
    <form onSubmit={submit}> 
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <input type="email" onChange={e=>setEmail(e.target.value)} className="form-control" placeholder="name@example.com" required/>

        <input type="password" onChange={e=>setpassword(e.target.value)} className="form-control" placeholder="Password" required /> 

        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>  
      </form>
    );

};

export default Login;