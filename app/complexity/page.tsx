'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { algorithms } from '../utils/sortingAlgorithms';

// Sample data for complexity visualization
const generateComplexityData = (maxSize: number) => {
  const sizes = Array.from({ length: 10 }, (_, i) => Math.round((i + 1) * maxSize / 10));
  
  return sizes.map(size => {
    const entry: any = { size };
    
    // Calculate theoretical time for each algorithm
    algorithms.forEach(algo => {
      let factor = 1;
      
      // Get complexity from algorithm metadata
      const complexity = algo.timeComplexity?.average || 'O(n²)';
      
      if (complexity.includes('n²') || complexity.includes('n^2')) {
        // O(n²)
        entry[algo.id] = size * size * factor;
      } else if (complexity.includes('n log n')) {
        // O(n log n)
        entry[algo.id] = size * Math.log2(size) * factor;
      } else if (complexity.includes('n')) {
        // O(n)
        entry[algo.id] = size * factor;
      } else if (complexity.includes('log n')) {
        // O(log n)
        entry[algo.id] = Math.log2(size) * factor;
      } else if (complexity.includes('n³') || complexity.includes('n^3')) {
        // O(n³)
        entry[algo.id] = size * size * size * factor;
      } else if (complexity.includes('2^n')) {
        // O(2^n) - limit to avoid overflow
        entry[algo.id] = Math.min(1000000, Math.pow(2, size) * factor);
      } else if (complexity.includes('n!')) {
        // O(n!) - limit to avoid overflow
        entry[algo.id] = size <= 10 ? factorial(size) * factor : 1000000;
      } else {
        // Default
        entry[algo.id] = size * factor;
      }
    });
    
    return entry;
  });
};

// Helper function for factorial calculation
const factorial = (n: number): number => {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
};

export default function ComplexityLabPage() {
  const [maxArraySize, setMaxArraySize] = useState(100);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState(
    algorithms.map(algo => algo.id)
  );
  const [scale, setScale] = useState<'linear' | 'logarithmic'>('linear');
  
  const complexityData = generateComplexityData(maxArraySize);
  
  const toggleAlgorithm = (algoId: string) => {
    if (selectedAlgorithms.includes(algoId)) {
      setSelectedAlgorithms(selectedAlgorithms.filter(id => id !== algoId));
    } else {
      setSelectedAlgorithms([...selectedAlgorithms, algoId]);
    }
  };
  
  // Colors for each algorithm
  const algoColors: Record<string, string> = {
    bubble: '#3B82F6',
    selection: '#8B5CF6',
    insertion: '#10B981',
    merge: '#F59E0B',
    quick: '#EF4444',
    heap: '#06B6D4',
    shell: '#EC4899',
    counting: '#8B5CF6',
    radix: '#F97316',
    bucket: '#14B8A6',
    cocktail: '#6366F1',
    comb: '#84CC16',
    cycle: '#7C3AED',
    gnome: '#F43F5E',
    tim: '#0EA5E9',
    bogo: '#D946EF'
  };
  
  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 font-poppins">Complexity Lab</h1>
          <p className="mt-2 text-xl text-gray-600">
            Visualize and understand algorithm time complexity
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Controls</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Array Size: {maxArraySize}
                </label>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  value={maxArraySize}
                  onChange={(e) => setMaxArraySize(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Scale</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setScale('linear')}
                    className={`px-3 py-1 rounded-lg ${
                      scale === 'linear' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Linear
                  </button>
                  <button
                    onClick={() => setScale('logarithmic')}
                    className={`px-3 py-1 rounded-lg ${
                      scale === 'logarithmic' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Log
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Algorithms</label>
                <div className="space-y-2">
                  {algorithms.map((algo) => (
                    <div key={algo.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`algo-${algo.id}`}
                        checked={selectedAlgorithms.includes(algo.id)}
                        onChange={() => toggleAlgorithm(algo.id)}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <label 
                        htmlFor={`algo-${algo.id}`} 
                        className="ml-2 text-sm text-gray-700"
                        style={{ color: algoColors[algo.id] }}
                      >
                        {algo.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Time Complexity Visualization</h2>
              
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={complexityData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="size" 
                      label={{ value: 'Array Size', position: 'insideBottomRight', offset: -10 }} 
                    />
                    <YAxis 
                      scale={scale === 'logarithmic' ? 'log' : 'linear'} 
                      domain={scale === 'logarithmic' ? [1, 'auto'] : ['auto', 'auto']}
                      label={{ value: 'Operations', angle: -90, position: 'insideLeft' }} 
                    />
                    <Tooltip formatter={(value) => Math.round(Number(value)).toLocaleString()} />
                    <Legend />
                    
                    {algorithms.map((algo) => (
                      selectedAlgorithms.includes(algo.id) && (
                        <Line
                          key={algo.id}
                          type="monotone"
                          dataKey={algo.id}
                          name={algo.name}
                          stroke={algoColors[algo.id]}
                          activeDot={{ r: 8 }}
                        />
                      )
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Big O Notation Explained</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">O(n²) - Quadratic Time</h4>
                    <p className="text-sm text-gray-700">
                      Algorithms with O(n²) time complexity (like Bubble Sort, Selection Sort, and Insertion Sort) 
                      have performance directly proportional to the square of the input size. 
                      They become significantly slower as the input grows.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">O(n log n) - Linearithmic Time</h4>
                    <p className="text-sm text-gray-700">
                      Algorithms with O(n log n) time complexity (like Merge Sort, Quick Sort, and Heap Sort) 
                      are much more efficient for large datasets compared to O(n²) algorithms. 
                      They're the fastest possible general-purpose comparison-based sorting algorithms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}