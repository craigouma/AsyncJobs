export interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  job_type: string;
  job_level: string;
  salary_min: number | null;
  salary_max: number | null;
  is_active: boolean;
  company_id: number;
  created_at: string;
  updated_at: string;
  company: Company;
  tags: Tag[];
}

export interface Company {
  id: number;
  email: string;
  company_name: string;
  description: string | null;
  website: string | null;
  location: string | null;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  role: 'user' | 'company';
}

export interface Tag {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Filter {
  skills: string[];
  jobType: string;
  location: string;
  salaryRange: {
    min: number;
    max: number;
  };
}