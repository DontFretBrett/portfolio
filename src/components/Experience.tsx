import { Calendar } from 'lucide-react';

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

export default function Experience() {
  return (
    <section id="experience" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">Professional Experience</h2>
        
        <div className="space-y-12">
          {experiences.map((exp) => (
            <div key={exp.company} className="border-l-4 border-blue-600 pl-6">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-2xl font-semibold text-gray-800">{exp.company}</h3>
                <span className="text-gray-500 flex items-center gap-1 whitespace-nowrap">
                  <Calendar size={16} />
                  {exp.period}
                </span>
              </div>
              
              <div className="space-y-8">
                {exp.roles.map((role) => (
                  <div key={role.title} className="ml-4">
                    <div className="flex items-center gap-4 mb-3">
                      <h4 className="text-xl font-medium text-gray-700">{role.title}</h4>
                      <span className="text-gray-500 flex items-center gap-1 whitespace-nowrap">
                        <Calendar size={14} />
                        {role.period}
                      </span>
                    </div>
                    
                    {role.description && (
                      <p className="text-gray-600 mb-4">{role.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}