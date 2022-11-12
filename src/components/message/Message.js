import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteOrder } from '../../store/actions/OrderAction';

function Message() {
    const { id, type, possible } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const  orders = useSelector(state => state.ordersArr);
    const order = {...orders.find(x => x.Id == id)};
    const product = order.Attraction;
    useEffect(() => {
        if (type == 0 && possible)
             dispatch(deleteOrder(order.Id))
    }, [])
    return (<>
        {type == 1 ? <h3> אנו מצטערים אך לא ניתן לעדכן פחות מ -  {product.DaysToCancel} ימים את ההזמנה </h3> : null}

        {type == 0 && possible ? <h3> הזמנתך בוטלה בהצלחה! </h3> :
            type == 0 && possible ? <h3> אנו מצטערים אך לא ניתן לבטל את ההזמנה פחות מ {product.DaysToCancel} ימים ממועד ההזמנה </h3> : null}

        {type == 3 ? <> <h3>הזמנתך בוצעה בהצלחה!</h3><p>נשלחה אליך הודעת מייל על פרטי ההזמנה</p>
            <p>תודה שהזמנתם ב- Discover Israel</p></> : null}
        {/* ❎❌❎❌ */}
        <p className="link" onClick={() => { navigate("/attractionsList") }}>חזרה לדף האטרקציות</p>
    </>);
}

export default Message;