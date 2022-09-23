import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { changeUsersStatus, getManagersUsers } from '../../store/actions/UserActions';
import Poppers from '../popper/Popper';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();
  const [rowData, setRowData] = React.useState([]);
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  React.useEffect(() => {
    getManagersUsers()
      .then(x => setRowData(x.data))
      .catch(err => console.log(err));
  }, []);

  const userSelected = (row) => {
    // const arr = row!=null?rowData.filter(x => row.includes(x.Id)):null;
    const user  = rowData.find(x => x.Id == row);
    changeUsersStatus(user)
    .then(x=> {
      const res = x.data;
      console.log(res);
        // const arr = rowData.filter(x=> res.includes(x.Id)))
    })
    // setSelectedUsers(arr);
  }

  // const changeActive = () => {
  //   console.log(selectedUsers)
  //   changeUsersStatus(selectedUsers)
  //   .then(x=> {
  //     const res = x.data;
  //     console.log(res);
  //       // const arr = rowData.filter(x=> res.includes(x.Id)))
  //   })
  //   .catch(err => console.log(err));
  // }
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
