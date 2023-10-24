import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleModal from "./Modal";
import UpdateForm from "./UpdateForm";
import { updateTable } from "../redux/slices/table";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

interface TableProps {
  data: any[]; // Your data array
}

const rowsPerPageOptions = [5, 10, 25];

const CustomTable: React.FC<TableProps> = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  const handleUpdate = (row: any) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleSubmit = (data: any) => {
    // todo
    dispatch(updateTable({ id: selectedRow.id, data }));
    setOpenModal(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell key={column}>{row[column]}</TableCell>
                ))}
                <TableCell>
                  <Button onClick={() => handleUpdate(row)}>Update</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <TableCell>
            <Button onClick={() => setRowsPerPage(5)}>5</Button>
            <Button onClick={() => setRowsPerPage(10)}>10</Button>
            <Button onClick={() => setRowsPerPage(25)}>25</Button>
          </TableCell>
        </TableRow>
      </TableFooter>

      <SimpleModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={`Updating ${selectedRow?.name}`}
      >
        <UpdateForm onSubmit={handleSubmit} />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenModal(false)}
        >
          Close Modal
        </Button>
      </SimpleModal>
    </TableContainer>
  );
};

export default CustomTable;
