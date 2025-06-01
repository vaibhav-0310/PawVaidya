import React, { useRef } from 'react';
import './HorizontalScrollCategories.css'; 

const HorizontalScrollCategories = () => {
  const scrollRef = useRef(null);

  const categories = [
    { name: 'Wellness care', color: 'bg-secondary', active: true },
    { name: 'Dental care', color: 'bg-danger' },
    { name: 'In house laboratory', color: 'bg-danger' },
    { name: 'Wellness care', color: 'bg-success' },
    { name: 'Parasite prevention', color: 'bg-primary' },
    { name: 'Pet grooming', color: 'bg-warning' },
    { name: 'Vaccination', color: 'bg-danger' },
    { name: 'Emergency care', color: 'bg-purple' }, 
    { name: 'Surgery', color: 'bg-indigo' }, 
    { name: 'Boarding', color: 'bg-info' }
  ];

  return (
    <div className="container py-4">
      <div className="mt-4">
        <div className="overflow-hidden">
          <div className="d-flex gap-3 animate-scroll">
            {[...categories, ...categories].map((category, index) => (
              <div
                key={index}
                className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-white shadow-sm border"
              >
                <div className={`rounded-circle me-2 ${category.color}`} style={{ width: '15px', height: '15px' }}></div>
                <span className="small text-muted">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCategories;
