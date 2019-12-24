import * as faceapi from "face-api.js";
import * as hull from "hull.js";

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function loadModels() {
  const MODEL_URL = process.env.PUBLIC_URL + "/models";
  faceapi.loadTinyFaceDetectorModel(MODEL_URL).then(() => {
    console.log("Completed loading Face model");
  });
  faceapi.loadFaceLandmarkTinyModel(MODEL_URL).then(() => {
    console.log("Completed loading Landmark model");
  });
}

export function loadOption(inputSize = 512, scoreThreshold = 0.2) {
  return new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold });
}

export async function getFullFaceDescription(blob, imageSize, inputSize = 512) {
  let scoreThreshold = 0.3;
  const OPTION = new faceapi.TinyFaceDetectorOptions({
    inputSize,
    scoreThreshold
  });
  const useTinyModel = true;
  let img = await faceapi.fetchImage(blob);
  let detections =
    (await faceapi
      .detectSingleFace(img, OPTION)
      .withFaceLandmarks(useTinyModel)) || {};
  const resizedDetections = faceapi.resizeResults(detections, imageSize);
  return resizedDetections;
}

export function cropContour(ctx, pointset, isClosed = false) {
  const points = hull(pointset, 90, [".x", ".y"]);
  ctx.beginPath();
  console.log(points);
  points.slice(1).forEach(({ x, y }, prevIdx) => {
    ctx.lineTo(x, y);
  });

  if (isClosed) {
    const from = points[points.length - 1];
    const to = points[0];
    if (!from || !to) {
      return;
    }

    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
  }

  ctx.closePath();
  ctx.stroke();
  ctx.clip();
}
