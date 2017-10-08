export default {

  supportCss(prop) {
    let prefix = ['-webkit-', '-moz', ''];
    let root = document.documentElement;
    const camelCase = (str) => {
      return str.replace(/\-([a-z])/gi, function (match, $1) {
        return $1.toUpperCase();
      })
    }
    for (let i = prefix.length - 1; i >= 0; i--) {
      let css3prop = camelCase(prefix[i] + prop);
      if (css3prop in root.style) {
        return css3prop;
      }
    }
    return false;
  },

  transitionEventEnd() {
    let transition = this.supportCss('transition');
    if (transition) {
      return (transition === 'transition')
        ? 'transitionend'
        : `${transition}End`;
    }
    return false;
  }
};
