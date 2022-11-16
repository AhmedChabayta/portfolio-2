export const drawVisualizer = ({
  bufferLength,
  barWidth,
  barHeight,
  dataArray,
  ctx,
  x,
}: {
  bufferLength: number;
  barWidth: number;
  barHeight: number;
  dataArray: Uint8Array;
  ctx: any;
  x: number;
}) => {
  if (ctx) {
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] * 4;
      ctx?.save();
      ctx?.rotate((i * (Math.PI * 4)) / bufferLength);
      ctx.fillStyle = `#e06c3a`;
      ctx?.fillRect(0, 0, barWidth, barHeight);
      x -= barWidth;
      ctx?.restore();
    }
  }
};
