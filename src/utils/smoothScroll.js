export const smoothScroll = (targetId) => {
  const element = document.querySelector(targetId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
