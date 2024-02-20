import {
  DownLeftIcon,
  StarFilledIcon,
  StarIcon,
  UpRightIcon,
} from "../../public/icons/icons";
import {
  Avatar,
  IconButton,
  Stack,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import ParaticInput from "./ParaticInput";
import { convertUnixTime } from "@/utils/helper";

export default function ParaticTable({ data, setSearchValue, onFavorite }) {
  const checkUpAndDown = (row) => {
    return row.Direction < 0
      ? { color: "#E84257 !important" }
      : { color: "#2EBD85 !important" };
  };

  return (
    <Stack>
      <Stack flex={1} paddingBottom="10px" alignItems="end">
        <ParaticInput
          onChange={(e) => {
            setSearchValue(e.target.value.trim());
          }}
          sx={{
            color: "white",
            maxWidth: { sm: "100%", md: "400px" },
            width: "100%",
          }}
          placeholder="ara"
        />
      </Stack>
      <TableContainer
        sx={{
          "&&.MuiTableContainer-root": {
            borderRadius: "10px",
          },
        }}
      >
        <Table
          sx={{
            minWidth: 600,
            backgroundColor: "#1E222D",
            "&& .MuiTableCell-root": {
              borderBottom: "1px solid #2A2E39",
            },
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow
              sx={{
                "&& .MuiTableCell-head ": {
                  color: "#BFC3C8",
                  fontSize: "12px",
                },
              }}
            >
              <TableCell align="center"> Dövizler </TableCell>
              <TableCell align="center"> Alış </TableCell>
              <TableCell align="center"> Satış </TableCell>
              <TableCell align="center"> Son </TableCell>
              <TableCell align="center"> Yüksek </TableCell>
              <TableCell align="center"> Düşük </TableCell>
              <TableCell align="center"> Kapanış </TableCell>
              <TableCell align="center"> Zaman </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <TableRow
                sx={{
                  "&& .MuiTableCell-body": {
                    color: "#BFC3C8",
                    fontSize: "13px",
                    fontWeight: 500,
                  },
                }}
                key={row._id}
              >
                <TableCell>
                  <Stack justifyContent="center" flexDirection="row" gap="25px">
                    <Stack>
                      <IconButton
                        onClick={() => {
                          onFavorite(row);
                        }}
                        sx={{ padding: "0" }}
                      >
                        {row.IsFavorite ? <StarFilledIcon /> : <StarIcon />}
                      </IconButton>
                    </Stack>
                    <Stack
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                      gap="15px"
                    >
                      <Stack> {index + 1}</Stack>
                      <Stack>
                        <Avatar
                          src={`https://img.paratic.com/cdn-img/instrument-images/${row.pageID}.png`}
                          sx={{ width: "22px", height: "22px" }}
                        />
                      </Stack>
                      <Stack>{row.LegacyCode}</Stack>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell sx={checkUpAndDown(row)} align="center">
                  {row.Bid}
                </TableCell>
                <TableCell sx={checkUpAndDown(row)} align="center">
                  {row.Ask}
                </TableCell>
                <TableCell sx={checkUpAndDown(row)} align="center">
                  {row.Last}
                </TableCell>
                <TableCell align="center">{row.High}</TableCell>
                <TableCell align="center">{row.Low}</TableCell>
                <TableCell align="center">{row.PreviousClose}</TableCell>
                <TableCell sx={{ color: "#FBB041 !important" }} align="center">
                  {convertUnixTime(row.DateTime)}
                </TableCell>
                <TableCell align="left">
                  {row.Direction < 0 ? <DownLeftIcon /> : <UpRightIcon />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
