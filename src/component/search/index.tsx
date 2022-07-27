import { Icon } from "@iconify/react";
import searchFill from "@iconify/icons-eva/search-fill";
// material
import { Box, OutlinedInput, InputAdornment, styled } from "@mui/material";

// ----------------------------------------------------------------------

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `#D3D3D3 !important`,
  },
}));

// ----------------------------------------------------------------------

interface Props {
  filterName: string;
  onFilterName: (e: any) => void;
  onSearch?: () => void;
}

export default function SurveyListToolbar({
  filterName,
  onFilterName,
  onSearch,
}: Props) {
  return (
    <>
      <SearchStyle
        fullWidth
        value={filterName}
        onChange={onFilterName}
        placeholder="Search user..."
        endAdornment={
          <InputAdornment position="end">
            <Box
              component={Icon}
              onClick={onSearch}
              icon={searchFill}
              sx={{ color: "text.disabled", ":hover": { cursor: "pointer" } }}
            />
          </InputAdornment>
        }
      />
    </>
  );
}
