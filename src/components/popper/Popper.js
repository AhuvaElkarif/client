import * as React from 'react';
import Popper from '@mui/material/Popper';

const Poppers = () => {
    const arrowRef = React.useRef(true);
    return( 
    <Popper
  placement="bottom"
  disablePortal={false}
  modifiers={[
    {
      name: 'flip',
      enabled: true,
      options: {
        altBoundary: true,
        rootBoundary: 'document',
        padding: 8,
      },
    },
    {
      name: 'preventOverflow',
      enabled: true,
      options: {
        altAxis: true,
        altBoundary: true,
        tether: true,
        rootBoundary: 'document',
        padding: 8,
      },
    },
    {
      name: 'arrow',
      enabled: false,
      options: {
        element: arrowRef,
      },
    },
  ]}
></Popper>
  )
}
export default Poppers;