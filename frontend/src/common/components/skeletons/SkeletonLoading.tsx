import React from 'react';
import { Skeleton } from 'antd';

interface SkeletonLoadingProps {
  type?: 'default' | 'building';
  count?: number;
}

const SkeletonLoading: React.FC<SkeletonLoadingProps> = ({ 
  type = 'default', 
  count = 3 
}) => {
  if (type === 'building') {
    return (
      <div className="space-y-6">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="border rounded-lg p-4">
            <Skeleton.Image 
              active 
              style={{ width: 256, height: 192 }} 
            />
            <Skeleton active paragraph={{ rows: 4 }} />
          </div>
        ))}
      </div>
    );
  }
  
  return <Skeleton active />;
};

export default SkeletonLoading;