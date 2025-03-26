import { Box, Select } from "@chakra-ui/react";
import { useState } from "react";

interface CustomSelectSmallProps {
    name: string;
    options: { value: string; label: string }[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const CustomSelectSmall = ({ name, options, onChange, style }: CustomSelectSmallProps & { style?: React.CSSProperties }) => {
    const [value, setValue] = useState(options[0].value);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setValue(selectedValue);
        onChange?.(e);
    };

    return (
        <Box width="auto" style={style}>
            <Select name={name} value={value} onChange={handleChange} focusBorderColor="brandBlue" bg="brandBlack" size="sm" height="20px" boxShadow="0px 2px 7px rgba(0, 0, 0, 0.35)" borderRadius="4px" border="none" color="white" fontSize="xs" _hover={{ bg: "brandBlack" }} _focus={{ bg: "brandBlack" }}>
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        style={{
                            backgroundColor: "#333",
                            color: "white",
                        }}
                    >
                        {option.label}
                    </option>
                ))}
            </Select>
        </Box>
    );
};
