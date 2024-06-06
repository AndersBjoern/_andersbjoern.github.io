//! fix mærkelig height af horisontal scroll
//! fix videoplayer
//! tilføj videoplayer Moesgaard
//! text animation (50% ----> 75% VR training) & lego: Digital Empowerment black color white outline
//! background color
//! icons
//! contact button effect
//! store og små bogstaver i classes, forenkling af divs og classes

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
  function isComputer() {
    return window.matchMedia("(min-width: 900px)").matches;
  }

  // horizonal scroll
  const horizontalContainer = document.querySelector(".Horizontal-container");

  function getScrollAmount() {
    let horizontalContainerWidth = horizontalContainer.scrollWidth;
    return -(horizontalContainerWidth - window.innerWidth);
  }

  const tween = gsap.to(horizontalContainer, {
    x: getScrollAmount,
    duration: 3,
    ease: "none",
  });

  const root = document.documentElement;
  const contrastColor =
    getComputedStyle(root).getPropertyValue("--contrast-color");

  ScrollTrigger.create({
    trigger: ".Horizontal",
    start: "top 0%",
    end: () => `+=${getScrollAmount() * -1}`,
    pin: true,
    animation: tween,
    scrub: 1,
    invalidateOnRefresh: true,
    onEnter: () => {
      gsap.to(horizontalContainer, {
        background: `linear-gradient(90deg, rgba(2,0,36,0.695203081232493) 24%, rgba(21,9,100,1) 50%, ${contrastColor} 84%)`,
        duration: 0.5,
      });
    },
    onLeaveBack: () => {
      gsap.to(horizontalContainer, { background: "none", duration: 0.5 });
    },
  });

  // "skills" animation:
  const addAnimation = () => {
    scrollers.forEach((scroller) => {
      scroller.setAttribute("data-animated", true);

      const scrollerInner = scroller.querySelector(".scroller_inner");
      const scrollerContent = Array.from(scrollerInner.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  };

  /*
  let video = document.getElementById("DigitalEmpowermentVideo");

  ScrollTrigger.create({
    trigger: video,
    start: "top center",
    end: "bottom center",
    onEnter: () => video.play(),
    onLeave: () => video.pause(),
    onEnterBack: () => video.play(),
    onLeaveBack: () => video.pause(),
  });

  */

  const scrollers = document.querySelectorAll(".scroller");
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
  }

  const skillsSection = document.querySelector(".highlights");
  const blackBackground = document.querySelector(".black-background");
  const body = document.body;

  const startValue = isComputer() ? "top top" : "top center";

  // Opret en ScrollTrigger
  ScrollTrigger.create({
    trigger: skillsSection,
    start: "top center", // Justér dette efter dine behov
    end: "bottom center", // Justér dette efter dine behov
    onEnter: () => {
      // Animation, når sektionen er i visning
      gsap.to(body, { backgroundColor: "white", duration: 1 });
      gsap.to(blackBackground, {
        color: "white",
        width: "95vw",
        borderTopRightRadius: "40px",
        borderBottomRightRadius: "40px",
        duration: 1,
      });
    },
    onLeaveBack: () => {
      // Animation, når sektionen forlader visning
      gsap.to(body, { backgroundColor: "black", duration: 1 });
      gsap.to(blackBackground, {
        color: "black",
        width: "100vw",
        borderTopRightRadius: "0",
        borderBottomRightRadius: "0",
        duration: 1,
      });
    },
  });

  // Kør koden kun hvis skærmen er en tablet eller større
  if (isComputer()) {
    // grid zoom effekt
    var gridItems = document.querySelectorAll(".grid-item");
    var gridContainer = document.querySelector(".sticky-container");
    var blockContainer = document.querySelector(".block-container");

    // Gå igennem hver grid-item
    gridItems.forEach(function (item, index) {
      // Beregn transform-værdier baseret på placering i forhold til centerItem
      var translateX, translateY;
      if (index % 3 < 1) {
        // Venstre side
        translateX = "-100vw";
      } else if (index % 3 > 1) {
        // Højre side
        translateX = "100vw";
      } else {
        // Midterste kolonne
        translateX = "0";
      }

      if (index < 3) {
        // Øverste række
        translateY = "-100vh";
      } else if (index > 5) {
        // Nederste række
        translateY = "100vh";
      } else {
        // Midterste række
        translateY = "0";
      }

      // Opret en ScrollTrigger for hver grid-item
      gsap.to(item, {
        // Når grid-item er 100% synlig i viewporten
        scrollTrigger: {
          trigger: gridContainer,
          start: "center center", // Start trigger, når toppen af centerItem er i midten af viewporten
          endTrigger: blockContainer,
          end: "bottom center", // Slut trigger, når bunden af centerItem er i midten af viewporten
          scrub: true, // Gør animationen blød
        },
        scale: 3.7,
        x: translateX,
        y: translateY,
      });
    });
  }
});
