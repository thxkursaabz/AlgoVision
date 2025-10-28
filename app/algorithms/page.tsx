'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { algorithms } from '../utils/sortingAlgorithms';

export default function AlgorithmsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter algorithms based on search query only
  const filteredAlgorithms = algorithms.filter(algo => {
    return algo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           algo.description.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 font-poppins">Sorting Algorithms</h1>
          <p className="mt-2 text-xl text-gray-600">
            Explore different sorting algorithms and their characteristics
          </p>
        </motion.div>
        
        {/* Filters and Search */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search algorithms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          

        </div>
        
        {/* Algorithm Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlgorithms.map((algo, index) => (
            <motion.div
              key={algo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{algo.name}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{algo.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    Best: {algo.timeComplexity.best}
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                    Avg: {algo.timeComplexity.average}
                  </span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                    Worst: {algo.timeComplexity.worst}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Space: {algo.spaceComplexity}
                  </span>
                </div>
                
                <Link href={`/visualizer?algorithm=${algo.id}`}>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Visualize
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredAlgorithms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No algorithms match your search criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
}