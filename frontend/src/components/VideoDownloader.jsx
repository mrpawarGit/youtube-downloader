import React, { useState } from 'react';
import { getVideoInfo, downloadVideo } from '../services/api';
import VideoInfo from './VideoInfo';
import DownloadButton from './DownloadButton';
import { FaYoutube, FaLink } from 'react-icons/fa';

const VideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadStatus, setDownloadStatus] = useState('');

  const handleGetInfo = async () => {
    if (!url.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }

    setLoading(true);
    setError('');
    setVideoInfo(null);

    try {
      const response = await getVideoInfo(url);
      if (response.success) {
        setVideoInfo(response.data);
      } else {
        setError('Failed to get video information');
      }
    } catch (err) {
      setError(err.error || 'Failed to get video information');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (quality, format) => {
    setDownloadStatus('Starting download...');
    setError('');

    try {
      const response = await downloadVideo(url, quality, format);
      if (response.success) {
        setDownloadStatus('Download completed!');
        
        // Create download link
        const link = document.createElement('a');
        link.href = `http://localhost:5000${response.downloadUrl}`;
        link.download = response.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setTimeout(() => setDownloadStatus(''), 3000);
      } else {
        setError('Download failed');
        setDownloadStatus('');
      }
    } catch (err) {
      setError(err.error || 'Download failed');
      setDownloadStatus('');
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setError('');
    setVideoInfo(null);
    setDownloadStatus('');
  };

  return (
    <div className="video-downloader">
      <div className="header">
        <FaYoutube className="youtube-icon" />
        <h1>YouTube Video Downloader</h1>
      </div>

      <div className="url-input-section">
        <div className="input-group">
          <FaLink className="link-icon" />
          <input
            type="text"
            placeholder="Paste YouTube URL here..."
            value={url}
            onChange={handleUrlChange}
            disabled={loading}
          />
          <button 
            onClick={handleGetInfo}
            disabled={loading || !url.trim()}
            className="get-info-btn"
          >
            {loading ? 'Loading...' : 'Get Info'}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {downloadStatus && (
        <div className="success-message">
          {downloadStatus}
        </div>
      )}

      {videoInfo && (
        <div className="video-section">
          <VideoInfo videoInfo={videoInfo} />
          <DownloadButton 
            onDownload={handleDownload}
            disabled={loading}
          />
        </div>
      )}
    </div>
  );
};

export default VideoDownloader;
