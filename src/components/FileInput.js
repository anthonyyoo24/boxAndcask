import React from 'react';

const FileInput = ({ input, label }) => {
  const onChange = (e) => {
    input.onChange(e.target.files[0].name);
  };

  return (
    <div className="field">
      <label>{label}</label>
      <input onChange={onChange} type="file" accept=".jpg, .png, .jpeg" required />
    </div>
  );
};

export default FileInput;
