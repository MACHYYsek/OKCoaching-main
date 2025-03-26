"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { Box, Flex, Stack, Heading, Text, useToast } from "@chakra-ui/react";
import { CustomInputRequired } from "@/app/components/CustomInput";
import { BlueButtonForm } from "@/app/components/BlueButtonForm";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const router = useRouter();
  const toast = useToast();

  const handleShowPasswordClick = () => setShowPassword(!showPassword);
  const handleShowRepeatPasswordClick = () =>
    setShowRepeatPassword(!showRepeatPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
      const res = await axios.post(`/api/user/reset-password/${token}`, {
        password,
      });

      if (res.status === 200) {
        toast({
          title: "Success",
          description: "Password updated successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to reset password. Try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      minHeight="100vh"
      bg="brandBlack"
      color="brandWhite"
      p={4}
    >
      <Box width="400px" p={6} bg="brandBlack">
        <Stack spacing={4}>
          <Heading size="3xl" textAlign="left" fontWeight="bold" mb={-2}>
            Reset Password
          </Heading>

          <Text textAlign="left" fontSize="xl" fontWeight="medium" mb={4}>
            Enter your new password below.
          </Text>

          <form onSubmit={handleSubmit}>
            <Stack spacing={6}>
              <CustomInputRequired
                name="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                label="New Password"
                onChange={(e) => setPassword(e.target.value)}
                rightElementIcon={
                  showPassword ? <FaRegEyeSlash /> : <FaRegEye />
                }
                onRightElementClick={handleShowPasswordClick}
              />

              <CustomInputRequired
                name="repeatPassword"
                type={showRepeatPassword ? "text" : "password"}
                placeholder="Re-enter your new password"
                label="Repeat Password"
                onChange={(e) => setRepeatPassword(e.target.value)}
                rightElementIcon={
                  showRepeatPassword ? <FaRegEyeSlash /> : <FaRegEye />
                }
                onRightElementClick={handleShowRepeatPasswordClick}
              />

              <BlueButtonForm text="Reset Password" isLoading={loading} />
            </Stack>
          </form>
        </Stack>
      </Box>
    </Flex>
  );
}
