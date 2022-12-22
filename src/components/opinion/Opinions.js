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
        <div className="opinions-list">
            {opinionsArr.length > 0 ? opinionsArr.map(item => {
                return <div key={item.Id} className="container-opinion">
                    <SingleOpinion opinion={item} />
                </div>
            }) : null}
        </div>
    </>);
}

export default Opinions;