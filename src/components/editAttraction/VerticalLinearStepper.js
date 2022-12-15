import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import CategoryCard from './CategoryCard';
import AttractionDetails from './AttractionDetails';
import { useState } from 'react';
import CategoryList from './CategoryList';
import AddImages from './AddImages';
import ManagerDetails from './ManagerDetails';
import { addAttraction, updateAttraction } from '../../store/actions/AttractionActions';
import Equipment from './Equipment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));


function getSteps() {
  return ['אני רוצה לפרסם אטרקציה בלוח...', 'פרטי האטרקציה', 'הוספת תמונות', ' פרטי התקשרות', 'זמני פתיחה ותשלום'];
}



export default function VerticalLinearStepper({ type, id }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [category, setCategory] = useState(null);
  const dispatch = useDispatch();
  const steps = getSteps();

  const { user, attractions } = useSelector(state => {
    return {
      user: state.user,
      attractions: state.attractionArr
    }
  }, shallowEqual);
  let attraction = id != undefined ? { ...attractions.find(x => x.Id == id) } : null;
  const onSubmit = (data) => {
    attraction = { ...attraction, data };
    console.log(data)
    data.Date = new Date();
    data.Status = true;
    data.CategoryId = category.Id;
    data.ManagerId = user.Id;
    setActiveStep(activeStep + 1);
    if (activeStep == 4)
      addAndUpdate();
  }
  const addAndUpdate = () => {
    attraction.Date = new Date();
    attraction.Status = true;
    attraction.CategoryId = category.Id;
    attraction.ManagerId = user.Id;
    if (type == "new")
      dispatch(addAttraction(attraction));
    else
      dispatch(updateAttraction(attraction));
  }
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <CategoryList setCategory={setCategory} setActiveStep={setActiveStep} />;
      case 1:
        return <AttractionDetails type={type} attraction={attraction} onSubmit={onSubmit} />;
      case 2:
        return <AddImages onSubmit={() => { setActiveStep(activeStep + 1) }} attraction={attraction} />;
      case 3:
        return <ManagerDetails attraction={attraction} onSubmit={onSubmit} />;
        case 4:
        return <Equipment id={id} type={type} onSubmit={()=>{setActiveStep(activeStep+1)}}/>;
      default:
        return;
    }
  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel><h2> {label} </h2></StepLabel>
            <StepContent>
              <div>{getStepContent(index)}</div>
              <div className={classes.actionsContainer}>
                <br /> <br />
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}>
                    חזרה
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>האטרקציה {id != undefined ? "עודכנה" : "התווספה"} בהצלחה!</Typography>
          {type == "new" ? <Button onClick={handleReset} className={classes.button}>
            להוספת אטרקציה נוספת
          </Button> : null}
        </Paper>
      )}
    </div>
  );
}