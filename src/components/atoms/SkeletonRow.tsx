import React from 'react';

export const SkeletonRow: React.FC = () => {
  return (
    <div className="skeleton-row">
      <div className="skeleton-circle shimmer-effect"></div>
      
      <div className="skeleton-content">
        <div className="skeleton-line-long shimmer-effect"></div>
        <div className="skeleton-line-medium shimmer-effect"></div>
        <div className="skeleton-line-short shimmer-effect"></div>
      </div>
      
      <div className="skeleton-right">
        <div className="skeleton-line-date shimmer-effect"></div>
        <div className="skeleton-mini-circles">
          <div className="skeleton-mini-circle shimmer-effect"></div>
          <div className="skeleton-mini-circle shimmer-effect"></div>
        </div>
      </div>
    </div>
  );
};
