import './product/ProductForm.scss';
import React from 'react';

const FileInput = ({ input, label }) => {
  const onChange = (e) => {
    input.onChange(e.target.files[0].name);
  };

  return (
    <div className="field" style={{ overflow: 'hidden' }}>
      <label className="form__label">{label}</label>
      <input
        className="form__input"
        onChange={onChange}
        type="file"
        accept=".jpg, .png, .jpeg"
        required
      />
    </div>
  );
};

export default FileInput;
