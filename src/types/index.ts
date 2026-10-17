export interface CaseStudyData {
  clientContext: string;
  problem: string;
  researchUx: string;
  visualDesign: string;
  development: string;
  outcomes: string[];
}

export interface Project {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  role: string;
  summary: string;
  image: string;
  capabilities: string[];
  liveUrl?: string;
  isClientWork?: boolean;
  caseStudy: CaseStudyData;
}

export interface ServicePillar {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

export interface MetricItem {
  value: string;
  label: string;
  subtext: string;
}
