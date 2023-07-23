// leaves
const squares = gsap.utils.toArray(".js-imgs");
const links = document.querySelectorAll(".dream");
const viewMax = {};
const pad = 10;
const coords = {
  mouseX: 0,
  mouseY: 0,
};

const onResize = () => {
  viewMax.x = window.innerWidth - pad;
  viewMax.y = window.innerHeight - pad;
};

const updateMousePosition = (e) => {
  coords.mouseX = e.clientX;
  coords.mouseY = e.clientY;
};

const tweenProperty = (target, prop) => {
  gsap.to(target, {
    duration: "random(9, 10)",
    [prop]: `random(${pad}, ${viewMax[prop]})`,
    ease: "sine.inOut",
    onComplete: tweenProperty,
    onCompleteParams: [target, prop],
  });
};

const setSquares = () => {
  squares.forEach((square) => {
    gsap.set(square, {
      x: `random(${pad}, ${viewMax.x})`,
      y: `random(${pad}, ${viewMax.y})`,
      xPercent: -50,
      yPercent: -50,
      scale: 0,
    });
    gsap.to(square, {
      duration: 0.2,
      scale: 1,
    });

    tweenProperty(square, "x");
    tweenProperty(square, "y");
  });
};
//resize leaves
const groupSquaresAtCursor = () => {
  //  *** NOT WORKING ***
  gsap.killTweensOf(squares);
  squares.forEach((square) => {
    console.log("ACTIVE", gsap.isTweening(square));
  });

  //  *** MANUALLY KILL ***
  gsap.getTweensOf(squares).forEach((t) => t.kill());

  const tl = gsap.timeline();
  tl.to(squares, {
    duration: 0.3,
    borderRadius: "50%",
  });
  tl.to(squares, {
    duration: 0.2,
    scale: 2,
  });
  window.addEventListener("mousemove", squaresFollowCursor);
  squaresFollowCursor();
};
//resize leaves
//inline liafs
const squaresFollowCursor = () => {
  gsap.to(squares, {
    duration: 0.3,
    x: coords.mouseX,
    y: coords.mouseY,
  });
};

const disperseSquares = () => {
  window.removeEventListener("mousemove", squaresFollowCursor);
  squares.forEach((square) => {
    gsap.to(square, {
      duration: 2,
      scale: 1,
      overwrite: true,
      x: coords.mouseX,
      y: coords.mouseY,

      onComplete() {
        tweenProperty(square, "y");
      },
    });
  });
};

//inline leaves

//leaves
onResize();
setSquares();
//leaves
//resize
window.addEventListener("resize", onResize);
links.forEach((link) =>
  link.addEventListener("mouseenter", groupSquaresAtCursor)
);
//resize
//inline leaves
links.forEach((link) => link.addEventListener("mouseout", disperseSquares));
window.addEventListener("mousemove", updateMousePosition);
//inline leaves

// //resize background

const hero = document.querySelector(".hero");
const slider = document.querySelector(".slider");
const logo = document.querySelector("#logo");
const ham = document.querySelector(".ham");
const headline = document.querySelector(".headline");

const tl = new TimelineMax();

// select '.hero', time: 1s, start from height to ..
tl.fromTo(hero, 1, { height: "0%" }, { height: "80%", ease: Power2.easeInOut });
tl.fromTo(
  hero,
  1.2,
  { width: "100%" },
  { width: "80%", ease: Power2.easeInOut }
);
tl.fromTo(
  slider,
  1.2,
  { x: "-100%" },
  { x: "0%", ease: Power2.easeInOut },
  "-=1.2"
)
  .fromTo(logo, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5")
  .fromTo(ham, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5")
  .fromTo(headline, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5");

// cursor
let cursor = $(".cursor"),
  follower = $(".cursor-follower");

let posX = 0,
  posY = 0;

let mouseX = 0,
  mouseY = 0;

TweenMax.to({}, 0.016, {
  repeat: -1,
  onRepeat: function () {
    posX += (mouseX - posX) / 9;
    posY += (mouseY - posY) / 9;

    TweenMax.set(follower, {
      css: {
        left: posX - 12,
        top: posY - 12,
      },
    });

    TweenMax.set(cursor, {
      css: {
        left: mouseX,
        top: mouseY,
      },
    });
  },
});

$(document).on("mousemove", function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
// yellow circle
$(".link").on("mouseenter", function () {
  cursor.addClass("active");
  follower.addClass("active");
});
$(".link").on("mouseleave", function () {
  cursor.removeClass("active");
  follower.removeClass("active");
});

// // drow svg
$(function () {
  let controller = new ScrollMagic.Controller();

  let paths = $("path");
  let tl = new TimelineMax();
  paths.each(function (i, e) {
    e.style.strokeDasharray = e.style.strokeDashoffset = e.getTotalLength();
  });
  tl.staggerTo(
    paths,
    0.4,
    { strokeDashoffset: 0, stroke: "#fff", strokeWidth: 4 },
    0.2
  );

  let containerScene = new ScrollMagic.Scene({
    triggerElement: "#cta",
  })
    .setTween(tl)
    .addTo(controller);
});
