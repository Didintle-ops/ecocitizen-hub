EcoCitizen Hub
Smart Municipal Recycling Deposit & Incentive Platform

"<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/386edd94-857e-4965-99f9-b4d82f31741f" />


<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/35759cc9-ea13-48fe-a114-712c2d9ec1dd" />




Next.js · Supabase · TailwindCSS · ShadCN UI · Framer Motion
Live Deployment: https://ecocitizen-hub.vercel.app

Executive Summary

EcoCitizen Hub is a next-generation Smart City platform designed to modernize municipal waste management through intelligent recycling incentives, citizen engagement, and sustainability tracking.
Built as a premium, production-grade MVP, it is architected for real municipal deployments, nationwide scalability, and modern user experience standards.

📌 Features Overview
1. Authentication & Profiles

Email/password login

Optional phone OTP

Automatic profile creation

Stored fields:

Name

Phone

Municipality

Wallet balance

is_collector flag

2. Municipality Integration

Displays municipality name, logo, hotline, and registration ID

Header message:
“You are currently operating under: [Municipality] Waste Management Services.”

User assigned to municipality during onboarding

All info loaded from the municipalities table

3. Deposit Simulation System

Scan bin QR or manually enter bin code

Simulated:

Weight

Material type

Classification

Deposit saved to deposits table

Wallet balance + XP auto-updated

Carbon offset calculated

Animated success modal

4. Waste Collector Registration

Citizens can apply to become collectors

Fields include:

Identity number

Address

Schedule

Collector type

Data stored in waste_collectors

Profile updated → is_collector = true

Unlocks collector dashboard

🌟 Unique Platform Features
Eco-Level XP System

Gamified recycling experience with levels such as:
Eco Rookie → Green Guardian → Planet Protector → Earth Champion

Impact Visualizer Globe

3D-style environmental dashboard showing:

Waste removed

CO₂ saved

Marine impact

Smart Recommendation Engine

Recommends:

Nearest bins

Busiest deposit points

Highest reward materials

Community Challenges & Squad Mode

Weekly challenges

Municipal leaderboards

Squads and team competitions

Municipal Alerts System

Admin broadcast tools for:

Events

Waste updates

Community notifications

AI Eco-Coach (MVP)

Rules-based personalized tips based on user activity.

Environmental Scorecard for Municipalities

Compares waste performance across regions.

Citizen of the Month Highlight

Recognizes top eco-performers.

Bin Health Indicator

Bins show statuses:
Available · Near Full · Full · Offline

Carbon Offset Meter

Displays CO₂ savings per user based on recycling activity.

🟦 UN Sustainable Development Goals (SDGs)

EcoCitizen Hub directly supports these SDGs:

Goal	Description
SDG 1	No Poverty – Income through recycling incentives
SDG 8	Decent Work & Economic Growth – Waste collector jobs
SDG 11	Sustainable Cities & Communities
SDG 12	Responsible Consumption & Production
SDG 13	Climate Action
SDG 14	Life Below Water – Reduced marine plastics
SDG 15	Life on Land – Less land pollution

Visible in:

Welcome page

About page

Clean responsive SDG grid with icons

📞 Contact & Request System
1. Contact Municipality

Stored in: contact_requests

Auto-loads municipal hotline

Email-style message form

“Urgent Waste Issue” toggle

2. Request a Smart Bin

Stored in: bin_requests

Fields:

Name

Address / GPS

Reason for request

Optional photo upload

3. Report Illegal Dumping / Overflow

Stored in: incident_reports

Includes:

Photo upload

Auto-geolocation

Description field

Incident map with seeded markers

🧱 Tech Stack
Layer	Technology
Framework	Next.js (App Router)
Styling	TailwindCSS + ShadCN UI
Animations	Framer Motion
Backend	Supabase (Auth, Database, Storage)
Hosting	Vercel
Maps	Placeholder + seeded location data
📁 Project Structure
/app
  /auth
  /dashboard
  /deposit
  /collector
  /bins
  /challenges
  /contact
  /about
  /sdgs
  /api

/components
  /ui
  /municipality
  /dashboard
  /impact
  /eco
  /maps

/lib
  supabaseClient.ts
  hooks/
  utils/
  xp/
  carbon/

🗄 Database Tables
profiles
municipalities
bins
deposits
waste_collectors
challenges
squads
alerts
contact_requests
bin_requests
incident_reports


All tables include role-level security (RLS).

⚙️ Local Development Setup
1. Clone the repository
git clone https://github.com/Didintle-ops/ecocitizen-hub.git
cd ecocitizen-hub

2. Install dependencies
npm install

3. Create .env.local
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

4. Start development server
npm run dev

🚀 Deployment (Vercel)

Connect the GitHub repo to Vercel

Add Supabase environment variables

Select the Next.js template

Deploy

Vercel will handle building and edge optimization automatically

🧭 Roadmap

Real IoT bin sensor integration

AI model for material recognition (computer vision)

Advanced carbon analytics

Mobile PWA app

Multi-language support

Municipality admin CMS

NFC card scanning

📄 License

© 2025 EcoCitizen Hub. All rights reserved.
License options available depending on deployment model.
