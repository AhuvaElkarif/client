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
import { addAttraction, changeAttractionStatus, updateAttraction } from '../../store/actions/AttractionActions';
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

export default function EditAndAddAttraction({ type }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [category, setCategory] = useState(null);
  const [object, setObject] = useState(null);
  const dispatch = useDispatch();
  const steps = getSteps();
  const { id } = useParams();

  useEffect(() => {
    if (activeStep == steps.length) {
      if (type == "new") dispatch(addAttraction(object));
      console.log(object)
    }
  }, [activeStep])
  const { user, attractions } = useSelector(state => {
    return {
      user: state.user,
      attractions: state.attractionArr
    }
  }, shallowEqual);
  let attraction = id != undefined ? { ...attractions.find(x => x.Id == id) } : null;
  const onSubmit = (data) => {
    const o = { ...object }
    if (type == "new" || activeStep == 1)
      switch (activeStep) {
        case 1:
          data.Status = true;
          data.CategoryId = category.Id;
          data.Date = new Date();
          data.ManagerId = user.Id;
          if (attraction != null && type == "edit") {
            data.Id = attraction.Id;
            dispatch(updateAttraction(data))
          }          
          o.Attraction = data;
          setObject({ ...o });
          break;
        case 2:
          o.PeriodsList = data;
          setObject({ ...o });
          break;
        case 3:
          o.ImagesList = data;
          setObject({ ...o });
          break;
        case 4:
          o.EquipmentsList = data;
          setObject({ ...o });
          break;
        case 5:
          data.Id = user.Id;
          data.Password = user.Password;
          data.Status = user.Status;
          data.Active = user.Active;
          o.Manager = data;
          setObject({ ...o });
          break;
        default:
          break;
      }

    setActiveStep(activeStep + 1);

  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <CategoryList setCategory={setCategory} setActiveStep={setActiveStep} />;
      case 1:
        return <AttractionDetails type={type} attraction={attraction} onSubmit={onSubmit} />;
      case 2:
        return <PeriodTime type={type} id={id} onSubmit={onSubmit} />;
      case 3:
        return <AddImages onSubmit={onSubmit} id={id} attraction={attraction} />;
      case 4:
        return <Equipment id={id} type={type} onSubmit={onSubmit} />;
      case 5:
        return <ManagerDetails onSubmit={onSubmit} type={type} />;
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