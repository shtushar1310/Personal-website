import { motion } from 'framer-motion';
import { Download, Loader2 } from 'lucide-react';
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
      <section id="resume" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
            <p className="mt-4 text-gray-600">Loading resume data...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="resume" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Error loading resume data: {error}</p>
            <p className="mt-2 text-gray-600">Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="resume" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Resume
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Skills</h3>
            <div className="space-y-8">
              {Object.entries(groupedSkills).map(([category, skillList], index) => (
                <div key={index}>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {skillList.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Experience</h3>
            <div className="space-y-8">
              {displayExperience.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border-l-4 border-blue-500 pl-6"
                >
                  <h4 className="text-lg font-semibold text-gray-900">
                    {job.title}
                  </h4>
                  <p className="text-blue-600 font-medium">{job.company}</p>
                  <p className="text-gray-500 text-sm mb-2">
                    {job.period}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {job.description}
                  </p>
                </motion.div>
              ))}
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
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Education
          </h3>
          <div className="max-w-2xl mx-auto">
            {displayEducation.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center border-l-4 border-green-500 pl-6"
              >
                <h4 className="text-lg font-semibold text-gray-900">
                  {edu.degree}
                </h4>
                <p className="text-green-600 font-medium">{edu.school}</p>
                <p className="text-gray-500 text-sm mb-2">
                  {edu.period}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {edu.description}
                </p>
              </motion.div>
            ))}
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
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