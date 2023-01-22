import { Alert, AlertTitle } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteOrder } from '../../store/actions/OrderAction';
import './Message.css';

function Message() {
    const { id, type, possible } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orders = useSelector(state => state.ordersArr);
    const order = { ...orders.find(x => x.Id == id) };
    const product = order.Attraction;
    useEffect(() => {
        if (type == 0 && possible==true)
            dispatch(deleteOrder(id));
    }, []);
    useEffect(()=>{

    },[type,possible]);
    return <div className='messageDiv'>
        {type == 1 ? <Alert severity="info" style={{ backgroundColor: "#f7f7f8", position: "relative", right: "22rem", width: "50vw", fontSize: "x-large" }}>
            <AlertTitle>הפעולה לא הושלמה</AlertTitle>
            אנו מצטערים אך לא ניתן לעדכן את ההזמנה פחות מ  <strong>{product.DaysToCancel} ימים ממועד ההזמנה </strong>
        </Alert> : null}

        {type == 0 && possible=="true" ?
            <Alert severity="success" style={{ backgroundColor: "#f7f7f8", position: "relative", right: "33rem", width: "50vw", fontSize: "x-large" }}>
                <AlertTitle> הפעולה הושלמה </AlertTitle>
                הזמנתך בוטלה  <strong>בהצלחה!</strong>
            </Alert> :
            type == 0 && possible=="false" ?
                <Alert severity="info" style={{ backgroundColor: "#f7f7f8", position: "relative", right: "22rem", width: "50vw", fontSize: "x-large" }}>
                    <AlertTitle>הפעולה לא הושלמה</AlertTitle>
                    אנו מצטערים אך לא ניתן לבטל את ההזמנה פחות מ  <strong>{product.DaysToCancel} ימים ממועד ההזמנה </strong>
                </Alert> : null}

        {type == 3 ? <Alert severity="success" style={{ backgroundColor: "#f7f7f8", position: "relative", right: "33rem", width: "50vw", fontSize: "x-large" }}>
            <AlertTitle> הפעולה הושלמה </AlertTitle>
            הזמנתך בוצעה  <strong>בהצלחה!</strong> <br />
            נשלחה אליך הודעת מייל על פרטי ההזמנה. תודה שהזמנתם ב- Discover Israel
        </Alert> : null} <br /> <br />
        <p className="link" onClick={() => { navigate("/attractionsList/" + 0) }}>חזרה לדף האטרקציות</p>
    </div>
}

export default Message;