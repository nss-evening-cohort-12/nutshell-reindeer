const printToDom = (selector, text) => {
  $(selector).html(text);
};

export default { printToDom };
