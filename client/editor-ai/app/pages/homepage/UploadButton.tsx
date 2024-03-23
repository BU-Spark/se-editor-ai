import React, { useState, ChangeEvent } from 'react';

function UploadButton() {
    const [selectedFile, setSelectedFile] = useState<File | undefined>();

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(event.target.files?.[0]);
        console.log(event.target.files?.[0]);
        // Here you can add the code to upload the file to a server, 
        // for example using the fetch API or axios
    };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
            {selectedFile && <p>Selected file: {selectedFile.name}</p>}
        </div>
    );
}

export default UploadButton;