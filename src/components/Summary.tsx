import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Sparkles, Github, Linkedin, MapPin, Brain, TrendingUp, Zap, Shield } from 'lucide-react';

function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1.8,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => {
    spring.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Math.round(latest).toLocaleString() + suffix;
      }
    });
  }, [spring, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

const heroStats = [
  { icon: <Brain size={20} />, value: 15, suffix: '+', label: 'Years Experience', color: 'from-purple-500 to-violet-500' },
  { icon: <TrendingUp size={20} />, value: 2, prefix: '$', suffix: 'M', label: 'Cost Savings Delivered', color: 'from-cyan-500 to-blue-500' },
  { icon: <Zap size={20} />, value: 99, suffix: '.9%', label: 'Uptime Maintained', color: 'from-green-500 to-emerald-500' },
  { icon: <Shield size={20} />, value: 8, suffix: '+', label: 'AI Projects Shipped', color: 'from-orange-500 to-red-500' },
];

const credentials = [
  { text: '15+ years hands-on software engineering in financial services' },
  { text: 'Software Engineering Director at Truist Bank (Fortune 500)' },
  { text: 'Saved ~$2M at Truist — found secure solution for deprecated web framework' },
  { text: 'Maintained 99.9% uptime for customer-facing LightStream web experiences' },
  { text: 'AWS Certified Cloud Practitioner with deep cloud architecture expertise' },
  { text: 'SAFe Agile Certified — proven experience scaling practices across enterprise teams' },
  { text: 'AI Agentic Engineering Certified — OpenAI Agents SDK, CrewAI, LangGraph, AutoGen, MCP' },
  { text: 'Production AI builder — J5-Trade autonomous trading platform + Johnny5 24/7 AI assistant' },
  { text: 'Achieved 100% ADA compliance for public website using industry-leading accessibility standards' },
];

export default function Summary() {
  return (
    <section
      id="summary"
      className="relative bg-gray-950 overflow-hidden"
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 via-gray-950 to-cyan-900/20 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <picture>
              <source srcSet="/me.webp" type="image/webp" />
              <img
                src="/me-128.jpg"
                alt="Brett Sanders"
                width={120}
                height={120}
                itemProp="image"
                className="w-28 h-28 rounded-full ring-4 ring-purple-500/40 object-cover shadow-2xl shadow-purple-500/20"
              />
            </picture>
          </motion.div>

          {/* Name + headline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center md:text-left"
          >
            <span className="inline-flex items-center gap-2 text-purple-400 text-sm font-mono mb-3">
              <Sparkles size={14} aria-hidden="true" /> Engineering Leader &amp; AI Builder
            </span>
            <h1
              className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-white via-purple-200 to-cyan-300 mb-3 leading-tight"
              itemProp="name"
            >
              Brett Sanders
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl leading-relaxed mb-4" itemProp="description">
              <span itemProp="jobTitle" className="text-purple-300 font-medium">Software Engineering Director</span> at Truist Bank ·{' '}
              15+ years in financial services · Started coding at age 12 and never stopped. Passionate about
              high-performance systems, AI agents, and building teams that ship.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
              <a
                href="https://linkedin.com/in/imbrett/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-gray-300 hover:text-purple-400 transition-colors"
              >
                <Linkedin size={15} aria-hidden="true" /> LinkedIn
              </a>
              <a
                href="https://github.com/DontFretBrett"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-gray-300 hover:text-purple-400 transition-colors"
              >
                <Github size={15} aria-hidden="true" /> GitHub
              </a>
              <a
                href="/ai"
                className="inline-flex items-center gap-1.5 text-gray-300 hover:text-cyan-400 transition-colors"
              >
                <Brain size={15} aria-hidden="true" /> AI Experience
              </a>
              <span className="inline-flex items-center gap-1.5 text-gray-500">
                <MapPin size={13} aria-hidden="true" />
                <span itemProp="address">San Diego, CA</span>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Stat counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {heroStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm p-4 text-center"
            >
              <div className={`absolute inset-0 bg-linear-to-br ${s.color} opacity-10`} />
              <div
                className={`mx-auto mb-2 w-9 h-9 rounded-full flex items-center justify-center bg-linear-to-br ${s.color} text-white`}
                aria-hidden="true"
              >
                {s.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white" aria-label={`${s.prefix ?? ''}${s.value}${s.suffix} ${s.label}`}>
                <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="text-xs text-gray-400 mt-1 leading-tight">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Credentials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8"
          itemProp="description"
        >
          <h2 className="text-lg font-semibold text-white mb-5">Professional Credentials &amp; Achievements</h2>
          <ul className="grid sm:grid-cols-2 gap-3" role="list">
            {credentials.map((c) => (
              <li key={c.text} className="flex items-start gap-3 text-sm text-gray-300">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" aria-hidden="true" />
                {c.text}
              </li>
            ))}
          </ul>

          {/* Trust signals */}
          <div className="mt-6 pt-5 border-t border-gray-800 flex flex-wrap gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true" />
              Currently employed at Truist Bank
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full" aria-hidden="true" />
              Based in San Diego, CA
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full" aria-hidden="true" />
              Professionally active in tech community since 2011
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
