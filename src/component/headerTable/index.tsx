import React from "react";
import { visuallyHidden } from "@mui/utils";
import {
  Box,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
} from "@mui/material";

interface Props {
  order?: any;
  orderBy?: any;
  headLabel: any[];
  onRequestSort: any;
}

const HeaderTable = ({
  order = "ascend",
  orderBy = "name",
  headLabel,
  onRequestSort,
}: Props) => {
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };

  if (order === "ascend") {
    order = "asc";
  } else if (order === "descend") {
    order = "desc";
  }

  const validationDirection = (id: any) => {
    if (order === "") {
      return "asc";
    } else if (orderBy === id) {
      return order;
    } else {
      return "asc";
    }
  };

  const validationSortDirection = (id: any) => {
    if (order === "") {
      return false;
    } else if (orderBy === id) {
      return order;
    } else {
      return false;
    }
  };

  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={
              headCell.alignRight
                ? "right"
                : headCell.alignCenter
                ? "center"
                : "left"
            }
            sortDirection={validationSortDirection(headCell.id)}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={validationDirection(headCell.id)}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default HeaderTable;
