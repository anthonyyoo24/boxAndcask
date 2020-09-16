import React, { useState } from 'react';

const FileInput = ({ input, label }) => {
  const [file, setFile] = useState('');

  return (
    <div className="field">
      <label>{label}</label>
      <input
        onChange={(e) => setFile(e.target.files[0].name)}
        type="file"
        accept=".jpg, .png, .jpeg"
        value={file}
        required
      />
    </div>
  );
};

export default FileInput;
