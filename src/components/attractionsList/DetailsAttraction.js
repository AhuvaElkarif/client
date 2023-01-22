import { useParams, useNavigate } from "react-router";
import Opinions from "../opinion/Opinions";
import { shallowEqual, useSelector } from "react-redux";
import "./AttractionsList.css";
import "./DetailsAttraction.css";
import Buttons from "./Buttons";
import Gallery from "./Gallery";
import FullWidthGrid from "./FullWidthGrid";
import './SingleAttraction.css';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import PaymentIcon from '@mui/icons-material/Payment';
import PlaceIcon from '@mui/icons-material/Place';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import FlipToFrontIcon from '@mui/icons-material/FlipToFront';
import { Fragment, useState } from "react";
import { Button } from "@mui/material";
import ActivityTime from "../ActivityTime/ActivityTime";
import MapWithAMarkerClustered from '../map/Map';

const DetailsAttraction = () => {
     const navigate = useNavigate();
     const { id, type } = useParams();
     const [gallery, setGallery] = useState(false);
     const { user, attractionArr } = useSelector(state => {
          return {
               attractionArr: state.attractionArr,
               user: state.user,
          }
     }, shallowEqual);
     const product = { ...attractionArr.find(x => x.Id == id) };

     return <div style={{ marginRight: "1.3rem", marginLeft: "1.3rem" }}>
          <h1 className="h1-details">{product.Name}</h1> <br />
          <div className="detailsAttraction">
               {!product ? <Fragment>loading...</Fragment> : (<Fragment>
                    {product.Images.length >= 14 && <FullWidthGrid images={product.Images} setCarousel={setGallery} />}
                    {gallery && <Gallery id={id} open={gallery} setOpen={setGallery} />}
                    <div className="details">
                         <div className="container-details">

                              <h2>מה תמצאו שם?</h2>
                              <p className="p-details">{product.Description}</p>
                              <br />

                              {product && <ActivityTime id={product.Id} />} <br />
                              <h4> <PlaceIcon /> איפה זה?</h4>
                              <p> כתובת: {product.Address} </p>
                              <br />

                              <h4> <PaymentIcon /> כמה זה עולה?</h4>
                              <p>  {product.Price} ש"ח</p>
                              <br />

                              <h4> <QuestionMarkIcon /> מהי כמות האנשים לאטרקציה? </h4>
                              <p> מספר האנשים המינימלי: {product.MinParticipant}  מספר האנשים המקסימלי: {product.MaxParticipant}</p>
                              <br />

                              <h4> <QueryBuilderIcon /> משך זמן האטרקציה</h4>
                              <p>  {product.TimeDuration} דקות</p>
                              <br />

                              <h4> <FlipToFrontIcon /> טווח גילאי האטרקציה</h4>
                              <p> {product.TillAge} - {product.FromAge}</p>
                              <br />

                              <Opinions attractionId={id} />
                         </div>
                         <div className="communicate">
                              <div className="communicate-container">
                                   <p> התקשרו לפרטים והזמנות:</p> <br />
                                   <p> <PhoneEnabledIcon /> {product.Phone} </p><br />
                                   {!user || user.Status == 1 ? <Button onClick={() => { navigate("/order/" + product.Id) }}
                                        variant="contained"
                                        size="large"
                                        style={{ backgroundColor: "orange" }}>
                                        להזמנת כרטיסים באונליין</Button> :
                                        <Buttons id={product.Id} type={type} />}
                              </div>
                         </div>
                         {product.lat && <MapWithAMarkerClustered type={0} lat={product.lat} lng={product.lng} />}
                    </div>
               </Fragment>)}
          </div>
     </div>
}
export default DetailsAttraction;
