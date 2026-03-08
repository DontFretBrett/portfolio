import { memo } from 'react';
import { Calendar, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-400 flex-shrink-0" aria-hidden="true">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <div className="flex-1 h-px bg-linear-to-r from-purple-500/30 to-transparent ml-2" />
    </div>
  );
}

// Add interfaces at the top of the file
interface Role {
  title: string;
  period?: string;
  description: string;
}

interface Experience {
  company: string;
  period: string;
  roles: Role[];
}

// Update the experiences array to use the interface
const experiences: Experience[] = [
  {
    company: 'Truist Bank (LightStream division)',
    period: 'June 2016 – Present',
    roles: [
      {
        title: 'Software Engineering Director',
        period: 'Oct 2022 – Present',
        description: 'Leading multiple engineering teams responsible for the development and maintenance of consumer lending platforms. Oversee public websites, analytics, accessibility initiatives, and various internal systems. Successfully launched major partnership integrations while maintaining high uptime and compliance standards.'
      },
      {
        title: 'Solutions Architect',
        period: 'Nov 2020 – Oct 2022',
        description: 'Architected and implemented major platform improvements including microservice-based distributed systems and analytics infrastructure. Created comprehensive technical documentation and led strategic technical initiatives.'
      },
      {
        title: 'Application Development Manager',
        period: 'Sept 2019 – Nov 2020',
        description: 'Led development of key platform features improving conversion rates and user experience. Modernized development practices and implemented security improvements.'
      },
      {
        title: 'Sr Software Engineer - Team Lead',
        period: 'June 2016 – Sept 2019',
        description: 'Spearheaded complete website rebuild implementing modern CMS solutions and establishing robust component libraries. Introduced accessibility standards and optimized frontend performance.'
      }
    ]
  },
  {
    company: 'US Bank SBA (Small Business Administration)',
    period: 'Nov 2011 – June 2016',
    roles: [
      {
        title: 'Senior Software Engineer',
        description: 'Developed and maintained lending platforms using .NET technologies. Implemented database migrations and automated reporting systems, significantly reducing operational costs.'
      }
    ]
  },
  {
    company: 'US Bank Manufactured Housing Finance',
    period: 'June 2008 – October 2011',
    roles: [
      {
        title: 'Programmer Analyst – Process Improvement Specialist',
        description: 'Implemented automation solutions and process improvements that significantly enhanced operational efficiency and contributed to record-breaking performance metrics.'
      }
    ]
  }
];

const Experience = memo(function Experience() {
  return (
    <section
      id="experience"
      className="py-16 bg-gray-950"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeader icon={<Briefcase size={20} />} title="Professional Experience" />

        <div className="space-y-8">
          {experiences.map((exp, expIndex) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 * expIndex }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6">
                <h3 className="text-xl font-semibold text-white">{exp.company}</h3>
                <span className="text-gray-400 flex items-center gap-1 text-sm">
                  <Calendar size={14} aria-hidden="true" />
                  {exp.period}
                </span>
              </div>

              <div className="space-y-6 border-l-2 border-purple-500/30 pl-5">
                {exp.roles.map((role) => (
                  <div
                    key={role.title}
                    itemScope
                    itemType="https://schema.org/OrganizationRole"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                      <h4 className="text-base font-medium text-purple-300" itemProp="roleName">
                        {role.title}
                      </h4>
                      {role.period && (
                        <span className="text-gray-500 flex items-center gap-1 text-xs">
                          <Calendar size={12} aria-hidden="true" />
                          <time itemProp="startDate">{role.period}</time>
                        </span>
                      )}
                    </div>
                    {role.description && (
                      <p className="text-gray-400 text-sm leading-relaxed" itemProp="description">
                        {role.description}
                      </p>
                    )}
                    <div className="hidden">
                      <span itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
                        <span itemProp="name">{exp.company}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Experience;