import { useDrag } from "react-dnd";
import { Box, Heading, Text, Image } from "@chakra-ui/react";

interface Exercise {
    _id: string;
    name: string;
    description: string;
    video: string;
    sets: Set[];
}

interface Set {
    tempo: string;
    rir: number | null;
    reps: number | null;
    rest: number | null;
}

interface DraggableExerciseProps {
    exercise: Exercise;
    onClick: () => void;
}

export const DraggableExercise = ({ exercise, onClick }: DraggableExerciseProps) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: "EXERCISE",
        item: { exercise },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <Box ref={dragRef as unknown as React.LegacyRef<HTMLDivElement>} opacity={isDragging ? 0.5 : 1} bg="brandBlack" borderRadius="md" width="80%" height="175px" p={2} display="flex" flexDirection="column" alignItems="center" boxShadow="0px 0px 32px 10px rgba(0, 0, 0, 0.35)" cursor="pointer" onClick={onClick}>
            <Heading size="sm" mb={2} textAlign="center" fontWeight="bold">
                {exercise.name}
            </Heading>
            <Text fontSize="xxs" textAlign="center">
                {exercise.description}
            </Text>
            <Image src={exercise.video} alt={exercise.name} boxSize="80%" objectFit="cover" pb={4} borderRadius="md" />
        </Box>
    );
};
