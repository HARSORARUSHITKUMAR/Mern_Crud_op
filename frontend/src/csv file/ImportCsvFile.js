// ImportCsvFile.js
import React, { useState } from 'react';

const ImportCsvFile = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleImport = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file); // Append the file

        fetch('http://localhost:3001/api/importCsv', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.text())
            .then(data => {
                alert('CSV Imported Successfully!');
                console.log('Success:', data);
            })
            .catch(err => {
                console.error('Error importing CSV:', err);
            });
    };

    return (
        <div>
            <form onSubmit={handleImport}>
                <input type="file" accept=".csv" onChange={handleFileChange} />
                <button type="submit">Import CSV</button>
            </form>
        </div>
    );
};

export default ImportCsvFile;
