import { Award } from 'lucide-react';
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
      className="py-16 bg-gray-950"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeader icon={<Award size={20} />} title="Certifications & Training" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-gray-900 border border-gray-800 hover:border-purple-500/40 p-5 rounded-2xl transition-all duration-200"
              itemScope
              itemType="https://schema.org/EducationalOccupationalCredential"
            >
              <div className="flex items-center gap-3 mb-2">
                <Award className="text-purple-400 flex-shrink-0" size={18} aria-hidden="true" />
                <time className="text-gray-500 text-sm" itemProp="dateCreated">{cert.year}</time>
              </div>
              <h3 className="text-sm font-medium text-gray-200" itemProp="name">
                {cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
                  >
                    {cert.title}
                  </a>
                ) : (
                  cert.title
                )}
              </h3>
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