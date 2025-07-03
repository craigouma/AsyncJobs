import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Globe, Mail } from 'lucide-react';
import api from '../services/api';

interface Job {
  id: number;
  title: string;
  location: string;
  job_type: string;
  job_level: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Company {
  id: number;
  company_name: string;
  description: string;
  website: string;
  location: string;
  email: string;
  jobs: Job[];
}

const Companies: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.getCompanies();
        setCompanies(response);
      } catch (err) {
        setError('Failed to load companies');
        console.error('Error fetching companies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const getActiveJobsCount = (jobs: Job[]) => {
    return jobs ? jobs.filter(job => job.is_active).length : 0;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Companies</h1>
        <p className="mt-2 text-gray-600">Discover great companies hiring in Kenya</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div
            key={company.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-100 rounded-lg p-3">
                  <Building2 className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {company.company_name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {getActiveJobsCount(company.jobs)} open positions
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-2">
              {company.description || 'No description available'}
            </p>

            <div className="space-y-2">
              {company.location && (
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{company.location}</span>
                </div>
              )}
              {company.website && (
                <div className="flex items-center text-gray-600">
                  <Globe className="h-4 w-4 mr-2" />
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:underline"
                  >
                    {company.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <a
                  href={`mailto:${company.email}`}
                  className="text-sm text-primary-600 hover:underline"
                >
                  {company.email}
                </a>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to={`/companies/${company.id}`}
                className="btn-outline w-full text-center"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>

      {companies.length === 0 && !loading && !error && (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No companies</h3>
          <p className="mt-1 text-sm text-gray-500">
            No companies have been added yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Companies; 