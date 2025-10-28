'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Visualizer from '../components/Visualizer';
import { algorithms } from '../utils/sortingAlgorithms';

export default function ComparePage() {
  const [leftAlgorithm, setLeftAlgorithm] = useState(algorithms[0].id);
  const [rightAlgorithm, setRightAlgorithm] = useState(algorithms[1].id);
  
  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 font-poppins">Compare Algorithms</h1>
          <p className="mt-2 text-xl text-gray-600">
            Compare different sorting algorithms side by side
          </p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Left Algorithm</label>
            <select
              value={leftAlgorithm}
              onChange={(e) => setLeftAlgorithm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {algorithms.map((algo) => (
                <option key={algo.id} value={algo.id}>
                  {algo.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Right Algorithm</label>
            <select
              value={rightAlgorithm}
              onChange={(e) => setRightAlgorithm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {algorithms.map((algo) => (
                <option key={algo.id} value={algo.id}>
                  {algo.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Visualizer width={500} height={400} initialAlgorithm={leftAlgorithm} />
          </div>
          <div>
            <Visualizer width={500} height={400} initialAlgorithm={rightAlgorithm} />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Performance Comparison</h2>
          <p className="text-gray-600 mb-4">
            Compare the performance of different sorting algorithms side by side. Use the same input data for both visualizers to see how they perform relative to each other.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium mb-2">When to use {algorithms.find(a => a.id === leftAlgorithm)?.name}</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {leftAlgorithm === 'bubble' && (
                  <>
                    <li>When simplicity is more important than efficiency</li>
                    <li>For educational purposes</li>
                    <li>For very small datasets</li>
                  </>
                )}
                {leftAlgorithm === 'selection' && (
                  <>
                    <li>When memory usage is a concern</li>
                    <li>When the number of writes needs to be minimized</li>
                    <li>For small datasets</li>
                  </>
                )}
                {leftAlgorithm === 'insertion' && (
                  <>
                    <li>When data is already partially sorted</li>
                    <li>When dealing with small datasets</li>
                    <li>When new elements are continuously being added</li>
                  </>
                )}
                {leftAlgorithm === 'merge' && (
                  <>
                    <li>When stable sorting is required</li>
                    <li>When worst-case performance is a concern</li>
                    <li>When sorting linked lists</li>
                  </>
                )}
                {leftAlgorithm === 'quick' && (
                  <>
                    <li>For general-purpose sorting with good average performance</li>
                    <li>When in-place sorting is preferred</li>
                    <li>When memory usage is a concern</li>
                  </>
                )}
                {leftAlgorithm === 'heap' && (
                  <>
                    <li>When guaranteed O(n log n) performance is needed</li>
                    <li>When memory usage is a concern</li>
                    <li>When worst-case performance is important</li>
                  </>
                )}
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">When to use {algorithms.find(a => a.id === rightAlgorithm)?.name}</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {rightAlgorithm === 'bubble' && (
                  <>
                    <li>When simplicity is more important than efficiency</li>
                    <li>For educational purposes</li>
                    <li>For very small datasets</li>
                  </>
                )}
                {rightAlgorithm === 'selection' && (
                  <>
                    <li>When memory usage is a concern</li>
                    <li>When the number of writes needs to be minimized</li>
                    <li>For small datasets</li>
                  </>
                )}
                {rightAlgorithm === 'insertion' && (
                  <>
                    <li>When data is already partially sorted</li>
                    <li>When dealing with small datasets</li>
                    <li>When new elements are continuously being added</li>
                  </>
                )}
                {rightAlgorithm === 'merge' && (
                  <>
                    <li>When stable sorting is required</li>
                    <li>When worst-case performance is a concern</li>
                    <li>When sorting linked lists</li>
                  </>
                )}
                {rightAlgorithm === 'quick' && (
                  <>
                    <li>For general-purpose sorting with good average performance</li>
                    <li>When in-place sorting is preferred</li>
                    <li>When memory usage is a concern</li>
                  </>
                )}
                {rightAlgorithm === 'heap' && (
                  <>
                    <li>When guaranteed O(n log n) performance is needed</li>
                    <li>When memory usage is a concern</li>
                    <li>When worst-case performance is important</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}