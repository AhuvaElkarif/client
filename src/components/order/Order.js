import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SelectTickets from './SelectTickets';
import Details from './Details';
import swal from "sweetalert";
import { useNavigate, useParams } from 'react-router-dom';
import "./Order.css";
import Calender from './Calender';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addOrder, updateOrder } from '../../store/actions/OrderAction';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useEffect } from 'react';

const steps = ['בחירת כרטיסים', 'בחירת מועד', 'מילוי פרטים'];

const Order = ({ type }) => {
    const { id, orderId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [amount, setAmount] = React.useState(0);
    const [order, setOrder] = React.useState(null);
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [flag, setFlag] = React.useState(false);
    const [date, setDate] = React.useState(null);
    const [price, setPrice] = React.useState(0);
    const [startTime, setStart] = React.useState(null);
    const { user, orders } = useSelector(state => {
        return {
            user: state.user,
            orders: state.ordersArr
        }
    }, shallowEqual);
    useEffect(() => {
        if (type == 1) {
            setOrder({ ...orders.find(x => x.Id == orderId) });
        }
        // if(!order)
        // navigate("/");
    }, [id]);
    useEffect(() => {
        if (order)
            setAmount(order.Amount);
        // else
        // navigate("/");
    }, [order]);
    
    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        if (amount == 0) {
            swal({
                title: "לא נבחרה כמות",
                icon: "warning"
            });
            return;
        }
        if (activeStep == 1 && (date == null || startTime == null)) {
            swal({
                title: "לא נבחר מועד/זמן ",
                icon: "warning"
            });
            return;
        }
        
        
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onSubmit = (data) => {
        console.log(data,startTime,date);
        if (user == null) {
            data.Active = false;
            data.Status = 0
        }
        const obj = { UserId: user ? user.Id : -1, User: data, OrderDate: date, StartTime: startTime, GlobalPrice: price, Amount: amount, AttractionId: id, IsApproval: false, Status: true }
        if (type == 0) {
            dispatch(addOrder(obj));
        }
        else {
            obj.Id = orderId;
            dispatch(updateOrder(obj));
        }
        handleNext();
    };
    return (<div className='order'>
        <h2 >יש להתעדכן בשעות הפעילות של האטרקציה לפני רכישת הכרטיסים <br />
            <span onClick={() => { navigate("/detailsAttraction/" + id) }} className="timesHeader"> לשעות הפעילות לחץ כאן </span>
        </h2> <br />
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <Typography sx={{ mt: 2, mb: 1 }} style={{ marginRight: "4.5rem", textAlign: "center", marginTop: "5rem", marginBottom: "5rem", width: "60vw" }}>
                    <Alert severity="success" style={{ fontSize: "x-large" }}>
                        <AlertTitle style={{ fontSize: "xx-large" }}>סיימנו!</AlertTitle>
                        ההזמנה {type == 1 ? "עודכנה" : "בוצעה"} <strong>בהצלחה.</strong>
                        <br />
                        נשלחה אליך הודעת מייל על פרטי ההזמנה. תודה שהזמנתם ב- Discover Israel
                    </Alert>
                </Typography>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        {activeStep == 0 ? <SelectTickets attractionId={id} amount={amount} setAmount={setAmount} setFlag={setFlag} setPrice={setPrice} />
                            : activeStep == 1 ? <Calender setStart={setStart} id={id} setDate={setDate} amount={amount} type={type} /> :
                                <Details price={price} date={date} flag={flag} id={id} onSubmit={onSubmit} type={type} />}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}>
                            חזור
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {activeStep != steps.length - 1 && <Button onClick={handleNext} >
                            הבא
                        </Button>}
                    </Box>
                </React.Fragment>
            )}
        </Box>
    </div>
    );
}
export default Order;