export interface Career {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  openings: number;
  postedDate: string;
  description: string;
  image: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

const LOCATION = { REMOTE: 'Remote', REMOTE_HYBRID: 'Remote / Hybrid' } as const;
const TYPE = { FULL_TIME: 'Full-time' } as const;
const DEPARTMENT = {
  ENGINEERING: 'Engineering',
  AI: 'AI',
  INFRASTRUCTURE: 'Infrastructure',
  DOCUMENTATION: 'Documentation',
  PRODUCT: 'Product',
} as const;

function career(c: Omit<Career, 'type' | 'location'> & { type?: string; location?: string }): Career {
  return { type: TYPE.FULL_TIME, location: LOCATION.REMOTE, ...c };
}

export const careers: Career[] = [
  career({
    id: '1',
    slug: 'senior-cuda-developer',
    title: 'Senior CUDA Developer',
    department: DEPARTMENT.ENGINEERING,
    experience: '5+ years',
    openings: 2,
    postedDate: '11 February 2G',
    description: 'We are seeking an experienced CUDA developer to join our GPU optimization team. You will work on cutting-edge parallel computing projects.',
    image: '/images/careers/cuda-developer.jpg',
    responsibilities: [
      'Design and implement high-performance CUDA kernels for AI workloads',
      'Optimize GPU memory usage and computational efficiency',
      'Collaborate with ML engineers to accelerate model training',
      'Profile and debug GPU applications using NVIDIA tools'
    ],
    requirements: [
      '5+ years of experience with CUDA programming',
      'Strong understanding of GPU architecture and parallel computing',
      'Proficiency in C++ and Python',
      'Experience with deep learning frameworks (PyTorch, TensorFlow)'
    ],
    benefits: [
      'Competitive salary with equity options',
      'Flexible remote work environment',
      'Professional development budget',
      'Health insurance and wellness programs'
    ],
  }),
  career({
    id: '2',
    slug: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    department: DEPARTMENT.AI,
    location: LOCATION.REMOTE_HYBRID,
    experience: '3-5 years',
    openings: 3,
    postedDate: '09 February 2G',
    description: 'Join our AI team to build and deploy state-of-the-art machine learning models. Work on real-world problems in computer vision and NLP.',
    image: '/images/careers/ai-engineer.jpg',
    responsibilities: [
      'Develop and train machine learning models for production',
      'Implement computer vision and NLP solutions',
      'Optimize model performance and inference speed',
      'Deploy models to cloud infrastructure at scale'
    ],
    requirements: [
      '3-5 years of ML engineering experience',
      'Strong Python skills and ML framework expertise',
      'Experience with model deployment and MLOps',
      'Knowledge of computer vision or NLP techniques'
    ],
    benefits: [
      'Work on cutting-edge AI projects',
      'Remote-first culture with flexible hours',
      'Annual learning and conference budget',
      'Comprehensive health benefits'
    ],
  }),
  career({
    id: '3',
    slug: 'devops-engineer',
    title: 'DevOps Engineer',
    department: DEPARTMENT.INFRASTRUCTURE,
    experience: '4-6 years',
    openings: 1,
    postedDate: '05 February 2G',
    description: 'We need a skilled DevOps engineer to manage our cloud infrastructure and CI/CD pipelines. Help us scale our AI platforms efficiently.',
    image: '/images/careers/devops-engineer.jpg',
    responsibilities: [
      'Manage and scale cloud infrastructure (AWS, GCP, Azure)',
      'Build and maintain CI/CD pipelines',
      'Implement monitoring and alerting systems',
      'Automate deployment processes and infrastructure provisioning'
    ],
    requirements: [
      '4-6 years of DevOps experience',
      'Expertise in Kubernetes and Docker',
      'Strong scripting skills (Python, Bash)',
      'Experience with infrastructure as code (Terraform, CloudFormation)'
    ],
    benefits: [
      'Competitive compensation package',
      'Fully remote position',
      'Latest tools and technologies',
      'Generous PTO and flexible schedule'
    ],
  }),
  career({
    id: '4',
    slug: 'frontend-developer-react',
    title: 'Frontend Developer (React)',
    department: DEPARTMENT.ENGINEERING,
    experience: '3-5 years',
    openings: 2,
    postedDate: '30 January 2G',
    description: 'Build beautiful and performant user interfaces for our AI platforms. Work with modern React, TypeScript, and cutting-edge frontend technologies.',
    image: '/images/careers/frontend-developer.jpg',
    responsibilities: [
      'Build responsive and accessible web applications',
      'Implement complex UI components with React and TypeScript',
      'Optimize frontend performance and user experience',
      'Collaborate with designers and backend engineers'
    ],
    requirements: [
      '3-5 years of React development experience',
      'Strong TypeScript and modern JavaScript skills',
      'Experience with state management (Redux, Zustand)',
      'Understanding of web performance optimization'
    ],
    benefits: [
      'Work with modern tech stack',
      'Remote work with flexible hours',
      'Professional growth opportunities',
      'Health and wellness benefits'
    ],
  }),
  career({
    id: '5',
    slug: 'technical-writer',
    title: 'Technical Writer',
    department: DEPARTMENT.DOCUMENTATION,
    experience: '2-4 years',
    openings: 1,
    postedDate: '20 January 2G',
    description: 'Create comprehensive technical documentation for our AI and GPU optimization products. Help developers understand complex technical concepts.',
    image: '/images/careers/technical-writer.jpg',
    responsibilities: [
      'Write clear and comprehensive technical documentation',
      'Create tutorials, guides, and API documentation',
      'Collaborate with engineers to understand features',
      'Maintain and update existing documentation'
    ],
    requirements: [
      '2-4 years of technical writing experience',
      'Strong understanding of software development',
      'Excellent written communication skills',
      'Experience with documentation tools (Markdown, Git)'
    ],
    benefits: [
      'Flexible remote work',
      'Collaborative team environment',
      'Learning and development budget',
      'Comprehensive benefits package'
    ],
  }),
  career({
    id: '6',
    slug: 'product-manager',
    title: 'Product Manager',
    department: DEPARTMENT.PRODUCT,
    experience: '5+ years',
    openings: 1,
    postedDate: '15 January 2G',
    description: 'Lead product strategy and development for our AI solutions. Work closely with engineering and design teams to deliver exceptional products.',
    image: '/images/careers/product-manager.jpg',
    responsibilities: [
      'Define product vision and roadmap',
      'Gather and prioritize product requirements',
      'Work with cross-functional teams to deliver features',
      'Analyze metrics and user feedback for improvements'
    ],
    requirements: [
      '5+ years of product management experience',
      'Strong technical background in AI/ML',
      'Excellent communication and leadership skills',
      'Data-driven decision making approach'
    ],
    benefits: [
      'Lead innovative AI products',
      'Remote-first with flexible schedule',
      'Competitive salary and equity',
      'Comprehensive health benefits'
    ],
  }),
];

export function getCareerBySlug(slug: string): Career | undefined {
  return careers.find((c) => c.slug === slug);
}

export function getAllDepartments(): string[] {
  return ['All', ...Object.values(DEPARTMENT)];
}
