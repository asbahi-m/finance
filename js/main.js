$(function () {
  // Show/Hide Menu in navbar
  $(".navbar-toggle").on("click", function () {
    $(".navbar-nav").toggleClass("show");
    $(this).toggleClass("active");
  });

  // Fixed Header and Navbar and Top icon when position
  // let startPosition = $(".img-fill").position().top + $(".img-fill").height();
  let startPosition = $("main :first-child").height();
  let bodyEle = $("body");
  let headerEle = $("header .navbar");
  let toUp = $("#to-up");
  if ($(document).scrollTop() >= startPosition) {
    bodyEle.css("margin-top", "100px");
    headerEle.addClass("fixed");
    toUp.fadeIn();
  }

  $(document).on("scroll", function () {
    // Fixed Header and Navbar and Top icon after scroll
    if ($(this).scrollTop() >= startPosition) {
      if (toUp.is(":hidden")) {
        bodyEle.css("margin-top", "100px");
        headerEle.addClass("fixed");
        toUp.fadeIn();
      }
    } else {
      if (toUp.is(":visible")) {
        bodyEle.css("margin-top", "0");
        headerEle.removeClass("fixed");
        toUp.fadeOut();
      }
    }
  });

  // Scroll document to up
  toUp.on("click" ,function (event) {
    event.preventDefault();
    $("html").animate({ scrollTop: 0 }, "slow", function () {
      if (location.hash != '') {
        console.log(location.pathname);
        window.location.hash = '';
        history.replaceState("", "", location.pathname)
      }
    });
  });

  // Hide/Show tabs panel on click
  $("[role=tablist]").on("click", "[role=tab]:not(.active)", function () {
    let tab = $(this).attr("aria-controls");
    $(this).addClass("active").attr("aria-selected", true).siblings().removeClass("active").attr("aria-selected", false);
    $("#" + tab).addClass("active").siblings().removeClass("active");
  })

    // Nice Scroll Properties
    /* $("html").niceScroll({
        // cursorwidth:"16px",
        cursorcolor: "#a4c63b",
        background: "rgba(0,0,0, 0.7)",
        cursorborder:"0",
        // zindex: 1030,
    }); */

    // Scroll animate for button Contact Us
    $(".hashtag").on("click", function (e) {
      e.preventDefault();
      if (this.hash != "") {
        var hash = this.hash;
        $("html").animate({scrollTop: $(hash).offset().top}, "slow", function () {
          window.location.hash = hash;
        });
      }
    })

    // View the Image on Litebox -> show/hide modal
    let modalEle = $(".modal");
    let modalImgTarget = $(".modal .modal-body img");
    $(".modal-open").on("click", function (e) {
      modalEle.fadeIn().find(".modal-body").addClass("no-effect").find("img").attr("src", $(this).data("image"));
    })
    modalEle.on("click", function (e) {
      if (e.target.tagName != "IMG") {
        modalEle.fadeOut(function () {
          modalImgTarget.attr("src", "");
        }).find(".modal-body").removeClass("no-effect");
      }
    })
    $(document).on("keyup", function (e) {
      if (modalEle.is(":visible") && e.which == 27) {
        modalEle.fadeOut(function () {
          modalImgTarget.attr("src", "");
        }).find(".modal-body").removeClass("no-effect");
      }
    })
    modalImgTarget.on("click", function (e) {
      e.stopPropagation();
    })

    // Counter Items
    if ($(".counters").length) {
      var viewed = false;
      setCounter();
      $(document).on("scroll", setCounter);
      /* A function to see if the element is visible on the page or not? */
      function checkViewedItem(item, customHeight = 0) {
        var eleOffset = $(item).offset().top;
        var docScroll = $(window).scrollTop();
        var navFixedHeight = $(".navbar.fixed").innerHeight();
        if (docScroll + $(window).height() > (eleOffset + customHeight) && (docScroll + navFixedHeight) < (eleOffset + $(item).height() - customHeight))
          return true;
      }
      /* Function to run the counter */
      function setCounter() {
        if (checkViewedItem(".counters") && !viewed) {
          if ($(".counters .counter").length) {
            $(".counter").each(function (_index, item) {
              if (checkViewedItem(item, $(item).height())) {
                $(item).prop("counter", 0).animate({
                  counter: $(item).text()
                },
                {
                  duration: 2000,
                  easing: "swing",
                  step: function (x) {
                    $(item).text(Math.ceil(x));
                  },
                  done: function () {
                    $(item).animate().stop(true).removeClass("counter");
                  }
                });
              }
            })
          } else {
            viewed = true;
            // console.log("Scrolling False");
          }
        }
      }
    }
});