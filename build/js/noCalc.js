"use strict";

function check_calc() {
  var el = document.createElement('div');
  el.style.cssText = 'width:calc(10px)';
  return !!el.style.length;
}

if (!check_calc()) {
  var style = document.createElement('link');
  style.setAttribute('href', 'css/noCalc.css');
  style.setAttribute('rel', 'stylesheet');
  document.body.appendChild(style);
}