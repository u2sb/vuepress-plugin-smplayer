export const checkIsMobile = (ua: string) => {
  return /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua);
};
