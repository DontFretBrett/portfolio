import { Award } from 'lucide-react';
import { motion } from 'framer-motion';

const certifications = [
  {
    year: '2023',
    title: 'AWS Certified Cloud Practitioner'
  },
  {
    year: '2023',
    title: 'AWS Technical Essentials'
  },
  {
    year: '2023',
    title: 'Developing on AWS'
  },
  {
    year: '2023',
    title: 'Advanced Developing on AWS'
  },
  {
    year: '2023',
    title: 'Architecting on AWS'
  },
  {
    year: '2023',
    title: 'Developing Serverless on AWS'
  },
  {
    year: '2021',
    title: 'Accessibility for Web Design'
  },
  {
    year: '2021',
    title: 'Certified SAFe 5 Practitioner'
  }
];

export default function Certifications() {
  return (
    <section 
      id="certifications" 
      className="py-16 bg-gray-50"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">Certifications & Training</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              itemScope
              itemType="https://schema.org/EducationalOccupationalCredential"
            >
              <div className="flex items-center gap-3 mb-2">
                <Award className="text-blue-600" size={20} aria-hidden="true" />
                <time className="text-gray-500" itemProp="dateCreated">{cert.year}</time>
              </div>
              <h3 className="text-lg font-medium text-gray-800" itemProp="name">
                {cert.title}
              </h3>
              
              {/* Hidden structured data */}
              <div className="hidden">
                <span itemProp="credentialCategory">Professional Certification</span>
                <span itemProp="recognizedBy" itemScope itemType="https://schema.org/Organization">
                  <span itemProp="name">
                    {cert.title.includes('AWS') ? 'Amazon Web Services' : 
                     cert.title.includes('SAFe') ? 'Scaled Agile Inc.' : 'Professional Training'}
                  </span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 