window.onload = function () {
  //2. 绘制蛇的方法
  function drawSnake(snake) {
    // 根据存储的蛇的初始位置生成对应的div，设置相应的宽高（蛇身体的大小）
    for (var i = 0; i < snake.snakePos.length; i++) {
      if (!snake.snakePos[i].domContent) {
        snake.snakePos[i].domContent = document.createElement("div");
        snake.snakePos[i].domContent.style.position = "absolute";
        snake.snakePos[i].domContent.style.width = snakeBody + "px";
        snake.snakePos[i].domContent.style.height = snakeBody + "px";
        snake.snakePos[i].domContent.style.left =
          snake.snakePos[i].x * snakeBody + "px";
        snake.snakePos[i].domContent.style.top =
          snake.snakePos[i].y * snakeBody + "px";
        //   console.log(snake.snakePos[i].x)
        // 将头部与身体区别开来
        if (snake.snakePos[i].flag === "head") {
          snake.snakePos[i].domContent.style.backgroundColor = "red";
          switch (snake.direction.flag) {
            case "top":
              snake.snakePos[i].domContent.style.transform = "rotate(-90deg)";
              break;
            case "bottom":
              snake.snakePos[i].domContent.style.transform = "rotate(90deg)";
              break;
            case "left":
              snake.snakePos[i].domContent.style.transform = "rotate(180deg)";
              break;
            case "right":
              snake.snakePos[i].domContent.style.transform = "rotate(0deg)";
              break;
            default:
              break;
          }
        } else {
          snake.snakePos[i].domContent.style.backgroundColor = "#9ddbb1";
          snake.snakePos[i].domContent.style.borderRadius = "50%";
        }
      }
      document
        .querySelector(".container")
        .appendChild(snake.snakePos[i].domContent);
    }
  }
  //3. 绘制食物
  function drawFood() {
    // 食物坐标随机（不可以生成在蛇上以及container的边框上）
    while (true) {
      var isRepeat = false; //默认生成的食物坐标符合要求
      // 随机生成坐标
      food.x = Math.floor(Math.random() * tr);
      food.y = Math.floor(Math.random() * td);
      //   food.x = Math.floor(Math.random() * (tr - 2)) + 1;
      //   food.y = Math.floor(Math.random() * (td - 2)) + 1;
      // 查看坐标是否符合要求
      for (var i = 0; i < snake.snakePos.length; i++) {
        if (snake.snakePos[i].x === food.x && snake.snakePos[i].y === food.y) {
          // 当前生成的坐标与蛇重合
          isRepeat = true; //重合跳出循环
          break;
        }
      }
      if (!isRepeat) {
        // 跳出整个while循环，说明食物不在蛇身上
        break;
      }
    }
    if (!food.domContent) {
      food.domContent = document.createElement("div");
      food.domContent.style.width = snakeBody + "px";
      food.domContent.style.height = snakeBody + "px";
      food.domContent.style.backgroundColor = "lightgreen";
      food.domContent.style.borderRadius = "50%";
      food.domContent.style.position = "absolute";
      document.querySelector(".container").appendChild(food.domContent);
    }
    food.domContent.style.left = food.x * snakeBody + "px";
    food.domContent.style.top = food.y * snakeBody + "px";
  }

  // 1.游戏初始化
  function init() {
    // 初始化地图
    for (var i = 0; i < tr; i++) {
      for (var j = 0; j < td; j++) {
        gridData.push({ x: j, y: i });
      }
    }
    // 绘制蛇
    drawSnake(snake);
    // 绘制食物
    drawFood();
  }
  // console.log(gridData);
  // 6.进行碰撞检测
  function isCollide(newhead) {
    var collideCheckInfo = {
      isCollide: false, //是否碰撞蛇身或墙壁
      isEat: false, //是否吃到食物
      // isRepeat: false,
    };
    // (1).判断是否撞墙
    if (newhead.x < 0 || newhead.x >= td || newhead.y < 0 || newhead.y >= tr) {
      collideCheckInfo.isCollide = true;
      return collideCheckInfo;
    }
    // (2).判断是否碰到蛇身
    for (var i = 0; i < snake.snakePos.length; i++) {
      if (
        snake.snakePos[i].x == newhead.x &&
        snake.snakePos[i].y == newhead.y
      ) {
        collideCheckInfo.isCollide = true;
        return collideCheckInfo;
      }
    }
    // (3).判断是否吃到食物
    if (newhead.x == food.x && newhead.y == food.y) {
      collideCheckInfo.isEat = true;
      // return collideCheckInfo;
      score++;
    }
    return collideCheckInfo;
  }
  // 5.改变蛇的方向位置
  function snakeMove() {
    var oldhead = snake.snakePos[snake.snakePos.length - 1];
    // 根据方向，计算蛇的坐标
    //   计算新的蛇头的坐标
    var newhead = {
      domContent: "",
      x: snake.snakePos[snake.snakePos.length - 1].x + snake.direction.x,
      y: snake.snakePos[snake.snakePos.length - 1].y + snake.direction.y,
      flag: "head",
    };
    // console.log(newhead);
    // console.log(snake.snakePos[snake.snakePos.length - 1].x);
    // console.log(snake.direction.x, snake.direction.y);
    // 判断是否撞墙、撞见食物、身体
    var collideCheckRes = isCollide(newhead);
    if (collideCheckRes.isCollide) {
      // 碰墙了
      // console.log("撞墙了");
      if (window.confirm(`游戏结束,当前得分为:${score}分，是否重新开始`)) {
        // 重新开始
        // (1).清空所有元素
        document.querySelector(".container").innerHTML = `
        <button class="startBtn" style="display:none">开始游戏</button>
        <!-- 暂停按钮 -->
        <button class="pauseBtn" style="display:none">暂停</button>
        `;
        score = 0;
        snake = {
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
            x: 1,
            y: 0,
            flag: "right",
          },
        };
        food = { x: 0, y: 0, domContent: "", flag: "food" };
        init();
      } else {
        document.onkeydown = null;
        clearInterval(timerStop);
      }
      return;
    }
    //   console.log(newhead)
    oldhead.flag = "body";
    oldhead.domContent.style.backgroundColor = "#9ddbb1";
    oldhead.domContent.style.borderRadius = "50%";
    snake.snakePos.push(newhead); // 添加新的蛇头
    //   判断是否吃到食物
    if (collideCheckRes.isEat) {
      console.log("吃到食物了");
      drawFood();
      // drawSnake();
    } else {
      // console.log()
      // 溢出最后的元素
      document
        .querySelector(".container")
        .removeChild(snake.snakePos[0].domContent);
      snake.snakePos.shift();
    }
    //   重绘蛇
    drawSnake(snake);
  }

  // 7.计时器控制蛇自主移动（2）
  function startGame() {
    timerStop = setInterval(function () {
      snakeMove();
    }, time);
  }

  // 4.事件绑定
  function bindEvent() {
    //（1） 监听键盘事件
    document.addEventListener("keydown", function (e) {
      // 获取键盘事件
      var dir = e.key;
      // 判断键盘事件
      switch (dir) {
        case "d":
        case "ArrowRight":
          // 向右
          if (snake.direction.flag !== "left") {
            snake.direction = directionNum.right;
          }
          break;
        case "w":
        case "ArrowUp":
          // 向上
          if (snake.direction.flag !== "bottom") {
            snake.direction = directionNum.top;
          }
          break;
        case "s":
        case "ArrowDown":
          // 向下
          if (snake.direction.flag !== "top") {
            snake.direction = directionNum.bottom;
          }
          break;
        case "a":
        case "ArrowLeft":
          // 向左
          if (snake.direction.flag !== "right") {
            snake.direction = directionNum.left;
          }
          break;
        default:
          break;
      }
    });
    //  （2） 设置计时器，让蛇自动行走
    startGame();

    // (3).点击页面，实现暂停游戏
    document.querySelector(".container").onclick = function (e) {
      if (e.target.className === "container") {
        document.querySelector(".pauseBtn").style.display = "block";
        clearInterval(timerStop);
      } else if (e.target.className === "pauseBtn") {
        e.stopPropagation();
        document.querySelector(".pauseBtn").style.display = "none";
        startGame();
      }
    };
  }
  // 游戏主方法
  function main() {
    document.querySelector(".startBtn").onclick = function (e) {
      e.stopPropagation();
      document.querySelector(".startBtn").style.display = "none";
      // 1.初始化
      init();
      //   4.事件绑定
      bindEvent();
    };
  }
  main();
};
