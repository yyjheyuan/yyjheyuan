// 游戏配置文件

var gridData = []; //存储地图对象

// 整个网格的行与列
var tr = 30;
var td = 30;

// 蛇身体大小
var snakeBody = 20;

// 点击键盘运动蛇的坐标的变化(与旧蛇的坐标进行计算)
var directionNum = {
  left: { x: -1, y: 0, flag: "left" },
  right: { x: 1, y: 0, flag: "right" },
  top: { x: 0, y: -1, flag: "top" },
  bottom: { x: 0, y: 1, flag: "bottom" },
};

// 蛇相关配置
var snake = {
  // 蛇的初始位置
  snakePos: [
    {
      x: 0,
      y: 0,
      domContent: "",
      flag: "body", //标记该位置是什么内容
    },
    {
      x: 1,
      y: 0,
      domContent: "",
      flag: "body", //标记该位置是什么内容
    },
    {
      x: 2,
      y: 0,
      domContent: "",
      flag: "body", //标记该位置是什么内容
    },
    {
      x: 3,
      y: 0,
      domContent: "",
      flag: "head", //标记该位置是什么内容
    },
  ],

  // 蛇的初始方向
  direction: {
    x:1,
    y:0,
    flag: "right"
  },

  /* // 蛇的初始长度
  length: 3,

  // 蛇的初始速度
  speed: 100,
  */
};
//   食物相关配置
var food = { x: 0, y: 0, domContent: "", flag: "food" };
// 游戏分数
var score = 0;

// 停止计时器
var timerStop = null;
// 计时器时间
var time = 500;
