import { createTheme, type MantineThemeOverride } from "@mantine/core";
import { poppins } from "./fonts";

export const theme: MantineThemeOverride = createTheme({
  fontFamily: poppins.style.fontFamily,
});
