import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const testCases = [
  {
    id: 'basic',
    title: 'Basic Navigation',
    description: 'Fundamental linear wizard flow with standard next/prev actions.',
    path: '/test/basic-navigation',
    icon: '🚀',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'middleware',
    title: 'Middleware & Performance',
    description: 'Selector stability, shallow comparison, and Redux-style middleware.',
    path: '/test/middleware-demo',
    icon: '⚡',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'validation',
    title: 'Advanced Validation',
    description: 'Zod/Yup adapters, async validation, and nested error handling.',
    path: '/test/advanced-validation-demo',
    icon: '🛡️',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'persistence',
    title: 'Persistence Engine',
    description: 'LocalStorage/SessionStorage sync with auto-save and hydration.',
    path: '/test/persistence-demo',
    icon: '💾',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'conditional',
    title: 'Conditional Branching',
    description: 'Dynamic step visibility based on wizard data and async conditions.',
    path: '/test/conditional-demo',
    icon: '🌿',
    color: 'from-rose-500 to-pink-500',
  },
  {
    id: 'guards',
    title: 'Navigation Guards',
    description: 'Interrupt transitions with beforeLeave hooks and confirmation modals.',
    path: '/test/guards-demo',
    icon: '🛑',
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 'array',
    title: 'Array Data Management',
    description: 'Handling complex nested arrays and dynamic lists within steps.',
    path: '/test/array-data-demo',
    icon: '🔢',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    id: 'dependencies',
    title: 'Step Dependencies',
    description: 'Cross-step dependencies and state synchronization patterns.',
    path: '/test/dependency-demo',
    icon: '🔗',
    color: 'from-cyan-500 to-teal-500',
  },
  {
    id: 'nav-control',
    title: 'Navigation Modes',
    description: 'Strict, sequential, and free navigation modes exploration.',
    path: '/test/navigation-control',
    icon: '🧭',
    color: 'from-violet-500 to-purple-500',
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 p-8 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-6xl mx-auto py-12">
        {/* Header */}
        <header className="mb-16 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 bg-clip-text text-transparent">
              Wizzard Stepper React
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
              Experience the power of a strictly typed, headless wizard engine. Explore the E2E test
              suite through these interactive demonstrations.
            </p>
          </motion.div>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testCases.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Link to={test.path} className="block h-full group">
                <div className="relative h-full bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-300 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] group-hover:border-indigo-100 p-8 overflow-hidden">
                  {/* Background Accent */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${test.color} opacity-[0.03] rounded-bl-full transition-opacity group-hover:opacity-[0.08]`}
                  />

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      {test.icon}
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors">
                      {test.title}
                    </h3>

                    <p className="text-slate-500 leading-relaxed text-sm">{test.description}</p>

                    <div className="mt-8 flex items-center text-sm font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                      Explore demo
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-sm">
            Built for modern React development. 🪄 Managed by Antigravity AI.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
