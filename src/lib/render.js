import * as pdfjsLib from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export const renderPDF = async (canvasRef, url, pageNumber) => {
  const pdf = await pdfjsLib.getDocument({ url }).promise;

  const page = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale: 1 });

  const width = viewport.width;
  const height = viewport.height;

  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;

  await page.render({
    canvasContext: context,
    viewport: viewport,
  }).promise;
};
