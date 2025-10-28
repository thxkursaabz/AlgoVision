'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold text-blue-600 font-poppins">
              Algo<span className="text-cyan-500">Vision</span>
            </span>
            <p className="mt-2 text-sm text-gray-600">
              Master sorting algorithms through interactive visualizations
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Pages</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-sm text-gray-600 hover:text-blue-600">Home</Link></li>
                <li><Link href="/algorithms" className="text-sm text-gray-600 hover:text-blue-600">Algorithms</Link></li>
                <li><Link href="/visualizer" className="text-sm text-gray-600 hover:text-blue-600">Visualizer</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/compare" className="text-sm text-gray-600 hover:text-blue-600">Compare</Link></li>
                <li><Link href="/complexity" className="text-sm text-gray-600 hover:text-blue-600">Complexity Lab</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            Built with ❤️ by Akshit Thakur
          </p>
          <div className="mt-4 md:mt-0">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-blue-600">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}