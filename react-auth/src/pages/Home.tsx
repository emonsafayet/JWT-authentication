import { useParams } from "react-router-dom";

function Home(props:{name: string}) {
  debugger;
  
  return (
    <div>{props.name ? 'Hi-'+ props.name :'You are not logged in'}</div>
  )
} 
 
export default Home;