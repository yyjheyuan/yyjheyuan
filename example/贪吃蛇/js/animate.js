//obj是目标对象，target是目标位置
function animate(obj, target, callback) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    if (target - obj.offsetLeft > 0) {
      var step = Math.ceil((target - obj.offsetLeft) / 10);
    } else if (target - obj.offsetLeft < 0) {
      var step = Math.floor((target - obj.offsetLeft) / 10); // 步长
    }
    // 步长值可能存在小数，应尽量避免
    if (obj.offsetLeft == target) {
      clearInterval(obj.timer);
      //回调函数，在所有函数运行结束之后，才运行
      if (callback) {
        callback();
      }
    }
    // 做成缓动动画(利用步长值)
    obj.style.left = obj.offsetLeft + step + "px";
  }, 16);
}
// 记得给要动的内容加定位
// 缓动动画公式算法
// (目标值- 现在的位置) / 10
