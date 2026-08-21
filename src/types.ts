export interface ServiceItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  features: string[];
  iconName: string;
  badge?: string;
}

export interface ServicePillar {
  id: string;
  title: string;
  tagline: string;
  category: "design" | "business" | "digital" | "tax" | "scrutiny" | "audit";
  description: string;
  iconName: string;
  services: ServiceItem[];
}

export interface ComplianceEvent {
  id: string;
  day: number;
  month?: string;
  specificDateLabel?: string; // e.g. "July 31st"
  title: string;
  category: "Income Tax" | "GST" | "Payroll" | "Audit" | "MCA Compliance";
  description: string;
  statute: string;
  penaltyWarning?: string;
  isUrgent?: boolean;
}

export interface TurnaroundTime {
  section: string;
  serviceName: string;
  duration: string;
  details: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  category: string;
  date: string;
  summary: string;
  isHot: boolean;
  link?: string;
  fullContent?: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  readingTime: string;
  author: string;
  authorRole: string;
  date: string;
  tags: string[];
  summary: string;
  category: "Income Tax" | "GST" | "Corporate Law" | "Digital Tech";
  sectionReference?: string;
  content: string[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  whatsappLink?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}
