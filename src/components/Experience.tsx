import { motion } from 'framer-motion';
import { Calendar, Award } from 'lucide-react';

const experiences = [
  {
    company: 'LightStream.com',
    roles: [
      {
        title: 'VP, Engineering Director',
        period: 'Oct 2022 – Current',
        highlights: [
          'Manage 20 direct reports across 5 teams consisting of web, mobile, and a contractor team.',
          'Participated in team restructuring and redefining the ownership model.',
          'Developed operational plan and project charters.',
          'Lead large scale project architectural planning and delivery management.'
        ]
      },
      {
        title: 'Application Development Manager / Solution Architect',
        period: 'Nov 2020 – Oct 2022',
        highlights: [
          'Executed several large projects during pandemic remote work.',
          'Delivered joint consent project with complex system refactoring.',
          'Architected sitewide rebranding solution.',
          'Co-led Agile transformation post-merger.'
        ]
      }
    ]
  }
];

export default function Experience() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="py-16 bg-white"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">Professional Experience</h2>
        
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="mb-12 last:mb-0"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{exp.company}</h3>
            
            {exp.roles.map((role, roleIndex) => (
              <div key={role.title} className="mb-8 last:mb-0 pl-6 border-l-2 border-blue-500">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar size={18} className="text-blue-600" />
                  <h4 className="text-xl font-semibold text-gray-800">{role.title}</h4>
                </div>
                <p className="text-gray-600 mb-4">{role.period}</p>
                <ul className="space-y-3">
                  {role.highlights.map((highlight, i) => (
                    <li key={i} className="text-gray-600 flex items-start gap-2">
                      <Award size={16} className="mt-1 flex-shrink-0 text-blue-600" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}