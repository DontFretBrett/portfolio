import { motion } from 'framer-motion';

export default function Summary() {
  return (
    <motion.section 
      id="summary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-16 bg-white"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">About Brett Sanders</h2>
        <div className="text-lg text-gray-600 leading-relaxed" itemProp="description">
          <p>
            Started obsessively coding as a 12-year-old building tools and games before YouTube, StackOverflow, and AI. 
            Hobby turned career, I quickly learned my skills and talent provide significant value to companies which I find 
            immensely rewarding.
          </p>
          <p className="mt-4">
            Now a <span itemProp="jobTitle">technology leader</span> with over <strong>15 years of experience</strong> mostly in the financial sector 
            in roles from developer to director. Expertise in hands on building, architecting, planning, and leading projects 
            from concept to completion, on time and under budget.
          </p>
          <p className="mt-4">
            I'm passionate about building high quality maintainable systems, efficiency, common sense, automation, 
            sharing my knowledge and experience, mentoring, and fostering high performing teams. Proficient in a wide range of 
            full stack technologies including <span itemProp="knowsAbout">SQL Server, Node.js, C# .NET, Angular, Web and Azure/AWS cloud services</span>.
          </p>
        </div>
      </div>
    </motion.section>
  );
}