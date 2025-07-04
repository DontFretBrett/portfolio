import { motion } from 'framer-motion';

export default function Summary() {
  return (
    <motion.section 
      id="summary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-16 bg-white dark:bg-gray-800"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">About Brett Sanders</h2>
        <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed" itemProp="description">
          <p>
            Started obsessively coding as a 12-year-old building tools and games before YouTube, StackOverflow, and AI. 
            Hobby turned career, I quickly learned my skills and talent provide significant value to companies which I find 
            immensely rewarding.
          </p>
          <p className="mt-4">
            Now a <span itemProp="jobTitle" className="text-blue-600 dark:text-blue-400 font-medium">technology leader</span> with over 15 years of experience mostly in the financial sector 
            in roles from developer to director. Expertise in hands on building, architecting, planning, and leading projects from concept to completion, on time and under budget.
          </p>
          <p className="mt-4">
            Most recently, I've been diving deep into the world of AI agents and autonomous systems, exploring cutting-edge frameworks like 
            OpenAI Agents SDK, CrewAI, LangGraph, AutoGen, and Anthropic's Model Context Protocol (MCP). I believe we're at a pivotal moment 
            where AI will fundamentally transform how we build and interact with software systems.
          </p>
          <p className="mt-4">
            I'm passionate about building high quality maintainable systems, efficiency, automation, sharing my knowledge and experience, 
            mentoring, and fostering high performing teams. <span itemProp="knowsAbout" className="text-blue-600 dark:text-blue-400 font-medium">Proficient in a wide range of full stack technologies including SQL Server, Node.js, C# .NET, Angular, Web and Azure/AWS cloud services, and cutting-edge AI agent frameworks</span>.
          </p>
          
          {/* Enhanced author credentials section */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Professional Credentials & Achievements</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span><strong>15+ years</strong> of hands-on software engineering experience in financial technology</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span><strong>Software Engineering Director</strong> at Truist Bank (Fortune 500 financial institution)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span><strong>AWS Certified Solutions Architect</strong> with extensive cloud architecture experience</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span><strong>SAFe Agile Certified</strong> practitioner with proven team leadership capabilities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span><strong>AI Engineering Specialist</strong> with expertise in OpenAI, AutoGen, CrewAI, and Model Context Protocol</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span><strong>Published Technical Author</strong> with articles on AI engineering, React, and software architecture</span>
              </li>
            </ul>
          </div>

          {/* Trust signals */}
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Currently employed at Truist Bank</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Based in San Diego, CA</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>Active in tech community since 2008</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}