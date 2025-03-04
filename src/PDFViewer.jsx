import { useState, useEffect } from 'react';

import * as pdfjsLib from 'pdfjs-dist';

import { renderPDF } from './lib/render';

export default function PDFViewer({ canvasRef, pdfUrl }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (canvasRef.current && pdfUrl) {
      renderPDF(canvasRef, pdfUrl, currentPage);
    }
  }, [pdfUrl, currentPage]);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const pdf = await pdfjsLib.getDocument({ url: pdfUrl }).promise;
        setMaxPage(pdf.numPages);
      } catch (error) {
        console.error('PDF 로드 중 오류 발생:', error);
      }
    };

    if (pdfUrl) {
      loadPdf();
    }
  }, [pdfUrl]);

  return (
    <div
      style={{
        maxWidth: '720px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <button
          onClick={prevPage}
          style={{ flex: '1' }}
          disabled={currentPage === 1}
        >
          이전
        </button>
        <button
          onClick={nextPage}
          style={{ flex: '1' }}
          disabled={currentPage === maxPage}
        >
          다음
        </button>
      </div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
