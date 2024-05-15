import React from 'react';

export const Input = ({ value, onChange, placeholder, className }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={className}
  />
);
