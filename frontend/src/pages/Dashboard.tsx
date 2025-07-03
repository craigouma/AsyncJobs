import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Briefcase, 
  Bookmark, 
  Building, 
  TrendingUp, 
  Users, 
  Eye,
  MapPin,
  DollarSign,
  Calendar
} from 'lucide-react';
import { jobs } from '../data/mockData';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) return null;

  const isJobSeeker = user.role === 'jobseeker';

  const jobSeekerStats = [
    { icon: Eye, label: 'Profile Views', value: '24', color: 'text-blue-600' },
    { icon: Bookmark, label: 'Saved Jobs', value: '12', color: 'text-green-600' },
    { icon: Briefcase, label: 'Applications', value: '8', color: 'text-purple-600' },
    { icon: TrendingUp, label: 'Response Rate', value: '65%', color: 'text-orange-600' },
  ];

  const companyStats = [
    { icon: Briefcase, label: 'Active Jobs', value: '5', color: 'text-blue-600' },
    { icon: Users, label: 'Applications', value: '127', color: 'text-green-600' },
    { icon: Eye, label: 'Profile Views', value: '1.2k', color: 'text-purple-600' },
    { icon: TrendingUp, label: 'Hire Rate', value: '12%', color: 'text-orange-600' },
  ];

  const stats = isJobSeeker ? jobSeekerStats : companyStats;

  const tabs = isJobSeeker 
    ? [
        { id: 'overview', label: 'Overview' },
        { id: 'applications', label: 'Applications' },
        { id: 'saved', label: 'Saved Jobs' },
        { id: 'profile', label: 'Profile' },
      ]
    : [
        { id: 'overview', label: 'Overview' },
        { id: 'jobs', label: 'Job Postings' },
        { id: 'candidates', label: 'Candidates' },
        { id: 'company', label: 'Company Profile' },
      ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-6">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {isJobSeeker ? 'Recent Applications' : 'Recent Activity'}
        </h3>
        <div className="space-y-4">
          {jobs.slice(0, 3).map((job, index) => (
            <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{job.title}</h4>
                  <p className="text-sm text-gray-600">{job.company}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {isJobSeeker ? 'Applied' : 'Posted'}
                </p>
                <p className="text-sm text-gray-600">2 days ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isJobSeeker ? (
            <>
              <button className="btn-primary">
                Browse Jobs
              </button>
              <button className="btn-secondary">
                Update Profile
              </button>
              <button className="btn-outline">
                View Applications
              </button>
            </>
          ) : (
            <>
              <button className="btn-primary">
                Post New Job
              </button>
              <button className="btn-secondary">
                View Candidates
              </button>
              <button className="btn-outline">
                Update Company Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'applications':
      case 'jobs':
        return (
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {isJobSeeker ? 'Your Applications' : 'Your Job Postings'}
            </h3>
            <div className="space-y-4">
              {jobs.slice(0, 5).map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-200 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{job.title}</h4>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {isJobSeeker ? 'Applied' : 'Active'}
                    </span>
                  </div>
                  <p className="text-primary-600 text-sm mb-2">{job.company}</p>
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {job.postedDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'saved':
      case 'candidates':
        return (
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {isJobSeeker ? 'Saved Jobs' : 'Recent Candidates'}
            </h3>
            <p className="text-gray-600">
              {isJobSeeker 
                ? 'Jobs you have saved will appear here.' 
                : 'Candidates who applied to your jobs will appear here.'
              }
            </p>
          </div>
        );
      case 'profile':
      case 'company':
        return (
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {isJobSeeker ? 'Profile Settings' : 'Company Profile'}
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isJobSeeker ? 'Full Name' : 'Company Name'}
                </label>
                <input
                  type="text"
                  value={user.name}
                  className="input-field"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  className="input-field"
                  readOnly
                />
              </div>
              <button className="btn-primary">
                Update Profile
              </button>
            </div>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            {isJobSeeker 
              ? 'Track your job search progress and discover new opportunities.'
              : 'Manage your job postings and connect with talented candidates.'
            }
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;