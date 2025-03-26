"use client";

import { useState } from "react";
import { useToast, Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { BlueButtonForm } from "@/app/components/BlueButtonForm";
import { CustomInputRequired } from "@/app/components/CustomInput";
import { BlueButtonLink } from "@/app/components/BlueButtonLink";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false); // New state to track if the email is sent
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: "Password reset email sent.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        setEmail("");
        setEmailSent(true); // Set this to true when the email is sent
      } else {
        const message = await res.json();
        toast({
          title: "Error",
          description: message.message || "Failed to send email. Try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  // Conditional Rendering: If email is sent, show the confirmation message
  if (emailSent) {
    return (
      <Flex
        align="flex-start"
        justify="center"
        minHeight="100vh"
        bg="brandBlack"
        color="brandWhite"
        p={4}
      >
        <Box width="400px" p={4} bg="brandBlack" mt="10vh">
          <Stack spacing={6}>
            <Heading size="3xl" textAlign="center" fontWeight="bold">
              Recovery link sent.
            </Heading>
            <Text textAlign="center" fontSize="xl" fontWeight="medium">
              Check your e-mail inbox and continue as email says.
            </Text>
            <Text textAlign="center" fontSize="md" color="gray.400">
              Don’t forget to check your spam folder.
            </Text>

            <BlueButtonLink text="Back to login page" href="login" />
          </Stack>
        </Box>
      </Flex>
    );
  }

  // Default form for requesting the password reset link
  return (
    <Flex
      align="flex-start"
      justify="center"
      minHeight="100vh"
      bg="brandBlack"
      color="brandWhite"
      p={4}
    >
      <Box width="400px" p={4} bg="brandBlack" mt="10vh">
        <Stack spacing={4}>
          <Heading size="2xl" textAlign="left" fontWeight="bold">
            Forgot password?
          </Heading>
          <Text textAlign="left" fontSize="xl" fontWeight="medium">
            We’ll send a recovery link to your Email
          </Text>

          <form onSubmit={handleSubmit}>
            <Stack spacing={6}>
              <CustomInputRequired
                name="email"
                type="email"
                placeholder="BigGains@okcoaching.com"
                label="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />

              <BlueButtonForm text="Send recovery link" isLoading={loading} />
            </Stack>
          </form>
        </Stack>
      </Box>
    </Flex>
  );
}
