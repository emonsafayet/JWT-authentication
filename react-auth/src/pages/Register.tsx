import { SyntheticEvent, useState } from "react";
import { Navigate  } from "react-router-dom"; 
 

const Register =()=>{
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setpassword] = useState('');
    const [navigate,setNavigate] = useState(false);

    const submit=async (e:SyntheticEvent)=>{
        e.preventDefault();
        await fetch('http://localhost:28800/api/register',{
           method:'POST',
           headers:{'Content-Type':'application/json'},
           body:JSON.stringify({
            name,
            email,
            password
           })
       }); 
       setNavigate(true);
    }

    if(navigate)
    {
        return <Navigate  to="/login"/>
    }
 

    return(   
        <form onSubmit={submit}> 
        <h1 className="h3 mb-3 fw-normal">Please Register</h1>
        <input className="form-control" placeholder="name" required
        onChange={e=>setName(e.target.value)}/>

        <input type="email" className="form-control" placeholder="name@example.com" required
          onChange={e=>setEmail(e.target.value)}/>

        <input type="password" className="form-control" placeholder="Password" required
        onChange={e=>setpassword(e.target.value)} /> 

        <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>  
      </form>
      );

};

export default Register;