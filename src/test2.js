import React, { useEffect, useState } from 'react'
import axios from 'axios'
const AddImg = () => {
  const [FileName, setFileName] = useState('');
  const [File, setFile] = useState(null);


  const send = () => {
//   C:\inetpub\wwwroot\image
    const formData = new FormData();
    formData.append('Image', File);
    formData.append('FileName', FileName);
    formData.append('Id', 2);

    axios.post(`http://localhost:57828/Api/Image`, formData)
    .then(x => console.log(x.data));
  }
  return (
    <>
      <input type="file" onChange={({ target }) => setFile(target.files[0])} />

      <input value={FileName} onChange={({ target }) => setFileName(target.value)} />
      {/* {PathUrl ? <img
        className="main-img"
        alt={PathUrl}
        // src={globalFileServer + 'iconcss/' + PathUrl}
      /> :null} */}
       <button onClick={send}>שליחה</button>
    </>
  )
}

export default AddImg
