import React, { useEffect, useState, useRef } from 'react';
import Page from './Page';
import {
  loadDocument,
  loadPages,
  storeToRef,
  nullScale,
} from './utils.js';
import './App.css'

function App() {
  const pdfPages = useRef(null);
  const [scale, setScale] = useState(undefined);

  useEffect(() => {
    loadDocument()
      .then(loadPages)
      .then(storeToRef(pdfPages))
      .then(nullScale(setScale))
  }, []);

  if (pdfPages.current) {
    return (
      <>
        {pdfPages.current.map(pdfPage =>
          <Page
            key={pdfPage.pageIndex}
            pdfPage={pdfPage}
            scale={scale}
            setScale={setScale}
          />
        )}
      </>
    );
  }

  return <></>;
}

export default App;
