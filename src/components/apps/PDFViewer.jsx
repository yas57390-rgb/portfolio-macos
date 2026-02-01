import React from 'react';

const PDFViewer = ({ file }) => {
    // Default dummy PDF if none provided
    let pdfUrl = file?.url;

    // FORCE local URL for the CV file, regardless of what's in the file object (e.g. from stale localStorage)
    if (file?.name?.toLowerCase().includes('cv_yassine_dinar') || file?.name?.toLowerCase().includes('cv-yassine-dinar')) {
        pdfUrl = '/cv-yassine-dinar.pdf';
    } else if (!pdfUrl) {
        // Default to local CV if nothing else is found, or maybe empty?
        // User said "remove reference", so let's default to the local CV or just empty.
        // Let's default to the local CV as a safe "demo" placeholder rather than w3.org.
        pdfUrl = '/cv-yassine-dinar.pdf';
    }

    return (
        <div className="w-full h-full bg-transparent flex flex-col">
            <div className="h-10 bg-slate-900/40 border-b border-white/5 flex items-center justify-between px-4 backdrop-blur-md">
                <span className="font-semibold text-sm text-slate-200">{file?.name || 'Document.pdf'}</span>
                <a
                    href={pdfUrl}
                    download
                    className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition-colors shadow-sm"
                >
                    Download
                </a>
            </div>
            <div className="flex-1 w-full bg-transparent">
                <iframe
                    src={pdfUrl}
                    className="w-full h-full border-0"
                    title="PDF Viewer"
                />
            </div>
        </div>
    );
};

export default PDFViewer;
