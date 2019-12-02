import pdfjs from 'pdfjs-dist/webpack';

export const renderCanvas = async (pdfPage, scale) => {
  const retina = 2;
  const viewport = pdfPage.getViewport(scale * retina);
  const canvas = document.createElement('canvas');
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const canvasContext = canvas.getContext('2d');
  canvas.style.width = `${viewport.width / retina}px`;
  canvas.style.height = `${viewport.height / retina}px`;
  await pdfPage.render({ canvasContext, viewport }).promise;
  return canvas;
};

export const insertCanvasInto = (container) => canvas => {
  container.current.innerHTML = '';
  container.current.appendChild(canvas);
};

export const setFitWidthScale = (setScale, pdfPage) => {
  const { width } = pdfPage.getViewport(1);
  const { width: bodyWidth } = document.body.getBoundingClientRect();
  setScale(bodyWidth / width);
};

export const loadDocument = async () => await pdfjs.getDocument('/1.pdf');

export const loadPage = async (pdfDoc, pageId) => pdfDoc.getPage(pageId);

export const loadPages = async (pdfDoc) => {
  const promiseArray = [];
  for (let i = 1; i < pdfDoc.numPages + 1; i++) {
    promiseArray.push(loadPage(pdfDoc, i));
  }
  return Promise.all(promiseArray);
};

export const storeToRef = (ref) => (itemToStore) => ref.current = itemToStore;

export const nullScale = setScale => () => setScale(null);
