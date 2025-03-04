import * as pdfjsLib from 'pdfjs-dist';

const PAGE_NUMBER = /- \d+ -/;
const CIRCLE_NUMBER = /^[\u2460-\u2473]/;
const NEW_ARTICLE = '<신 설>';
const ARTICLE = /^제\d+조/;

export const parsePDF = async (url) => {
  const pdf = await pdfjsLib.getDocument({ url }).promise;
  const texts = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const viewport = page.getViewport({ scale: 1 });

    const groupedText = await groupTextByEOL(content, viewport);
    texts.push(...groupedText);
  }

  const [left, right] = splitTextByCenterline(texts);
  return [concatenateRows(left), concatenateRows(right)];
};

const groupTextByEOL = async (content, viewport) => {
  const centerline = viewport.width / 2;
  const result = [];
  let textContent = '';
  let position = 0;
  let prevItemHasEOL = false;

  content.items.forEach((item) => {
    const [, , , , x] = item.transform;

    if (prevItemHasEOL) {
      position = x;
    }

    textContent += item.str;

    if (item.hasEOL) {
      result.push({
        textContent,
        columnPosition: position < centerline ? 'left' : 'right',
      });
      textContent = '';
    }

    prevItemHasEOL = item.hasEOL;
  });

  return result;
};

const splitTextByCenterline = (texts) => {
  const index = texts.findIndex(({ textContent }) =>
    textContent.includes('현 행 개 정 안')
  );

  const articles = texts.splice(index + 1);

  const left = articles
    .filter(({ columnPosition }) => columnPosition === 'left')
    .filter(({ textContent }) => !textContent.match(PAGE_NUMBER))
    .map(({ textContent }) => textContent);

  const right = articles
    .filter(({ columnPosition }) => columnPosition === 'right')
    .filter(({ textContent }) => !textContent.match(PAGE_NUMBER))
    .map(({ textContent }) => textContent);

  return [left, right];
};

const concatenateRows = (array) => {
  const result = [];
  let prevRow = array[0];

  for (let i = 1; i < array.length; i++) {
    const item = array[i];

    if (
      item.match(NEW_ARTICLE) ||
      item.match(ARTICLE) ||
      item.match(CIRCLE_NUMBER)
    ) {
      result.push(prevRow);
      prevRow = '';
    }

    prevRow += item;
  }

  result.push(prevRow);

  return result;
};
