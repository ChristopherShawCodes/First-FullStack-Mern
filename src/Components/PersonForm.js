import React, {useEffect , useState} from 'react'
import axios from 'axios'

const PersonForm = () =>{
    const [message, setMesage] = useState("Loading...")
    useEffect(() =>{
        axios.get('https://localhost:8000/api')
        .then(res=>setMesage(res.data.message))
        .catch(err => console.log(err))
    }, []);
    return(
        <div>
            <h2>Message from the backend: {message}</h2>
        </div>
    )
}
export default PersonForm;