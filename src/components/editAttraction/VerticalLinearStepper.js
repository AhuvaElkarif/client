import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { shallowEqual, useSelector } from 'react-redux';
import CategoryCard from './CategoryCard';
import AttractionDetails from './AttractionDetails';
import { useState } from 'react';
import CategoryList from './CategoryList';
import AddImages from './AddImages';
import ManagerDetails from './ManagerDetails';

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
  return ['אני רוצה לפרסם אטרקציה בלוח...', 'פרטי האטרקציה', 'הוספת תמונות', 'פרטי התקשרות', 'תשלום'];
}



export default function VerticalLinearStepper({ type, id }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [category, setCategory] = useState(null);
  const [flag, setFlag] = useState(false);
  const steps = getSteps();

  const {  user , attractions } = useSelector(state => {
    return {
      user: state.user,
      attractions: state.attractionArr
    }
  }, shallowEqual);
  const attraction = { ...attractions.find(x => x.Id == id) };

  const onSubmit = (data) => {
    console.log(data)
    // setFlag(true);
    data.Date = new Date();
    data.Status = true;
    data.CategoryId = category.Id;
    data.ManagerId = user.Id;
    setActiveStep(activeStep+1);
    // handleNext();
    // if (type == "new")
    //     dispatch(addAttraction(data));
    // else {
    //     data.Id=id;
    //     dispatch(updateAttraction(data));
    // }
  };
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <CategoryList setCategory={setCategory} setActiveStep={setActiveStep}/>;
      case 1:
        return <AttractionDetails type={type} attraction={attraction} onSubmit={onSubmit} />;
      case 2:
        return <AddImages/>;
        case 3:
        return <ManagerDetails attraction={attraction} onSubmit={onSubmit}/>;
        case 3:
          return <ManagerDetails attraction={attraction} onSubmit={onSubmit}/>;
      default:
        return 'Unknown step';
    }
  }
  const handleNext = () => {
    // console.log(flag)
    // if (flag)
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // setFlag(false);
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
                <br/> <br/>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}>
                    חזרה
                  </Button>
                  {activeStep != 0 && activeStep != 1 ? <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'סיום' : 'להמשיך לשלב הבא'}
                  </Button> : null}
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}