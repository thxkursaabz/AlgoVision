'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Simple bubble sort for demonstration
const bubbleSort = (arr: number[]) => {
  const animations: { array: number[], comparing: number[] }[] = [];
  const n = arr.length;
  const array = [...arr];
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push({ array: [...array], comparing: [j, j + 1] });
      
      if (array[j] > array[j + 1]) {
        // Swap
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        animations.push({ array: [...array], comparing: [j, j + 1] });
      }
    }
  }
  
  return animations;
};

export default function MiniVisualizer() {
  const [array, setArray] = useState<number[]>([]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const animationRef = useRef<number>(0);
  const animationsRef = useRef<{ array: number[], comparing: number[] }[]>([]);
  
  // Generate random array
  const generateArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 50) + 5);
    setArray(newArray);
    return newArray;
  };
  
  // Start sorting animation
  const startSorting = () => {
    if (isRunning) return;
    
    const newArray = generateArray();
    setIsRunning(true);
    animationsRef.current = bubbleSort(newArray);
    animationRef.current = 0;
    
    runAnimation();
  };
  
  // Run animation frame by frame
  const runAnimation = () => {
    if (animationRef.current >= animationsRef.current.length) {
      setIsRunning(false);
      setComparing([]);
      setTimeout(startSorting, 2000); // Restart after 2 seconds
      return;
    }
    
    const { array: newArray, comparing: newComparing } = animationsRef.current[animationRef.current];
    setArray(newArray);
    setComparing(newComparing);
    
    animationRef.current++;
    setTimeout(runAnimation, 150);
  };
  
  // Start animation on component mount
  useEffect(() => {
    generateArray();
    const timer = setTimeout(startSorting, 1000);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  // Calculate the maximum value for scaling
  const maxValue = Math.max(...array, 1);
  
  return (
    <div className="w-full h-64 flex flex-col">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Bubble Sort Visualization</h3>
      <div className="flex-1 flex items-end justify-around">
        {array.map((value, index) => (
          <motion.div
            key={index}
            className={`w-6 rounded-t-md ${
              comparing.includes(index) ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{
              height: `${(value / maxValue) * 100}%`,
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          />
        ))}
      </div>
    </div>
  );
}