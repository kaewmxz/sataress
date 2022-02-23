import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core';
import { Routes, Route, Navigate } from 'react-router-dom';
import BottomNavigationBar from "./BottomNavigationBar ";
import Head from "./Head";
import { AuthContext } from "./Auth";
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
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import axios from "axios";
import { autocompleteClasses } from "@mui/material";

const Table1 = withTheme(styled.div`
position: absolute;
${(props) => props.theme.breakpoints.only("xs")} {
  margin-top: 200px;
  margin-left: 50px;
}
${(props) => props.theme.breakpoints.up("sm")} {
}
${(props) => props.theme.breakpoints.up("md")} {
}
${(props) => props.theme.breakpoints.up("lg")} {
}
${(props) => props.theme.breakpoints.up("xl")} {
}
`);

const Bg = withTheme(styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 217px;
    z-index: -1;
    background: linear-gradient(
      180deg,
      rgba(254, 68, 10, 0) 17.83%,
      #ffbdbd 95.83%
    );
  `);

const Title = withTheme(styled.div`
    position: absolute;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 35px;
    line-height: 41px;
    color: #000000;
    ${(props) => props.theme.breakpoints.only("xs")} {
    }
    ${(props) => props.theme.breakpoints.up("sm")} {
    }
    ${(props) => props.theme.breakpoints.up("md")} {
    }
    ${(props) => props.theme.breakpoints.up("lg")} {
    }
    ${(props) => props.theme.breakpoints.up("xl")} {
    }
  `);



const Log = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('Gratitude');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleClick = (event, date) => {
  const selectedIndex = selected.indexOf(date);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, date);
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

  const isSelected = (date) => selected.indexOf(date) !== -1;

  function createData(date, gratitude) {
    return {
      date,
      gratitude,
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
  
  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
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
      id: 'date',
      numeric: false,
      disablePadding: true,
      label: 'Date',
    },
    {
      id: 'Gratitude',
      numeric: true,
      disablePadding: false,
      label: 'Gratitude',
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
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align="left"
            >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
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
  
  const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;
    // const data = { id: currentUser.uid, date: selected};
    // console.log(data)
    const deleteGratitude = () => {
      // console.log(currentUser.uid)
      // console.log(selected)
      axios.post("https://senior-projects.herokuapp.com/gratitude-delete", { id: currentUser.uid, date: selected});
      window.location.reload();
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
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Gratitude Journal
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon onClick={deleteGratitude}/>
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton/>
          </Tooltip>
        )}
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  useEffect(() => { 
    if(currentUser) {
      const fetchTable = async () => {
        try {
          const result = await axios.get("https://senior-projects.herokuapp.com/gratitude-table", {
          params: { id: currentUser.uid },
        });
        setData(result.data.message);
      } catch(err) {
        console.log(err);
      }
      };
      fetchTable();
      
    }
  }, [])

  if (!currentUser) {
    return (
      <Routes>
        <Route path="/" element={<Navigate replace to="/" />}></Route>
      </Routes>
    )
  }

  let rows = [];
  try {
    for (let i = 0; i < data.length; i++) {
      rows.push(createData(data[i].date,data[i].gratitude));
    }
    // console.log(rows);
  } catch (err) {
    // console.log(err);
  }
  return (
    <div>
      <Bg />
      <Head />
      <Paper sx={{width: "80%", maxWidth: "100%", mx:"auto", my:25, p:3}}>
        <Grid container>
          <Grid item xs={12}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table>
                <EnhancedTableHead/>
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                    rows.slice().sort(getComparator(order, orderBy)) */}
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.date);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.date)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.date}
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
                            {row.date}
                          </TableCell>
                          <TableCell>{row.gratitude}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[1, 10, 20]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </Paper>
    
      <BottomNavigationBar/>
    </div>
  );
};
export default Log;