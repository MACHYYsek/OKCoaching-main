import { Button } from "@chakra-ui/react";

interface BlueButtonProps {
  text: string;
  isLoading?: boolean;
}

export const BlueButtonForm = ({ text, isLoading }: BlueButtonProps) => (
  <Button
    isLoading={isLoading}
    type="submit"
    mt={4}
    height="48px"
    bg="brandBlue"
    color="brandBlack"
    _hover={{ bg: "#00CCDD" }}
    size="md"
    borderRadius="20px"
    padding="10px"
    boxShadow="0px 4px 4px rgba(0, 0, 0, 0.45)"
  >
    {text}
  </Button>
);
