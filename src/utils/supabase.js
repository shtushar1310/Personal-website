import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database table names
export const TABLES = {
  PROJECTS: 'projects',
  CONTACT_MESSAGES: 'contact_messages',
  SKILLS: 'skills',
  EXPERIENCE: 'experience',
  EDUCATION: 'education'
};

// Helper functions for common operations
export const supabaseHelpers = {
  // Projects
  async getProjects() {
    const { data, error } = await supabase
      .from(TABLES.PROJECTS)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createProject(project) {
    const { data, error } = await supabase
      .from(TABLES.PROJECTS)
      .insert([project])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  // Contact Messages
  async submitContactMessage(message) {
    const { data, error } = await supabase
      .from(TABLES.CONTACT_MESSAGES)
      .insert([message])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  // Skills
  async getSkills() {
    const { data, error } = await supabase
      .from(TABLES.SKILLS)
      .select('*')
      .order('category', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  // Experience
  async getExperience() {
    const { data, error } = await supabase
      .from(TABLES.EXPERIENCE)
      .select('*')
      .order('start_date', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Education
  async getEducation() {
    const { data, error } = await supabase
      .from(TABLES.EDUCATION)
      .select('*')
      .order('graduation_date', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Create functions for admin panel
  async createSkill(skill) {
    const { data, error } = await supabase
      .from(TABLES.SKILLS)
      .insert([skill])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async createExperience(experience) {
    const { data, error } = await supabase
      .from(TABLES.EXPERIENCE)
      .insert([experience])
      .select();
    
    if (error) throw error;
    return data[0];
  }
}; 