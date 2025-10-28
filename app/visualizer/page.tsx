'use client';

import { motion } from 'framer-motion';
import Visualizer from '../components/Visualizer';

export default function VisualizerPage() {
  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 font-poppins">Algorithm Visualizer</h1>
          <p className="mt-2 text-xl text-gray-600">
            Watch sorting algorithms in action with step-by-step animations
          </p>
        </motion.div>

        <div className="flex justify-center">
          <Visualizer width={1000} height={500} />
        </div>
      </div>
    </main>
  );
}