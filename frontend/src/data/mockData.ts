import { Job, Company } from '../types';

export const popularSkills = [
  'Python', 'React', 'JavaScript', 'TypeScript', 'Node.js', 'AWS', 
  'Docker', 'Figma', 'Product Management', 'Marketing', 'Design', 
  'Data Science', 'DevOps', 'Machine Learning'
];

export const companies: Company[] = [
  {
    id: '1',
    name: 'Google',
    description: 'A multinational technology company that specializes in Internet-related services and products.',
    website: 'https://google.com',
    employees: '100,000+',
    industry: 'Technology'
  },
  {
    id: '2',
    name: 'Microsoft',
    description: 'An American multinational technology corporation producing computer software, consumer electronics, personal computers, and related services.',
    website: 'https://microsoft.com',
    employees: '200,000+',
    industry: 'Technology'
  },
  {
    id: '3',
    name: 'Apple',
    description: 'A multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services.',
    website: 'https://apple.com',
    employees: '150,000+',
    industry: 'Technology'
  },
  {
    id: '4',
    name: 'Netflix',
    description: 'An American subscription video on-demand streaming service.',
    website: 'https://netflix.com',
    employees: '12,000+',
    industry: 'Entertainment'
  }
];

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Python Developer',
    company: 'Google',
    location: 'Remote',
    type: 'Full-time',
    salary: { min: 120000, max: 150000, currency: 'USD' },
    skills: ['Python', 'Django', 'AWS', 'Docker'],
    description: 'We are looking for a Senior Python Developer to join our dynamic team. You will be responsible for developing scalable web applications and working with cross-functional teams to deliver high-quality software solutions.',
    requirements: [
      '5+ years of experience with Python',
      'Experience with Django or Flask',
      'Knowledge of cloud platforms (AWS, GCP)',
      'Strong problem-solving skills',
      'Experience with microservices architecture'
    ],
    postedDate: '2024-01-15'
  },
  {
    id: '2',
    title: 'Frontend React Developer',
    company: 'Microsoft',
    location: 'New York, NY',
    type: 'Full-time',
    salary: { min: 100000, max: 130000, currency: 'USD' },
    skills: ['React', 'TypeScript', 'JavaScript', 'Node.js'],
    description: 'Join our frontend team to build amazing user experiences with React. You will work on cutting-edge products used by millions of users worldwide.',
    requirements: [
      '3+ years of React experience',
      'Strong TypeScript skills',
      'Experience with modern frontend tooling',
      'Knowledge of state management (Redux, Zustand)',
      'Understanding of responsive design'
    ],
    postedDate: '2024-01-14'
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'Apple',
    location: 'California, CA',
    type: 'Full-time',
    salary: { min: 90000, max: 120000, currency: 'USD' },
    skills: ['Figma', 'Design', 'Prototyping', 'User Research'],
    description: 'We are seeking a talented UX/UI Designer to create intuitive and beautiful user interfaces for our products. You will collaborate with product managers and engineers to bring designs to life.',
    requirements: [
      '4+ years of UX/UI design experience',
      'Proficiency in Figma and design tools',
      'Strong portfolio demonstrating design process',
      'Experience with user research and testing',
      'Understanding of design systems'
    ],
    postedDate: '2024-01-13'
  },
  {
    id: '4',
    title: 'Product Manager',
    company: 'Netflix',
    location: 'Remote',
    type: 'Full-time',
    salary: { min: 130000, max: 160000, currency: 'USD' },
    skills: ['Product Management', 'Analytics', 'Strategy', 'Leadership'],
    description: 'Lead product development initiatives and drive strategic decisions for our streaming platform. You will work with engineering, design, and data teams to deliver exceptional user experiences.',
    requirements: [
      '5+ years of product management experience',
      'Strong analytical and strategic thinking',
      'Experience with data-driven decision making',
      'Excellent communication and leadership skills',
      'Technical background preferred'
    ],
    postedDate: '2024-01-12'
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'Google',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: { min: 110000, max: 140000, currency: 'USD' },
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    description: 'Join our infrastructure team to build and maintain scalable cloud systems. You will work on automating deployments and ensuring high availability of our services.',
    requirements: [
      '4+ years of DevOps experience',
      'Experience with cloud platforms (AWS, GCP)',
      'Knowledge of containerization and orchestration',
      'Experience with CI/CD pipelines',
      'Strong scripting skills (Python, Bash)'
    ],
    postedDate: '2024-01-11'
  },
  {
    id: '6',
    title: 'Data Scientist',
    company: 'Microsoft',
    location: 'Remote',
    type: 'Full-time',
    salary: { min: 115000, max: 145000, currency: 'USD' },
    skills: ['Python', 'Machine Learning', 'Data Science', 'SQL'],
    description: 'Apply machine learning and statistical analysis to solve complex business problems. You will work with large datasets to derive insights and build predictive models.',
    requirements: [
      '3+ years of data science experience',
      'Strong Python and SQL skills',
      'Experience with ML frameworks (scikit-learn, TensorFlow)',
      'Statistical analysis and modeling expertise',
      'Experience with data visualization tools'
    ],
    postedDate: '2024-01-10'
  }
];