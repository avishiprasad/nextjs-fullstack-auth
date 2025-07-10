🚀 Auth-NextJS Project Summary
This is a full-stack authentication system built with:

✅ Next.js 15 (App Router, API routes, Middleware)

✅ MongoDB (with Mongoose) for user data storage

✅ Tailwind CSS for styling

✅ Nodemailer + Mailtrap for email verification

✅ JWT cookies for secure authentication

🔑 Key Features
1. User Registration (Signup)
   New users can register with username, email, and password.
   Passwords are hashed using bcryptjs before saving in MongoDB.
   Sends a verification email to confirm the user’s email address.
   Generates a secure random token for email verification.

2.Email Verification
  The user clicks the link in their email to verify.
  The /verifyemail page consumes the token and marks the user as isVerified=true in the DB.

3.User Login
  Only allows login for users with isVerified=true.
  On successful login, sets a JWT token in an HTTP-only cookie.

4.Protected Routes
  Middleware checks if the user is logged in (via cookie).
  Blocks access to /profile and other private pages if not authenticated.
  Redirects users appropriately between public and private pages.
  
5.Forgot Password (Optional but Supported)
  Generates a secure reset token.
  Sends a password reset link via email.
  Allows users to securely reset their password.

FOLDER STRUCTURE:
/app
  /login
  /signup
  /profile
  /verifyemail
  /api/users
    login.ts
    signup.ts
    verifyemail.ts

/dbConfig
  dbConfig.ts

/models
  userModel.ts

/helpers
  mailer.ts

/middleware.ts
