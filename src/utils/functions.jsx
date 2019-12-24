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

export function loadOption(inputSize = 512, scoreThreshold = 0.3) {
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
  points.slice(1).forEach(({ x, y }) => {
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

export function cropImage(imgEl, detection) {
  const canvas = document.createElement("canvas");
  canvas.width = imgEl.width;
  canvas.height = imgEl.height;
  canvas.getContext("2d").drawImage(imgEl, 0, 0, imgEl.width, imgEl.height);
  let points = detection.landmarks
    ? [
        ...detection.landmarks.getJawOutline(),
        ...detection.landmarks.getLeftEyeBrow(),
        ...detection.landmarks.getRightEyeBrow()
      ]
    : [];

  if (points.length === 0) return;

  let minX = 10000,
    minY = 10000,
    maxX = -10000,
    maxY = -10000;

  points.forEach(point => {
    if (point.x < minX) minX = point.x;
    if (point.y < minY) minY = point.y;
    if (point.x > maxX) maxX = point.x;
    if (point.y > maxY) maxY = point.y;
  });

  const nWidth = maxX - minX,
    nHeight = maxY - minY;

  const ctx = canvas.getContext("2d");
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;
  cropContour(ctx, points);
  ctx.drawImage(imgEl, 0, 0);
  ctx.restore();

  const croppedCanvas = document.createElement("canvas");
  const croppedCtx = croppedCanvas.getContext("2d");
  croppedCanvas.width = nWidth;
  croppedCanvas.height = nHeight;
  croppedCtx.drawImage(
    canvas,
    minX,
    minY,
    nWidth,
    nHeight,
    0,
    0,
    nWidth,
    nHeight
  );

  return croppedCanvas.toDataURL();
}
