$(function () {
  // Show/Hide Menu in navbar
  $(".navbar-toggle").on("click", function () {
    $("nav.navbar").toggleClass("show");
    $(this).toggleClass("active");
  });

  // Fixed Header and Navbar and Top icon when position
  let startPosition = $(".img-fill").position().top + $(".img-fill").height();
  let bodyEle = $("body");
  let headerEle = $("header");
  let topEle = $("#top");
  if ($(document).scrollTop() >= startPosition) {
    bodyEle.css("margin-top", "120px");
    headerEle.addClass("fixed");
    topEle.fadeIn();
  }

  $(document).on("scroll", function () {
    // Fixed Header and Navbar and Top icon after scroll
    if ($(this).scrollTop() >= startPosition) {
      if (topEle.is(":hidden")) {
        bodyEle.css("margin-top", "120px");
        headerEle.addClass("fixed");
        topEle.fadeIn();
      }
    } else {
      if (topEle.is(":visible")) {
        bodyEle.css("margin-top", "0");
        headerEle.removeClass("fixed");
        topEle.fadeOut();
      }
    }
  });

  // Scroll document to up
  topEle.on("click" ,function (event) {
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
  $("#tabs li").each(function () {
    if ($(this).attr("aria-selected") == "true") {
      $("#" + $(this).attr("aria-control")).attr("aria-hidden", "false");
    }
    $(this).on("click", function () {
      if ($(this).attr("aria-selected") == "false") {
        $("#tabs .tab-content article").attr("aria-hidden", "true").hide();
        $("#tabs li").attr("aria-selected", "false");
        $(this).attr("aria-selected", "true");
        $("#" + $(this).attr("aria-control"))
          .fadeIn()
          .attr("aria-hidden", "false");
      }
    });
  });

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
        var navFixedHeight = $("header.fixed").innerHeight();
        if (docScroll + $(window).height() > (eleOffset + customHeight) && (docScroll + navFixedHeight) < (eleOffset + $(item).height() - customHeight))
          return true;
      }
      /* Function to run the counter */
      function setCounter() {
        if (checkViewedItem(".counters") && !viewed) {
          if ($(".counters .counter").length) {
            $(".counter").each(function (index, item) {
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