import { useParams, useNavigate } from "react-router";
import Opinions from "../opinion/Opinions";
import { useSelector } from "react-redux";
import "./AttractionsList.css";
import "./DetailsAttraction.css";
import Buttons from "./Buttons";
import Gallery from "./Gallery";
import FullWidthGrid from "./FullWidthGrid";

const DetailsAttraction = () => {
     const navigate = useNavigate();
     const { id } = useParams();
     const attractionArr = useSelector(state => state.attractionArr);
     const product = { ...attractionArr.find(x => x.Id == id) };

     return (
          <div className="detailsAttraction">
               {product == null ? <>loading...</> : (<>
                    <FullWidthGrid images={product.Images} />
                    {/* <Gallery id={id} /> */}
                    <h1>{product.Name}</h1>
                    <h4>{product.Description}</h4>
                    <h4> כתובת: {product.Address}</h4>
                    <h4>  מחיר: {product.Price} ש"ח</h4>
                    <h4> מספר האנשים המינימלי: {product.MinParticipant}</h4>
                    <h4> מספר האנשים המקסימלי: {product.MaxParticipant}</h4>
                    <h4> משך זמן: {product.TimeDuration} דקות</h4>
                    <h4> טווח גילאים מתאים: {product.TillAge} - {product.FromAge}</h4>
                    <br /> {product.IsAvailable ? <p> האטרקציה זמינה כעת </p> : <p>האטרקציה אינה זמינה כעת</p>}
                    <Buttons id={product.Id} />
                    <Opinions attractionId={id} />

               </>)}

          </div>);
}
export default DetailsAttraction;
