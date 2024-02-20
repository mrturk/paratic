import { OutlinedInput } from "@mui/material";

const ParaticInput = ({ onChange, sx, placeholder }) => {
  return (
    <OutlinedInput
      onChange={onChange}
      sx={{
        "& label.Mui-focused": {
          color: "white",
        },
        "&&.MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#1E222D",
          },
        },
        "&&.Mui-focused fieldset": {
          borderColor: "#1E222D",
        },
        ...sx,
      }}
      placeholder={placeholder}
    />
  );
};
export default ParaticInput;
