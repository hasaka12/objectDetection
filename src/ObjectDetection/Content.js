// Import dependencies
import React, { useRef, useState, useEffect, memo } from "react";
import PropTypes from 'prop-types';
import "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect, formatConfidenceScore } from "./utils";

const mystyle = {
  content: {
      textAlign: 'center',
      fontSize: '25px',
      marginBottom: '5px',
  },
  buttonContainer: {
      marginLeft: '47%',
      marginBottom: '5px',
  },
  button: {
      backgroundColor: 'blue',
      color: 'white',
      padding: 10,
  }
};

const Content = ({ handleToggleCamera }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [predictionObj, setPredictionObj] = useState({});

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video height and width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);

      // Draw canvas
      const ctx = canvasRef.current.getContext("2d");
      const prediction = drawRect(obj, ctx); 

      if (prediction) {
        setPredictionObj(prediction);
      }
    }
  };

  const RenderConfidentVal = memo(() => (
    <>
      {predictionObj.score && predictionObj.text && (
        <div>
          Confident Value {`${formatConfidenceScore(predictionObj.score)} %`}
        </div>
      )}
    </>
  ));

  useEffect(() => {
    // Main function
    const runCoco = async () => {
      const net = await cocossd.load();
      setIsLoading(false);
  
      setInterval(() => {
        detect(net);
      }, 300);
    };

    runCoco();
  }, []);

  return (
    <>
      <div style={mystyle.content}>
         {isLoading ? 'Loading...' : 'Take objects infront of your camera'}
      </div>
      <div style={mystyle.buttonContainer}>
          <button style={mystyle.button} onClick={handleToggleCamera}>Turn off Camera</button>
      </div>
      <div style={mystyle.content}>
         <RenderConfidentVal />
      </div>
      <header>
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </>
  );
};

Content.propTypes = {
  handleToggleCamera: PropTypes.func.isRequired,
};

export default Content;
