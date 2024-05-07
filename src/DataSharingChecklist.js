import React, { useEffect } from 'react';

const DataSharingChecklist = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (window.Tally) {
      window.Tally.loadEmbeds();
    }
  }, []);

  return (
    <div>
      <iframe
        data-tally-src="https://tally.so/embed/3jyMr9?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="600"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Data sharing checklist prototype v1 "
      ></iframe>
    </div>
  );
};

export default DataSharingChecklist;