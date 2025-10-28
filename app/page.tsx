'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import MiniVisualizer from './components/MiniVisualizer';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-poppins leading-tight">
                Master Sorting Algorithms <span className="text-blue-600">Visually</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-2xl">
                Understand sorting algorithms through animations, comparisons, and interactive learning
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/visualizer">
                  <button className="px-8 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200">
                    Open Visualizer
                  </button>
                </Link>
                <Link href="/algorithms">
                  <button className="px-8 py-3 rounded-xl bg-white text-blue-600 border border-blue-600 font-medium hover:bg-blue-50 transition-colors duration-200">
                    Explore Algorithms
                  </button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100"
            >
              <MiniVisualizer />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 font-poppins">
              Learn Sorting Algorithms Like Never Before
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              AlgoVision provides interactive tools to master algorithms through visualization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Visualize',
                description: 'Watch algorithms in action with step-by-step animations',
                icon: '🔍',
                color: 'bg-blue-100 text-blue-600',
              },
              {
                title: 'Compare',
                description: 'See how different algorithms perform side by side',
                icon: '⚖️',
                color: 'bg-purple-100 text-purple-600',
              },
              {
                title: 'Learn',
                description: 'Understand the theory with clear explanations',
                icon: '📚',
                color: 'bg-green-100 text-green-600',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center text-2xl mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
