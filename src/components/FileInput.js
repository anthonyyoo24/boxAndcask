import React from 'react';

const FileInput = ({ input, label }) => {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        onChange={(e) => input.onChange(e.target.files[0].name)}
        type="file"
        accept=".jpg, .png, .jpeg"
        required
      />
    </div>
  );
};

export default FileInput;
