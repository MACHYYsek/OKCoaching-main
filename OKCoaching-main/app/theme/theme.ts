import { extendTheme } from "@chakra-ui/react";

const colors = {
    brandBlack: "#191919",
    brandBlue: "#00EDFF",
    brandWhite: "#FFFFFF",
    brandOffWhite: "#F4F4F4",
    brandRed: "#810000",
};

const fontSizes = {
    xxs: "10px",
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "32px",
    "5xl": "36px",
    "6xl": "64px",
};

const breakpoints = {
    sm: "390px",
    md: "768px",
};

const styles = {
    global: {
        "html, body": {
            fontFamily: "Roboto, sans-serif",
            color: "brandWhite",
            bg: "brandBlack",
        },
    },
};

const components = {
    Input: {
        baseStyle: {
            focusBorderColor: "brandBlue",
            bg: "brandBlack",
            _placeholder: { color: "gray.400" },
            size: "md",
            height: "48px",
            borderRadius: "20px",
            border: "none",
            boxShadow: "0px 2px 7.3px 2px rgba(0, 0, 0, 0.25)",
        },
    },
};

const shadows = {
    innerSidebar: "inset 0 0 32px 10px rgba(0, 0, 0, 0.32)", // Inner shadow for sidebars
};

const theme = extendTheme({
    colors,
    fontSizes,
    breakpoints,
    styles,
    components,
    shadows,
});

export default theme;
