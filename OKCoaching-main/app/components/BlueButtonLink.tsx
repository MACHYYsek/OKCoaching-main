"use client";

import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface BlueButtonLinkProps {
    text: string;
    href?: string;
    bg?: string;
    color?: string;
    isFullWidth?: boolean;
    onClick?: () => void | Promise<void>;
    height?: string;
    bold?: boolean;
    width?: string;
}

export const BlueButtonLink = ({ text, href, bg = "brandBlue", color = "brandBlack", isFullWidth = true, onClick, height = "48px", bold = false, width }: BlueButtonLinkProps) => {
    const router = useRouter();

    const handleClick = async () => {
        if (onClick) {
            await onClick();
        }
        if (href) {
            router.push(href);
        }
    };

    return (
        <Button onClick={handleClick} bg={bg} color={color} w={isFullWidth ? "full" : "auto"} _hover={{ bg: "#00CCDD" }} height={height} borderRadius="20px" padding="10px" boxShadow="0px 4px 4px rgba(0, 0, 0, 0.45)" size="lg" fontWeight={bold ? "bold" : "normal"} width={width}>
            {text}
        </Button>
    );
};
