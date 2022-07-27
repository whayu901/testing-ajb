import React from "react";
import { FormControl, MenuItem, Select } from "@mui/material";

interface Props {
  value: string;
  handleChange: (e: any) => void;
}

const Selected = ({ value, handleChange }: Props) => {
  return (
    <FormControl sx={{ minWidth: 170 }}>
      <Select value={value} onChange={handleChange} displayEmpty>
        <MenuItem value={""}>Select Gender</MenuItem>
        <MenuItem value={"all"}>All</MenuItem>
        <MenuItem value={"male"}>Male</MenuItem>
        <MenuItem value={"female"}>Female</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Selected;
