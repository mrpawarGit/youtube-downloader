const ytdl = require("@distube/ytdl-core");
const fs = require("fs-extra");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegPath);

const getVideoInfo = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Clean the URL to remove any extra parameters
    const cleanUrl = url.trim();
    
    if (!ytdl.validateURL(cleanUrl)) {
      return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    console.log(`Attempting to get info for: ${cleanUrl}`);

    // Add additional options to help with extraction
    const info = await ytdl.getInfo(cleanUrl, {
      requestOptions: {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      }
    });

    const videoDetails = {
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[0]?.url,
      duration: info.videoDetails.lengthSeconds,
      author: info.videoDetails.author.name,
      viewCount: info.videoDetails.viewCount,
      uploadDate: info.videoDetails.uploadDate,
      description: info.videoDetails.description?.substring(0, 200) + "...",
    };

    console.log(`Successfully got info for: ${videoDetails.title}`);
    res.json({ success: true, data: videoDetails });
  } catch (error) {
    console.error("Error getting video info:", error.message);
    console.error("Full error:", error);
    res.status(500).json({ 
      error: "Failed to get video information", 
      details: error.message 
    });
  }
};

const downloadVideo = async (req, res) => {
  try {
    const { url, quality, format } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const cleanUrl = url.trim();

    if (!ytdl.validateURL(cleanUrl)) {
      return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    console.log(`Starting download for: ${cleanUrl}`);

    const info = await ytdl.getInfo(cleanUrl, {
      requestOptions: {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      }
    });

    const title = info.videoDetails.title.replace(/[^\w\s\-_]/gi, "");
    const fileName = `${title}_${Date.now()}.${format || "mp4"}`;
    const filePath = path.join(__dirname, "../downloads", fileName);

    if (format === "mp3") {
      // Download audio only
      const audioStream = ytdl(cleanUrl, {
        quality: "highestaudio",
        filter: "audioonly",
        requestOptions: {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          }
        }
      });

      ffmpeg(audioStream)
        .audioBitrate(128)
        .format('mp3')
        .save(filePath)
        .on("end", () => {
          console.log(`Audio download completed: ${fileName}`);
          res.json({
            success: true,
            downloadUrl: `/downloads/${fileName}`,
            fileName: fileName,
          });
        })
        .on("error", (err) => {
          console.error("FFmpeg error:", err);
          res.status(500).json({ error: "Failed to process audio" });
        });
    } else {
      // Download video
      let videoQuality = "highest";

      if (quality === "low") videoQuality = "lowest";
      else if (quality === "medium") videoQuality = "highestvideo";

      const videoStream = ytdl(cleanUrl, {
        quality: videoQuality,
        format: "mp4",
        requestOptions: {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          }
        }
      });

      const writeStream = fs.createWriteStream(filePath);

      videoStream.pipe(writeStream);

      writeStream.on("finish", () => {
        console.log(`Video download completed: ${fileName}`);
        res.json({
          success: true,
          downloadUrl: `/downloads/${fileName}`,
          fileName: fileName,
        });
      });

      writeStream.on("error", (error) => {
        console.error("Download error:", error);
        res.status(500).json({ error: "Failed to download video" });
      });

      videoStream.on("error", (error) => {
        console.error("Stream error:", error);
        res.status(500).json({ error: "Failed to stream video" });
      });
    }
  } catch (error) {
    console.error("Error downloading video:", error.message);
    console.error("Full error:", error);
    res.status(500).json({ 
      error: "Failed to download video", 
      details: error.message 
    });
  }
};

module.exports = {
  getVideoInfo,
  downloadVideo,
};
