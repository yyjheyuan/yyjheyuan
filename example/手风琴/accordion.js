window.onload = function () {
  var cardDom = document.querySelectorAll(".card");
  console.log(cardDom);

  function setActive() {
    cardDom.forEach(function (item) {
      item.classList.remove("active");
    });
    this.classList.add("active");
  }

  cardDom.forEach(function (item) {
    item.addEventListener("click", setActive);
  });
};
