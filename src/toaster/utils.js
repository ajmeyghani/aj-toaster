const animationDurationFromCssProp = (node, property) => {
  if (!node || !property) {
    throw new Error("Need a DOM node and css property name");
  }

  const duration =
    window.getComputedStyle(node)
      .getPropertyValue(property);

  const value = /^.*ms$/g.test(duration) ?
    Number.parseFloat(duration) :
    (Number.parseFloat(duration) * 1000);

  return value;
};

export {
  animationDurationFromCssProp,
};
