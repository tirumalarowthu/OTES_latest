import React, { useRef, useState } from 'react';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import Webcam from 'react-webcam';
import RecordRTC from 'recordrtc';

const Camera = () => {
  const webcamRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  let mediaRecorder;

  const handleStartRecording = () => {
    setRecording(true);
    mediaRecorder = new RecordRTC(webcamRef.current.stream, {
      type: 'video',
    });
    mediaRecorder.startRecording();
  };

  const handleStopRecording = () => {
    setRecording(false);
    if (mediaRecorder) {
      mediaRecorder.stopRecording(() => {
        const blob = mediaRecorder.getBlob();
        setRecordedChunks([blob]);
      });
    }
  };

  const handleSaveVideo = () => {
    if (recordedChunks.length === 0) {
      console.log('No recorded video to save.');
      return;
    }

    // Convert recordedChunks to a format suitable for saving to the database
    const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });

    // Create a URL for the blob
    const videoUrl = URL.createObjectURL(videoBlob);

    // Create a link element
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = videoUrl;
    a.download = 'recorded_video.webm'; // Set the filename for the downloaded video
    document.body.appendChild(a);

    // Trigger a click event on the link to initiate the download
    a.click();

    // Remove the link from the DOM
    document.body.removeChild(a);

    // Revoke the URL to release the object URL
    URL.revokeObjectURL(videoUrl);
  };

  return (
    <DashboardLayout>
      <h1>Camera</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{ height: '100px', borderRadius: '10px' }}
      />
      <button onClick={recording ? handleStopRecording : handleStartRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {!recording && recordedChunks.length > 0 && <button onClick={handleSaveVideo}>Save Video</button>}
    </DashboardLayout>
  );
};

export default Camera;
