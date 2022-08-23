import SingleOpinion from "./SingleOpinion";
import { getOpinionsByAttrctionId } from "../../store/actions/OpinionsActions";
import { useEffect, useState } from "react";

const Opinions = ({ attractionId }) => {
    const [opinionsArr, setOpioniosArr] = useState([]);

    useEffect(() => {
        getOpinionsByAttrctionId(attractionId)
            .then(x => setOpioniosArr(x.data))
            .catch(err => console.log(err))
    }, [attractionId])
    return (<>
        <div className="product-list">
            {opinionsArr.map(item => {
                return <div key={item.Id} className="container list"><SingleOpinion opinion={item} /> </div>
            })}
        </div>
    </>);
}

export default Opinions;