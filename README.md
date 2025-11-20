EcoCitizen Hub
Smart Municipal Recycling Deposit & Incentive Platform

Next.js · Supabase · Tailwind · ShadCN UI · Framer Motion
Live Deployment: https://ecocitizen-hub.vercel.app

Executive Summary

EcoCitizen Hub is a next-generation Smart City web application designed to modernize municipal waste management through intelligent recycling incentives, citizen engagement, and sustainability impact tracking.
This platform combines advanced UI/UX design, robust backend architecture, and real-time municipal integration to deliver a production-ready MVP capable of scaling to full nationwide deployments.

EcoCitizen Hub empowers municipalities to:

Increase recycling participation

Improve waste collector efficiency

Reduce landfill and ocean-bound pollution

Engage citizens via gamified incentives

Track sustainability impact aligned with the UN Sustainable Development Goals (SDGs)

Table of Contents

Core Capabilities

Unique Features

SDG Support

Contact & Request System

Technology Stack

System Architecture

Database Schema

Development Guide

Deployment Guide

Roadmap

License

Core Capabilities
🔐 1. Supabase Authentication & Profiles

Email/password authentication

Optional phone OTP

Automatic profile generation on signup

Profile data stored:

Full name

Phone number

Municipality assignment

Wallet balance

is_collector permission flag

🏛️ 2. Municipality Integration

Full integration with municipal waste management environments:

Dynamic municipal header with:
✔ Municipality name
✔ Official logo
✔ Registration ID
✔ Hotline

Displayed message:
“You are currently operating under: [Municipality] Waste Management Services.”

Municipal data sourced from municipalities table

Assigned during onboarding and enforced across UI state

♻️ 3. Recycling Deposit Simulation

Production-ready MVP for validating deposit workflows:

Scan bin QR code or enter bin ID

Simulated weight, material type, classification

All deposits stored in deposits table

Wallet auto-updates

XP + Carbon savings calculated

Success animation with premium micro-interactions

🚛 4. Waste Collector Registration

A structured registration pathway for municipal-approved waste collectors:

Form captures:

Legal identity

Address

Collector schedule

Collector type

Data stored in waste_collectors

Profile transitions to is_collector = true

Collector dashboard unlocked

Unique Features
🌱 Eco-Level XP System

Gamified progression with roles such as:
Eco Rookie → Green Guardian → Planet Protector → Earth Champion

XP earned through:

Deposits

Challenges

Community events

🌍 Impact Visualizer Globe

A 3D-inspired sustainability tracker with metrics:

Total waste removed

CO₂ offset

Ocean plastic reduction

🧠 Smart Recommendation Engine

Algorithmic suggestions based on activity:

Nearest bins

Busiest recycling points

Highest-reward materials

👥 Squad Mode & Community Challenges

Weekly Eco-Challenges

Squad teaming system

Municipality-vs-municipality rankings

Leaderboards with XP integration

🚨 Municipal Alerts / Admin Broadcasts

Official communication module for:

City events

Emergency waste advisories

Community notifications

🤖 AI Eco-Coach (Rules-Based)

Provides personalized recycling tips based on user behavior.

🏙 Environmental Scorecard

Benchmarks municipalities across:

Waste recovery rates

Citizen participation levels

Carbon impact

🌟 Citizen of the Month

Automated recognition for top recyclers.

🗑 Bin Health Indicator

Realtime-style statuses:
Available · Near Full · Full · Offline

🌡 Carbon Offset Meter

Instant calculation of emissions avoided.

SDG Support

EcoCitizen Hub supports the following United Nations Sustainable Development Goals:

SDG 1 – No Poverty

SDG 8 – Decent Work & Economic Growth

SDG 11 – Sustainable Cities & Communities

SDG 12 – Responsible Consumption & Production

SDG 13 – Climate Action

SDG 14 – Life Below Water

SDG 15 – Life on Land

Presented in:

SDG Welcome Section

About Page

Icon-based responsive grid

Contact & Request System
📞 Contact Municipality

Loads hotline dynamically

General inquiry form

Stores in contact_requests

“Urgent Waste Issue” toggle

🗳 Request a Smart Bin

Stored in bin_requests:

Full name

GPS / address

Justification text

Optional image upload

Municipal tracking tools included

🚯 Report Illegal Dumping / Overflow

Stored in incident_reports:

Image upload

Auto-geolocation

Notes field

Incident map with seeded test data

Technology Stack
Layer	Technology
Frontend Framework	Next.js (App Router)
UI Layer	TailwindCSS + ShadCN UI
Animation	Framer Motion
Backend-as-a-Service	Supabase (Auth, DB, Storage)
Deployment	Vercel
Mapping	Lightweight JS map placeholder + sample GeoJSON
System Architecture
High-Level Flow

Authentication (Supabase)

Profile initialization

Municipality assignment

Access to:

Dashboard

Deposit system

Collector workflows

Challenges

Contact & reporting services

Architecture Principles

Modular component-driven UI

Serverless backend

Optimized for Vercel edge deployment

Hardened security via Supabase RLS policies

Scalable municipal expansion model

Database Schema

Core Tables:

profiles
municipalities
bins
deposits
waste_collectors


Engagement/Tiers:

challenges
squads
alerts


Community & Support:

contact_requests
bin_requests
incident_reports


All tables include:

Soft-deletion compatible fields

Foreign keys

RLS policies for secure multi-tenant municipalities

Development Guide
📦 Installation
git clone https://github.com/yourrepo/ecocitizen-hub.git
cd ecocitizen-hub
npm install

🔧 Environment Variables

Create .env.local:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

▶ Local Development
npm run dev

Deployment Guide (Vercel)

Push repository to GitHub

Import project in Vercel

Add Supabase environment variables

Select Next.js App Router preset

Deploy

Deployment completes in seconds due to serverless architecture.

Roadmap
Future Enhancements

AI-powered material recognition (CV model)

IoT integration for live bin sensors

Native mobile app (PWA or React Native)

Carbon credit marketplace integration

Multi-language support

NFC card scanning for deposits

License

© 2025 EcoCitizen Hub. All rights reserved.
Open licensing available upon request based on deployment model.
