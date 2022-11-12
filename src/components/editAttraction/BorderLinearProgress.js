import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';


const BorderLinearProgress = styled(LinearProgress)(({ theme, count }) => ({
  height: 20,
  width: 200,
  borderRadius: 5,
  placeContent: "rgthgh",
  // textAlign:'start',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    color:"black",
    backgroundColor: count < 100 ? "red" : "yellow"
  },
}));

export default BorderLinearProgress;


