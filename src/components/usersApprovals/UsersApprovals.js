import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { deleteOrderAfterApproval, getOrdersByMangerId } from '../../store/actions/OrderAction';
import { useSelector } from 'react-redux';
import AlertMessage from '../alert/AlertMessage';
import Alerts from '../alert/Alerts';
import './UsersApprovals';
function createData(Id, UserName, Phone, Email, AttractionName, OrderDate, Amount, GlobalPrice, StartTime) {
  return {
    Id,
    UserName,
    Phone,
    Email,
    AttractionName,
    OrderDate,
    Amount,
    GlobalPrice,
    StartTime
  };
}



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'UserName',
    numeric: false,
    disablePadding: true,
    label: 'שם לקוח',
  },
  {
    id: 'Phone',
    numeric: true,
    disablePadding: false,
    label: 'פלאפון',
  },
  {
    id: 'Email',
    numeric: false,
    disablePadding: false,
    label: 'מייל',
  },
  {
    id: 'AttractionName',
    numeric: false,
    disablePadding: false,
    label: 'אטרקציה',
  },
  {
    id: 'Date',
    // numeric: true,
    disablePadding: false,
    label: 'תאריך',
  },
  {
    id: 'Amount',
    numeric: true,
    disablePadding: false,
    label: 'כמות',
  },
  {
    id: 'GlobalPrice',
    numeric: true,
    disablePadding: false,
    label: 'מחיר סופי',
  },
  {
    id: 'StartTime',
    // numeric: true,
    disablePadding: false,
    label: 'זמן התחלה',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            size='medium'
            className="cell"
            // align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
             <span style={{fontWeight:'bolder'}}>{headCell.label}</span> 
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { setNumSelected, numSelected, selected, rows, setRows, setSelected } = props;
  const [flag, setFlag] = React.useState(false);
  const deleteUsers = () => {
    console.log(selected)
    selected.forEach(element => {
      deleteOrderAfterApproval(element)
        .then(x => {
          setFlag(true);
          const vec = [...rows.filter(x => selected.indexOf(x.Id) == -1)];
          setRows(vec);
          setNumSelected(0);
          setSelected([]);
        })
        .catch(err => console.log(err));
    });

  }
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} נבחרו
        </Typography>
      ) : flag ?
      <Typography
      sx={{ flex: '1 1 100%' }}
      // color="inherit"
      variant="h8"
      component="div"
    >
        <AlertMessage variant={'success'} setFlag={setFlag} children={<Alerts message={"נמחק בהצלחה!"} />} />
        </Typography>
        : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
            color={"orange"}
            fontWeight={"bolder"}
          >
            פרטי הזמנות ולקוחותיהם
          </Typography>
        )}

      {numSelected > 0 ? (
        <Tooltip title="מחיקה">
          <IconButton onClick={deleteUsers} >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="רשימה מסוננת">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('UserName');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [numSelected,setNumSelected] = React.useState(0);
  const user = useSelector(state => state.user);
  React.useEffect(() => {
    getOrdersByMangerId(user.Id)
      .then(x => {
        const vec = [...x.data.filter(x => x.IsApproval == false && x.Status==false)];
        const arr = [];
        vec.forEach(x => {
          arr.push(createData(x.Id, x.User.Name, x.User.Phone, x.User.Email,
            x.Attraction.Name, x.OrderDate, x.Amount, x.GlobalPrice, x.StartTime));
        });
        setRows(arr);
      })
      .catch(err => console.log(err));
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.Id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%', marginTop:"4rem", width:"85vw", marginRight:"6rem", marginBottom:"2rem"}}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar setSelected={setSelected} setNumSelected={setNumSelected} numSelected={selected.length} selected={selected} rows={rows} setRows={setRows} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            {rows.length > 0 ? <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.Id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.Id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.Id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.UserName}
                      </TableCell>
                      <TableCell align="center">{row.Phone}</TableCell>
                      <TableCell align="right">{row.Email}</TableCell>
                      <TableCell align="right">{row.AttractionName}</TableCell>
                      <TableCell align="right">{new Date(row.OrderDate).toLocaleDateString()}</TableCell>
                      <TableCell align="right">{row.Amount}</TableCell>
                      <TableCell align="right">{row.GlobalPrice}</TableCell>
                      <TableCell align="right">{(row.StartTime).slice(0, 5)}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody> : <p style={{width:"10vw"}}>הטבלה ריקה.</p>}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}