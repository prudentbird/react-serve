import { Response, useContext } from "react-serve-js";
import { prisma } from "../config";

// Get user stats handler
export async function GetStatsHandler() {
  try {
    const totalUsers = await prisma.user.count();
    const recentUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
        },
      },
    });

    const currentUser = useContext("user");

    return (
      <Response
        json={{
          stats: {
            totalUsers,
            recentUsers,
          },
          requestedBy: currentUser,
          requestedAt: useContext("requestTimestamp"),
        }}
      />
    );
  } catch (error) {
    console.error("Get stats error:", error);
    return (
      <Response
        status={500}
        json={{ error: "Internal server error" }}
      />
    );
  }
}
