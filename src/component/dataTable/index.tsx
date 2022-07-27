import React from "react";
// material
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
} from "@mui/material";
import dayjs from "dayjs";

import HeaderTable from "../headerTable";

const TABLE_HEAD = [
  { id: "", label: "Username", alignCenter: true },
  { id: "name", label: "Name", alignCenter: true },
  { id: "email", label: "Email", alignCenter: true },
  { id: "gender", label: "Gender", alignCenter: true },
  { id: "registeredDate", label: "Registered Date", alignCenter: true },
];

interface Props {
  data?: any[];
  handleSort: (event: any, property: any) => void;
  order?: any;
  orderBy?: any;
}

const DataTable = ({ data, handleSort, order, orderBy }: Props) => {
  return (
    <Card>
      <TableContainer sx={{ minWidth: 800 }}>
        <Table>
          <HeaderTable
            order={order}
            orderBy={orderBy}
            headLabel={TABLE_HEAD}
            onRequestSort={handleSort}
          />
          <TableBody>
            {data?.map((item, index) => (
              <TableRow key={`table-details-${index}`}>
                <TableCell>{`${item.login.username}`}</TableCell>
                <TableCell align="center">{`${item.name.title} ${item.name.first} ${item.name.last}`}</TableCell>
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center">{item.gender}</TableCell>
                <TableCell align="center">
                  {dayjs(item.registered.date).format("DD MMMM YYYY")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default DataTable;
