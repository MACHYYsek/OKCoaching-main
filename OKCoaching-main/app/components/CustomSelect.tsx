import { Box, Flex, Text, Select } from "@chakra-ui/react";
import { useState } from "react";

interface CustomSelectProps {
    name: string;
    placeholder: string;
    label: string;
    options: { value: string; label: string }[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const CustomSelect = ({ name, placeholder, label, options, onChange }: CustomSelectProps) => {
    const [value, setValue] = useState("placeholder");

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setValue(selectedValue);
        if (selectedValue !== "placeholder") {
            onChange?.(e);
        }
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
            <Select
                name={name}
                value={value} // Bind to state
                focusBorderColor="brandBlue"
                bg="brandBlack"
                size="md"
                height="48px"
                borderRadius="20px"
                border="none"
                boxShadow="0px 2px 7.3px 2px rgba(0, 0, 0, 0.25)"
                onChange={handleChange}
                color={value === "placeholder" ? "#3C3C3C" : "white"} // Gray for placeholder, white for options
                _hover={{ bg: "brandBlack" }}
                _focus={{ bg: "brandBlack" }}
            >
                {/* Hidden placeholder with gray color */}
                <option value="placeholder" disabled hidden>
                    {placeholder}
                </option>
                {/* Options */}
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        style={{
                            backgroundColor: "#333", // Darker background for options
                            color: "white", // White text for better contrast
                        }}
                    >
                        {option.label}
                    </option>
                ))}
            </Select>
        </Box>
    );
};
