export const screenWidth = screen.width;
export const isActualMobile = /iPhone|iPad|iPod|Android|BlackBerry|Windows Phone|webOS/i.test(
  navigator.userAgent
);

export const isMobile = () => {
  const mq = window.matchMedia("(max-width: 700px)");
  return isActualMobile || mq.matches;
};
