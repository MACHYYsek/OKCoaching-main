"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { Box, Flex, Heading, Link, Stack, Text, useToast } from "@chakra-ui/react";
import { CustomInputRequired } from "@/app/components/CustomInput";
import { BlueButtonForm } from "@/app/components/BlueButtonForm";
import { GoogleButton } from "@/app/components/GoogleButton";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const router = useRouter();
    const toast = useToast();

    const handleShowClick = () => setShowPassword(!showPassword);
    const handleRepeatShowClick = () => setShowRepeatPassword(!showRepeatPassword);

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // Check if passwords match
        if (password !== repeatPassword) {
            toast({
                title: "Error",
                description: "Passwords do not match.",
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "top",
            });
            setLoading(false);
            return;
        }

        try {
            const signupResponse = await axios.post("/api/auth/signup", {
                email,
                password,
                userName: username,
            });

            if (signupResponse.data) {
                const res = await signIn("credentials", {
                    email: signupResponse.data.email,
                    password,
                    redirect: false,
                });

                if (res?.ok) {
                    router.push("/profile-setup");
                }
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data.message;
                console.error(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Flex align="center" justify="center" minHeight="100vh" bg="brandBlack" color="brandWhite" p={4}>
            <Box width="400px" p={4} bg="brandBlack">
                <Stack spacing={4}>
                    <Heading size="3xl" textAlign="left" fontWeight="bold">
                        Create an account
                    </Heading>

                    <form onSubmit={handleRegister}>
                        <Stack spacing={6}>
                            <CustomInputRequired name="username" type="text" placeholder="Enter your username" label="Username" onChange={(e) => setUsername(e.target.value)} />

                            <CustomInputRequired name="email" type="email" placeholder="Enter your Email Address" label="Email Address" onChange={(e) => setEmail(e.target.value)} />

                            <CustomInputRequired name="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" label="Password" onChange={(e) => setPassword(e.target.value)} rightElementIcon={showPassword ? <FaRegEyeSlash /> : <FaRegEye />} onRightElementClick={handleShowClick} />

                            <CustomInputRequired
                                name="repeatPassword"
                                type={showRepeatPassword ? "text" : "password"}
                                placeholder="Re-enter your password"
                                label="Repeat Password"
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                rightElementIcon={showRepeatPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                onRightElementClick={handleRepeatShowClick}
                            />

                            <BlueButtonForm text="Register" isLoading={loading} />
                        </Stack>
                    </form>

                    <Flex align="center" my={4}>
                        <Box flex="1" borderBottom="1px solid" borderColor="#D9D9D9" />
                        <Text color="brandWhite" fontSize="sm" px={2}>
                            or sign up with
                        </Text>
                        <Box flex="1" borderBottom="1px solid" borderColor="#D9D9D9" />
                    </Flex>

                    <GoogleButton text="Sign up with Google" onClick={() => signIn("google", { callbackUrl: "/profile-setup" })} />

                    <Text textAlign="center" fontSize="sm" mt={4} fontWeight="bold">
                        Already have an account?
                        <Link as={NextLink} href="/login" color="brandBlue" fontWeight="bold" display="block">
                            Sign in
                        </Link>
                    </Text>
                </Stack>
            </Box>
        </Flex>
    );
}
