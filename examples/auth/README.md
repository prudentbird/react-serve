# ReactServe Auth Example

A complete authentication system built with ReactServe and Prisma, featuring user registration, login, profile management, and protected routes.

## Features

- 🔐 **User Authentication**: Sign up, login, and JWT-based session management
- 👤 **Profile Management**: Update user profile information
- 🗄️ **Database Integration**: Prisma ORM with SQLite database
- 🛡️ **Protected Routes**: Middleware-based authentication
- ✅ **Input Validation**: Zod schema validation
- 🔒 **Password Security**: bcrypt password hashing
- 📊 **Admin Features**: User statistics and management
- 🚀 **RESTful API**: Clean and organized API endpoints

## API Endpoints

### Authentication Routes (`/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | Register a new user | ❌ |
| POST | `/auth/login` | Login with email and password | ❌ |
| GET | `/auth/me` | Get current user information | ✅ |
| PUT | `/auth/profile` | Update user profile | ✅ |

### User Routes (`/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | Get all users (public info only) | ❌ |
| GET | `/users/:id` | Get user by ID (public info only) | ❌ |

### Admin Routes (`/admin`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/admin/stats` | Get user statistics | ✅ |

## Getting Started

### 1. Install Dependencies

```bash
cd examples/auth
npm install
```

### 2. Set up the Database

Generate Prisma client:
```bash
npm run db:generate
```

Create and migrate the database:
```bash
npm run db:push
```

Seed the database with sample data:
```bash
npm run db:seed
```

### 3. Start the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:8787`

## Usage Examples

### Sign Up

```bash
curl -X POST http://localhost:8787/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "name": "New User",
    "password": "password123",
    "bio": "Hello, I am a new user!",
    "avatar": "https://example.com/avatar.jpg"
  }'
```

### Login

```bash
curl -X POST http://localhost:8787/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Current User (requires authentication)

```bash
curl -X GET http://localhost:8787/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update Profile (requires authentication)

```bash
curl -X PUT http://localhost:8787/auth/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Updated Name",
    "bio": "Updated bio information"
  }'
```

### Get All Users

```bash
curl -X GET http://localhost:8787/users
```

### Get User by ID

```bash
curl -X GET http://localhost:8787/users/USER_ID
```

### Get Admin Stats (requires authentication)

```bash
curl -X GET http://localhost:8787/admin/stats \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Database Schema

The application uses a simple user model with the following fields:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String
  avatar    String?
  bio       String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Environment Variables

Create a `.env` file in the auth example directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# JWT Secret (change this in production!)
JWT_SECRET="your-super-secret-jwt-key"
```

## Sample Users

After running the seed script, you can use these credentials to test:

- **Email**: john@example.com, **Password**: password123
- **Email**: jane@example.com, **Password**: password123
- **Email**: bob@example.com, **Password**: password123

## Development Tools

### Prisma Studio

Open Prisma Studio to view and edit your database:

```bash
npm run db:studio
```

### Database Management

- **Reset database**: `npm run db:migrate`
- **Generate client**: `npm run db:generate`
- **Push schema changes**: `npm run db:push`

## Security Features

1. **Password Hashing**: Uses bcrypt with salt rounds of 12
2. **JWT Authentication**: Tokens expire after 7 days
3. **Input Validation**: Zod schemas validate all inputs
4. **Protected Routes**: Middleware ensures authentication
5. **Error Handling**: Comprehensive error responses

## Project Structure

```
auth/
├── backend.tsx          # Main application file
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── prisma/
│   ├── schema.prisma    # Database schema
│   ├── seed.ts          # Database seeding script
│   └── dev.db          # SQLite database (created after setup)
└── README.md           # This file
```

## Technologies Used

- **ReactServe**: React-based backend framework
- **Prisma**: Modern database toolkit and ORM
- **SQLite**: Lightweight database for development
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT token generation and verification
- **Zod**: Runtime type validation
- **TypeScript**: Type-safe development

## Next Steps

This example provides a solid foundation for authentication. You can extend it by adding:

- Email verification
- Password reset functionality
- Role-based access control
- OAuth integration (Google, GitHub, etc.)
- Rate limiting
- Refresh tokens
- Session management
- User roles and permissions

## Production Considerations

Before deploying to production:

1. Change the JWT secret to a secure random string
2. Use a production database (PostgreSQL, MySQL)
3. Add proper logging
4. Implement rate limiting
5. Add HTTPS
6. Set up proper CORS policies
7. Add input sanitization
8. Implement proper error monitoring
