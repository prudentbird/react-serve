import { Response, useSetContext, useContext, type MiddlewareFunction } from "react-serve-js";
import { prisma, JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";

// Auth middleware
export const authMiddleware: MiddlewareFunction = async (req, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return <Response status={401} json={{ error: "No token provided" }} />;
    }

    const token = authHeader.split(" ")[1];
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      
      // Fetch user from database
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          name: true,
          bio: true,
          avatar: true,
          isAdmin: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        return <Response status={401} json={{ error: "Invalid token" }} />;
      }

      // Attach user to context
      useSetContext("user", user);
      
      return next();
    } catch (jwtError) {
      return <Response status={401} json={{ error: "Invalid token" }} />;
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    return <Response status={500} json={{ error: "Internal server error" }} />;
  }
};

// Logging middleware
export const loggingMiddleware: MiddlewareFunction = (req, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  useSetContext("requestTimestamp", Date.now());
  return next();
};

// Admin middleware - requires user to be authenticated and admin
export const adminMiddleware: MiddlewareFunction = (req, next) => {
  const user = useContext("user");
  
  if (!user) {
    return <Response status={401} json={{ error: "Authentication required" }} />;
  }
  
  if (!user.isAdmin) {
    return <Response status={403} json={{ error: "Admin access required" }} />;
  }
  
  return next();
};
