import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";;

function Phr() {
    const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
     if (!file) {
    setMessage("Please select a file before uploading.");
    return;
  }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8080/upload", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(res.data);
      setMessage(res.data.message);
    } catch (err) {
      setMessage("File upload failed");
      console.log(err);
    }
  };
    return (  
    <>
    <Navbar/>
     <form onSubmit={onSubmit}>
        <input type="file" onChange={onFileChange} />
        <button type="submit">Upload</button>
      </form>
      <p>{message}</p>
    </>
    );
}

export default Phr;