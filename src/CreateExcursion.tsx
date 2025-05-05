import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function CreateExcursion() {
  const [preview, setPreview] = useState<string | null>(null);
  const k = 1;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.gif', '.webp']
    },
    maxFiles: 1
  });

  return (
    <div {...getRootProps()} style={{
      border: '2px dashed #ccc',
      padding: 0,
      borderRadius: "1rem",
      cursor: 'pointer',
      backgroundColor: isDragActive ? '#f0f0f0' : 'white',
      width: `${9*k}rem`,
      height: `${13*k}rem`
    }}>
      <input {...getInputProps()} />
      {preview ? (
        <img src={preview} alt="Preview" style={{ width: `${9*k}rem`, height: `${13*k}rem`, aspectRatio: 9/13, borderRadius: "1rem"}} />
      ) : (
        <img src="src\assets\WhiteBackground.jpg" alt="Preview" style={{ width: `${9*k}rem`, height: `${13*k}rem`, aspectRatio: 9/13, borderRadius: "1rem"}} />
      )}
    </div>
  );
};

export default CreateExcursion;