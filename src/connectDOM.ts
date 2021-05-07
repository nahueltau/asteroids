export const connectDOM = () => {
  const app = <HTMLCanvasElement>document.getElementById("app");
  //CANVAS
  let canvasHeight: number = 850 * 0.8;
  let canvasWidth: number = 800 * 0.8;
  app.setAttribute("height", String(canvasHeight));
  app.setAttribute("width", String(canvasWidth));
  const ctx = app.getContext("2d");
  ctx.scale(0.8, 0.8);
  return ctx;
};
