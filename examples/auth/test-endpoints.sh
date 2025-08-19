#!/bin/bash

echo "🚀 Testing Authentication API Endpoints"
echo "======================================"

BASE_URL="http://localhost:4000"

echo ""
echo "1. Testing API Info (GET /)"
echo "-------------------------"
curl -X GET "$BASE_URL/" \
  -H "Content-Type: application/json" \
  -w "\nStatus: %{http_code}\n" \
  -s

echo ""
echo "2. Testing User Signup (POST /auth/signup)"
echo "----------------------------------------"
curl -X POST "$BASE_URL/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }' \
  -w "\nStatus: %{http_code}\n" \
  -s

echo ""
echo "3. Testing User Login (POST /auth/login)"
echo "---------------------------------------"
LOGIN_RESPONSE=$(curl -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }' \
  -w "\nStatus: %{http_code}\n" \
  -s)

echo "$LOGIN_RESPONSE"

# Extract token from response (assuming it returns JSON with token field)
TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

echo ""
echo "4. Testing Get Current User (GET /auth/me) - Protected"
echo "----------------------------------------------------"
curl -X GET "$BASE_URL/auth/me" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -w "\nStatus: %{http_code}\n" \
  -s

echo ""
echo "5. Testing Update Profile (PUT /auth/profile) - Protected"
echo "--------------------------------------------------------"
curl -X PUT "$BASE_URL/auth/profile" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Test User",
    "bio": "I am a test user"
  }' \
  -w "\nStatus: %{http_code}\n" \
  -s

echo ""
echo "6. Testing Get All Users (GET /users/)"
echo "-------------------------------------"
curl -X GET "$BASE_URL/users/" \
  -H "Content-Type: application/json" \
  -w "\nStatus: %{http_code}\n" \
  -s

echo ""
echo "7. Testing Get User by ID (GET /users/:id)"
echo "-----------------------------------------"
curl -X GET "$BASE_URL/users/1" \
  -H "Content-Type: application/json" \
  -w "\nStatus: %{http_code}\n" \
  -s

echo ""
echo "8. Testing Admin Stats (GET /admin/stats) - Protected"
echo "----------------------------------------------------"
curl -X GET "$BASE_URL/admin/stats" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -w "\nStatus: %{http_code}\n" \
  -s

echo ""
echo "🏁 Testing Complete!"
