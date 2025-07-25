'use client';
import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon, CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import Navbar from '@/components/Navbar/Navbar';

export default function DocsPage() {
  const [expandedSteps, setExpandedSteps] = useState([0]); // First step expanded by default
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const CodeBlock = ({ code, language }) => (
    <div className="relative">
      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre className="text-gray-100 text-sm">
          <code>{code}</code>
        </pre>
      </div>
      <button
        onClick={() => copyToClipboard(code)}
        className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-300"
      >
        <ClipboardIcon className="h-4 w-4" />
      </button>
      {copiedCode === code && (
        <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs">
          Copied!
        </div>
      )}
    </div>
  );

  const steps = [
    {
      id: 1,
      title: "Create an Account",
      description: "Start by creating your account to get access to the API",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 mt-4">
            To use our API, you'll need to create an account first. This will give you access to your unique API key.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Step 1: Visit the Sign Up Page</h4>
            <p className="text-gray-600 mb-3">Go to our sign up page and create your account with your email and password.</p>
            <div className="bg-white border rounded p-3">
              <code className="text-sm text-gray-800">{process.env.NEXT_PUBLIC_API_URL === 'http://localhost:3002' ? 'http://localhost:3002/account' : 'https://houseofevents.com/account'}</code>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Step 2: Save the API Key generated</h4>
            <p className="text-gray-600 mb-3">Check your api key and save it for later use.</p>
            <div className="bg-white border rounded p-3">
              <code className="text-sm text-gray-800">hoa_sk_1234567890abcdef1234567890abcdef</code>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckIcon className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800 font-medium">Account Created Successfully!</span>
            </div>
          </div>
        </div>
      )
    },
    
    {
      id: 2,
      title: "Subscribe to a Channel",
      description: "Use your API key to subscribe to event channels",
      content: (
        <TabbedSubscribe CodeBlock={CodeBlock} />
      )
    }
  ];

  const toggleStep = (stepId) => {
    setExpandedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Navbar />
      <div className="shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              API Documentation
            </h1>
            <p className="text-xl text-gray-600">
              Get started with House of Events API in just a few simple steps
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl">
          {/* Quick Start */}
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Start Guide</h2>
            <p className="text-gray-600 mb-6">
              Follow these three simple steps to start receiving event notifications:
            </p>
            
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4">
                        {step.id}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                    {expandedSteps.includes(step.id) ? (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  
                  {expandedSteps.includes(step.id) && (
                    <div className="px-6 pb-6">
                      {step.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
} 

function TabbedSubscribe({ CodeBlock }) {
  const [tab] = useState('dashboard'); // Only dashboard tab enabled for now
  return (
    <div className="space-y-4">
      {/* API tab button is hidden for now, but code is kept for future use */}
      {/*
      <div className="flex gap-2 mb-4 mt-4">
        <button
          className={`px-4 py-2 rounded-t font-medium border-b-2 transition-colors duration-150 ${tab === 'api' ? 'border-indigo-600 text-indigo-700 bg-indigo-50' : 'border-transparent text-gray-500 bg-gray-100 hover:text-indigo-600'}`}
          onClick={() => setTab('api')}
        >
          API
        </button>
        <button
          className={`px-4 py-2 font-medium border-b-2 transition-colors duration-150 ${tab === 'dashboard' ? 'border-indigo-600 text-indigo-700 bg-indigo-50' : 'border-transparent text-gray-500 bg-gray-100 hover:text-indigo-600'}`}
          onClick={() => setTab('dashboard')}
        >
          Dashboard
        </button>
      </div>
      */}
      {/* Only show dashboard instructions for now */}
      <>
        <p className="text-gray-600">
          You can subscribe to a channel directly from the dashboard UI:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">Step 1: Go to the Dashboard</h4>
          <p className="text-gray-600 mb-3">Visit the <a href="/" className="text-indigo-600 underline">Home page</a> and scroll to the "List of available Channels" section.</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">Step 2: Select a Channel</h4>
          <p className="text-gray-600 mb-3">Click on a channel row to auto-fill the Channel ID in the subscription form below the table.</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">Step 3: Enter Your API Key</h4>
          <p className="text-gray-600 mb-3">Paste your API key in the "API Key" field.</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">Step 4: Click Subscribe</h4>
          <p className="text-gray-600 mb-3">Click the <span className="font-semibold">"Subscribe to Channel"</span> button. You will see a success or error message based on the result.</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckIcon className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">You're now subscribed to receive event notifications!</span>
          </div>
        </div>
      </>
    </div>
  );
} 