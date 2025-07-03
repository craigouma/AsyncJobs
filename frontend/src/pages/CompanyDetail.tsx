import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building2, MapPin, Globe, Mail, Calendar } from 'lucide-react';
import api from '../services/api';
import JobCard from '../components/Common/JobCard';

interface Company {
  id: number;
  company_name: string;
  description: string;
  website: string;
  location: string;
  email: string;
  jobs: any[];
  created_at: string;
}

const CompanyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await api.request<Company>(`/companies/${id}`);
        // Add company info to each job
        response.jobs = response.jobs.map(job => ({
          ...job,
          company: {
            id: response.id,
            company_name: response.company_name,
            website: response.website,
            location: response.location
          }
        }));
        setCompany(response);
      } catch (err) {
        setError('Failed to load company details');
        console.error('Error fetching company:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Company not found'}</p>
          <Link to="/companies" className="btn-primary">
            Back to Companies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Company Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-primary-100 rounded-lg p-4">
              <Building2 className="h-8 w-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{company.company_name}</h1>
              <div className="flex items-center space-x-4 mt-2">
                {company.location && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{company.location}</span>
                  </div>
                )}
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Joined {new Date(company.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-gray-600 whitespace-pre-line">{company.description}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary-600 hover:text-primary-700"
            >
              <Globe className="h-4 w-4 mr-2" />
              <span>{company.website.replace(/^https?:\/\//, '')}</span>
            </a>
          )}
          <a
            href={`mailto:${company.email}`}
            className="flex items-center text-primary-600 hover:text-primary-700"
          >
            <Mail className="h-4 w-4 mr-2" />
            <span>{company.email}</span>
          </a>
        </div>
      </div>

      {/* Company Jobs */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Open Positions</h2>
        {company.jobs && company.jobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {company.jobs.filter(job => job.is_active).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <Building2 className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No open positions</h3>
            <p className="mt-1 text-sm text-gray-500">
              This company doesn't have any open positions at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetail; 