import { Button } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";

import { MouseEventHandler } from "react";

interface GoogleButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const GoogleButton = ({ text, onClick }: GoogleButtonProps) => (
  <Button
    leftIcon={<FaGoogle />}
    height="48px"
    bg="brandBlack"
    color="brandWhite"
    _hover={{ bg: "gray.600" }}
    size="xs"
    borderRadius="20px"
    boxShadow="0px 2px 7.3px 2px rgba(0, 0, 0, 0.25)"
    onClick={onClick}
  >
    {text}
  </Button>
);
