import { motion } from 'framer-motion';
import { Download, Loader2, Sparkles, Briefcase, GraduationCap, Code } from 'lucide-react';
import { useSkills, useExperience, useEducation } from '../utils/useSupabase';

const Resume = () => {
  const { skills, loading: skillsLoading, error: skillsError } = useSkills();
  const { experience, loading: expLoading, error: expError } = useExperience();
  const { education, loading: eduLoading, error: eduError } = useEducation();

  const loading = skillsLoading || expLoading || eduLoading;
  const error = skillsError || expError || eduError;

  // Fallback data if no data from Supabase
  const fallbackSkills = [
    { category: 'Frontend', items: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'Python', 'Django', 'PostgreSQL'] },
    { category: 'Tools & Others', items: ['Git', 'Docker', 'AWS', 'Figma', 'Jest'] }
  ];

  const fallbackExperience = [
    {
      title: 'Full-Stack  Developer',
      company: 'Tecnolusion Analytics.',
      period: '2022 - Present',
      description: 'Led development of multiple React applications and implemented best practices for code quality and performance.'
    },
    
  ];

  const fallbackEducation = [
    {
      degree: 'Master of Computer Application',
      school: 'Oriental University',
      period: '2023-2025',
      description: 'Graduated with honors. Focused on web development and software engineering.'
    }
  ];

  // Group skills by category for display
  const groupedSkills = skills.length > 0 
    ? skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push(skill.name);
        return acc;
      }, {})
    : fallbackSkills.reduce((acc, group) => {
        acc[group.category] = group.items;
        return acc;
      }, {});

  // Format experience data
  const formatExperience = (exp) => {
    if (exp.period) return exp;
    
    const startDate = new Date(exp.start_date).getFullYear();
    const endDate = exp.end_date ? new Date(exp.end_date).getFullYear() : 'Present';
    return {
      ...exp,
      period: `${startDate} - ${endDate}`
    };
  };

  // Format education data
  const formatEducation = (edu) => {
    if (edu.period) return edu;
    
    const startDate = new Date(edu.start_date).getFullYear();
    const endDate = edu.graduation_date ? new Date(edu.graduation_date).getFullYear() : 'Present';
    return {
      ...edu,
      period: `${startDate} - ${endDate}`
    };
  };

  const displayExperience = experience.length > 0 
    ? experience.map(formatExperience) 
    : fallbackExperience;
  const displayEducation = education.length > 0 
    ? education.map(formatEducation) 
    : fallbackEducation;

  if (loading) {
    return (
      <section id="resume" className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading resume data...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="resume" className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Error loading resume data: {error}</p>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="resume" className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              Resume
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My professional journey, skills, and experience in web development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl">
              <div className="flex items-center gap-2 mb-8">
                <Code className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Skills</h3>
              </div>
              <div className="space-y-8">
                {Object.entries(groupedSkills).map(([category, skillList], index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                      {category}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {skillList.map((skill, skillIndex) => (
                        <motion.span
                          key={skillIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-700/30 shadow-sm hover:shadow-md transition-all duration-200"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl">
              <div className="flex items-center gap-2 mb-8">
                <Briefcase className="w-6 h-6 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Experience</h3>
              </div>
              <div className="space-y-8">
                {displayExperience.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative border-l-4 border-blue-500 pl-6"
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {job.title}
                    </h4>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">{job.company}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                      {job.period}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {job.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-8">
              <GraduationCap className="w-6 h-6 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Education
              </h3>
            </div>
            <div className="max-w-2xl mx-auto">
              {displayEducation.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center relative border-l-4 border-green-500 pl-6"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-green-500 rounded-full"></div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {edu.degree}
                  </h4>
                  <p className="text-green-600 dark:text-green-400 font-medium">{edu.school}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                    {edu.period}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {edu.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Download Resume Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://docs.google.com/document/d/1EBKLfikqOaqBWjIFP-6CbEKLE-Bin4GKyTpdDWoRiU4/edit?usp=sharing"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Download size={20} />
            Download Resume
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume; 