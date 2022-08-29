import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { shallowEqual, useSelector } from 'react-redux';
import { getManagersUsers } from '../../store/actions/UserActions';

const columns = [
  { field: 'Active', headerName: 'סטטוס', width: 150 },
  {
    field: 'Name',
    headerName: 'שם משתמש',
    width: 150,
    editable: true,
  },
  {
    field: 'Email',
    headerName: 'מייל',
    width: 150,
    editable: true,
  },
  {
    field: 'Phone',
    headerName: 'פלאפון',
    width: 150,
    editable: true,
  },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.getValue(params.id, 'firstName') || ''} ${
//         params.getValue(params.id, 'lastName') || ''
//       }`,
//   },
];


export default function Table() {
    const { user } = useSelector(state => {
        return {
            user: state.user
        }
    }, shallowEqual);
    const [rowData, setRowData] = React.useState([]);
    let tempUsers = [];
    // const [id, setId] = React.useState(null);
    React.useEffect(() => {
        getManagersUsers()
            .then(x => setRowData(x.data))
            .catch(err => console.log(err));
        //     let rows;
        // rowData.forEach(element => {
        //       rows.push(element.Name,element.Phone,element.Email, element.Active?"V":"X");
        // });
        // setRowData(rows);
    }, []);
    React.useEffect(() => {
    }, [rowData]);
    // const deleteU = (index) => {
    //     tempUsers = users;
    //     tempUsers.splice(index, 1);
    //     setRows(tempUsers);
    // }
  return (
    <div style={{ height: 400, width: '70%' }}>
      <DataGrid
        rows={rowData}
        columns={columns}
        getRowId={(row) => row.Id}
        pageSize={7}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
