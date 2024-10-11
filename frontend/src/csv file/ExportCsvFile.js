// // ExportCsvFile.js
// import React from 'react';

// const ExportCsvFile = () => {
//   const handleExport = () => {
//     fetch('https://merncrudbackend-1zpv.onrender.com/exportCsv', {
//       method: 'GET',
//     })
//       .then(response => {
//         // Convert the response to a Blob and create a downloadable link
//         response.blob().then(blob => {
//           const url = window.URL.createObjectURL(blob);
//           const a = document.createElement('a');
//           a.href = url;
//           a.download = 'users.csv'; // File name for the download
//           document.body.appendChild(a);
//           a.click();
//           a.remove();
//         });
//       })
//       .catch(err => {
//         console.error('Error exporting CSV:', err);
//       });
//   };

//   return (
//     <div>
//       <button onClick={handleExport}>Export CSV</button>
//     </div>
//   );
// };

// export default ExportCsvFile;


const handleExport = () => {
  fetch('https://merncrudbackend-1zpv.onrender.com/exportUsers', {
      method: 'GET',
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.blob();
  })
  .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users.csv'; // File name for the download
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url); // Clean up the URL object
  })
  .catch(err => {
      console.error('Error exporting CSV:', err);
  });
};
