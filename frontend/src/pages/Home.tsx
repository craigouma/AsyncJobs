import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Building, Star, ArrowRight, Users, TrendingUp } from 'lucide-react';
import SearchBar from '../components/Common/SearchBar';
import JobCard from '../components/Common/JobCard';
import { jobs, popularSkills } from '../data/mockData';

const Home: React.FC = () => {
  const featuredJobs = jobs.slice(0, 6);

  const handleSearch = (query: string, location: string) => {
    console.log('Search:', query, location);
    // In a real app, this would trigger a search and navigate to results
  };

  const stats = [
    { icon: Briefcase, label: 'Active Jobs', value: '100+', color: 'text-blue-600' },
    { icon: Building, label: 'Companies', value: '50+', color: 'text-green-600' },
    { icon: Star, label: 'Success Stories', value: '500+', color: 'text-yellow-600' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              Find Your Dream Job
              <span className="block text-primary-200">with AsyncJobs</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Discover amazing opportunities from top companies worldwide and take the next step in your career journey.
            </p>
            
            <div className="max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Search for your dream job..."
              />
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <Link to="/jobs" className="btn-secondary">
                Browse All Jobs
              </Link>
              <Link to="/register" className="text-primary-200 hover:text-white font-medium transition-colors duration-200 flex items-center">
                Join as Company <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center group">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Skills */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Skills</h2>
            <p className="text-xl text-gray-600">Explore opportunities in trending technologies and domains</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {popularSkills.map((skill) => (
              <button
                key={skill}
                className="skill-tag text-base px-4 py-2 hover:scale-105 transform transition-all duration-200"
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Jobs</h2>
            <p className="text-xl text-gray-600">Hand-picked opportunities from top companies</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/jobs" className="btn-primary inline-flex items-center">
              View All Jobs <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of professionals who have found their dream jobs through AsyncJobs. 
              Your next opportunity is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
                Sign Up Now
              </Link>
              <Link to="/jobs" className="border border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-all duration-200">
                Browse Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;