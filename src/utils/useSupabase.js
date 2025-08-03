import { useState, useEffect } from 'react';
import { supabaseHelpers } from './supabase';

export const useSupabase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSupabaseOperation = async (operation) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await operation();
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return {
    loading,
    error,
    handleSupabaseOperation
  };
};

// Custom hooks for specific data types
export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await supabaseHelpers.getProjects();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const createProject = async (projectData) => {
    try {
      const newProject = await supabaseHelpers.createProject(projectData);
      setProjects(prev => [newProject, ...prev]);
      return newProject;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    projects,
    loading,
    error,
    createProject
  };
};

export const useContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitMessage = async (messageData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await supabaseHelpers.submitContactMessage(messageData);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    submitMessage
  };
};

export const useSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const data = await supabaseHelpers.getSkills();
        setSkills(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return {
    skills,
    loading,
    error
  };
};

export const useExperience = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const data = await supabaseHelpers.getExperience();
        setExperience(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  return {
    experience,
    loading,
    error
  };
};

export const useEducation = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        const data = await supabaseHelpers.getEducation();
        setEducation(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  return {
    education,
    loading,
    error
  };
}; 