import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildContactPayloadFromState, submitContact } from '../api/contact';

export const hireStatIconBoxClass = 'w-14 h-14 rounded flex items-center justify-center flex-shrink-0';
export const hireStatIconBg = { background: '#22D3EE' } as const;
export const hireDividerClass = 'hidden sm:block w-px h-16';
export const hireDividerStyle = { background: '#555555' } as const;
export const hireFormInputStyle = {
  background: '#1F2937',
  borderColor: 'rgba(34, 211, 238, 0.3)',
  color: '#FAFAFA',
} as const;
export const hireFeatureIconBoxStyle = { background: 'rgba(34, 211, 238, 0.1)' } as const;

const emptyHireForm = {
  fullName: '',
  email: '',
  company: '',
  phone: '',
  hiringModel: '',
  message: '',
};

export function useHireDeveloperForm(sourceLine: string) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(emptyHireForm);
  const [hireSubmitting, setHireSubmitting] = useState(false);
  const [hireSubmitError, setHireSubmitError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setHireSubmitError(null);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (hireSubmitting) return;
    setHireSubmitError(null);
    setHireSubmitting(true);
    try {
      await submitContact(buildContactPayloadFromState(formData, sourceLine));
      navigate('/thank-you/');
    } catch (err: unknown) {
      setHireSubmitError(err instanceof Error ? err.message : 'Failed to submit.');
    } finally {
      setHireSubmitting(false);
    }
  };

  return { formData, handleChange, handleSubmit, hireSubmitting, hireSubmitError };
}
