"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box, Flex, Stack, Heading, useToast, RadioGroup, Radio, Spinner } from "@chakra-ui/react";
import { CustomInputRequired } from "@/app/components/CustomInput";
import { BlueButtonLink } from "@/app/components/BlueButtonLink";
import { CustomSelect } from "@/app/components/CustomSelect";
import { CustomDateRequired } from "@/app/components/CustomDatePicker";

interface Group {
    _id: string;
    name: string;
    description: string;
    image?: string;
    video?: string;
}

export default function ProfileSetup() {
    const { status } = useSession();
    const router = useRouter();
    const toast = useToast();

    const [step, setStep] = useState<number | null>(null);
    const [userGroup, setUserGroup] = useState<string>("");
    const [groups, setGroups] = useState<Group[]>([]);
    const [birthDate, setBirthDate] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [height, setHeight] = useState<string>("");

    useEffect(() => {
        const checkProfileCompletion = async () => {
            if (status === "authenticated") {
                const response = await fetch("/api/user/getProfileCompleted");
                const userData = await response.json();
                if (userData.profileCompleted) {
                    router.push("/dashboard");
                }
            }
        };

        checkProfileCompletion();
    }, [status, router]);

    // Load step from localStorage when the component mounts
    useEffect(() => {
        const storedStep = localStorage.getItem("profileSetupStep");
        if (storedStep) {
            setStep(Number(storedStep));
            const savedData = localStorage.getItem("profileData");
            if (savedData) {
                const { userGroup, gender, birthDate, weight, height } = JSON.parse(savedData);
                setUserGroup(userGroup || "");
                setGender(gender || "");
                setBirthDate(birthDate || "");
                setWeight(weight || "");
                setHeight(height || "");
            }
        } else {
            setStep(1); // Start at step 1 if no step is found in localStorage
        }
    }, []);

    // Save step to localStorage whenever step changes (except during initial loading)
    useEffect(() => {
        if (step !== null) {
            localStorage.setItem("profileSetupStep", step.toString());
        }
    }, [step]);

    // Fetch groups from the API on component mount
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await fetch("/api/getGroups");
                const data = await res.json();
                setGroups(data.groups); // Assuming the API returns a 'groups' array
            } catch (error) {
                console.error("Error fetching groups:", error as string);
                toast({
                    title: "Error",
                    description: "Failed to load groups.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
        };

        fetchGroups();
    }, [toast]);

    // Redirect if not authenticated
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    const handleNextStep = async () => {
        // Validate required fields on each step
        if (step === 1 && !userGroup) {
            toast({
                title: "Error",
                description: "Please choose a group to proceed.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        // Save current step data to localStorage
        const profileData = {
            trainingGroup: userGroup,
            bornDate: birthDate,
            gender,
            weight,
            height,
        };
        localStorage.setItem("profileData", JSON.stringify(profileData));

        // If it’s the last step (step 3), submit data to the server
        if (step === 3) {
            try {
                await fetch("/api/user/updateProfile", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(profileData),
                });

                toast({
                    title: "Success",
                    description: "Registration complete. Redirecting to dashboard...",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                localStorage.removeItem("profileSetupStep");
                localStorage.removeItem("profileData");

                setTimeout(() => {
                    router.push("/dashboard");
                }, 3000);
            } catch (error) {
                console.error("Error updating profile:", error as string);
                toast({
                    title: "Error",
                    description: "Failed to save your data. Please try again.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
        } else {
            setStep(step! + 1);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <Box>
                        <Heading size="3xl" fontWeight="bold">
                            Choose your training group.
                        </Heading>
                        <Stack spacing={6}>
                            <RadioGroup onChange={setUserGroup} value={userGroup}>
                                {groups.map((group) => (
                                    <Radio key={group._id} value={group.name}>
                                        {group.name} - {group.description}
                                    </Radio>
                                ))}
                            </RadioGroup>
                            <BlueButtonLink text="Next" onClick={handleNextStep} />
                        </Stack>
                    </Box>
                );
            case 2:
                return (
                    <Box>
                        <Heading size="3xl" fontWeight="bold">
                            Payment
                        </Heading>
                        <BlueButtonLink text="Next" onClick={handleNextStep} />
                    </Box>
                );
            case 3:
                return (
                    <Box>
                        <Heading size="3xl" fontWeight="bold">
                            Tell me more about you.
                        </Heading>
                        <Stack spacing={4}>
                            <CustomDateRequired name="birthDate" placeholder="When were you born?" label="Date of Birth" onChange={(date) => setBirthDate(date)} />
                            <CustomSelect
                                name="gender"
                                label="What's your gender?"
                                placeholder="Select your gender"
                                options={[
                                    { value: "Male", label: "Male" },
                                    { value: "Female", label: "Female" },
                                    { value: "Other", label: "Other" },
                                ]}
                                onChange={(e) => setGender(e.target.value)} // Extract value from event
                            />

                            <CustomInputRequired name="weight" type="text" placeholder="85" label="What's your weight?" onChange={(e) => setWeight(e.target.value)} />
                            <CustomInputRequired name="height" type="text" placeholder="180" label="What's your height?" onChange={(e) => setHeight(e.target.value)} />
                            <BlueButtonLink text="Complete Registration" onClick={handleNextStep} />
                        </Stack>
                    </Box>
                );
            default:
                return null;
        }
    };

    // Only render content after the step has been loaded
    if (status === "loading" || step === null) {
        return (
            <Flex align="center" justify="center" minHeight="100vh" bg="brandBlack" color="brandWhite">
                <Spinner size="xl" color="brandBlue" />
            </Flex>
        );
    }

    return (
        <Flex align="center" justify="center" minHeight="100vh" bg="brandBlack" color="brandWhite" p={4}>
            <Box width="400px" p={4} bg="brandBlack">
                <Stack spacing={4}>{renderStep()}</Stack>
            </Box>
        </Flex>
    );
}
