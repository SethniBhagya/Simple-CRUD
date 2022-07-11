import React, { useState, useEffect} from "react";
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Button} from 'react-bootstrap'
import { Fragment } from "react";

function Regform(props) {

  const [name,setName]=useState('')
  const [district,setDistrict]=useState('')
  const [email,setEmail]=useState('');
  const [userList,setUserList] = useState([])
  const [newUser,setNewUser] =useState("");

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get").then((response)=>{
      setUserList(response.data);
    });
  },[]);

  const handleNameChange =(e)=>{
    setName(e.target.value)
  }
  const handleDistrictChange =(e)=>{
  setDistrict(e.target.value)
  }
  const handleEmailChange =(e)=>{
    setEmail(e.target.value)
  }

  const submitDetails=()=>{
    Axios.post("http://localhost:3001/api/insert",{
    name:name, district:district, email:email
    }).then(()=>{
    setUserList([...userList,{name:name, district:district, email:email}]);
  });

  

}
const deleteUser=(user)=>{
  Axios.delete(`http://localhost:3001/api/delete/${user}`)
  Axios.get("http://localhost:3001/api/get").then((response)=>{
    setUserList(response.data);
  })
  
}

const updateUser=(user)=>{
  Axios.put("http://localhost:3001/api/update",{
    name:user, district:newUser,
  })
  
  Axios.get("http://localhost:3001/api/get").then((response)=>{
    setUserList(response.data);
  })
  setNewUser("");
  
 
}

    return(
      <div className="container">
      <Form >
      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label></Form.Label>
          <h3>Enter User Details</h3>
          
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Full Name</Form.Label>
          <Form.Control name="name" onChange={handleNameChange}  type="text" placeholder="Enter Full Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label name="disct">District</Form.Label>
          <Form.Control name="district" onChange={handleDistrictChange}  type="text" placeholder="District" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label name="email">Email</Form.Label>
          <Form.Control name="email" onChange={handleEmailChange}  type="email" placeholder="Email" />
        </Form.Group>
        
        <Button variant="primary" type="submit" onClick={submitDetails} >
          Submit
        </Button>

      </Form>
<hr />
      <h3>View User Details</h3>

      
   <table class="table">
      <thead>
          <tr class="table-dark">
          <th scope="col">#</th>
      <th scope="col">NAME</th>
      <th scope="col">DISTRICT</th>
      <th scope="col">EMAIL</th>
      <th scope="col"></th>
      <th scope="col">UPDATE DISTRICT</th>
      <th scope="col"></th>
    
          </tr>
          </thead>
          <tbody>
          
      {userList.map((val)=>{
        return(
        <Fragment>
          <tr class="table-primary">
          <th scope="row">{val.id}</th>
      <td>{val.name}</td>
      <td>{val.district}</td>
      <td>{val.email}</td>
      <td><button type="button" class="btn btn-warning" onClick={ ()=> { console.log(val.id); deleteUser(val.id)}}>Delete</button></td>
      <td><input placeholder="Update District" type="text" id="updateInput" onChange={(e)=>{setNewUser(e.target.value)}} /></td>
      <td><button type="button" class="btn btn-success" onClick={()=>{updateUser(val.name)}} >Update</button></td>
            </tr>

        </Fragment>)
      })}
      
      </tbody>
</table>
      </div>
    )
}

export default Regform