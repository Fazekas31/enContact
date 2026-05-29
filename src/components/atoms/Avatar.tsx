import React from 'react';

interface AvatarProps {
  initials: string;
  size?: 'large' | 'medium' | 'small' | 'mini';
  index?: number;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  initials,
  size = 'medium',
  index = 0,
  className = ''
}) => {
  // Gera um índice de cor consistente com base nas iniciais para dar variedade visual
  const getColorIndex = (text: string) => {
    if (index !== undefined && index !== 0) return index % 8;
    let sum = 0;
    for (let i = 0; i < text.length; i++) {
      sum += text.charCodeAt(i);
    }
    return sum % 8;
  };

  const colorIndex = getColorIndex(initials);
  const sizeClass = `size-${size}`;
  const colorClass = `color-${colorIndex}`;

  return (
    <div className={`avatar-circle ${sizeClass} ${colorClass} ${className}`}>
      {initials.substring(0, 2)}
    </div>
  );
};
