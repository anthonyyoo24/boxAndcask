import React from 'react';

const FileInput = ({ input, label }) => {
  //   const onChange = (e) => {
  //     input.onChange(e.target.files[0]);
  //   };

  return (
    <div className="field">
      <label>{label}</label>
      <input
        onChange={(e) => input.onChange(e.target.files[0].name)}
        type="file"
        accept=".jpg, .png, .jpeg"
      />
    </div>
  );
};

export default FileInput;
