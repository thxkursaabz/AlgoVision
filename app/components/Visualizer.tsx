'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { algorithms, ArrayElement, SortingAnimation, createArray, createNearlySortedArray, createReversedArray, createFewUniqueArray } from '../utils/sortingAlgorithms';

type VisualizerProps = {
  algorithmId?: string;
  showControls?: boolean;
  showMetrics?: boolean;
  height?: number;
  width?: number;
  className?: string;
};

export default function Visualizer({
  algorithmId = 'bubble',
  showControls = true,
  showMetrics = true,
  height = 400,
  width = 800,
  className = '',
}: VisualizerProps) {
  // State for array and visualization
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [animations, setAnimations] = useState<SortingAnimation[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [arraySize, setArraySize] = useState<number>(50);
  const [dataType, setDataType] = useState<string>('random');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithmId);
  const [customArray, setCustomArray] = useState<string>('');
  
  // Refs for animation
  const animationRef = useRef<number | null>(null);
  
  // Get current algorithm
  const currentAlgorithm = algorithms.find(algo => algo.id === selectedAlgorithm) || algorithms[0];
  
  // Generate array based on data type
  const generateArray = () => {
    let newArray: ArrayElement[];
    
    switch (dataType) {
      case 'nearly-sorted':
        newArray = createNearlySortedArray(arraySize);
        break;
      case 'reversed':
        newArray = createReversedArray(arraySize);
        break;
      case 'few-unique':
        newArray = createFewUniqueArray(arraySize);
        break;
      case 'custom':
        if (customArray.trim()) {
          const values = customArray.split(',').map(val => parseInt(val.trim())).filter(val => !isNaN(val));
          if (values.length > 0) {
            newArray = values.map(value => ({ value, state: 'default' }));
            break;
          }
        }
        // Fallback to random if custom is invalid
        newArray = createArray(arraySize);
        break;
      default:
        newArray = createArray(arraySize);
    }
    
    setArray(newArray);
    return newArray;
  };
  
  // Generate animations for the current algorithm
  const generateAnimations = (arr: ArrayElement[]) => {
    const sortFunction = currentAlgorithm.function;
    const newAnimations = sortFunction(arr);
    setAnimations(newAnimations);
    setCurrentStep(0);
    return newAnimations;
  };
  
  // Initialize array and animations
  useEffect(() => {
    const newArray = generateArray();
    generateAnimations(newArray);
  }, [selectedAlgorithm, arraySize, dataType]);
  
  // Handle custom array input
  useEffect(() => {
    if (dataType === 'custom' && customArray.trim()) {
      const newArray = generateArray();
      generateAnimations(newArray);
    }
  }, [customArray]);
  
  // Animation loop
  useEffect(() => {
    if (isPlaying && currentStep < animations.length - 1) {
      animationRef.current = window.setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000 / (speed * 2));
    } else if (currentStep >= animations.length - 1) {
      setIsPlaying(false);
    }
    
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isPlaying, currentStep, animations.length, speed]);
  
  // Play/pause animation
  const togglePlay = () => {
    if (currentStep >= animations.length - 1) {
      // Restart if at the end
      setCurrentStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };
  
  // Reset animation
  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };
  
  // Step forward
  const stepForward = () => {
    if (currentStep < animations.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  // Step backward
  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  // Get current animation frame
  const currentAnimation = animations[currentStep] || { array: array, comparisons: 0, swaps: 0, description: 'Initializing...' };
  
  // Calculate bar width based on array size
  const barWidth = Math.max(2, Math.min(30, Math.floor((width - 40) / arraySize)));
  
  // Find maximum value for scaling
  const maxValue = Math.max(...currentAnimation.array.map(item => item.value), 1);
  
  // Get color for bar based on state
  const getBarColor = (state: string) => {
    switch (state) {
      case 'comparing': return 'bg-red-500';
      case 'sorted': return 'bg-green-500';
      case 'pivot': return 'bg-yellow-500';
      case 'active': return 'bg-blue-500';
      default: return 'bg-blue-400';
    }
  };
  
  return (
    <div className={`flex flex-col ${className}`} style={{ width }}>
      {/* Visualization Area */}
      <div 
        className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-4"
        style={{ height, width }}
      >
        <div className="h-full flex items-end justify-center">
          {currentAnimation.array.map((item, index) => (
            <motion.div
              key={index}
              className={`mx-[1px] rounded-t-sm ${getBarColor(item.state)}`}
              style={{
                height: `${(item.value / maxValue) * (height - 80)}px`,
                width: barWidth,
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
      </div>
      
      {showControls && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-4">
          {/* Algorithm Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Algorithm</label>
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isPlaying}
            >
              {algorithms.map(algo => (
                <option key={algo.id} value={algo.id}>{algo.name}</option>
              ))}
            </select>
          </div>
          
          {/* Controls Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Speed Control */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Speed: {speed.toFixed(1)}x</label>
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            
            {/* Array Size Control */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Array Size: {arraySize}</label>
              <input
                type="range"
                min="5"
                max="200"
                step="5"
                value={arraySize}
                onChange={(e) => setArraySize(parseInt(e.target.value))}
                className="w-full"
                disabled={isPlaying}
              />
            </div>
            
            {/* Data Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data Type</label>
              <select
                value={dataType}
                onChange={(e) => setDataType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isPlaying}
              >
                <option value="random">Random</option>
                <option value="nearly-sorted">Nearly Sorted</option>
                <option value="reversed">Reversed</option>
                <option value="few-unique">Few Unique Values</option>
                <option value="custom">Custom Input</option>
              </select>
            </div>
          </div>
          
          {/* Custom Array Input */}
          {dataType === 'custom' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Custom Array (comma-separated)</label>
              <input
                type="text"
                value={customArray}
                onChange={(e) => setCustomArray(e.target.value)}
                placeholder="e.g., 5, 3, 8, 1, 2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isPlaying}
              />
            </div>
          )}
          
          {/* Playback Controls */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={resetAnimation}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              disabled={isPlaying || currentStep === 0}
            >
              Reset
            </button>
            <button
              onClick={stepBackward}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              disabled={isPlaying || currentStep === 0}
            >
              Step Back
            </button>
            <button
              onClick={togglePlay}
              className={`px-6 py-2 ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg transition-colors`}
            >
              {isPlaying ? 'Pause' : currentStep >= animations.length - 1 ? 'Restart' : 'Play'}
            </button>
            <button
              onClick={stepForward}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              disabled={isPlaying || currentStep >= animations.length - 1}
            >
              Step Forward
            </button>
            <button
              onClick={() => {
                const newArray = generateArray();
                generateAnimations(newArray);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              disabled={isPlaying}
            >
              New Array
            </button>
          </div>
        </div>
      )}
      
      {showMetrics && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Current Operation */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-sm font-medium text-gray-700 mb-1">Current Operation</h3>
              <p className="text-gray-900">{currentAnimation.description}</p>
            </div>
            
            {/* Metrics */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Comparisons</h3>
              <p className="text-2xl font-semibold text-blue-600">{currentAnimation.comparisons}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Swaps</h3>
              <p className="text-2xl font-semibold text-green-600">{currentAnimation.swaps}</p>
            </div>
          </div>
          
          {/* Algorithm Info */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Algorithm: {currentAlgorithm.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{currentAlgorithm.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium">Best Case:</span> {currentAlgorithm.timeComplexity.best}
              </div>
              <div>
                <span className="font-medium">Average Case:</span> {currentAlgorithm.timeComplexity.average}
              </div>
              <div>
                <span className="font-medium">Worst Case:</span> {currentAlgorithm.timeComplexity.worst}
              </div>
              <div>
                <span className="font-medium">Space:</span> {currentAlgorithm.spaceComplexity}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}