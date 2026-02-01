import React from 'react';
import { FaChevronLeft, FaDownload, FaEye } from 'react-icons/fa';

const CVApp = ({ onClose, appInfo }) => {
    const cvUrl = '/cv-yassine-dinar.pdf';

    return (
        <div className="h-full bg-gray-100 flex flex-col">
            {/* Navigation Bar */}
            <div className="bg-gray-100 px-4 py-3 flex items-center justify-between border-b border-gray-200">
                <button
                    onClick={onClose}
                    className="flex items-center text-blue-500 font-medium"
                >
                    <FaChevronLeft className="mr-1" />
                    Retour
                </button>
                <h1 className="font-semibold text-gray-900">
                    CV
                </h1>
                <a
                    href={cvUrl}
                    download="CV_Yassine_Dinar.pdf"
                    className="text-blue-500 font-medium"
                >
                    <FaDownload />
                </a>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
                {/* PDF Preview (iframe) */}
                <div className="flex-1 bg-gray-200">
                    <iframe
                        src={cvUrl}
                        className="w-full h-full"
                        title="CV Yassine Dinar"
                    />
                </div>

                {/* Action Buttons */}
                <div className="p-4 bg-white border-t border-gray-200">
                    <div className="flex space-x-3">
                        <a
                            href={cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white py-3 rounded-xl font-medium"
                        >
                            <FaEye />
                            <span>Ouvrir</span>
                        </a>
                        <a
                            href={cvUrl}
                            download="CV_Yassine_Dinar.pdf"
                            className="flex-1 flex items-center justify-center space-x-2 bg-gray-200 text-gray-700 py-3 rounded-xl font-medium"
                        >
                            <FaDownload />
                            <span>Télécharger</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CVApp;
