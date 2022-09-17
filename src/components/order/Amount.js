import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Amount = ({amount, setAmount, setFlag}) => {
    return( <div>
    <RemoveIcon onClick={()=>{if(amount>0) setAmount(amount-1); if(amount==0 || amount==1) setFlag(false)}} fontSize="small"/> 
    <span style={{fontSize:"x-large"}}> {amount} </span> 
    <AddIcon fontSize="small" onClick={()=>{setAmount(amount+1); setFlag(true);}}/>
    </div>)
}
export default Amount;