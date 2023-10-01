/* TrailerModal.tsx */
import React from "react";
import "./TrailerModal.css"; // Create a corresponding CSS file for styling
import VideoPlayer from "./VideoJs.component";
import CloseIcon from "@mui/icons-material/Close";

interface TrailerModalProps {
  videoUrl: string;
  onClose: () => void; // Define the onClose prop as a function
}

const TrailerModal: React.FC<TrailerModalProps> = ({ videoUrl, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <CloseIcon />
        </button>
        <div>
          <VideoPlayer
            options={{ sources: [{ src: videoUrl, type: "video/mp4" }] }}
          />
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
