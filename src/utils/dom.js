export const dqs = (selectors) => {
  return document.querySelector(selectors);
};

export const dqsa = (selectors) => {
  return document.querySelectorAll(selectors);
};

export const qs = (parentNode, selectors) => {
  return parentNode.querySelector(selectors);
};

export const rmClass = (node, classe) => {
  node.classList.remove(classe);
};

export const addClass = (node, classe) => {
  node.classList.add(classe);
};
