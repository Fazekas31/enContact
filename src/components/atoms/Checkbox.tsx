import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  className = ''
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita acionar o clique da linha do e-mail
    onChange(!checked);
  };

  return (
    <div
      className={`fluent-checkbox ${checked ? 'checked' : ''} ${className}`}
      onClick={handleClick}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onChange(!checked);
        }
      }}
    >
      <Check size={12} strokeWidth={3} />
    </div>
  );
};
