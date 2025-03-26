"use client";

import { Box, Flex, Heading, Text, IconButton, List, ListItem, Image, Grid, Circle, VStack, useToast, Spinner, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import { FaPlus, FaPencilAlt, FaSearch, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { CustomInputRequired, CustomTextareaRequired, CustomInput } from "@/app/components/CustomInput";
import { CustomButton } from "@/app/components/CustomButton";
import { CustomSelectSmall } from "@/app/components/CustomSelectSmall";
import { MesocycleCard } from "@/app/components/MesocycleCard";
import { TrainingSplit } from "@/app/components/TrainingSplitModal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DraggableExercise } from "@/app/components/DraggableExercise";
import { DroppableArea } from "@/app/components/DroppableArea";
import { Group, Exercise, Split, Day } from "@/app/types/interaces";

export default function Dashboard() {
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [selectedClient, setSelectedClient] = useState<string | null>(null);
    const [isAddingExercise, setIsAddingExercise] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [exerciseToDelete, setExerciseToDelete] = useState<Exercise | null>(null);
    const [isAddingGroup, setIsAddingGroup] = useState(false);
    const [isEdditingGroup, setIsEdditingGroup] = useState<Group | null>(null);
    const [groups, setGroups] = useState<Group[]>([]);
    const [groupToDelete, setGroupToDelete] = useState<Group | null>(null);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [exerciseFormData, setExerciseFormData] = useState({
        name: "",
        tempo: "",
        description: "",
        video: "",
    });
    const [groupFormData, setGroupFormData] = useState({
        name: "",
        emoji: "",
        description: "",
        image: "",
        video: "",
    });
    const [exerciseSearchTerm, setExerciseSearchTerm] = useState("");
    const [groupSplits, setGroupSplits] = useState<Split[]>([]);
    const [allSplits, setAllSplits] = useState<Split[]>([]);
    const [isLoadingSplits, setIsLoadingSplits] = useState<boolean>(true);
    const [isLoadingGroups, setIsLoadingGroups] = useState<boolean>(true);
    const [editingSplit, setEditingSplit] = useState<Split | null>(null);
    const [selectedTraining, setSelectedTraining] = useState<Day | null>(null);
    const [resetTrigger, setResetTrigger] = useState(false);

    const toast = useToast();
    const { isOpen: isExerciseOpen, onOpen: onExerciseOpen, onClose: onExerciseClose } = useDisclosure();
    const { isOpen: isGroupDeleteOpen, onOpen: onGroupDeleteOpen, onClose: onGroupDeleteClose } = useDisclosure(); // Group delete modal controls
    const { isOpen: isTrainingSplitOpen, onOpen: onTrainingSplitOpen, onClose: onTrainingSplitClose } = useDisclosure();

    const clients = ["Machalíček Daniel", "Michal Machů", "Švenda Petr", "Tomáš Záhorák", "Sára Rosecká", "Edita Klinkovská", "Gabika Halinkovičová"];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [exercisesResponse, groupsResponse, splitResponse] = await Promise.all([
                    fetch("/api/admin/exercise/get", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }),
                    fetch("/api/admin/group/get", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }),
                    fetch("/api/admin/split/get", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }),
                ]);

                const exercisesResult = await exercisesResponse.json();
                const groupsResult = await groupsResponse.json();
                const splitResult = await splitResponse.json();

                if (splitResponse.ok) {
                    setAllSplits(splitResult.splits);
                } else {
                    toast({
                        title: "Error",
                        description: splitResult.message,
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                        position: "top",
                    });
                }

                if (exercisesResponse.ok) {
                    setExercises(exercisesResult.exercises);
                } else {
                    toast({
                        title: "Error",
                        description: exercisesResult.message,
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                        position: "top",
                    });
                }

                if (groupsResponse.ok) {
                    setGroups(groupsResult.groups);
                    setIsLoadingGroups(false);
                } else {
                    toast({
                        title: "Error",
                        description: groupsResult.message,
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                        position: "top",
                    });
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
                toast({
                    title: "Error",
                    description: "An error occurred while fetching data.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [toast]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setExerciseFormData({ ...exerciseFormData, [e.target.name]: e.target.value });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExerciseSearchTerm(e.target.value);
    };

    const filteredExercises = exercises.filter((exercise) => exercise.name.toLowerCase().startsWith(exerciseSearchTerm.toLowerCase()));

    const handleGroupInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setGroupFormData({ ...groupFormData, [e.target.name]: e.target.value });
    };

    const resetState = async () => {
        setSelectedGroup(null);
        setSelectedClient(null);
        setIsAddingExercise(false);
        setSelectedExercise(null);
        setExerciseToDelete(null);
        setIsAddingGroup(false);
        setIsEdditingGroup(null);
        setGroupToDelete(null);
        setExerciseFormData({
            name: "",
            tempo: "",
            description: "",
            video: "",
        });
        setGroupFormData({
            name: "",
            emoji: "",
            description: "",
            image: "",
            video: "",
        });
        setIsAddingGroup(false);
        setIsEdditingGroup(null);
        setGroupSplits([]);
        setEditingSplit(null);
        setSelectedTraining(null);
        handleReset();
    };

    const openEditExercise = async (exercise: Exercise) => {
        await resetState();
        setSelectedExercise(exercise);
        setExerciseFormData({
            name: exercise.name,
            tempo: exercise.sets[0].tempo as string,
            description: exercise.description,
            video: exercise.video,
        });
    };

    const handleAddExerciseClick = async () => {
        await resetState();
        setIsAddingExercise(true);
    };

    const handleGroupClick = async (group: Group) => {
        await resetState();
        setSelectedGroup(group);
        getGroupSplits(group._id);
    };

    const getGroupSplits = (groupId: string) => {
        setIsLoadingSplits(true);

        try {
            // Filter splits directly from allSplits based on the groupId
            const filteredSplits = allSplits.filter((split) => split.groupId === groupId);
            setGroupSplits(filteredSplits);
        } catch (error) {
            console.error("Error filtering group splits:", error);
            toast({
                title: "Error",
                description: "An unexpected error occurred while filtering group splits.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        } finally {
            setIsLoadingSplits(false);
        }
    };

    const handleClientClick = async (client: string) => {
        await resetState();
        setSelectedClient(client);
    };

    const handleAddExercise = async () => {
        // Validation and tempo format checks
        if (!exerciseFormData.name || !exerciseFormData.description || !exerciseFormData.tempo) {
            toast({
                title: "Missing Fields",
                description: "Please fill out all required fields.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        const tempoPattern = /^\d+\.\d+\.\d+\.\d+$/;
        if (!tempoPattern.test(exerciseFormData.tempo)) {
            toast({
                title: "Invalid Tempo Format",
                description: "Please enter a valid tempo format (e.g., 1.2.3.4).",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        try {
            const sets = [{ tempo: exerciseFormData.tempo }];
            const response = await fetch("/api/admin/exercise/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...exerciseFormData, sets }),
            });

            const result = await response.json();
            if (response.ok) {
                toast({
                    title: "Exercise Added",
                    description: "The exercise has been added successfully.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
                setExercises([...exercises, result.exercise]);
                setIsAddingExercise(false);
            } else {
                toast({
                    title: "Error",
                    description: result.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
            }
        } catch (error) {
            console.error("Error adding exercise:", error);
            toast({
                title: "Error",
                description: "An unexpected error occurred while adding the exercise.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        }
    };

    const handleSaveExercise = async () => {
        if (!selectedExercise) return;

        const sets = [{ tempo: exerciseFormData.tempo }];

        try {
            const response = await fetch("/api/admin/exercise/edit", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: selectedExercise._id,
                    name: exerciseFormData.name,
                    description: exerciseFormData.description,
                    video: exerciseFormData.video,
                    sets,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                toast({
                    title: "Exercise Updated",
                    description: "The exercise has been updated successfully.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
                setExercises((prevExercises) => prevExercises.map((exercise) => (exercise._id === selectedExercise._id ? result.exercise : exercise)));
                await resetState();
            } else {
                toast({
                    title: "Error",
                    description: result.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
            }
        } catch (error) {
            console.error("Error saving exercise:", error);
            toast({
                title: "Error",
                description: "An unexpected error occurred while saving the exercise.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        }
    };

    const confirmDeleteExercise = (exercise: Exercise) => {
        setExerciseToDelete(exercise);
        onExerciseOpen();
    };

    const handleDeleteExercise = async () => {
        if (!exerciseToDelete) return;

        try {
            const response = await fetch("/api/admin/exercise/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: exerciseToDelete._id }),
            });

            const result = await response.json();
            if (response.ok) {
                toast({
                    title: "Exercise Deleted",
                    description: "The exercise has been deleted successfully.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
                setExercises((prevExercises) => prevExercises.filter((exercise) => exercise._id !== exerciseToDelete._id));
                onExerciseClose(); // Close the modal
                await resetState(); // Clear form and selectedExercise after deletion
            } else {
                toast({
                    title: "Error",
                    description: result.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
            }
        } catch (error) {
            console.error("Error deleting exercise:", error);
            toast({
                title: "Error",
                description: "An unexpected error occurred while deleting the exercise.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        }
    };

    const handleAddGroupClick = async () => {
        await resetState();
        setIsAddingGroup(true);
    };

    const handleAddGroup = async () => {
        if (!groupFormData.name || !groupFormData.emoji || !groupFormData.description || !groupFormData.image || !groupFormData.video) {
            toast({
                title: "Missing Fields",
                description: "Please fill out all required fields.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        try {
            const response = await fetch("/api/admin/group/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...groupFormData, splits: [] }),
            });

            const result = await response.json();
            if (response.ok) {
                toast({
                    title: "Group Added",
                    description: "The group has been added successfully.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
                setIsAddingGroup(false);
                setGroups([...groups, result.group]);
                await resetState();
            } else {
                toast({
                    title: "Error",
                    description: result.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
            }
        } catch (error) {
            console.error("Error adding group:", error);
            toast({
                title: "Error",
                description: "An unexpected error occurred while adding the group.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        }
    };

    const handleEditGroupClick = async (group: Group) => {
        await resetState();
        setGroupFormData({
            name: group.name,
            emoji: group.emoji,
            description: group.description,
            image: group.image,
            video: group.video,
        });
        setIsEdditingGroup(group);
    };

    const handleEditGroup = async () => {
        console.log("Editing group:", groupFormData);
        if (!groupFormData.name || !groupFormData.emoji || !groupFormData.description || !groupFormData.image || !groupFormData.video) {
            toast({
                title: "Missing Fields",
                description: "Please fill out all required fields.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        try {
            const response = await fetch("/api/admin/group/edit", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: isEdditingGroup ? isEdditingGroup._id : "", ...groupFormData, splits: [] }),
            });

            const result = await response.json();
            if (response.ok) {
                toast({
                    title: "Group Updated",
                    description: "The group has been updated successfully.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
                setIsAddingGroup(false);
                setGroups((prevGroups) => prevGroups.map((group) => (group._id === isEdditingGroup?._id ? result.group : group)));
                await resetState();
            } else {
                toast({
                    title: "Error",
                    description: result.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
            }
        } catch (error) {
            console.error("Error adding group:", error);
            toast({
                title: "Error",
                description: "An unexpected error occurred while adding the group.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        }
    };

    const confirmDeleteGroup = (group: Group) => {
        setGroupToDelete(group);
        onGroupDeleteOpen();
    };

    const handleDeleteGroup = async () => {
        if (!groupToDelete) return;

        try {
            const response = await fetch("/api/admin/group/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: groupToDelete._id }),
            });

            const result = await response.json();
            if (response.ok) {
                toast({
                    title: "Group Deleted",
                    description: "The group has been deleted successfully.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
                setGroups((prevGroups) => prevGroups.filter((group) => group._id !== groupToDelete._id));
                onGroupDeleteClose(); // Close the group delete modal
                await resetState(); // Clear form and selectedGroup after deletion
            } else {
                toast({
                    title: "Error",
                    description: result.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
            }
        } catch (error) {
            console.error("Error deleting group:", error);
            toast({
                title: "Error",
                description: "An unexpected error occurred while deleting the group.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        }
    };

    const chunkDays = (days: Day[], chunkSize: number): Day[][] => {
        const chunks: Day[][] = [];
        for (let i = 0; i < days.length; i += chunkSize) {
            chunks.push(days.slice(i, i + chunkSize));
        }
        return chunks;
    };

    // Function to handle opening a split for editing
    const handleEditSplit = (split: Split) => {
        setEditingSplit(split);
    };

    // Function to close editing view and show all splits again
    const handleCloseEditing = () => {
        setEditingSplit(null);
        setSelectedTraining(null);
    };

    const handleSelectTraining = (day: Day) => {
        setSelectedTraining(day);
        console.log("Selected training day:", day);
    };

    const handleSaveNewExercisesToSplit = async (exercises: Exercise[]) => {
        try {
            console.log(exercises);

            const updatedSplit = { ...editingSplit };

            const selectedDay = selectedTraining ? updatedSplit.days?.find((day) => day._id === selectedTraining._id) : null;

            if (!selectedDay) {
                toast({
                    title: "Error",
                    description: "Selected day not found in the editing split.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });
                return;
            }

            console.log("New exercises (with updated description):", exercises);

            const formattedExercises = exercises.map((exercise) => ({
                exercise: exercise._id,
                description: exercise.description, // Use the updated description
                customSets: exercise.sets.map((set) => ({
                    tempo: set.tempo,
                    rir: set.rir,
                    reps: set.reps,
                    rest: set.rest,
                })),
            }));

            console.log("Formatted exercises:", formattedExercises);

            // Update the selected day's exercises
            selectedDay.exercises = [...formattedExercises];

            console.log("Selected day with updated exercises:", selectedDay);

            const payload = {
                id: updatedSplit._id,
                name: updatedSplit.name,
                releaseSince: updatedSplit.releaseSince,
                groupId: updatedSplit.groupId,
                days: updatedSplit.days?.map((day) => ({
                    ...day,
                    exercises: day.exercises.map((exercise) => ({
                        exercise: exercise.exercise,
                        description: exercise.description,
                        customSets: exercise.customSets,
                    })),
                })),
            };

            console.log("Payload to update split:", payload);

            const response = await fetch(`/api/admin/split/edit`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const error = await response.json();
                toast({
                    title: "Error",
                    description: `Failed to update split: ${error.message}`,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
                return;
            }

            const updatedData = await response.json();
            toast({
                title: "Success",
                description: "Split updated successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });

            console.log("Updated split:", updatedData.split);
            console.log("Full updated data:", updatedData);

            const currentGroup = selectedGroup;
            await resetState();
            setSelectedGroup(currentGroup);
        } catch (error) {
            toast({
                title: "Error",
                description: "An unexpected error occurred while saving exercises to the split.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            console.log(error);
        }
    };

    const handleReset = () => {
        console.log("Resetting state...");
        setResetTrigger((prev) => !prev);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <Flex height="100vh" maxHeight="100vh" overflowY="hidden" bg="brandBlack" color="brandWhite">
                <Modal isOpen={isGroupDeleteOpen} onClose={onGroupDeleteClose} isCentered>
                    <ModalOverlay />
                    <ModalContent bg="brandBlack" color="brandWhite">
                        <ModalHeader fontSize="xl" fontWeight="bold" textAlign="center">
                            Are you sure you want to delete this group?
                        </ModalHeader>
                        <ModalCloseButton color="brandWhite" />
                        <ModalBody textAlign="center">This decision is permanent and can&apos;t be taken back.</ModalBody>
                        <ModalFooter justifyContent="center">
                            <CustomButton backgroundColor="brandRed" textColor="brandBlack" onClick={handleDeleteGroup}>
                                DELETE GROUP
                            </CustomButton>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Modal isOpen={isExerciseOpen} onClose={onExerciseClose} isCentered>
                    <ModalOverlay />
                    <ModalContent bg="brandBlack" color="brandWhite">
                        <ModalHeader fontSize="xl" fontWeight="bold" textAlign="center" mx={5}>
                            Are you sure you want to delete this exercise?
                        </ModalHeader>
                        <ModalCloseButton color="brandWhite" />
                        <ModalBody textAlign="center">This decision is permanent and can&apos;t be taken back.</ModalBody>
                        <ModalFooter justifyContent="center">
                            <CustomButton backgroundColor="brandRed" textColor="brandBlack" onClick={handleDeleteExercise}>
                                DELETE EXERCISE
                            </CustomButton>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                {/* Left Sidebar for Groups and Clients */}
                <Box width="15%" bg="brandBlack" p={4} boxShadow="innerSidebar">
                    <Heading size="lg" mb={4}>
                        OKCoaching
                    </Heading>

                    {/* Groups Section */}
                    <Box mb={8}>
                        <Flex justify="space-between" align="center">
                            <Heading size="md" mb={2}>
                                Groups
                            </Heading>
                            <IconButton icon={<FaPlus />} size="sm" aria-label="Add group" background="brandBlue" onClick={handleAddGroupClick} />
                        </Flex>
                        {isLoadingGroups ? (
                            <Flex justify="center" align="center" mt={4}>
                                <Spinner size="lg" color="brandBlue" />
                            </Flex>
                        ) : (
                            <List spacing={2} mt={4}>
                                {groups.map((group, index) => (
                                    <ListItem key={index} onClick={() => handleGroupClick(group)} cursor="pointer" display="flex" alignItems="center" justifyContent="space-between">
                                        <Text fontSize="md">
                                            {group.emoji} {group.name}
                                        </Text>
                                        <IconButton
                                            icon={<FaPencilAlt />}
                                            size="xs"
                                            aria-label={`Edit ${group.name}`}
                                            background="transparent"
                                            color="brandWhite"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditGroupClick(group);
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </Box>

                    {/* Clients Section */}
                    <Box>
                        <Flex justify="space-between" align="center">
                            <Heading size="md" mb={2}>
                                Clients
                            </Heading>
                            <IconButton icon={<FaPlus />} size="sm" aria-label="Add client" background="brandBlue" onClick={resetState} />
                        </Flex>
                        <List spacing={2} mt={4}>
                            {clients.map((client, index) => (
                                <ListItem
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClientClick(client);
                                    }}
                                    cursor="pointer"
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Circle size="8px" bg="brandBlue" mr={2} />
                                    <Text fontSize="md">{client}</Text>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>

                {/* Middle Content Section */}
                <Box width="60%" py={selectedGroup ? 2 : 8} px={selectedGroup ? 0 : 8} display="flex" alignItems={selectedGroup ? "flex-start" : "center"} justifyContent={selectedGroup ? "flex-start" : "center"} bg="brandBlack">
                    {selectedExercise ? (
                        // Edit Exercise form
                        <Box width="70%" bg="brandBlack" color="brandWhite" p={6} borderRadius="lg" boxShadow="0px 0px 32px 10px rgba(0, 0, 0, 0.35)">
                            <Heading textAlign="center" fontSize="2xl" fontWeight="bold" color="brandBlue" mb={6}>
                                {selectedExercise.name}
                            </Heading>
                            <VStack spacing={4} width="100%">
                                <Flex width="100%" gap={4}>
                                    <Box width="50%">
                                        <CustomInputRequired name="name" type="text" placeholder="Enter exercise name" label="Name" value={exerciseFormData.name} onChange={handleInputChange} />
                                    </Box>
                                    <Box width="50%">
                                        <CustomInputRequired name="tempo" type="text" placeholder="Enter recommended tempo" label="Tempo" value={exerciseFormData.tempo} onChange={handleInputChange} />
                                    </Box>
                                </Flex>
                                <Box width="100%">
                                    <CustomTextareaRequired name="description" placeholder="Provide a description for the exercise" label="Description" value={exerciseFormData.description} onChange={handleInputChange} />
                                </Box>
                                <Box width="100%">
                                    <Text fontSize="md" fontWeight="bold" color="brandWhite" mb={2}>
                                        VIDEO *
                                    </Text>
                                    <Image src={exerciseFormData.video} alt="Exercise Video" width="100%" height="150px" borderRadius="md" objectFit="cover" />
                                </Box>
                            </VStack>
                            <Flex mt={4} gap={4}>
                                <CustomButton backgroundColor="brandRed" textColor="brandBlack" onClick={() => confirmDeleteExercise(selectedExercise)}>
                                    DELETE EXERCISE
                                </CustomButton>
                                <CustomButton onClick={handleSaveExercise}>SAVE CHANGES</CustomButton>
                            </Flex>
                        </Box>
                    ) : isAddingExercise ? (
                        // Add New Exercise form
                        <Box width="70%" bg="brandBlack" color="brandWhite" p={6} borderRadius="lg" boxShadow="0px 0px 32px 10px rgba(0, 0, 0, 0.35)">
                            <Heading textAlign="center" fontSize="xl" fontWeight="bold" color="brandBlue" mb={6}>
                                ADD NEW EXERCISE
                            </Heading>
                            <VStack spacing={4} width="100%">
                                <Flex width="100%" gap={4}>
                                    <Box width="50%">
                                        <CustomInputRequired name="name" type="text" placeholder="Enter exercise name" label="Name" onChange={handleInputChange} />
                                    </Box>
                                    <Box width="50%">
                                        <CustomInputRequired name="tempo" type="text" placeholder="Enter recommended tempo" label="Tempo" onChange={handleInputChange} />
                                    </Box>
                                </Flex>
                                <Box width="100%">
                                    <CustomTextareaRequired name="description" placeholder="Provide a description for the exercise" label="Description" onChange={handleInputChange} />
                                </Box>
                                <Box width="100%">
                                    <Text fontSize="md" fontWeight="bold" color="brandWhite" mb={2}>
                                        VIDEO *
                                    </Text>
                                    <Box width="100%" height="150px" bg="gray.700" display="flex" alignItems="center" justifyContent="center" borderRadius="md" boxShadow="0px 2px 7.3px 2px rgba(0, 0, 0, 0.25)">
                                        <FaPlus size="40px" color="white" />
                                    </Box>
                                </Box>
                            </VStack>
                            <CustomButton onClick={handleAddExercise}>ADD NEW EXERCISE</CustomButton>
                        </Box>
                    ) : isAddingGroup ? (
                        // Add New Group form
                        <Box width="70%" bg="brandBlack" color="brandWhite" p={6} borderRadius="lg" boxShadow="0px 0px 32px 10px rgba(0, 0, 0, 0.35)">
                            <Heading textAlign="center" fontSize="2xl" fontWeight="bold" color="brandBlue" mb={6}>
                                ADD A NEW GROUP
                            </Heading>
                            <VStack spacing={4} width="100%">
                                <Flex width="100%" gap={4}>
                                    <Box width="90%">
                                        <CustomInputRequired name="name" type="text" placeholder="Enter group name" label="Name" onChange={handleGroupInputChange} />
                                    </Box>
                                    <Box width="10%">
                                        <CustomInputRequired name="emoji" type="text" placeholder="" label="Emoji" onChange={handleGroupInputChange} />
                                    </Box>
                                </Flex>
                                <Box width="100%">
                                    <CustomTextareaRequired name="description" placeholder="Provide a description for the group" label="Description" onChange={handleGroupInputChange} />
                                </Box>
                                <CustomInputRequired name="image" type="text" placeholder="Image URL" label="Image" onChange={handleGroupInputChange} />
                                <CustomInputRequired name="video" type="text" placeholder="Video URL" label="Video" onChange={handleGroupInputChange} />
                            </VStack>
                            <Flex mt={4} gap={4}>
                                <CustomButton onClick={handleAddGroup}>SAVE GROUP</CustomButton>
                            </Flex>
                        </Box>
                    ) : isEdditingGroup ? (
                        // Edit Group form
                        <Box width="70%" bg="brandBlack" color="brandWhite" p={6} borderRadius="lg" boxShadow="0px 0px 32px 10px rgba(0, 0, 0, 0.35)">
                            <Heading textAlign="center" fontSize="2xl" fontWeight="bold" color="brandBlue" mb={6}>
                                {isEdditingGroup.name}
                            </Heading>
                            <VStack spacing={4} width="100%">
                                <Flex width="100%" gap={4}>
                                    <Box width="90%">
                                        <CustomInputRequired name="name" type="text" placeholder="Enter group name" label="Name" value={isEdditingGroup.name} onChange={handleGroupInputChange} />
                                    </Box>
                                    <Box width="10%">
                                        <CustomInputRequired name="emoji" type="text" placeholder="" label="Emoji" value={isEdditingGroup.emoji} onChange={handleGroupInputChange} />
                                    </Box>
                                </Flex>
                                <Box width="100%">
                                    <CustomTextareaRequired name="description" placeholder="Provide a description for the group" label="Description" value={isEdditingGroup.description} onChange={handleGroupInputChange} />
                                </Box>
                                <CustomInputRequired name="image" type="text" placeholder="Image URL" label="Image" value={isEdditingGroup.image} onChange={handleGroupInputChange} />
                                <CustomInputRequired name="video" type="text" placeholder="Video URL" label="Video" value={isEdditingGroup.video} onChange={handleGroupInputChange} />
                            </VStack>
                            <Flex mt={4} gap={4}>
                                <CustomButton backgroundColor="brandRed" textColor="brandBlack" onClick={() => confirmDeleteGroup(isEdditingGroup)}>
                                    DELETE GROUP
                                </CustomButton>
                                <CustomButton onClick={handleEditGroup}>SAVE CHANGES</CustomButton>
                            </Flex>
                        </Box>
                    ) : selectedGroup ? (
                        // Display Selected Group with "Create New Split" button
                        <Box width="100%" display="flex" alignItems="flex-start" bg="brandBlack" color="brandWhite">
                            <>
                                {/* Mesocycle History Section - 30% */}
                                <Box width="35%" py={4} px={4} bg="brandBlack" color="brandWhite" borderRadius="lg">
                                    {/* Header */}
                                    <Heading textAlign="center" fontSize="lg" fontWeight="bold" color="brandWhite" mb={4}>
                                        MESOCYCLE HISTORY {selectedGroup.emoji}
                                    </Heading>

                                    {/* Row for CustomSelect components */}
                                    <Flex mb={4} gap={4} width="100%">
                                        <CustomSelectSmall
                                            name="smallSelect1"
                                            options={[
                                                { value: "option1", label: "PPR/LWR/CHST-LGS" },
                                                { value: "option2", label: "Option 2" },
                                            ]}
                                            onChange={(e) => console.log(e.target.value)}
                                            style={{ width: "70%" }}
                                        />
                                        <CustomSelectSmall
                                            name="smallSelect2"
                                            options={[
                                                { value: "upper1", label: "Upper 1" },
                                                { value: "optionB", label: "Option B" },
                                            ]}
                                            onChange={(e) => console.log(e.target.value)}
                                            style={{ width: "30%" }}
                                        />
                                    </Flex>

                                    {/* Scrollable Container for Mesocycle History Content */}
                                    <Box
                                        maxHeight="90vh"
                                        overflowY="auto"
                                        css={{
                                            /* Hide scrollbar for Chrome, Safari, and Edge */
                                            "&::-webkit-scrollbar": {
                                                display: "none",
                                            },
                                            /* Hide scrollbar for Firefox */
                                            "&": {
                                                scrollbarWidth: "none",
                                            },
                                        }}
                                    >
                                        <VStack spacing={4} align="start">
                                            <MesocycleCard />
                                            <MesocycleCard />
                                            <MesocycleCard />
                                            <MesocycleCard />
                                            <MesocycleCard />
                                            <MesocycleCard />
                                            <MesocycleCard />

                                            {/* Add more <MesocycleCard /> as needed */}
                                        </VStack>
                                    </Box>
                                </Box>

                                {/* Create New Split Section - 70% */}
                                <Box width="70%" p={6} bg="brandBlack" borderRadius="lg">
                                    {/* Group Name and Emoji */}
                                    <Box mb={4}>
                                        <Heading textAlign="center" fontSize="xl" fontWeight="bold" color="brandWhite">
                                            {selectedGroup.name} {selectedGroup.emoji}
                                        </Heading>
                                    </Box>

                                    {/* Conditionally render "Create New Split" button and splits list */}
                                    {!editingSplit && (
                                        <Flex justifyContent="flex-start" alignItems="center" mb={6}>
                                            <CustomButton onClick={onTrainingSplitOpen}>CREATE A TRAINING SPLIT</CustomButton>
                                        </Flex>
                                    )}

                                    {/* Training Split Modal */}
                                    <TrainingSplit groupId={selectedGroup._id} isOpen={isTrainingSplitOpen} onClose={onTrainingSplitClose} />

                                    {/* Display Loading Spinner or Group Splits */}
                                    {isLoadingSplits ? (
                                        <Flex justifyContent="center" alignItems="center" mt={6}>
                                            <Spinner size="xl" color="brandBlue" />
                                        </Flex>
                                    ) : editingSplit ? (
                                        <Box bg="brandBlack" p={4} mb={6}>
                                            <Box>
                                                {/* Title and Close Button in Same Row */}
                                                <Flex justifyContent="center" alignItems="center" position="relative" mb={2}>
                                                    <Heading size="lg" color="brandBlue" textAlign="center">
                                                        {editingSplit.name.toUpperCase()}
                                                    </Heading>
                                                    <IconButton icon={<FaTimes />} aria-label="Close Split Edit" size="sm" colorScheme="ghost" color="brandRed" position="absolute" right="0" onClick={handleCloseEditing} />
                                                </Flex>
                                                {/* Release Date - Centered Below Title */}
                                                <Text fontSize="xxs" color="brandWhite" textAlign="center" mb={4}>
                                                    Starting {new Date(editingSplit.releaseSince).toLocaleDateString()}
                                                </Text>
                                                {/* Days Display in Columns */}
                                                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                                                    {chunkDays(editingSplit.days, 3).map((chunk, columnIndex) => (
                                                        <VStack key={columnIndex} align="stretch" spacing={1}>
                                                            {chunk.map((day) => (
                                                                <Flex
                                                                    key={day.dayNumber}
                                                                    justifyContent="flex-start"
                                                                    alignItems="center"
                                                                    onClick={() => {
                                                                        if (selectedTraining?.dayNumber !== day.dayNumber) {
                                                                            handleSelectTraining(day);
                                                                        }
                                                                    }}
                                                                    cursor={selectedTraining?.dayNumber === day.dayNumber ? "not-allowed" : "pointer"} // Disable pointer if selected
                                                                    opacity={selectedTraining?.dayNumber === day.dayNumber ? 0.5 : 1} // Dim the selected day
                                                                    gap={4}
                                                                >
                                                                    <Text fontWeight="bold" color="white" fontSize="lg">
                                                                        DAY {day.dayNumber}
                                                                    </Text>
                                                                    <Text color="brandWhite" fontSize="md">
                                                                        {day.trainingName}
                                                                    </Text>
                                                                </Flex>
                                                            ))}
                                                        </VStack>
                                                    ))}
                                                </Grid>
                                            </Box>
                                            {/* Custom Select for Training Name - Displayed Below Grid */}
                                            {selectedTraining && (
                                                <Box mt={4}>
                                                    <Heading textAlign="center">
                                                        Editting: {selectedTraining.trainingName} - DAY {selectedTraining.dayNumber}
                                                    </Heading>
                                                    <DroppableArea
                                                        allExercises={exercises}
                                                        onDrop={(exercise: Exercise) => {
                                                            console.log("Dropped Exercise:", exercise);
                                                        }}
                                                        onSave={(updatedExercises) => {
                                                            handleSaveNewExercisesToSplit(updatedExercises);
                                                        }}
                                                        resetTrigger={resetTrigger}
                                                        initialExercises={selectedTraining.exercises || []}
                                                    />
                                                </Box>
                                            )}
                                        </Box>
                                    ) : (
                                        // All Splits View
                                        <Box>
                                            {groupSplits.map((split) => (
                                                <Box key={split._id} bg="brandBlack" p={4} mb={6} borderRadius="md" boxShadow="0px 0px 10px rgba(0, 0, 0, 0.2)">
                                                    {/* Title and Edit Button in Same Row */}
                                                    <Flex justifyContent="center" alignItems="center" position="relative" mb={2}>
                                                        <Heading size="lg" color="brandBlue" textAlign="center">
                                                            {split.name.toUpperCase()}
                                                        </Heading>
                                                        <IconButton icon={<FaPencilAlt />} aria-label="Edit Split" size="sm" colorScheme="ghost" color="brandBlue" position="absolute" right="0" onClick={() => handleEditSplit(split)} />
                                                    </Flex>

                                                    {/* Release Date - Centered Below Title */}
                                                    <Text fontSize="xxs" color="brandWhite" textAlign="center" mb={4}>
                                                        Starting {new Date(split.releaseSince).toLocaleDateString()}
                                                    </Text>

                                                    {/* Days Display in Columns */}
                                                    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                                                        {chunkDays(split.days, 3).map((chunk, columnIndex) => (
                                                            <VStack key={columnIndex} align="stretch" spacing={1}>
                                                                {chunk.map((day) => (
                                                                    <Flex key={day.dayNumber} justifyContent="flex-start" alignItems="center" gap={4}>
                                                                        <Text fontWeight="bold" color="white" fontSize="lg">
                                                                            DAY {day.dayNumber}
                                                                        </Text>
                                                                        <Text color="brandWhite" fontSize="md">
                                                                            {day.trainingName}
                                                                        </Text>
                                                                    </Flex>
                                                                ))}
                                                            </VStack>
                                                        ))}
                                                    </Grid>
                                                </Box>
                                            ))}
                                        </Box>
                                    )}
                                </Box>
                            </>
                        </Box>
                    ) : (
                        // Default content
                        <Text fontSize="xl" textAlign="center" fontWeight="bold">
                            {selectedGroup || selectedClient ? `Displaying info for ${selectedGroup ? (selectedGroup as Group).name : selectedClient}` : "SELECT CLIENT OR GROUP TO DISPLAY MORE INFO."}
                        </Text>
                    )}
                </Box>

                {/* Right Sidebar for Exercise List */}
                <Box width="26%" bg="brandBlack" p={4} boxShadow="innerSidebar">
                    <Flex justify="center" align="center" mb={4} position="relative">
                        <Heading size="md" textAlign="center" flex="1">
                            Exercise List
                        </Heading>
                        <IconButton icon={<FaPlus />} size="sm" aria-label="Add exercise" background="brandBlue" position="absolute" right="0" onClick={handleAddExerciseClick} />
                    </Flex>

                    <Box mb={4}>
                        <CustomInput name="search" type="text" placeholder="Search exercises" label="" rightElementIcon={<FaSearch />} onChange={handleSearchChange} value={exerciseSearchTerm} />
                    </Box>

                    {isLoading ? (
                        <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
                            <Spinner size="xl" color="brandBlue" />
                        </Box>
                    ) : (
                        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                            {filteredExercises.map((exercise) => (
                                <DraggableExercise key={exercise._id} exercise={exercise} onClick={() => openEditExercise(exercise)} />
                            ))}
                        </Grid>
                    )}
                </Box>
            </Flex>
        </DndProvider>
    );
}
