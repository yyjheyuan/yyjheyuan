var t = null;
t = setTimeout(time, 1000);
function time() {
  clearTimeout(t);
  dt = new Date();
  var Y = dt.getFullYear();
  var M = dt.getMonth() + 1;
  var day = dt.getDate();
  var h = dt.getHours();
  var m = dt.getMinutes();
  var s = dt.getSeconds();
  document.querySelector(".datetime").innerHTML =
    "北京时间：" +
    Y +
    "年" +
    M +
    "月" +
    day +
    "日" +
    h +
    "时" +
    m +
    "分" +
    s +
    "秒";
  t = setTimeout(time, 1000);
}
