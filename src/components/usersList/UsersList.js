import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { changeUsersStatus, getManagersUsers } from '../../store/actions/UserActions';
import Poppers from '../popper/Popper';
const columns = [
  {
    field: 'ActiveName',
    headerName: 'סטטוס',
    width: 150
  },
  {
    field: 'Name',
    headerName: 'שם משתמש',
    width: 150,
  },
  {
    field: 'Email',
    headerName: 'מייל',
    width: 150,
  },
  {
    field: 'Phone',
    headerName: 'פלאפון',
    width: 150,
  }
];


export default function UsersList() {
  const [rowData, setRowData] = React.useState([]);
  React.useEffect(() => {
    getManagersUsers()
      .then(x => setRowData(x.data))
      .catch(err => console.log(err));
  }, []);

  const userSelected = (row) => {
    const user  = rowData.find(x => x.Id === row);
    changeUsersStatus(user)
    .then(x=> {
      const res = x.data;
      console.log(res);
    })
  }

  return (
    <div style={{ height: 400, width: '70%' }}>
      <DataGrid
        rows={rowData}
        columns={columns}
        getRowId={(row) => row.Id}
        pageSize={7}
        hideSortIcon
        checkboxSelection
        disableColumnMenu
        disableColumnFilter
        hideFooterSelectedRowCount
        onSelectionModelChange={userSelected}
      />
      <Poppers
        disabled
        func={userSelected}
        type={3}
        content={"שנה"}
        text={"שנות את מצב המשתמש"}
        flag={false} 
        />

    </div>
  );
}
