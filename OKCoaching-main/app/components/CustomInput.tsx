import { Input, Box, Flex, Text, InputGroup, InputRightElement, Button, Textarea } from "@chakra-ui/react";

interface CustomInputProps {
    name: string;
    type: string;
    placeholder: string;
    label: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    rightElementIcon?: React.ReactNode;
    onRightElementClick?: () => void;
    value?: string;
}

interface CustomTextareaProps {
    name: string;
    placeholder: string;
    label: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value?: string;
}

export const CustomInputRequired = ({ name, type, placeholder, label, onChange, rightElementIcon, onRightElementClick, value }: CustomInputProps) => (
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
            <Input name={name} type={type} placeholder={placeholder} focusBorderColor="brandBlue" bg="brandBlack" _placeholder={{ color: "#3C3C3C" }} size="md" height="48px" borderRadius="20px" border="none" boxShadow="0px 2px 7.3px 2px rgba(0, 0, 0, 0.25)" onChange={onChange} defaultValue={value} />
            {rightElementIcon && (
                <InputRightElement width="4.5rem">
                    <Button size="sm" onClick={onRightElementClick} variant="ghost" color="brandWhite" bg="transparent" _hover={{ bg: "transparent" }} _active={{ bg: "transparent" }} _focus={{ boxShadow: "none", bg: "transparent" }} _focusVisible={{ boxShadow: "none" }}>
                        {rightElementIcon}
                    </Button>
                </InputRightElement>
            )}
        </InputGroup>
    </Box>
);

export const CustomTextareaRequired = ({ name, placeholder, label, onChange, value }: CustomTextareaProps) => (
    <Box>
        <Flex align="center" mb={1}>
            <Text fontSize="md" fontWeight="bold" color="brandWhite">
                {label}
            </Text>
            <Text color="brandBlue" fontWeight="bold" ml={1}>
                *
            </Text>
        </Flex>
        <Textarea name={name} placeholder={placeholder} onChange={onChange} focusBorderColor="brandBlue" bg="brandBlack" _placeholder={{ color: "#3C3C3C" }} color="#FFFFFF" size="md" height="100px" borderRadius="20px" border="none" boxShadow="0px 2px 7.3px 2px rgba(0, 0, 0, 0.25)" resize="none" defaultValue={value} />
    </Box>
);

export const CustomInput = ({ name, type, placeholder, label, onChange, rightElementIcon, onRightElementClick, value }: CustomInputProps) => (
    <Box>
        <Flex align="center" mb={1}>
            <Text fontSize="md" fontWeight="bold" color="brandWhite">
                {label}
            </Text>
        </Flex>
        <InputGroup>
            <Input name={name} type={type} placeholder={placeholder} focusBorderColor="brandBlue" bg="brandBlack" _placeholder={{ color: "#3C3C3C" }} size="md" height="48px" borderRadius="20px" border="none" boxShadow="0px 2px 7.3px 2px rgba(0, 0, 0, 0.25)" onChange={onChange} defaultValue={value} />
            {rightElementIcon && (
                <InputRightElement width="3.5rem" mt="0.2rem">
                    <Button size="sm" onClick={onRightElementClick} variant="ghost" color="brandWhite" bg="transparent" _hover={{ bg: "transparent" }} _active={{ bg: "transparent" }} _focus={{ boxShadow: "none", bg: "transparent" }} _focusVisible={{ boxShadow: "none" }}>
                        {rightElementIcon}
                    </Button>
                </InputRightElement>
            )}
        </InputGroup>
    </Box>
);

interface CustomSmallInputProps {
    name: string;
    type?: string;
    placeholder: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CustomSmallInput = ({ name, type = "text", placeholder, value, onChange }: CustomSmallInputProps) => (
    <Box>
        <InputGroup>
            <Input
                name={name}
                type={type}
                placeholder={placeholder}
                focusBorderColor="brandBlue"
                bg="brandBlack"
                _placeholder={{ color: "#3C3C3C" }}
                size="sm" // smaller size
                height="32px" // adjust height to be smaller
                width="90px" // adjust width to make it compact
                borderRadius="20px"
                border="none"
                boxShadow="inset 0px 0px 10px 3px rgba(0, 0, 0, 0.25)" // inner shadow
                onChange={onChange}
                defaultValue={value}
                color="white" // for better contrast
                textAlign="center" // center-align text
            />
        </InputGroup>
    </Box>
);

interface CustomTextarea {
    name: string;
    placeholder: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value?: string;
    width?: string;
    height?: string;
}

export const CustomTextarea = ({ name, placeholder, onChange, value, width, height }: CustomTextarea) => (
    <Box>
        <Textarea name={name} placeholder={placeholder} onChange={onChange} rows={4} width={width} height={height} focusBorderColor="brandBlue" bg="brandBlack" _placeholder={{ color: "#3C3C3C" }} color="#FFFFFF" size="md" borderRadius="20px" border="none" boxShadow="0px 2px 7.3px 2px rgba(0, 0, 0, 0.25)" resize="none" defaultValue={value} />
    </Box>
);
