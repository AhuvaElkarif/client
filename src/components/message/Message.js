import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getAttractions } from '../../store/actions/AttractionActions';


function Message() {
    const { id, type, possible } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { attractions } = useSelector(state => {
        return {
            attractions: state.attractionArr
        }
    }, shallowEqual);
    const product = { ...attractions.find(x => x.Id == id) };
    useEffect(() => {
        dispatch(getAttractions());
    }, [])
    return (<>
        {type == 1 ? <h3> אנו מצטערים אך לא ניתן לעדכן פחות מ{product.DaysToCancel} את ההזמנה במועד מאוחר את ההזמנה </h3> : null}

        {type == 0 && possible == "true" ? <h3> הזמנתך בוטלה בהצלחה! </h3> :
           type==0 && possible == "false" ? <h3> אנו מצטערים אך לא ניתן לבטל את ההזמנה פחות מ {product.DaysToCancel} ימים ממועד ההזמנה </h3>: null}

        {type == 3 ? <> <h3>הזמנתך בוצעה בהצלחה!</h3><p>נשלחה אליך הודעת מייל על פרטי ההזמנה</p>
            <p>תודה שהזמנתם ב- Discover Israel</p></> : null}
        {/* ❎❌❎❌ */}
        <p className="link" onClick={() => { navigate("/attractionsList") }}>חזרה לדף האטרקציות</p>
    </>);
}

export default Message;