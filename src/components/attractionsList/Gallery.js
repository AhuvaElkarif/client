import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { StarRate } from "@mui/icons-material";
import { getImagesByAttractionId } from "../../store/actions/AttractionActions";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90vw",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const Gallery = ({id, open, setOpen}) => {
    const [arr, setArr] = useState();
    useEffect(()=>{
        getImagesByAttractionId(id)
        .then(x=> setArr(x.data))
        .catch(err => console.log(err));
    },[])
        return ( 
        <Modal
        open={open}
        ariaHideApp={false}
        contentLabel='Image modal'
        onClose={()=>{setOpen(false)}}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      > 
            <Carousel autoPlay interval="5000" axis="vertical" >
     {arr?arr.map(item=>{ return <div key={item.Id}>
                <img src={`http://localhost:81/img/${item.Img}`} alt="" />
            </div>

            }):null}
        </Carousel>
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

      