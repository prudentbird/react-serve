import { Response, useContext, useRoute } from "react-serve-js";
import { prisma } from "../config";
import { updateProfileSchema } from "../validators/schemas";
import { z } from "zod";

// Get current user handler
export async function GetCurrentUserHandler() {
  const user = useContext("user");
  const timestamp = useContext("requestTimestamp");

  return (
    <Response
      json={{
        user,
        requestedAt: timestamp,
      }}
    />
  );
}

// Update profile handler
export async function UpdateProfileHandler() {
  try {
    const user = useContext("user");
    const { body } = useRoute();

    // Validate request body
    const validatedData = updateProfileSchema.parse(body);

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: validatedData,
      select: {
        id: true,
        email: true,
        name: true,
        bio: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return (
      <Response
        json={{
          message: "Profile updated successfully",
          user: updatedUser,
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

    console.error("Profile update error:", error);
    return (
      <Response
        status={500}
        json={{ error: "Internal server error" }}
      />
    );
  }
}
