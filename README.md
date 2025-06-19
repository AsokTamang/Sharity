Sharity
Community‑driven platform for giving away and claiming unused items.

🌱 Table of Contents
About

Features

Demo

Tech Stack

Setup & Installation

Environment Variables

Usage

Roadmap

Contributing


About
Sharity empowers users to effortlessly post items they no longer need and share them with others in the community. The give‑and‑take model encourages sustainable living and a spirit of sharing 


Features
User Authentication: Sign up, log in, and manage profiles.
Platform Responsive UI: Built with modern design principles for desktop & mobile.
Item Management: Add, edit, delete listings with images and descriptions.
Search & Browse: Discover available items in your area.
Sustainability Focus: Promote reuse and reduce waste.
Next.js Power: Fast page loads, server-side rendering, and seamless client-side routing.

Demo
sharity-production.up.railway.app

Tech Stack
Frontend/Backend: Next.js & React

Language: TypeScript

Styling: CSS, (Tailwind/PostCSS etc. as applicable)

Database:  MongoDB

Hosting/Deployment: Railway

Setup & Installation
Clone the repo

bash
Copy
Edit
git clone https://github.com/AsokTamang/Sharity.git
cd Sharity
Install dependencies

bash
Copy
Edit
npm install
# or yarn
Environment variables
Create a .env.local file and configure:

env
Copy
Edit
NEXT_PUBLIC_API_URL=<your API endpoint>
DATABASE_URL=<your database connection string>
NEXTAUTH_SECRET=<your auth secret>
Run development server

bash
Copy
Edit
npm run dev
# or yarn dev
➞ Open http://localhost:3000

Environment Variables
Name	Description
NEXT_PUBLIC_API_URL	Base URL for backend API
DATABASE_URL	Database connection string
NEXTAUTH_SECRET	Authentication secret for sessions

Usage
Browse items posted by others.

Add or claim items.

Manage listings from your profile dashboard.

Log out when done.

Roadmap
 Real-time chat & notifications

 Location-based item filtering

 Rating & review system

 Admin dashboard for moderation

Feel free to open issues or feature requests!

Contributing
Thank you for considering contributing! Here's how you can help:

Fork the repository

Create a new branch (git checkout -b feature/your‑feature)

Commit your changes (git commit -m 'Add awesome feature')

Push to your branch (git push origin feature/your‑feature)

Open a Pull Request

Please review existing issues to find ways to help or suggest new improvements.


Contact
Asok Tamang
https://github.com/AsokTamang | Feel free to reach out with any suggestions or feedback.

TL;DR
Social platform ✅

Next.js with TypeScript ✅

Responsive, CRUD-enabled ✅

Sustainable sharing focus ✅

