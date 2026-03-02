import type React from 'react';

/** Shared address used by CUDA and GPU service page contact sections. */
export const SERVICE_PAGE_ADDRESS =
  '414, Satyam-2, Amba Business Park,\nATPL, Adalaj, Gujarat,\nIndia - 380054';

type FormFieldBase = {
  name: 'name' | 'email' | 'company' | 'phone' | 'message';
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  placeholder: string;
  required?: boolean;
  rows?: number;
};

/** Builds form fields config so CUDA/GPU data files don't duplicate the same structure. */
export function createServiceFormFieldsConfig(messagePlaceholder: string) {
  const fields: FormFieldBase[] = [
    { name: 'name', label: 'Full Name *', type: 'text', placeholder: 'John Doe', required: true },
    { name: 'email', label: 'Email Address *', type: 'email', placeholder: 'john@company.com', required: true },
    { name: 'company', label: 'Company Name', type: 'text', placeholder: 'Your Company' },
    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 (555) 000-0000' },
    { name: 'message', label: 'Project Details *', type: 'textarea', placeholder: messagePlaceholder, required: true, rows: 4 },
  ];
  return fields as readonly (FormFieldBase & { name: 'name' } | (FormFieldBase & { name: 'email' }) | (FormFieldBase & { name: 'company' }) | (FormFieldBase & { name: 'phone' }) | (FormFieldBase & { name: 'message' }))[];
}

export type OfficeCardItem = {
  title: string;
  type: 'address' | 'email' | 'phone';
  content: React.ReactNode;
  href?: string;
  subtitle?: string;
};

/** Builds office cards so CUDA/GPU data files don't duplicate the same structure. */
export function createServiceOfficeCards(phoneSubtitle: string): OfficeCardItem[] {
  return [
    { title: 'Address', type: 'address', content: SERVICE_PAGE_ADDRESS },
    { title: 'Email', type: 'email', content: 'info@jashom.com', href: 'mailto:info@jashom.com', subtitle: 'We respond within 24 hours' },
    { title: 'Phone', type: 'phone', content: '+91 90239 06363', href: 'tel:+919023906363', subtitle: phoneSubtitle },
  ];
}
