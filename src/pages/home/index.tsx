/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  Container,
  Pagination,
} from "@mui/material";
import debounce from "lodash.debounce";

import { DataTable, Search, Select } from "../../component";
import { getUser } from "../../service";

const Home = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedGender, setSelectedGender] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [sortBy, setSortBy] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState("");
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getUserList(searchValue, page, selectedGender, sortBy, sortOrder);
  }, [page, selectedGender, sortBy, sortOrder]);

  const debounceFetch = React.useMemo(
    () =>
      debounce((searchVal, currPage, gender, sortBy, sortOrder) => {
        getUserList(searchVal, currPage, gender, sortBy, sortOrder);
      }, 900),
    []
  );

  const handleFilterByName = (event: any) => {
    setSearchValue(event.target.value);
    debounceFetch(event.target.value, 1, selectedGender, sortBy, sortOrder);
  };

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = sortBy === property && sortOrder === "ascend";
    // console.log(property);
    setSortOrder(isAsc ? "descend" : "ascend");
    setSortBy(property);
  };

  const resetFilter = () => {
    setSelectedGender("");
    setSearchValue("");
    setPage(1);
    debounceFetch("", 1, "", "", "");
    setSortOrder("");
    setSortBy("");
  };

  const getUserList = (
    searchVal: any,
    currPage: number,
    gender: string,
    sortBy: string,
    sortOrder: string
  ) => {
    getUser({
      keyword: searchVal,
      page: currPage,
      gender: gender,
      sortBy: sortBy,
      sortOrder: sortOrder,
    })
      .then((res) => {
        if (res && res.length > 0) {
          setData(res);
        }
      })
      .catch(() => {});
  };

  return (
    <Container>
      <Typography variant="h4">Example With Search and Filter</Typography>

      <Box sx={{ mt: 2 }}>
        <Stack
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Box sx={{ mr: 2 }}>
            <Search
              filterName={searchValue}
              onFilterName={handleFilterByName}
            />
          </Box>
          <Select
            value={selectedGender}
            handleChange={({ target }) => {
              setSelectedGender(target.value);
            }}
          />

          <Box sx={{ ml: 2 }}>
            <Button
              style={{
                width: "120px",
                height: "55px",
              }}
              variant="outlined"
              onClick={resetFilter}
            >
              Reset
            </Button>
          </Box>
        </Stack>
      </Box>

      <Box sx={{ mt: 3 }}>
        <DataTable
          handleSort={handleRequestSort}
          data={data}
          order={sortOrder}
          orderBy={sortBy}
        />
        <Box sx={{ mt: 2, float: "right" }}>
          <Pagination
            page={page}
            onChange={(event, value) => {
              setPage(value);
            }}
            count={100}
            color="primary"
            size="small"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
