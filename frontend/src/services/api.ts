const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000';

// Create a simple fetch wrapper with authentication
class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        if (response.status === 401) {
          // Clear token and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('userType');
          window.location.href = '/login';
        }
        
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw error instanceof Error ? error : new Error('Network error');
    }
  }

  // Authentication endpoints
  async loginUser(email: string, password: string) {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    return this.request<{ access_token: string; token_type: string }>('/auth/user/login', {
      method: 'POST',
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: formData,
    });
  }

  async loginCompany(email: string, password: string) {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    return this.request<{ access_token: string; token_type: string }>('/auth/company/login', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    });
  }

  async registerUser(userData: {
    email: string;
    password: string;
    full_name: string;
  }) {
    return this.request('/auth/user/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async registerCompany(companyData: {
    email: string;
    password: string;
    company_name: string;
    description?: string;
    website?: string;
    location?: string;
  }) {
    return this.request('/auth/company/register', {
      method: 'POST',
      body: JSON.stringify(companyData),
    });
  }

  // Jobs endpoints
  async getJobs(params: {
    search?: string;
    tags?: string;
    job_type?: string;
    location?: string;
    salary_min?: number;
    limit?: number;
    offset?: number;
  } = {}) {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/jobs/${queryString ? `?${queryString}` : ''}`;
    
    return this.request<any[]>(endpoint);
  }

  async getJob(id: string) {
    return this.request<any>(`/jobs/${id}`);
  }

  async createJob(jobData: any) {
    return this.request('/jobs/', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  }

  // Tags endpoints
  async getTags() {
    return this.request<{ id: number; name: string; created_at: string; updated_at: string }[]>('/tags/');
  }

  // Health check
  async healthCheck() {
    return this.request<{ status: string }>('/health');
  }

  // Companies endpoints
  async getCompanies() {
    return this.request<any[]>('/companies/');
  }

  async getCompany(id: string) {
    return this.request<any>(`/companies/${id}`);
  }
}

// Create and export API instance
export const api = new ApiService(API_BASE_URL);
export default api; 