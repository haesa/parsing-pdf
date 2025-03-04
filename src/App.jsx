import { useRef, useState } from 'react';

import PDFViewer from './PDFViewer';

function App() {
  const canvasRef = useRef();
  const [pdfUrl, setPdfUrl] = useState('');

  const handleChange = (event) => {
    URL.revokeObjectURL(pdfUrl);

    const file = event.target.files?.[0];
    const url = URL.createObjectURL(file);
    setPdfUrl(url);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <label
        style={{
          width: '80px',
          margin: '0 auto',
          padding: '8px 12px',
          border: '2px solid #8ba1ff',
          borderRadius: '12px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        파일 선택
        <input
          style={{
            display: 'none',
          }}
          type='file'
          accept='.pdf'
          onChange={handleChange}
        />
      </label>
      <PDFViewer canvasRef={canvasRef} pdfUrl={pdfUrl} />
    </div>
  );
}

export default App;
