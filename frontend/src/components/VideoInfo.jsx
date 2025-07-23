import React from 'react';
import { FaUser, FaEye, FaClock } from 'react-icons/fa';

const VideoInfo = ({ videoInfo }) => {
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div className="video-info">
      <div className="video-thumbnail">
        <img src={videoInfo.thumbnail} alt="Video thumbnail" />
      </div>
      <div className="video-details">
        <h3>{videoInfo.title}</h3>
        <div className="video-meta">
          <div className="meta-item">
            <FaUser className="icon" />
            <span>{videoInfo.author}</span>
          </div>
          <div className="meta-item">
            <FaEye className="icon" />
            <span>{formatViews(videoInfo.viewCount)} views</span>
          </div>
          <div className="meta-item">
            <FaClock className="icon" />
            <span>{formatDuration(videoInfo.duration)}</span>
          </div>
        </div>
        <p className="description">{videoInfo.description}</p>
      </div>
    </div>
  );
};

export default VideoInfo;
