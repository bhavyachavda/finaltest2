import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const  View = ()=>{
    const [recid, setRecid] = useState('')
    const [code, setCode] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [hobbies, setHobbies] = useState("");
    const [file, setFile] = useState("");
    // const [filename, setFilename] = useState("");
    const [country, setCountry] = useState("");
    let dateadded = new Date().toISOString().slice(0,24)
    
    
    useEffect(()=>{
        setupdatedata();
    },[])

    const navigate = useNavigate();
    const setupdatedata = async()=>{
        try {
            const eid = localStorage.getItem("edit_id");
            console.log("fetch id", eid);
            setRecid(eid);
            console.log(localStorage.getItem("edit_id"));
            const req = await axios.get("http://localhost:8000/userdata",{params:{eid}})
            console.log(req.data[0].firstname);
            setCode(req.data[0].code);
            setFirstname(req.data[0].firstname);
            setLastname(req.data[0].lastname);
            setEmail(req.data[0].email);
            setGender(req.data[0].gender);
            setHobbies(req.data[0].hobbies.split(','));
            setFile(req.data[0].file);
            // setFilename(req.data[0].filename);
            setCountry(req.data[0].country);
        } catch (error) {
            error.status(404);
        }
    }

    const handleUpdate = async(e) => {
        try {
            e.preventDefault();
            const req = await axios.get("http://localhost:8000/updateuser",
            {params:{recid,code,firstname,lastname,email,gender,hobbies,file,country}})
            navigate("/List");
        } catch (error) {
            
        }

    };

     const saveFile = (e) =>{
      setFile(e.target.files[0]);
      //  setFilename(e.target.files[0].name)
     };
  

    const gethobbies = (e) => { 
        const { value, checked } = e.target
        if (checked) { 
          setHobbies([...hobbies, value])}
           else { 
            setHobbies(hobbies.filter((e) => e !== value))
          }}

    const handleHome = () =>{
        navigate("/");
    }

    const findImageName = (tData) => {
        console.log(tData);
        if (tData && tData != "") {
          let ansss = tData.split("/");
          ansss = ansss[ansss.length - 1];
          return ansss;
        } else {
          return "download (1).jpg";
        }
      };

    return(
        <div>
            <form onSubmit={handleUpdate}>
            <table style={{ "width": "70vw", "marginTop": "1rem", "marginLeft": "2rem" }}>
            <div>
                 <img src={`http://localhost:8000/getimage/${findImageName(file)}`} 
              style={{height:"100px"}}/>
            </div>
               
          <tr>
            <td>
              <label for="code">Code</label>
            </td>
            <td>
              <input
                type="text"
                id="code"
                name="code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label for="firstname">Firstname</label>
            </td>
            <td>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label for="lastname">Lastname</label>
            </td>
            <td>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label for="email">Email</label>
            </td>
            <td>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label for="gender">Gender</label>
            </td>
            <td>
              <label for="Male">Male</label>
              <input
                type="radio"
                id="Male"
                name="gender"
                value="Male"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                checked={gender=='M'?"true":""}
              />
              &nbsp;
              <label for="Female">Female</label>
              <input
                type="radio"
                id="Female"
                name="gender"
                value="Female"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                checked={gender=='F'?"true":""}
              />
            </td>
          </tr>

          <tr>
            <td>
              <label >Hobbies</label>
            </td>
            <td>
              <label for="Reading">Reading</label>
              <input
                type="checkbox"
                id="Reading"
                name="hobbies"
                value="Reading"
                onChange={gethobbies}
                checked={hobbies.includes("Reading") ? "true" : ""}
                
              />
              &nbsp;
              <label for="Travelling">Travelling</label>
              <input
                type="checkbox"
                id="Travelling"
                name="hobbies"
                value="Travelling"
                onChange={gethobbies}
                checked={hobbies.includes("Travelling") ? "true" : ""}
              />
              &nbsp;
              <label for="Music">Music</label>
              <input
                type="checkbox"
                id="Music"
                name="hobbies"
                value="Music"
                onChange={gethobbies}
                checked={hobbies.includes("Music") ? "true" : ""}
              />
              &nbsp;
              <label for="Cricket">Cricket</label>
              <input
                type="checkbox"
                id="Cricket"
                name="hobbies"
                value="Cricket"
                onChange={gethobbies}
                checked={hobbies.includes("Cricket") ? "true" : ""}
              />
              &nbsp;
              <label for="Dancing">Dancing</label>
              <input
                type="checkbox"
                id="Dancing"
                name="hobbies"
                value="Dancing"
                onChange={gethobbies}
                checked={hobbies.includes("Dancing") ? "true" : ""}
              />
              &nbsp;
              <label for="Singing">Singing</label>
              <input
                type="checkbox"
                id="Singing"
                name="hobbies"
                value="Singing"
                onChange={gethobbies}
                checked={hobbies.includes("Singing") ? "true" : ""}
              />
            </td>
          </tr>

          {/* <tr>
            <td>
              <label for="photo">Photo</label>
            </td>
            <td>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={saveFile}
              />
            </td>
          </tr> */}

          <tr>
            <td>
              <label for="country">Country</label>
            </td>
            <td>
              <select value={country} onChange={(e) => {setCountry(e.target.value);}}>
                <option id="country" value="India" >India</option>
                <option id="country" value="USA">USA</option>
                <option id="country" value="Russia">Russia</option>
                <option id="country" value="Pakistan">Pakistan</option>
                <option id="country" value="China">China</option>
                <option id="country" value="afghanistan">Afghanistan</option>
              </select>
            </td>
          </tr>

          <tr>
            <br />
            <br />
            <td>
              <button
                className="btn btn-dark"
                type="button"
                value="Back"
                onClick={handleHome}
              >
                Back
              </button>
              &nbsp;
              {/* <button
                className="btn btn-dark"
                type="submit"
                value="submit"
              >
                Submit
              </button> */}
            </td>
          </tr>
        </table>
            </form>
        </div>
    )   
}

export default View;