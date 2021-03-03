const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const formatConfidenceScore = score => {
    try {
      return Number(score).toFixed(0);
    } catch (err) {
      console.error(err);
      return score;
    }
};

export const drawRect = (detections, ctx) => {
  let text = '';
  let value = 0;
  const padding = 10;
  // Loop through each prediction
  detections.forEach(prediction => {
    // Extract boxes and classes
    const [x, y, width, height] = prediction.bbox;
    text = capitalizeFirstLetter(prediction.class);
    value = prediction.score * 100;
    // Set styling
    const color = '12b84f';
    ctx.strokeStyle = `#${color}`;
    ctx.font = '24px Arial';

    // Draw rectangles and text
    ctx.beginPath();
    ctx.fillStyle = `#${color}`;
    ctx.fillText(
      text,
      x + width / 2 - ctx.measureText(text).width,
      y - padding,
    );
    ctx.rect(x, y, width, height);
    ctx.stroke();
  });

  return { text, score: value };
};
