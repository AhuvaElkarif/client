import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SelectDate from './SelectDate';
import SelectTickets from './SelectTickets';
import  Details from './Details';
import swal from "sweetalert";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from '@material-ui/core';
import "./Order.css";
import Calender from './Calender';

const steps = ['בחירת כרטיסים', 'בחירת מועד', 'מילוי פרטים'];

const Order = () => {
    const {id} = useParams();
    const [amount, setAmount] = React.useState(0);
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [flag,setFlag] = React.useState(false);
    const [date,setDate] = React.useState(new Date());
    const [price,setPrice] = React.useState(0);
    const navigate= useNavigate();
    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        if(!flag){
            swal({
                title: "לא נבחרה כמות",
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
        // setFlag(false);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    return (<div className='order'>
        <h2 >יש להתעדכן בשעות הפעילות של האתר לפני רכישת הכרטיסים <br/>
        {/* <span onClick={() => { navigate("/activityTime/" + id) }} className="timesHeader"> לשעות הפעילות לחץ כאן </span> */}
        </h2> <br/>
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    //   if (isStepOptional(index)) {
                    //     labelProps.optional = (
                    //       <Typography variant="caption">Optional</Typography>
                    //     );
                    //   }
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
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>אתחול</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        {activeStep==0?<SelectTickets attractionId={id} amount={amount} setAmount={setAmount} setFlag={setFlag} setPrice={setPrice}/>
                        :activeStep==1?<Calender id={id} setDate={setDate} amount={amount}/>:<Details price={price} date={date}/>}
                        {/* שלב {activeStep + 1} */}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            חזור
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1? 'סיום' : 'הבא'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
        </div>
    );
}
export default Order;