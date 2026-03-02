/** Shared types for home contact form and service form fields. Kept in a separate file to avoid circular dependency between HomePage/data and ServicePageShared. */

export type HomeContactFieldName = 'name' | 'email' | 'company' | 'phone' | 'service' | 'message';
export type HomeContactFormData = Record<HomeContactFieldName, string>;

export type ServiceFormField<Name extends string> = {
  name: Name;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder: string;
  required?: boolean;
  rows?: number;
  options?: { value: string; label: string }[];
};
