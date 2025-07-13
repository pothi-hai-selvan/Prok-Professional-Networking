export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  maxItems?: number;
  custom?: (value: any) => string | null;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export const validateField = (
  field: string,
  value: any,
  rules: ValidationRule
): string | null => {
  if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
  }

  if (typeof value === 'string' && value.trim() !== '') {
    if (rules.minLength && value.length < rules.minLength) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${rules.minLength} characters`;
    }
    if (rules.maxLength && value.length > rules.maxLength) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} must be no more than ${rules.maxLength} characters`;
    }
    if (rules.pattern && !rules.pattern.test(value)) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} format is invalid`;
    }
  }

  if (Array.isArray(value) && rules.maxItems && value.length > rules.maxItems) {
    return `You can only add up to ${rules.maxItems} ${field}`;
  }

  if (rules.custom) {
    return rules.custom(value);
  }

  return null;
};

export const validateForm = (
  data: Record<string, any>,
  rules: ValidationRules
): Record<string, string> => {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach(field => {
    const value = data[field];
    const fieldRules = rules[field];
    const error = validateField(field, value, fieldRules);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};

export const validateNestedField = (
  field: string,
  value: any,
  rules: ValidationRule
): string | null => {
  const error = validateField(field, value, rules);
  return error;
};

// Common validation patterns
export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^https?:\/\/.+/,
  phone: /^\+?[\d\s\-\(\)]+$/,
  date: /^\d{4}-\d{2}-\d{2}$/,
};

// Common validation rules
export const commonRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    required: true,
    pattern: patterns.email,
  },
  bio: {
    maxLength: 500,
  },
  title: {
    maxLength: 100,
  },
  location: {
    maxLength: 100,
  },
  skills: {
    maxItems: 10,
  },
  url: {
    pattern: patterns.url,
  },
  phone: {
    pattern: patterns.phone,
  },
}; 