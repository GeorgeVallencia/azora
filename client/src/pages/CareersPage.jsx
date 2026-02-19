import { useState } from 'react';

function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'engineering',
      location: 'San Francisco, CA / Remote',
      type: 'full-time',
      experience: '5+ years',
      description: 'We are looking for an experienced frontend developer to help build our next-generation productivity platform.',
      requirements: [
        'Expert knowledge of React, TypeScript, and modern JavaScript',
        'Experience with responsive design and cross-browser compatibility',
        'Strong understanding of UX/UI principles',
        'Experience with state management and performance optimization'
      ],
      benefits: [
        'Competitive salary and equity',
        'Comprehensive health, dental, and vision insurance',
        'Flexible work arrangements',
        'Professional development budget',
        'Latest equipment and tools'
      ]
    },
    {
      id: 2,
      title: 'Product Designer',
      department: 'design',
      location: 'San Francisco, CA / Remote',
      type: 'full-time',
      experience: '3+ years',
      description: 'Join our design team to create beautiful and intuitive user experiences for our productivity platform.',
      requirements: [
        'Strong portfolio demonstrating design excellence',
        'Proficiency in Figma, Sketch, or similar tools',
        'Understanding of user-centered design principles',
        'Experience with design systems and component libraries'
      ],
      benefits: [
        'Competitive salary and equity',
        'Comprehensive health, dental, and vision insurance',
        'Flexible work arrangements',
        'Professional development budget',
        'Latest equipment and tools'
      ]
    },
    {
      id: 3,
      title: 'Backend Engineer',
      department: 'engineering',
      location: 'San Francisco, CA / Remote',
      type: 'full-time',
      experience: '4+ years',
      description: 'Help us build scalable backend systems that power millions of productivity goals and habits.',
      requirements: [
        'Strong experience with Node.js, Express, and MongoDB',
        'Understanding of database design and optimization',
        'Experience with RESTful APIs and microservices',
        'Knowledge of security best practices'
      ],
      benefits: [
        'Competitive salary and equity',
        'Comprehensive health, dental, and vision insurance',
        'Flexible work arrangements',
        'Professional development budget',
        'Latest equipment and tools'
      ]
    },
    {
      id: 4,
      title: 'Product Marketing Manager',
      department: 'marketing',
      location: 'San Francisco, CA / Remote',
      type: 'full-time',
      experience: '4+ years',
      description: 'Lead our marketing efforts to help millions of users discover and benefit from Azora.',
      requirements: [
        'Experience in B2B SaaS marketing',
        'Strong analytical and communication skills',
        'Experience with content marketing and SEO',
        'Understanding of product-led growth strategies'
      ],
      benefits: [
        'Competitive salary and equity',
        'Comprehensive health, dental, and vision insurance',
        'Flexible work arrangements',
        'Professional development budget',
        'Latest equipment and tools'
      ]
    }
  ];

  const departments = [
    { id: 'all', name: 'All Positions' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'design', name: 'Design' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'sales', name: 'Sales' },
    { id: 'operations', name: 'Operations' }
  ];

  const filteredJobs = jobs.filter(job => 
    selectedDepartment === 'all' || job.department === selectedDepartment
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Careers at Azora</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join us in our mission to help millions achieve their goals and build better habits
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold mb-2">Impact-Driven</h3>
            <p className="text-gray-600">Work on products that genuinely help people improve their lives</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🤝</div>
            <h3 className="text-lg font-semibold mb-2">Collaborative</h3>
            <p className="text-gray-600">Work with talented people who support and challenge each other</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="text-lg font-semibold mb-2">Growth-Oriented</h3>
            <p className="text-gray-600">Continuous learning and development opportunities</p>
          </div>
        </div>

        {/* Department Filter */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
            {departments.map(department => (
              <button
                key={department.id}
                onClick={() => setSelectedDepartment(department.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedDepartment === department.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {department.name}
              </button>
            ))}
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>📍 {job.location}</span>
                    <span>💼 {job.type}</span>
                    <span>📊 {job.experience}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">{job.description}</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Requirements:</h4>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Benefits:</h4>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">
                Apply Now
              </button>
            </div>
          ))}
        </div>

        {/* No Positions Message */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Open Positions</h3>
            <p className="text-gray-600">
              We don't have any openings in this department right now, but we're always looking for talented people.
            </p>
          </div>
        )}

        {/* General Application */}
        <div className="bg-blue-600 text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Don't See What You're Looking For?</h2>
          <p className="text-lg mb-6">
            We're always interested in connecting with talented individuals who share our mission
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50">
              Send General Application
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600">
              Join Talent Network
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareersPage;
