"use client";
import React, { useState } from "react";
import { Box, SimpleGrid, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useToast } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { CustomButton } from "@/app/components/CustomButton";
import { CustomInput, CustomInputRequired } from "@/app/components/CustomInput";

interface TrainingSplitProps {
    groupId: string;
    isOpen: boolean;
    onClose: () => void;
}

export const TrainingSplit: React.FC<TrainingSplitProps> = ({ groupId, isOpen, onClose }) => {
    const [days, setDays] = useState<string[]>(["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]);
    const [dayInputs, setDayInputs] = useState<{ [key: number]: string }>({});
    const [releaseDate, setReleaseDate] = useState<string>("");
    const [splitName, setSplitName] = useState<string>("");
    const toast = useToast();

    const addDay = () => {
        const newDay = `Day ${days.length + 1}`;
        setDays([...days, newDay]);
    };

    const removeDay = (index: number) => {
        const updatedDays = days.filter((_, i) => i !== index);
        setDays(updatedDays);
        setDayInputs((prev) => {
            const newInputs = { ...prev };
            delete newInputs[index];
            return newInputs;
        });
    };

    const resetData = () => {
        setReleaseDate("");
        setSplitName("");
        setDayInputs({});
        setDays(["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]);
    };

    const handleInputChange = (index: number, value: string) => {
        setDayInputs((prev) => ({ ...prev, [index]: value }));
    };

    const handleCreateSplit = async () => {
        if (!splitName || !releaseDate || Object.keys(dayInputs).length < 7) {
            toast({
                title: "Error",
                description: "Split name, release date, and at least 7 training days are required",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        const formattedDays = days.map((day, index) => {
            const trainingName = dayInputs[index] || "";
            const isRestDay = trainingName.toLowerCase() === "rest";

            return {
                dayNumber: index + 1,
                trainingName,
                isRestDay,
                exercises: [],
            };
        });

        const splitData = {
            name: splitName,
            releaseSince: new Date(releaseDate),
            days: formattedDays,
            groupId,
        };

        try {
            const response = await fetch("/api/admin/split/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(splitData),
            });

            const result = await response.json();

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Split added successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });
                resetData();
                onClose();
            } else {
                throw new Error(result.message || "Failed to add split");
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        }
    };

    const handleClose = () => {
        resetData();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} size="2xl" isCentered scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent bg="brandBlack" color="brandWhite" p={4} borderRadius="lg" my={6} minH="98vh">
                <ModalHeader fontSize="lg" fontWeight="bold" color="brandBlue" textAlign="center">
                    CREATE A TRAINING SPLIT
                </ModalHeader>
                <ModalCloseButton color="white" onClick={handleClose} />

                <ModalBody>
                    <Box bg="brandBlack" color="brandWhite" borderRadius="lg">
                        <VStack spacing={4} align="start" width="100%">
                            <SimpleGrid columns={2} spacingX={4} spacingY={2} width="100%">
                                <CustomInputRequired name="releaseDate" type="date" placeholder="Select release date" label="Release Date" onChange={(e) => setReleaseDate(e.target.value)} value={releaseDate} />
                                <CustomInputRequired name="splitName" type="text" placeholder="Enter split name" label="Split Name" onChange={(e) => setSplitName(e.target.value)} value={splitName} />
                                {days.map((day, index) => (
                                    <Box key={index}>
                                        {index < 7 ? (
                                            <CustomInputRequired name={`day${index + 1}`} type="text" placeholder="Type in training name" label={day} onChange={(e) => handleInputChange(index, e.target.value)} value={dayInputs[index] || ""} />
                                        ) : (
                                            <CustomInput name={`day${index + 1}`} type="text" placeholder="Type in training name" label={day} onChange={(e) => handleInputChange(index, e.target.value)} value={dayInputs[index] || ""} rightElementIcon={<FaTrash />} onRightElementClick={() => removeDay(index)} />
                                        )}
                                    </Box>
                                ))}
                            </SimpleGrid>
                        </VStack>
                        <CustomButton onClick={addDay} width="100%" mt={4}>
                            Need another day?
                        </CustomButton>
                    </Box>
                </ModalBody>

                <ModalFooter justifyContent="center">
                    <VStack width="100%" spacing={4}>
                        <CustomButton onClick={handleCreateSplit} width="100%" backgroundColor="brandBlue" opacity={1}>
                            CREATE
                        </CustomButton>
                    </VStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
