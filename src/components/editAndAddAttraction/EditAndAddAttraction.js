import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import PeriodTime from './PeriodTime';
import AttractionDetails from './AttractionDetails';
import { useState } from 'react';
import CategoryList from './CategoryList';
import AddImages from './AddImages';
import ManagerDetails from './ManagerDetails';
import { addAttraction, addAttractionDispatch, changeAttractionStatus, updateAttraction } from '../../store/actions/AttractionActions';
import Equipment from './Equipment';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { updateUser } from '../../store/actions/UserActions';

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
  return ['אני רוצה אטרקציה בלוח...', 'פרטי האטרקציה', 'זמני פתיחה', 'הוספת תמונות', 'ציוד נדרש לאטרקציה', 'פרטי התקשרות ותשלום'];
}



export default function EditAndAddAttraction() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [category, setCategory] = useState(null);
  const dispatch = useDispatch();
  const steps = getSteps();
  const { id } = useParams();
  const [IdSelected, setIdSelected] = useState(id);

  useEffect(() => {
    setIdSelected(id)
  }, [id])
  const type = id != undefined ? "edit" : "new";
  const { user, attractions } = useSelector(state => {
    return {
      user: state.user,
      attractions: state.attractionArr
    }
  }, shallowEqual);
  let attraction = id != undefined ? { ...attractions.find(x => x.Id == id) } : null;
  const onSubmit = (data) => {
    if (attraction != null) data.Id = attraction.Id;
    console.log(data)
    attraction = data;
    data.Date = new Date();
    data.Status = false;
    data.CategoryId = category.Id;
    data.ManagerId = user.Id;
    setActiveStep(activeStep + 1);
    if (activeStep == 1)
      addAndUpdate();
  }
  const addAndUpdate = () => {
    attraction.Date = new Date();
    attraction.Status = true;
    attraction.CategoryId = category.Id;
    attraction.ManagerId = user.Id;
    if (type == "new") {
      addAttraction(attraction).then(x => {
        setIdSelected(x.data.Id);
        dispatch(addAttractionDispatch(x.data));
      })
    }
    else
      dispatch(updateAttraction(attraction));
  }
  const onSubmitUserDetails = (data) => {
    data.Id = user.Id;
    data.Password = user.Password;
    data.Status = user.Status;
    data.Active = user.Active;
    dispatch(updateUser(data));
    setActiveStep(activeStep + 1);
    dispatch(changeAttractionStatus(IdSelected));

  }
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <CategoryList setCategory={setCategory} setActiveStep={setActiveStep} />;
      case 1:
        return <AttractionDetails type={type} attraction={attraction} onSubmit={onSubmit} />;
      case 2:
        return <PeriodTime type={type} id={IdSelected} onSubmit={() => { setActiveStep(activeStep + 1) }} />;
      case 3:
        return <AddImages onSubmit={() => { setActiveStep(activeStep + 1) }} id={IdSelected} attraction={attraction} />;
      case 4:
        return <Equipment id={IdSelected} type={type} onSubmit={() => { setActiveStep(activeStep + 1) }} />;
      case 5:
        return <ManagerDetails onSubmit={onSubmitUserDetails} />;
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
    <div className='editForm'>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel style={{ color: "orange" }} > <h2 className="secondHeader"> {label} </h2></StepLabel>
              <StepContent>
                <div>{getStepContent(index)}</div>
                <div className={classes.actionsContainer}>
                  {/* <br /> <br /> */}
                  <div>
                    {index != 0 && <Button
                      // disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                      style={{ color: "white", backgroundColor: "orange" }}>
                      חזרה
                    </Button>}
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Alert severity="success" style={{ fontSize: "larger" }}>
              <AlertTitle style={{ fontSize: "x-large" }}>סיימנו!</AlertTitle>
              האטרקציה {id != undefined ? "עודכנה" : "התווספה"} <strong>בהצלחה.</strong>
            </Alert>
            {type == "new" ? <Button onClick={handleReset} className={classes.button} style={{ color: "white", backgroundColor: "orange" }}>
              להוספת אטרקציה נוספת
            </Button> : null}
          </Paper>
        )}
      </div>
    </div>
  );
}