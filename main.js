/* global QRCode:false */

// Config
const CODE_SIZE = 128;
const LS_KEY_LAST_LOCAL_IP = "lastLocalIP";

// Element refs
const urlInputEl = document.getElementById("urlInput");
const ipNumInputEl = document.getElementById("ipNumInput");
const outputURLEl = document.getElementById("outputURL");
const btnEl_convertCode = document.getElementById("convertCodeButton");
const btnEl_convertCodeWithReplace = document.getElementById(
  "convertCodeWithReplacementButton"
);
const qrcode = new QRCode(document.getElementById("qrcode"), {
  width: CODE_SIZE,
  height: CODE_SIZE,
});

/**
 * ローカルIPをローカルストレージに記録
 * @param {String} ipString
 */
const _updateLastLocalIP = function (ipString) {
  localStorage.setItem(LS_KEY_LAST_LOCAL_IP, ipString);
};

/**
 * 前回入力したローカルIPを復活
 */
const _restoreLastLocalIP = function () {
  const lastIP = localStorage.getItem(LS_KEY_LAST_LOCAL_IP);
  console.log("Restore lastIP"), lastIP;
  ipNumInputEl.value = lastIP;
};

/**
 * コード生成
 * @param {String} text
 */
const _makeCode = function (text) {
  qrcode.clear();
  outputURLEl.innerText = text;
  outputURLEl.href = text;
  qrcode.makeCode(text);
};

/**
 * URLからコード生成
 */
function outputCode() {
  const url = document.getElementById("urlInput").value;
  if (url === "") {
    alert("URLが入力されてません");
    return;
  }
  _makeCode(url);
}

/**
 * URLを一部変換してコード生成
 */
function outputCodeWithLocalIpReplaced() {
  const ipInputValue = ipNumInputEl.value;
  if (ipInputValue === "") {
    alert("ローカルIPが入力されてません");
    return;
  }
  _updateLastLocalIP(ipInputValue);
  // const url = `http://{localhost}:8087/qrcode-convert-js/index.html`
  let urlInputValue = document.getElementById("urlInput").value;
  if (urlInputValue === "") {
    alert("URLが入力されてません");
    return;
  }
  urlInputValue = urlInputValue.replace(/localhost/, ipInputValue);
  _makeCode(urlInputValue);
}

// 初期化
window.addEventListener("DOMContentLoaded", function () {
  const thisURL = location.href;
  _makeCode(thisURL);
  _restoreLastLocalIP();
  btnEl_convertCode.onclick = outputCode;
  btnEl_convertCodeWithReplace.onclick = outputCodeWithLocalIpReplaced;
});
