## 주요 기능

✅ PDF 뷰어: 로컬에서 업로드한 PDF 파일을 웹 페이지에서 확인 가능 <br />
✅ 신구조문 분석: PDF에서 텍스트를 추출하고, 신구조문을 배열 형태로 변환

<br />

## 기술 스택

Frontend: `React`, `PDF.js`

<br />

## 설치 및 실행 방법

1️⃣ 프로젝트 클론

```bash
git clone https://github.com/haesa/parsing-pdf.git
cd <프로젝트 폴더>
```

2️⃣ 패키지 설치

```bash
npm install
```

3️⃣ 프로젝트 실행

```bash
npm run dev
```

<br />

## 사용 방법

1️⃣ PDF 업로드 버튼을 클릭하여 파일을 선택 <br />
2️⃣ 선택한 PDF가 웹 페이지에 표시됨 <br />
3️⃣ 신구조문이 배열 형태로 추출됨 <br />
4️⃣ 콘솔창에서 파싱 결과 확인 가능

<br />

## 폴더 구조

```
📂 parsing-pdf
├─ README.md
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ 📂 public
│  └─ vite.svg
├─ 📂 src
│  ├─ App.jsx
│  ├─ PDFViewer.jsx
│  ├─ 📂 lib
│  │  ├─ parse.js
│  │  └─ render.js
│  └─ main.jsx
└─ vite.config.js
```
