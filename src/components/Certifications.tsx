import { Award } from 'lucide-react';
import { motion } from 'framer-motion';

const certifications = [
  {
    year: '2025',
    title: 'The Complete Agentic AI Engineering Course',
    url: 'https://www.udemy.com/certificate/UC-816bd9d7-4ad1-4bef-b670-782fabc9ec94/'
  },
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
      className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-200"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-gray-800 dark:text-gray-100 transition-colors duration-200">Certifications & Training</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md dark:shadow-gray-900/20 dark:hover:shadow-gray-900/40 transition-all duration-200 border border-gray-100 dark:border-gray-700"
              itemScope
              itemType="https://schema.org/EducationalOccupationalCredential"
            >
              <div className="flex items-center gap-3 mb-2">
                <Award className="text-blue-600 dark:text-blue-400 transition-colors duration-200" size={20} aria-hidden="true" />
                <time className="text-gray-500 dark:text-gray-400 transition-colors duration-200" itemProp="dateCreated">{cert.year}</time>
              </div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 transition-colors duration-200" itemProp="name">
                {cert.url ? (
                  <a 
                    href={cert.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors duration-200"
                  >
                    {cert.title}
                  </a>
                ) : (
                  cert.title
                )}
              </h3>
              
              {/* Hidden structured data */}
              <div className="hidden">
                <span itemProp="credentialCategory">Professional Certification</span>
                <span itemProp="recognizedBy" itemScope itemType="https://schema.org/Organization">
                  <span itemProp="name">
                    {cert.title.includes('AWS') ? 'Amazon Web Services' : 
                     cert.title.includes('SAFe') ? 'Scaled Agile Inc.' :
                     cert.title.includes('Agentic AI Engineering Course') ? 'Udemy' : 'Professional Training'}
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