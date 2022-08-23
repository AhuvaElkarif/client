import { useParams, useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import Opinions from "../opinion/Opinions";
import { shallowEqual, useSelector } from "react-redux";
import "./AttractionsList.css";
import "./DetailsAttraction.css";
import Buttons from "./Buttons";

const DetailsAttraction = () => {
     const navigate = useNavigate();
     const { id } = useParams();
     const { attractions } = useSelector(state => {
          return {
               attractions: state.attractionArr
          }
     }, shallowEqual);
     const product = { ...attractions.find(x => x.Id == id) };

    
     return (
          <div className="detailsAttraction">
               {product == null ? <>loading...</> : (<>
                    <h1>{product.Name}</h1>
                    <h4>{product.Description}</h4>
                    <h4> כתובת: {product.Address}</h4>
                    <h4>  מחיר: {product.Price} ש"ח</h4>
                    <h4> מספר האנשים המינימלי: {product.MinParticipant}</h4>
                    <h4> מספר האנשים המקסימלי: {product.MaxParticipant}</h4>
                    <h4> משך זמן: {product.TimeDuration} דקות</h4>
                    <h4> טווח גילאים מתאים: {product.TillAge} - {product.FromAge}</h4>
                    <br /> {product.IsAvailable ? <p> האטרקציה זמינה כעת </p> : <p>האטרקציה אינה זמינה כעת</p>}
                    <Buttons id={product.Id}/>
                    <Opinions attractionId={product.Id} />
                   
               </>)}

          </div>);
}
export default DetailsAttraction;
