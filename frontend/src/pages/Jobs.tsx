import React, { useState, useEffect } from 'react';
import { Filter, SlidersHorizontal, Search } from 'lucide-react';
import JobCard from '../components/Common/JobCard';
import SearchBar from '../components/Common/SearchBar';
import { Job, Tag } from '../types';
import api from '../services/api';

interface FilterType {
  skills: string[];
  jobType: string;
  location: string;
  salaryRange: { min: number; max: number };
}

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterType>({
    skills: [],
    jobType: '',
    location: '',
    salaryRange: { min: 0, max: 200000 }
  });

  // Fetch jobs and tags on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [jobsData, tagsData] = await Promise.all([
          api.getJobs(),
          api.getTags()
        ]);
        setJobs(jobsData);
        setTags(tagsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch filtered jobs when filters change
  useEffect(() => {
    const fetchFilteredJobs = async () => {
      try {
        const params: any = {};
        
        if (searchQuery) params.search = searchQuery;
        if (filters.skills.length > 0) params.tags = filters.skills.join(',');
        if (filters.jobType) params.job_type = filters.jobType;
        if (filters.location) params.location = filters.location;
        if (filters.salaryRange.min > 0) params.salary_min = filters.salaryRange.min;
        
        const jobsData = await api.getJobs(params);
        setJobs(jobsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch filtered jobs');
      }
    };

    // Only fetch if we have filters applied
    if (searchQuery || filters.skills.length > 0 || filters.jobType || filters.location || filters.salaryRange.min > 0) {
      fetchFilteredJobs();
    }
  }, [searchQuery, filters]);

  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setFilters(prev => ({ ...prev, location }));
  };

  const handleSkillToggle = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const clearFilters = async () => {
    setFilters({
      skills: [],
      jobType: '',
      location: '',
      salaryRange: { min: 0, max: 200000 }
    });
    setSearchQuery('');
    
    // Fetch all jobs when filters are cleared
    try {
      const jobsData = await api.getJobs();
      setJobs(jobsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Job</h1>
            <p className="text-xl text-gray-600 mb-8">
              {loading ? 'Loading...' : `Browse through ${jobs.length} available positions`}
            </p>
            
            <SearchBar onSearch={handleSearch} className="max-w-4xl mx-auto" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 btn-outline"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
              </button>
              {(filters.skills.length > 0 || filters.jobType || filters.location) && (
                <button
                  onClick={clearFilters}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear All
                </button>
              )}
            </div>
            <p className="text-gray-600">
              {jobs.length} job{jobs.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="card p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Filter Jobs</h3>
              
              {/* Skills Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Skills</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {tags.map((tag: Tag) => (
                    <label key={tag.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.skills.includes(tag.name)}
                        onChange={() => handleSkillToggle(tag.name)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{tag.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Job Type Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Job Type</h4>
                <select
                  value={filters.jobType}
                  onChange={(e) => setFilters(prev => ({ ...prev, jobType: e.target.value }))}
                  className="input-field"
                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              {/* Salary Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Salary Range</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="10000"
                    value={filters.salaryRange.max}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      salaryRange: { ...prev.salaryRange, max: parseInt(e.target.value) }
                    }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>$0</span>
                    <span>${filters.salaryRange.max.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="flex-1">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}
            
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading jobs...</p>
              </div>
            ) : jobs.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {jobs.map((job: Job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                <button onClick={clearFilters} className="btn-primary">
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;