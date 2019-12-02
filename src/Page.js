import React, { useEffect, useRef } from 'react';
import { renderCanvas, insertCanvasInto, setFitWidthScale } from './utils';

function Page(props) {
  const { pdfPage, scale, setScale } = props;

  const container = useRef(null);

  // Set fitWidth scale by first page
  useEffect(() => {
    if (!scale && pdfPage.pageIndex === 1) {
      setFitWidthScale(setScale, pdfPage);
    }
  });

  // Render canvas after scale was changed
  useEffect(() => {
    if (scale) {
      renderCanvas(pdfPage, scale)
        .then(insertCanvasInto(container));
    }
  }, [scale]);

  return <div ref={container} />;
}

export default Page;
