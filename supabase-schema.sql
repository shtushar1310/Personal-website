-- Create tables for portfolio website

-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(500),
  github_url VARCHAR(500),
  live_url VARCHAR(500),
  tech_stack TEXT[], -- Array of technologies
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills table
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Experience table
CREATE TABLE experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Education table
CREATE TABLE education (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  degree VARCHAR(255) NOT NULL,
  school VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  graduation_date DATE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data

-- Sample projects
INSERT INTO projects (title, description, image_url, github_url, live_url, tech_stack) VALUES
('E-Commerce Platform', 'A full-stack e-commerce application built with React, Node.js, and MongoDB. Features include user authentication, product management, and payment integration.', 'https://via.placeholder.com/400x250/3B82F6/FFFFFF?text=E-Commerce+Platform', 'https://github.com', 'https://example.com', ARRAY['React', 'Node.js', 'MongoDB', 'Stripe']),
('Task Management App', 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.', 'https://via.placeholder.com/400x250/10B981/FFFFFF?text=Task+Management+App', 'https://github.com', 'https://example.com', ARRAY['React', 'Firebase', 'Tailwind CSS', 'Framer Motion']),
('Portfolio Website', 'A modern, responsive portfolio website with Three.js animations and smooth scrolling effects. Built with React and Tailwind CSS.', 'https://via.placeholder.com/400x250/8B5CF6/FFFFFF?text=Portfolio+Website', 'https://github.com', 'https://example.com', ARRAY['React', 'Three.js', 'Tailwind CSS', 'Framer Motion']),
('Weather Dashboard', 'A weather application that displays current weather conditions and forecasts. Features include location-based weather and interactive maps.', 'https://via.placeholder.com/400x250/F59E0B/FFFFFF?text=Weather+Dashboard', 'https://github.com', 'https://example.com', ARRAY['React', 'OpenWeather API', 'Chart.js', 'Geolocation']);

-- Sample skills
INSERT INTO skills (name, category) VALUES
('React', 'Frontend'),
('Vue.js', 'Frontend'),
('TypeScript', 'Frontend'),
('Tailwind CSS', 'Frontend'),
('Next.js', 'Frontend'),
('Node.js', 'Backend'),
('Express', 'Backend'),
('Python', 'Backend'),
('Django', 'Backend'),
('PostgreSQL', 'Backend'),
('Git', 'Tools & Others'),
('Docker', 'Tools & Others'),
('AWS', 'Tools & Others'),
('Figma', 'Tools & Others'),
('Jest', 'Tools & Others');

-- Sample experience
INSERT INTO experience (title, company, start_date, end_date, description) VALUES
('Senior Frontend Developer', 'Tech Company Inc.', '2022-01-01', NULL, 'Led development of multiple React applications, mentored junior developers, and implemented best practices for code quality and performance.'),
('Full Stack Developer', 'Startup XYZ', '2020-01-01', '2022-01-01', 'Built and maintained web applications using React, Node.js, and MongoDB. Collaborated with design and product teams.'),
('Junior Developer', 'Digital Agency', '2018-01-01', '2020-01-01', 'Developed responsive websites and web applications using modern JavaScript frameworks and CSS preprocessors.');

-- Sample education
INSERT INTO education (degree, school, start_date, graduation_date, description) VALUES
('Bachelor of Computer Science', 'University of Technology', '2014-09-01', '2018-05-01', 'Graduated with honors. Focused on web development and software engineering.');

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access to skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access to experience" ON experience FOR SELECT USING (true);
CREATE POLICY "Allow public read access to education" ON education FOR SELECT USING (true);

-- Create policy for contact form submissions
CREATE POLICY "Allow public insert to contact_messages" ON contact_messages FOR INSERT WITH CHECK (true); 