"use client";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import ParaticAppBar from "./ParaticAppBar";
import Image from "next/image";
import ParaticDrawerLayout from "./ParaticDrawerLayout";

const ParaticLayout = ({ children }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Stack bgcolor="black">
      <Stack>
        {isMd ? (
          <ParaticDrawerLayout>{children}</ParaticDrawerLayout>
        ) : (
          <ParaticAppBar />
        )}
      </Stack>
      {!isMd && (
        <Stack
          sx={{ minHeight: "calc(100vh - 200px)" }}
          paddingY="25px"
          paddingX="10px"
        >
          {children}
        </Stack>
      )}
      <Stack
        height="150px"
        justifyContent="center"
        alignItems="center"
        width="100%"
        bgcolor="#1E222D"
      >
        <Image
          priority={true}
          alt="logo"
          src="/img/logo.png"
          width="150"
          height="32"
        />
      </Stack>
    </Stack>
  );
};

export default ParaticLayout;

{
  /* <Stack bgcolor="black">
<Stack>
  <ParaticDrawerLayout>{children}</ParaticDrawerLayout>
</Stack>
<Stack
  height="200px"
  justifyContent="center"
  alignItems="center"
  width="100%"
  bgcolor="#1E222D"
>
  <Image src="/img/logo.png" width="150" height="32" />
</Stack>
</Stack> */
}
