window.addEventListener("load", function () {
  let container = document.querySelector(".container");
  let role = document.querySelectorAll(".role");
  console.log(role);
  document.body.addEventListener("mousemove", (e) => {
    let x = (window.innerWidth / 2 - e.pageX) / 30;
    let y = (window.innerHeight / 2 - e.pageY) / 30;
    container.style.transform = `rotateX(${-y}deg) rotateY(${-x}deg)`;
    [].forEach.call(role, (role) => {
      role.style.transform = `translateX(${x / 2}px) translateY(${y / 2}px)`;
    });
  });
});
