"use client";
import NextLink from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { CustomInputRequired } from "@/app/components/CustomInput";
import { BlueButtonForm } from "@/app/components/BlueButtonForm";
import { GoogleButton } from "@/app/components/GoogleButton";

function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in both fields.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      toast({
        title: "Error",
        description: res.error,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }

    if (res?.ok) {
      router.push("/dashboard/profile");
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
      <Box width="400px" p={4} bg="brandBlack">
        <Stack spacing={4}>
          <Heading size="3xl" textAlign="left" fontWeight="bold" mb={-2}>
            Login
          </Heading>
          <Text textAlign="left" fontSize="xl" fontWeight="medium" mb={0}>
            Welcome back
          </Text>

          <form onSubmit={handleSubmit}>
            <Stack spacing={6}>
              <CustomInputRequired
                name="email"
                type="email"
                placeholder="BigGains@okcoaching.com"
                label="Email Address"
              />

              <Box>
                <Flex justify="space-between" align="center" mb={2}>
                  <Flex align="center">
                    <Text fontSize="md" fontWeight="bold" color="brandWhite">
                      Password
                    </Text>
                    <Text color="brandBlue" fontWeight="bold" ml={1}>
                      *
                    </Text>
                  </Flex>
                  <Link
                    as={NextLink}
                    href="/forgot-password"
                    fontSize="xxs"
                    color="brandBlue"
                  >
                    Forgot Password?
                  </Link>
                </Flex>

                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="**********"
                    focusBorderColor="brandBlue"
                    bg="brandBlack"
                    _placeholder={{ color: "#3C3C3C" }}
                    size="md"
                    height="48px"
                    borderRadius="20px"
                    border="none"
                    boxShadow="0px 2px 7.3px 2px rgba(0, 0, 0, 0.25)"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      size="md"
                      onClick={handleShowClick}
                      variant="ghost"
                      color="brandWhite"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}{" "}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>

              <BlueButtonForm text="Login" isLoading={loading} />
            </Stack>
          </form>

          <Flex align="center" my={4}>
            <Box flex="1" borderBottom="1px solid" borderColor="#D9D9D9" />
            <Text color="brandWhite" fontSize="sm" px={2}>
              or sign in with
            </Text>
            <Box flex="1" borderBottom="1px solid" borderColor="#D9D9D9" />
          </Flex>

          <GoogleButton
            text="Sign in with Google"
            onClick={() =>
              signIn("google", { callbackUrl: "/dashboard/profile" })
            }
          />

          <Text textAlign="center" fontSize="sm" mt={4} fontWeight="bold">
            New here?
            <Link
              as={NextLink}
              href="/register"
              color="brandBlue"
              fontWeight="bold"
              display="block"
            >
              Create an account
            </Link>
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
}

export default Signin;
