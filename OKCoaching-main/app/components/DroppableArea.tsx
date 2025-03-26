import { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { Box, Text, VStack, Flex, Image, IconButton, Heading, Spinner } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { CustomSmallInput } from "@/app/components/CustomInput";
import { CustomButton } from "@/app/components/CustomButton";
import { CustomTextarea } from "@/app/components/CustomInput";
import { useToast } from "@chakra-ui/react";
import { BlueButtonLink } from "@/app/components/BlueButtonLink";
import { Exercise, Set, SplitExercise } from "@/app/types/interaces";

interface DroppableAreaProps {
    allExercises: Exercise[];
    onDrop: (exercise: Exercise) => void;
    onSave: (updatedExercises: Exercise[]) => void;
    resetTrigger: boolean;
    initialExercises: SplitExercise[];
}

export const DroppableArea = ({ onDrop, onSave, resetTrigger, initialExercises, allExercises }: DroppableAreaProps) => {
    const [newSplitExercise, setNewSplitExercise] = useState<Exercise[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    useEffect(() => {
        const loadExercises = async () => {
            setIsLoading(true);
            if (resetTrigger) {
                setNewSplitExercise([]);
            }

            await new Promise((resolve) => setTimeout(resolve, 300));

            setIsLoading(false);

            if (initialExercises.length > 0 && allExercises.length > 0) {
                const transformedExercises = initialExercises.map((splitExercise) => {
                    const matchedExercise = allExercises.find((exercise) => exercise._id === splitExercise.exercise);
                    return {
                        _id: splitExercise.exercise,
                        name: matchedExercise?.name || "Unknown Exercise",
                        description: splitExercise.description,
                        video: matchedExercise?.video || "",
                        sets: splitExercise.customSets,
                    };
                });

                setNewSplitExercise(transformedExercises);
                console.log("Initial exercises loaded");
                console.log(transformedExercises);
            }
        };

        loadExercises();
    }, [resetTrigger, initialExercises, allExercises]);

    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: "EXERCISE",
        drop: (item: { exercise: Exercise }) => {
            onDrop(item.exercise);
            const newExercise = {
                ...item.exercise,
                sets: item.exercise.sets.map((set) => ({ ...set })),
            };
            setNewSplitExercise((prev) => [...prev, newExercise]);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const handleAddSetToUI = (exerciseIndex: number) => {
        setNewSplitExercise((prev) => {
            const updated = prev.map((exercise, index) => {
                if (index === exerciseIndex) {
                    return {
                        ...exercise,
                        sets: [...exercise.sets, { tempo: "", rir: null, reps: null, rest: null }],
                    };
                }
                return exercise;
            });
            return updated;
        });
    };

    const handleDeleteSetFromUI = (exerciseIndex: number, setIndex: number) => {
        setNewSplitExercise((prev) => {
            const updated = [...prev];
            updated[exerciseIndex].sets.splice(setIndex, 1);

            if (updated[exerciseIndex].sets.length === 0) {
                updated.splice(exerciseIndex, 1);
            }

            return updated;
        });
    };

    const handleInputChange = (exerciseIndex: number, setIndex: number, field: keyof Set, value: string | number) => {
        setNewSplitExercise((prev) => {
            const updated = [...prev];
            updated[exerciseIndex].sets[setIndex][field] = value as never;
            return updated;
        });
    };

    const validateInputs = () => {
        const errors: string[] = [];
        newSplitExercise.forEach((exercise, exerciseIndex) => {
            exercise.sets.forEach((set, setIndex) => {
                if (!set.reps || isNaN(set.reps) || set.reps <= 0) {
                    errors.push(`Exercise ${exerciseIndex + 1}, Set ${setIndex + 1}: Reps must be a number.`);
                }
                if (set.rir === null || isNaN(set.rir) || set.rir < 0) {
                    errors.push(`Exercise ${exerciseIndex + 1}, Set ${setIndex + 1}: RIR must be a number.`);
                }
                if (!set.rest || isNaN(set.rest) || set.rest <= 0) {
                    errors.push(`Exercise ${exerciseIndex + 1}, Set ${setIndex + 1}: Rest must be a number.`);
                }
                const tempoRegex = /^\d+\.\d+\.\d+\.\d+$/;
                if (!tempoRegex.test(set.tempo)) {
                    errors.push(`Exercise ${exerciseIndex + 1}, Set ${setIndex + 1}: Tempo must be in the format 1.2.3.4.`);
                }
            });
        });

        return errors;
    };

    const handleSave = () => {
        const errors = validateInputs();
        if (errors.length > 0) {
            errors.forEach((error) => {
                toast({
                    title: "Input Validation Error",
                    description: error,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            });
            return;
        }
        onSave([...newSplitExercise]);
    };

    if (isLoading) {
        return (
            <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
                <Spinner size="xl" color="brandBlue" />
            </Box>
        );
    }

    return (
        <Box
            height="100vh"
            overflowY="auto"
            css={{
                "&::-webkit-scrollbar": { display: "none" },
                "&": { scrollbarWidth: "none" },
            }}
            mt={4}
            bg="brandBlack"
            borderColor="brandBlue"
            borderRadius="md"
            textAlign="center"
            color="white"
            pb="380px"
        >
            <VStack align="stretch" mt={4}>
                {newSplitExercise.map((exercise, exerciseIndex) => (
                    <Box key={exercise._id} p={4} m={2} borderRadius="lg" boxShadow="0px 0px 10px 3px rgba(0, 0, 0, 0.25)">
                        <Flex justifyContent="space-between" alignItems="flex-start" mb={2}>
                            <Box width="95%">
                                <Heading fontWeight="bold" fontSize="lg" color="brandWhite" textAlign="left" mb={2}>
                                    {exercise.name.toUpperCase()}
                                </Heading>
                                <Box width="95%">
                                    <CustomTextarea
                                        name="description"
                                        placeholder="Enter description..."
                                        value={exercise.description}
                                        onChange={(e) => {
                                            const newValue = e.target.value;
                                            setNewSplitExercise((prev) => prev.map((ex, index) => (index === exerciseIndex ? { ...ex, description: newValue } : ex)));
                                        }}
                                    />
                                </Box>
                            </Box>
                            <Image src={exercise.video} alt={exercise.name} boxSize="50%" borderRadius="md" objectFit="cover" />
                        </Flex>
                        <Flex direction="column" boxShadow="0px 0px 32px 10px rgba(0, 0, 0, 0.35)" p={4} borderRadius="md" mb={4}>
                            <Flex justifyContent="space-between" alignItems="center" mb={2}>
                                <Text fontWeight="bold" color="brandBlue" textAlign="center" flex="1">
                                    SET
                                </Text>
                                <Text fontWeight="bold" color="brandBlue" textAlign="center" flex="1">
                                    REPS
                                </Text>
                                <Text fontWeight="bold" color="brandBlue" textAlign="center" flex="1">
                                    RIR
                                </Text>
                                <Text fontWeight="bold" color="brandBlue" textAlign="center" flex="1">
                                    TEMPO
                                </Text>
                                <Text fontWeight="bold" color="brandBlue" textAlign="center" flex="1">
                                    REST TIME
                                </Text>
                                <Box flex="0.5" />
                            </Flex>
                            {exercise.sets.map((set, setIndex) => (
                                <Flex key={setIndex} justifyContent="space-between" alignItems="center" mb={2}>
                                    <Text fontWeight="bold" color="brandWhite" textAlign="center" flex="1">
                                        {setIndex + 1}
                                    </Text>
                                    <Box flex="1" display="flex" justifyContent="center">
                                        <CustomSmallInput name="reps" placeholder="Reps" value={set.reps ?? ""} onChange={(e) => handleInputChange(exerciseIndex, setIndex, "reps", e.target.value)} />
                                    </Box>
                                    <Box flex="1" display="flex" justifyContent="center">
                                        <CustomSmallInput name="rir" placeholder="RIR" value={set.rir ?? ""} onChange={(e) => handleInputChange(exerciseIndex, setIndex, "rir", e.target.value)} />
                                    </Box>
                                    <Box flex="1" display="flex" justifyContent="center">
                                        <CustomSmallInput name="tempo" placeholder="Tempo" value={set.tempo ?? ""} onChange={(e) => handleInputChange(exerciseIndex, setIndex, "tempo", e.target.value)} />
                                    </Box>
                                    <Box flex="1" display="flex" justifyContent="center">
                                        <CustomSmallInput name="rest" placeholder="Rest" value={set.rest ?? ""} onChange={(e) => handleInputChange(exerciseIndex, setIndex, "rest", e.target.value)} />
                                    </Box>
                                    <Box flex="0.5" display="flex" justifyContent="center">
                                        <IconButton icon={<FaTrash />} aria-label="Delete Set" size="sm" colorScheme="red" onClick={() => handleDeleteSetFromUI(exerciseIndex, setIndex)} />
                                    </Box>
                                </Flex>
                            ))}
                            <CustomButton onClick={() => handleAddSetToUI(exerciseIndex)}>Add another set?</CustomButton>
                        </Flex>
                    </Box>
                ))}
                <Box
                    ref={dropRef as unknown as React.LegacyRef<HTMLDivElement>}
                    width="95%"
                    borderRadius="20px"
                    textAlign="center"
                    color="brandWhite"
                    minHeight="140px"
                    mt={4}
                    boxShadow={isOver ? "0px 0px 10px 3px rgba(0, 0, 0, 0.25)" : "0px 0px 10px 3px rgba(0, 0, 0, 0.25)"}
                    transform={isOver ? "scale(1.05)" : "scale(1)"}
                    transition="transform 0.2s"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    alignSelf="center"
                >
                    <Text fontSize="lg" fontWeight="bold">
                        {isOver ? "DROP EXERCISE HERE" : "DRAG EXERCISE HERE"}
                    </Text>
                </Box>
            </VStack>
            {newSplitExercise.length > 0 && (
                <Box mt={10}>
                    <BlueButtonLink onClick={handleSave} text="COMPLETE" height="80px" bold={true} width="95%" />
                </Box>
            )}
        </Box>
    );
};
