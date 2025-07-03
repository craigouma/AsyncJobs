import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Bookmark } from 'lucide-react';
import { Job } from '../../types';

interface JobCardProps {
  job: Job;
  onSave?: (jobId: number) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onSave }) => {
  const formatSalary = (salaryMin: number | null, salaryMax: number | null) => {
    if (!salaryMin && !salaryMax) return 'Salary not specified';
    if (!salaryMin) return `Up to $${salaryMax?.toLocaleString()}`;
    if (!salaryMax) return `From $${salaryMin.toLocaleString()}`;
    return `$${salaryMin.toLocaleString()} - $${salaryMax.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <div className="card p-6 group hover:shadow-lg hover:border-primary-200 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Link to={`/jobs/${job.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 mb-1">
              {job.title}
            </h3>
          </Link>
          <p className="text-primary-600 font-medium mb-2">{job.company.company_name}</p>
        </div>
        <button
          onClick={() => onSave?.(job.id)}
          className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
          title="Save job"
        >
          <Bookmark className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{job.location}</span>
          <span className="mx-2">•</span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            {job.job_type}
          </span>
        </div>

        <div className="flex items-center text-gray-600 text-sm">
          <DollarSign className="h-4 w-4 mr-2" />
          <span>{formatSalary(job.salary_min, job.salary_max)}</span>
        </div>

        <div className="flex items-center text-gray-600 text-sm">
          <Clock className="h-4 w-4 mr-2" />
          <span>Posted {formatDate(job.created_at)}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {(job.tags ?? []).slice(0, 3).map((tag) => (
          <span key={tag.id} className="skill-tag">
            {tag.name}
          </span>
        ))}
        {job.tags && job.tags.length > 3 && (
          <span className="text-gray-500 text-sm">
            +{job.tags.length - 3} more
          </span>
        )}
      </div>

      <div className="flex justify-between items-center">
        <Link
          to={`/jobs/${job.id}`}
          className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
        >
          View Details →
        </Link>
        <button className="btn-primary text-sm py-2 px-4">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;