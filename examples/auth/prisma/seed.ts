import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create sample users
  const hashedPassword = await bcrypt.hash("password123", 12);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "john@example.com",
        name: "John Doe",
        password: hashedPassword,
        bio: "Software developer passionate about React and Node.js",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.user.create({
      data: {
        email: "jane@example.com",
        name: "Jane Smith",
        password: hashedPassword,
        bio: "UI/UX designer and frontend developer",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b123?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.user.create({
      data: {
        email: "bob@example.com",
        name: "Bob Johnson",
        password: hashedPassword,
        bio: "Full-stack developer and tech enthusiast",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);
  console.log("📧 Default password for all users: password123");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
