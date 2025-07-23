import React, { useState } from "react";
import { FaDownload, FaSpinner } from "react-icons/fa";

const DownloadButton = ({ onDownload, disabled }) => {
  const [quality, setQuality] = useState("high");
  const [format, setFormat] = useState("mp4");
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      await onDownload(quality, format);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="download-section">
      <div className="download-options">
        <div className="option-group">
          <label>Quality:</label>
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            disabled={loading || disabled}
          >
            <option value="high">360p</option>
            <option value="medium">1080p</option>
            {/* <option value="low">Low Quality</option> */}
          </select>
        </div>

        <div className="option-group">
          <label>Format:</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            disabled={loading || disabled}
          >
            <option value="mp4">MP4 (Video)</option>
            <option value="mp3">MP3 (Audio Only)</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleDownload}
        disabled={loading || disabled}
        className="download-btn"
      >
        {loading ? (
          <>
            <FaSpinner className="spinner" />
            Processing...
          </>
        ) : (
          <>
            <FaDownload />
            Download
          </>
        )}
      </button>
    </div>
  );
};

export default DownloadButton;
