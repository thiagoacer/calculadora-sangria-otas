import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  prefix?: string;
  suffix?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  prefix,
  suffix,
  name,
  ...props
}) => {
  return (
    <div className="mb-6">
      {label && (
        <label className="block text-sm font-semibold mb-2 text-text" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-text-light">
            {prefix}
          </span>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full p-3.5 border border-slate-300 rounded-lg text-base bg-white transition-all 
            focus:outline-none focus:border-primary focus:ring-4 focus:ring-secondary
            ${prefix ? 'pl-8' : 'pl-3.5'}
            ${suffix ? 'pr-8' : 'pr-3.5'}`}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3 text-text-light">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
