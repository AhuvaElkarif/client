import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { getImagesByAttractionId } from "../../store/actions/AttractionActions";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const style = {
    position: 'absolute',
    // top: '50%',
    top:'16rem',
    left: '50%',
    marginBottom:"2rem",
    marginTop:"2rem",
    transform: 'translate(-50%, -50%)',
    // width: "85vw",
    // boxShadow: 24,
    p: 4,
  };
const Gallery = ({id, open, setOpen}) => {
    const [arr, setArr] = useState([]);
    const [show, setShow] = useState(false);
    useEffect(()=>{
        getImagesByAttractionId(id)
        .then(x=> setArr(x.data))
        .catch(err => console.log(err));
        const timeId = setTimeout(() => {
          setShow(true);
        }, 4000)
        return () => {
          clearTimeout(timeId);
        }
    },[]);
        return ( <Modal
        open={open}
        ariaHideApp={false}
        contentLabel='Image modal'
        onClose={()=>{setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > 
      <Box sx={style} style={{height:"100vh", marginBottom:"3rem",}}>
      {show ?<Carousel autoPlay interval="3000" axis="vertical">
     {arr.length>0 && arr.map(item=>{ return <div key={item.Id}>
                <img src={`http://localhost:81/img/${item.Img}`} alt="" style={{height:"100vh", width:"85vw"}}/>
            </div>

            })}
        </Carousel>:<CircularProgress/>}
  </Box>
           
      </Modal>

          )};
          export default Gallery
      {/* <Modal
        open={open}
        onClose={()=>{setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > */}
        {/* <Box sx={style}> */}
        {/* <div  style={{height:"70vh", width:"80vw", position:"relative", right:"7rem", display:"block"}}> */}
        {/* <Carousel autoPlay axis="vertical" infiniteLoop interval="5000"> */}
        {/* <Carousel autoPlay axis="vertical" interval="4000" > */}
           

        {/* </Box> */}

      