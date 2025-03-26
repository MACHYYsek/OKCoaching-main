import { Button } from "@chakra-ui/react";

interface CustomButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    width?: string;
    mt?: number;
    backgroundColor?: string;
    textColor?: string;
    opacity?: number;
    opacityHover?: number;
}

export const CustomButton = ({ children, onClick, width = "100%", mt = 4, backgroundColor = "brandBlack", textColor = "brandWhite", opacity = 0.5, opacityHover = 1 }: CustomButtonProps) => {
    return (
        <Button
            width={width}
            mt={mt}
            onClick={onClick}
            bg={backgroundColor}
            color={textColor}
            opacity={opacity}
            fontWeight="bold"
            fontSize="md"
            borderRadius="20px"
            boxShadow="0px 0px 10px 3px rgba(0, 0, 0, 0.45)"
            _hover={{ bg: { backgroundColor }, opacity: { opacityHover } }}
            _active={{ bg: { backgroundColor }, opacity: 0.8 }}
            _focus={{ boxShadow: "none" }}
        >
            {children}
        </Button>
    );
};
