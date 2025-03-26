import { Input, Box, Flex, Text, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { useState } from "react";

interface CustomDateRequiredProps {
    name: string;
    placeholder: string;
    label: string;
    onChange?: (date: string) => void; // onChange now expects a date string
    rightElementIcon?: React.ReactNode;
    onRightElementClick?: () => void;
}

export const CustomDateRequired = ({ name, placeholder, label, onChange, rightElementIcon, onRightElementClick }: CustomDateRequiredProps) => {
    const [value, setValue] = useState("");

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = e.target.value; // Extract the date string in YYYY-MM-DD
        const formattedDate = formatToDDMMYYYY(dateValue); // Convert to DD-MM-YYYY format
        setValue(dateValue);
        if (onChange) {
            onChange(formattedDate); // Pass the formatted date
        }
    };

    // Helper function to format date to DD-MM-YYYY
    const formatToDDMMYYYY = (date: string) => {
        const [year, month, day] = date.split("-");
        return `${day}-${month}-${year}`;
    };

    return (
        <Box>
            <Flex align="center" mb={1}>
                <Text fontSize="md" fontWeight="bold" color="brandWhite">
                    {label}
                </Text>
                <Text color="brandBlue" fontWeight="bold" ml={1}>
                    *
                </Text>
            </Flex>
            <InputGroup>
                <Input name={name} type="date" placeholder={placeholder} value={value} onChange={handleDateChange} focusBorderColor="brandBlue" bg="brandBlack" _placeholder={{ color: "#3C3C3C" }} size="md" height="48px" borderRadius="20px" border="none" boxShadow="0px 2px 7.3px 2px rgba(0, 0, 0, 0.25)" color="white" />
                {rightElementIcon ? (
                    <InputRightElement width="4.5rem">
                        <Button size="md" onClick={onRightElementClick} variant="ghost" color="brandWhite" bg="transparent" _hover={{ bg: "transparent" }} _active={{ bg: "transparent" }} _focus={{ boxShadow: "none", bg: "transparent" }} _focusVisible={{ boxShadow: "none" }}>
                            {rightElementIcon}
                        </Button>
                    </InputRightElement>
                ) : null}
            </InputGroup>
        </Box>
    );
};
