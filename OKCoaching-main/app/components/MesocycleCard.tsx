import { Box, Flex, Image, Text, VStack, IconButton } from "@chakra-ui/react";
import { FaPen } from "react-icons/fa";

export const MesocycleCard = () => {
    return (
        <Box p={2} borderRadius="md" width="100%" background="brandBlack" boxShadow="innerSidebar">
            <Box>
                {/* Header with title and edit icon */}
                <Flex justifyContent="space-between" alignItems="center">
                    <Text fontWeight="bold" fontSize="sm" color="white" pl={3}>
                        BENCHPRESS
                    </Text>
                    <IconButton icon={<FaPen />} size="sm" aria-label="Edit exercise" bg="transparent" color="white" _hover={{ color: "brandBlue" }} />
                </Flex>
                {/* Sets Table */}
                <VStack align="start" spacing={1} width="100%" mb={3}>
                    <Flex justifyContent="space-between" width="100%" fontWeight="bold" color="brandBlue" fontSize="sm">
                        <Text flex="1" textAlign="center">
                            Set
                        </Text>
                        <Text flex="1" textAlign="center">
                            Reps
                        </Text>
                        <Text flex="1" textAlign="center">
                            RIR
                        </Text>
                        <Text flex="2" textAlign="center">
                            Tempo
                        </Text>
                        <Text flex="1" textAlign="center">
                            Rest
                        </Text>
                    </Flex>
                    <Flex justifyContent="space-between" width="100%" color="white">
                        <Text flex="1" textAlign="center">
                            1
                        </Text>
                        <Text flex="1" textAlign="center">
                            8
                        </Text>
                        <Text flex="1" textAlign="center">
                            1
                        </Text>
                        <Text flex="2" textAlign="center">
                            2.0.0.1
                        </Text>
                        <Text flex="1" textAlign="center">
                            3m +
                        </Text>
                    </Flex>
                    <Flex justifyContent="space-between" width="100%" color="white">
                        <Text flex="1" textAlign="center">
                            2
                        </Text>
                        <Text flex="1" textAlign="center">
                            8
                        </Text>
                        <Text flex="1" textAlign="center">
                            0
                        </Text>
                        <Text flex="2" textAlign="center">
                            2.0.0.1
                        </Text>
                        <Text flex="1" textAlign="center">
                            3m +
                        </Text>
                    </Flex>
                </VStack>
                {/* Progress and Image */}
                <Flex alignItems="center" mt={3}>
                    <VStack align="start" spacing={2} pl={3}>
                        <Flex alignItems="center">
                            <Text fontSize="sm" color="green.400" fontWeight="bold">
                                +13.2%
                            </Text>
                        </Flex>
                        <Flex alignItems="center">
                            <Text fontSize="sm" color="green.400" fontWeight="bold">
                                +10.7%
                            </Text>
                        </Flex>
                    </VStack>
                    <Image src="https://cdn.britannica.com/83/195983-138-66807699/numbers-tiger-populations.jpg?w=800&h=450&c=crop" alt="Tiger" width="200px" height="90px" borderRadius="md" ml="auto" />
                </Flex>
            </Box>
        </Box>
    );
};
