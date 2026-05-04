import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { buildContactPayloadFromForm, buildContactPayloadFromState, submitContact } from '../api/contact';
import type { HomeContactFormData, ServiceFormField } from './homeContactTypes';
import {
  ACCENT_COLOR,
  CHECK_PATH,
  SECTION_CONTAINER,
  OFFICE_ICON_SVG_CLASS,
  OFFICE_ICON_SVG_PROPS,
  formInputClass,
  formInputStyle,
} from '../constants/theme';

type FormFieldChangeTarget = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const INITIAL_SERVICE_FORM = { fullName: '', email: '', company: '', phone: '', message: '' };
const INITIAL_HOME_FORM: HomeContactFormData = { fullName: '', email: '', company: '', phone: '', service: '', message: '' };

/** Shared form state and handlers for CUDA/GPU service pages to avoid duplicated const/handlers. */
export function useServicePageForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(INITIAL_SERVICE_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<FormFieldChangeTarget>) => {
    setSubmitError(null);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      const payload = buildContactPayloadFromState(
        {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
        },
        `Service / inquiry form (${location.pathname})`
      );
      await submitContact(payload);
      navigate('/thank-you/');
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  return { formData, handleChange, handleSubmit, submitting, submitError };
}

/** Home contact form state and handlers to avoid duplicated const in HomePage. */
export function useHomeContactForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<HomeContactFormData>(INITIAL_HOME_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      const form = e.currentTarget;
      const payload = buildContactPayloadFromForm(form, 'Home page — Get in touch');
      await submitContact(payload);
      navigate('/thank-you/');
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  const handleFormChange = (e: React.ChangeEvent<FormFieldChangeTarget>) => {
    setSubmitError(null);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return { formData, handleFormSubmit, handleFormChange, submitting, submitError };
}

export function CheckIcon({ size = 'sm' }: Readonly<{ size?: 'sm' | 'lg' }>) {
  return (
    <svg className={size === 'lg' ? 'w-6 h-6 text-white' : 'w-5 h-5 text-white'} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={CHECK_PATH} />
    </svg>
  );
}

export function QuoteIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M10 18C10 15.7909 11.7909 14 14 14V10C9.58172 10 6 13.5817 6 18C6 20.2091 7.79086 22 10 22V18Z" fill={ACCENT_COLOR} opacity="0.3" />
      <path d="M22 18C22 15.7909 23.7909 14 26 14V10C21.5817 10 18 13.5817 18 18C18 20.2091 19.7909 22 22 22V18Z" fill={ACCENT_COLOR} opacity="0.3" />
    </svg>
  );
}

export function DividerLine() {
  return (
    <div className={`${SECTION_CONTAINER} px-4 sm:px-6 lg:px-8`}>
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

export function renderOfficeCardIcon(type: 'address' | 'email' | 'phone') {
  if (type === 'address') return <img src="/images/inidan.flag.jpg" alt="Flag" className="w-full h-full object-cover" />;
  if (type === 'email') {
    return (
      <svg className={OFFICE_ICON_SVG_CLASS} style={{ color: ACCENT_COLOR }} {...OFFICE_ICON_SVG_PROPS}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
  }
  return (
    <svg className={OFFICE_ICON_SVG_CLASS} style={{ color: ACCENT_COLOR }} {...OFFICE_ICON_SVG_PROPS}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

export type { ServiceFormField } from './homeContactTypes';

export function renderServiceFormField<Name extends string>(
  idPrefix: string,
  field: ServiceFormField<Name>,  
  formData: Record<Name, string>,
  handleChange: (e: React.ChangeEvent<FormFieldChangeTarget>) => void
) {
  const id = `${idPrefix}-${field.name}`;
  const base = {
    name: field.name,
    value: formData[field.name],
    onChange: handleChange,
    placeholder: field.placeholder,
    ...('required' in field && { required: field.required }),
  };
  if (field.type === 'select') {
    return (
      <select id={id} className={formInputClass} style={formInputStyle} {...base}>
        {field.options?.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#1A1A1A]">
            {opt.label}
          </option>
        ))}
      </select>
    );
  }
  if (field.type === 'textarea') {
    return <textarea id={id} rows={field.rows ?? 4} className={`${formInputClass} resize-none`} style={formInputStyle} {...base} />;
  }
  return <input type={field.type} id={id} className={formInputClass} style={formInputStyle} {...base} />;
}

