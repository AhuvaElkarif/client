import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const HotAttraction = () => {
    const attractions = useSelector(state => state.attractionArr);
    const [obj,setObj] = useState(null);
    useEffect(() => {
        const month = new Date().getMonth();
        if (month >= 1 && month <= 3)
            setObj(2);
        else
            if (month >= 4 && month <= 6)
                setObj(3);
            else
                if (month >= 7 && month <= 9)
                    setObj(4);

                else
                    setObj(1);
    }, [attractions]);
return<Fragment> <h2>מה חם אצלנו כרגע</h2>
<div className='images-list'>
    {attractions ? <>{attractions.map((item, index) => {
        if (item.Seasons.includes(obj) && index<3)
            return <div >
                <img src={`http://localhost:81/img/${item.Images.slice(0, 14)}`}className={index == 0 ? "bigestImg" : index == 1 ? "bigImg" : "smallerImg"}/>
                {index == 1 ? <div className='text-container'>הכירו את {item.Name}</div> :
                    index == 2 ? <div className='text-container'>מתחשק לכם {item.Name}</div> :
                        <div className='text-container'>{item.Name}</div>}
            </div>
    })}</> : null}
</div>
</Fragment>
}
export default HotAttraction;