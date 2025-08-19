import { Response, useRoute } from "react-serve-js";
import { prisma } from "../config";
import { signupSchema, loginSchema } from "../validators/schemas";
import { generateToken, hashPassword, comparePassword } from "../utils/auth";
import { z } from "zod";

// Sign up handler
export async function SignupHandler() {
  try {
    const { body } = useRoute();
    
    // Validate request body
    const validatedData = signupSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return (
        <Response
          status={400}
          json={{ error: "User with this email already exists" }}
        />
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
        password: hashedPassword,
        bio: validatedData.bio,
        avatar: validatedData.avatar,
      },
      select: {
        id: true,
        email: true,
        name: true,
        bio: true,
        avatar: true,
        createdAt: true,
      },
    });

    // Generate token
    const token = generateToken(user.id);

    return (
      <Response
        status={201}
        json={{
          message: "User created successfully",
          user,
          token,
        }}
      />
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return (
        <Response
          status={400}
          json={{
            error: "Validation error",
            details: error.errors,
          }}
        />
      );
    }

    console.error("Signup error:", error);
    return (
      <Response
        status={500}
        json={{ error: "Internal server error" }}
      />
    );
  }
}

// Login handler
export async function LoginHandler() {
  try {
    const { body } = useRoute();
    
    // Validate request body
    const validatedData = loginSchema.parse(body);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user) {
      return (
        <Response
          status={401}
          json={{ error: "Invalid email or password" }}
        />
      );
    }

    // Check password
    const isValidPassword = await comparePassword(
      validatedData.password,
      user.password
    );

    if (!isValidPassword) {
      return (
        <Response
          status={401}
          json={{ error: "Invalid email or password" }}
        />
      );
    }

    // Generate token
    const token = generateToken(user.id);

    // Return user data without password
    const { password, ...userWithoutPassword } = user;

    return (
      <Response
        json={{
          message: "Login successful",
          user: userWithoutPassword,
          token,
        }}
      />
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return (
        <Response
          status={400}
          json={{
            error: "Validation error",
            details: error.errors,
          }}
        />
      );
    }

    console.error("Login error:", error);
    return (
      <Response
        status={500}
        json={{ error: "Internal server error" }}
      />
    );
  }
}
