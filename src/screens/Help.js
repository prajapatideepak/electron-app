import React from 'react'
import {registerStudent} from '../hooks/usePost';

const Help = () => {
  const [img, setImg] = React.useState({});

  const handleImageChange = (e)=>{
    setImg(e.target.files[0])
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('file', img)
    await registerStudent(formdata); 
  }

  return (
    <div>
        <form encType="multipart/form-data" method="post" action="http://localhost:4000/students/register">
          <input type="file" name="studentProfile" accept="jpeg" onChange={handleImageChange} />
          <input type="text" value="sadik" name="username" />
          <input type="submit"
          //  onClick={handleSubmit}
           />
        </form>
    </div>
  )
}

export default Help
