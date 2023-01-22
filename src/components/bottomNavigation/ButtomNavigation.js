import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import PersonalDetails from './PersonalDetails';
import PasswordDetails from './PasswordDetails';
const useStyles = makeStyles({
  root: {
    width: 500,
    margin:"auto"
  },
});

export default function ButtomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="עדכון פרטים אישיים" icon={<PersonIcon />} />
        <BottomNavigationAction label="עדכון סיסמא" icon={<LockIcon />} />
      </BottomNavigation>

      {value == 0 ? <PersonalDetails /> : <PasswordDetails />}
    </div>
  );
}