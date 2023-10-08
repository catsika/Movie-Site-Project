import * as React from "react";
import videojs from "video.js";

// Styles
import "video.js/dist/video-js.css";

interface IVideoPlayerProps {
  options: any;
}

const initialOptions: any = {
  controls: true,
  aspectRatio: "16:9",
  fluid: true,
  controlBar: {
    volumePanel: {
      inline: false,
    },
  },
};

export const VideoPlayer: React.FC<IVideoPlayerProps> = ({ options }) => {
  const videoNode = React.useRef<HTMLVideoElement | null>(null);
  const player = React.useRef<any | null>(null);

  React.useEffect(() => {
    if (videoNode.current) {
      // Ensure videoNode.current is not null
      player.current = videojs(videoNode.current, {
        ...initialOptions,
        ...options,
      }).ready(function () {
        // console.log('onPlayerReady', this);
      });
    }
    return () => {
      if (player.current) {
        player.current.dispose();
        player.current = null;
      }
    };
  }, [options, videoNode.current]); // Include videoNode.current in the dependency array

  return <video ref={videoNode} className="video-js" />;
};
