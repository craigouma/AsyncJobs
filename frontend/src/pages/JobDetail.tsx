import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, DollarSign, Clock, Building, Users, Globe, Bookmark, Share2 } from 'lucide-react';
import { jobs, companies } from '../data/mockData';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const job = jobs.find(j => j.id === id);
  const company = companies.find(c => c.name === job?.company);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
          <Link to="/jobs" className="btn-primary">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const formatSalary = (salary: typeof job.salary) => {
    return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/jobs"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Job Header */}
            <div className="card p-8 mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                  <p className="text-xl text-primary-600 font-medium mb-4">{job.company}</p>
                  
                  <div className="flex flex-wrap gap-4 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span>{formatSalary(job.salary)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Posted on {formatDate(job.postedDate)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200">
                    <Bookmark className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {job.type}
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Open to applications
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {job.skills.map(skill => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Job Description */}
            <div className="card p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">{job.description}</p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
                <ul className="space-y-2">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Jobs</h2>
              <div className="space-y-4">
                {jobs.filter(j => j.id !== job.id && j.company === job.company).slice(0, 3).map(similarJob => (
                  <Link
                    key={similarJob.id}
                    to={`/jobs/${similarJob.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-primary-200 hover:bg-primary-50 transition-all duration-200"
                  >
                    <h3 className="font-semibold text-gray-900 mb-1">{similarJob.title}</h3>
                    <p className="text-primary-600 text-sm mb-2">{similarJob.company}</p>
                    <p className="text-gray-600 text-sm">{similarJob.location} • {formatSalary(similarJob.salary)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Apply Section */}
            <div className="card p-6 mb-6">
              <button className="btn-primary w-full mb-4">
                Apply for this Job
              </button>
              <button className="btn-secondary w-full">
                Save for Later
              </button>
              <p className="text-sm text-gray-600 mt-4 text-center">
                By applying, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>

            {/* Company Info */}
            {company && (
              <div className="card p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About {company.name}</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600">{company.industry}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600">{company.employees} employees</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 text-gray-400 mr-3" />
                    <a 
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">{company.description}</p>
                <button className="btn-outline w-full mt-4">
                  View All Jobs at {company.name}
                </button>
              </div>
            )}

            {/* Job Insights */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Insights</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Applications</span>
                  <span className="text-sm font-medium text-gray-900">45 candidates</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Posted</span>
                  <span className="text-sm font-medium text-gray-900">{formatDate(job.postedDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Job Type</span>
                  <span className="text-sm font-medium text-gray-900">{job.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Experience Level</span>
                  <span className="text-sm font-medium text-gray-900">Senior</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;