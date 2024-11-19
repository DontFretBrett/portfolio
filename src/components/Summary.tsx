import { motion } from 'framer-motion';

export default function Summary() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="py-16 bg-white"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Summary</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          IT professional with strong leadership abilities and an extensive background in senior full stack software engineer positions primarily in the financial sector. Over a decade of experience successfully bringing projects from concept to completion. Strong understanding of best practices, objected oriented programming, software delivery life cycle, design patterns, continuous integration, continuous delivery, high performance solutions, solution architecting, agile methodology, and ADA.
        </p>
      </div>
    </motion.section>
  );
}