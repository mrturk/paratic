import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DownLeftIcon, UpRightIcon } from "../../public/icons/icons";
import { OutlinedInput, Stack } from "@mui/material";
import ParaticInput from "./ParaticInput";

export default function ParaticTable({ data, setSearchValue }) {
  const checkUpAndDown = (row) => {
    return row.Direction < 0
      ? { color: "#E84257 !important" }
      : { color: "#2EBD85 !important" };
  };

  const convertUnixTime = (time) => {
    var s = new Date(time).toLocaleTimeString("tr-TR");
    return s;
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
            maxWidth: "400px",
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
            minWidth: 450,
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
            {data?.map((row) => (
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
                <TableCell align="center">{row.Description}</TableCell>
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
                <TableCell align="center">
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
