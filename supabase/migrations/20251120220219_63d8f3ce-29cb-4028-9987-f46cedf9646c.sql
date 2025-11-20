-- Create municipalities table
CREATE TABLE public.municipalities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  registration_id TEXT NOT NULL,
  hotline TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  municipality_id UUID REFERENCES public.municipalities(id),
  wallet_balance DECIMAL(10,2) DEFAULT 0,
  xp_points INTEGER DEFAULT 0,
  eco_level TEXT DEFAULT 'Eco Rookie',
  is_collector BOOLEAN DEFAULT false,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create bins table
CREATE TABLE public.bins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bin_code TEXT UNIQUE NOT NULL,
  municipality_id UUID REFERENCES public.municipalities(id),
  location TEXT NOT NULL,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  status TEXT DEFAULT 'available', -- available, full, offline
  fill_level INTEGER DEFAULT 0, -- 0-100
  last_collection TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create deposits table
CREATE TABLE public.deposits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  bin_id UUID REFERENCES public.bins(id),
  material_type TEXT NOT NULL, -- plastic, glass, metal, paper, organic
  weight_kg DECIMAL(8,2) NOT NULL,
  reward_amount DECIMAL(10,2) NOT NULL,
  xp_earned INTEGER DEFAULT 0,
  carbon_offset_kg DECIMAL(8,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create waste_collectors table
CREATE TABLE public.waste_collectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  id_document TEXT NOT NULL,
  address TEXT NOT NULL,
  schedule TEXT,
  collector_type TEXT, -- individual, company, municipality
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create challenges table
CREATE TABLE public.challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  target_value INTEGER NOT NULL,
  reward_xp INTEGER DEFAULT 0,
  reward_cash DECIMAL(10,2) DEFAULT 0,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  end_date TIMESTAMP WITH TIME ZONE,
  challenge_type TEXT, -- weekly, monthly, special
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create alerts table (municipal announcements)
CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  municipality_id UUID REFERENCES public.municipalities(id),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  alert_type TEXT DEFAULT 'info', -- info, warning, urgent
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create contact_requests table
CREATE TABLE public.contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  municipality_id UUID REFERENCES public.municipalities(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_urgent BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending', -- pending, resolved
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create bin_requests table
CREATE TABLE public.bin_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  reason TEXT NOT NULL,
  image_url TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create incident_reports table
CREATE TABLE public.incident_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  incident_type TEXT NOT NULL, -- illegal_dumping, overflow, damaged_bin
  location TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  status TEXT DEFAULT 'reported', -- reported, investigating, resolved
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.municipalities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deposits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waste_collectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bin_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incident_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Anyone can view leaderboard profiles" ON public.profiles
  FOR SELECT USING (true);

-- RLS Policies for municipalities
CREATE POLICY "Anyone can view municipalities" ON public.municipalities
  FOR SELECT USING (true);

-- RLS Policies for bins
CREATE POLICY "Anyone can view bins" ON public.bins
  FOR SELECT USING (true);

-- RLS Policies for deposits
CREATE POLICY "Users can view their own deposits" ON public.deposits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own deposits" ON public.deposits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view all deposits for leaderboard" ON public.deposits
  FOR SELECT USING (true);

-- RLS Policies for waste_collectors
CREATE POLICY "Users can view their own collector profile" ON public.waste_collectors
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own collector application" ON public.waste_collectors
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own collector profile" ON public.waste_collectors
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for challenges
CREATE POLICY "Anyone can view challenges" ON public.challenges
  FOR SELECT USING (true);

-- RLS Policies for alerts
CREATE POLICY "Anyone can view alerts" ON public.alerts
  FOR SELECT USING (true);

-- RLS Policies for contact_requests
CREATE POLICY "Users can view their own contact requests" ON public.contact_requests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert contact requests" ON public.contact_requests
  FOR INSERT WITH CHECK (true);

-- RLS Policies for bin_requests
CREATE POLICY "Users can view their own bin requests" ON public.bin_requests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert bin requests" ON public.bin_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view bin requests" ON public.bin_requests
  FOR SELECT USING (true);

-- RLS Policies for incident_reports
CREATE POLICY "Users can view their own incident reports" ON public.incident_reports
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert incident reports" ON public.incident_reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view incident reports" ON public.incident_reports
  FOR SELECT USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'phone', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert sample municipality
INSERT INTO public.municipalities (name, logo_url, registration_id, hotline, email, address)
VALUES (
  'Green City Municipal Services',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200',
  'GCM-2024-001',
  '+1-800-RECYCLE',
  'contact@greencity.gov',
  '123 Eco Avenue, Green City, GC 12345'
);

-- Insert sample bins
INSERT INTO public.bins (bin_code, municipality_id, location, latitude, longitude, status, fill_level)
SELECT 
  'BIN-' || LPAD(generate_series::text, 4, '0'),
  (SELECT id FROM public.municipalities LIMIT 1),
  CASE 
    WHEN generate_series % 5 = 0 THEN 'Central Park'
    WHEN generate_series % 5 = 1 THEN 'Main Street'
    WHEN generate_series % 5 = 2 THEN 'University Campus'
    WHEN generate_series % 5 = 3 THEN 'Shopping District'
    ELSE 'Residential Area'
  END,
  40.7128 + (random() - 0.5) * 0.1,
  -74.0060 + (random() - 0.5) * 0.1,
  CASE 
    WHEN random() > 0.8 THEN 'full'
    WHEN random() > 0.9 THEN 'offline'
    ELSE 'available'
  END,
  (random() * 100)::INTEGER
FROM generate_series(1, 20);

-- Insert sample challenges
INSERT INTO public.challenges (title, description, target_value, reward_xp, reward_cash, challenge_type, end_date)
VALUES
  ('Plastic Warrior', 'Deposit 50kg of plastic this week', 50, 500, 25.00, 'weekly', now() + interval '7 days'),
  ('Monthly Hero', 'Reach 200kg total deposits this month', 200, 2000, 100.00, 'monthly', now() + interval '30 days'),
  ('Glass Collector', 'Deposit 30kg of glass', 30, 300, 15.00, 'weekly', now() + interval '7 days');

-- Insert sample alert
INSERT INTO public.alerts (municipality_id, title, message, alert_type)
VALUES
  ((SELECT id FROM public.municipalities LIMIT 1), 
   'New Collection Schedule', 
   'Glass recycling collection has been moved to Wednesdays. Please adjust your deposit schedules accordingly.',
   'info');