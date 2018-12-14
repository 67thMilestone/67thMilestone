$(document).ready(function () {
    Barba.Pjax.start();
    Barba.Prefetch.init();
    let Elclass;  //stores the class of link clicked for transition

    //options for smooth scrollbar
    let options = {  
        damping: 0.03,
        thumbMinSize: 20,
        continuousScrolling: false,
        alwaysShowTracks: false
    };
    
    let Scrollbar = window.Scrollbar;
    Scrollbar.init(document.querySelector('#scroller'), options); //initializing smooth scrollbar

    //five wipes transition
    var transitionAnimation1 = Barba.BaseTransition.extend({
        start: function () {
            Promise
                .all([this.newContainerLoading, this.startTransition()])
                .then(this.fadeIn.bind(this));
        },

        startTransition: function () {
            let deferred = Barba.Utils.deferred();
            $('html,body').animate({ scrollTop: 0 }, 'slow');
            var outTransition = new TimelineMax();
            outTransition
                //.to(window, 1, {scrollTo:0})
                .set(".white-wipe", { display: 'block', y: "0%" })
                .staggerFromTo(".white-wipe", 1, { width: "0%" }, {
                    width: "100%",
                    ease: Power3.easeOut,
                    onComplete: () => { deferred.resolve(); }
                }, 0.1);
            return deferred.promise;
        },

        fadeIn: function () {
            var _this = this;
            var $el = $(this.newContainer);
            var outTransition = new TimelineMax();
            outTransition
                .set($(this.oldContainer), { display: "none", delay: 0.5 })
                .set($el, { visibility: "visible", opacity: 0 })
                .staggerFromTo(".white-wipe", 1, { width: "100%" }, { width: "0px", ease: Power3.easeIn, delay: 0.2 }, 0.2)
                .set(".white-wipe", { display: 'none' })
                .to($el, 0.7, {
                    opacity: 1,
                    onComplete: function () {
                        _this.done();
                    }
                }, "-=0.4");
        }
    });

    //single wipes transition
    var transitionAnimation2 = Barba.BaseTransition.extend({
        start: function () {
            Promise
                .all([this.newContainerLoading, this.startTransition()])
                .then(this.fadeIn.bind(this));
        },

        startTransition: function () {
            let deferred = Barba.Utils.deferred();
            $('html,body').animate({ scrollTop: 0 }, 'slow');
            var outTransition = new TimelineMax();
            outTransition
                //.to(document.body, 1, {scrollTo: 0,})
                .set(".Wipe", { display: 'block', y: "-100%", onComplete: () => { deferred.resolve(); } })
            return deferred.promise;
        },

        fadeIn: function () {
            var _this = this;
            var $el = $(this.newContainer);
            var outTransition = new TimelineMax();
            outTransition
                .to(".Wipe", 1, { y: "0%", ease: Power3.easeIn, delay: "0.2" })
                .set($(this.oldContainer), { display: "none" }, "-=0.1")
                .set($el, { visibility: "visible", opacity: 0 }, "-=0.1")
                .to(".Wipe", 1, { y: "105%", ease: Sine.easeOut, })
                .to($el, 1, {
                    opacity: 1,
                    onStart: function () {
                        _this.done();
                    }
                }, "-=0.7")
                .set(".Wipe", { display: 'none' });
        }
    });

    //storing class of link clicked for transition to show different transition based on link clicked
    Barba.Dispatcher.on('linkClicked', function (HTMLElement, MouseEvent) {
        Elclass = $(HTMLElement).attr('class');
    });

    //returns transition to be used
    Barba.Pjax.getTransition = function () {
        if (Elclass == "t1")
            return transitionAnimation1;
        return transitionAnimation2;
    };

    //function to split a words into individual letters for applying animations
    function splitLetters($var) {
        $($var).each(function () {
            $(this).html(
                $(this)
                    .text()
                    .replace(/([^\x00-\xFF]|\w)/g, "<span class='letter'>$&</span>"),
            );
        });
    }
    splitLetters($('.animateText'));

    //tweens for text animations
    let textAnimation1 = TweenMax.staggerFromTo('.textAnimation1 .letter', 2.25, { opacity: 0 }, { opacity: 1, ease: Power4.easeInOut }, 0.15);
    let textAnimation2 = TweenMax.staggerFromTo('.textAnimation2 .letter', 0.75, { css: { transform: 'translateY(-100px)' } }, { css: { transform: 'translateY(0px)' }, ease: Expo.easeOut }, 0.05);
    let textAnimation3 = TweenMax.staggerFromTo('.textAnimation3 .letter', 1.4, { css: { transform: 'translateY(100px) translateZ(0)', opacity: 0 } }, { css: { transform: 'translateY(0px) translateZ(0)', opacity: 1 }, delay: 0.3, ease: Expo.easeOut }, 0.045);
    let textAnimation4 = TweenMax.staggerFromTo('.textAnimation4 .letter', 1.5, { css: { transform: 'scale(0)' } }, { css: { transform: 'scale(1)' }, ease: Elastic.easeOut.config(1, 0.3) }, 0.045);
    let textAnimation5 = TweenMax.staggerFromTo('.textAnimation5 .letter', 1.2, { css: { transform: 'translateX(40px) translateZ(0)', opacity: 0 } }, { css: { transform: 'translateX(0px) translateZ(0)', opacity: 1 }, ease: Expo.easeOut, delay: 0.5 }, 0.04);

    //creating a ScrollMagic.Controller instance
    let controller = new ScrollMagic.Controller();

    //adding scroll triggered text animations
    var scene = new ScrollMagic.Scene({
        triggerElement: ".textAnimation1",
        triggerHook: 1
    })
    .setTween(textAnimation1) // trigger a TweenMax.to tween
    .addTo(controller);
    var scene = new ScrollMagic.Scene({
        triggerElement: ".textAnimation2",
        triggerHook: 1
    })
    .setTween(textAnimation2) // trigger a TweenMax.to tween
    .addTo(controller);
    var scene = new ScrollMagic.Scene({
        triggerElement: ".textAnimation3",
        triggerHook: 1
    })
    .setTween(textAnimation3) // trigger a TweenMax.to tween
    .addTo(controller);
    var scene = new ScrollMagic.Scene({
        triggerElement: ".textAnimation4",
        triggerHook: 1
    })
    .setTween(textAnimation4) // trigger a TweenMax.to tween
    .addTo(controller);
    var scene = new ScrollMagic.Scene({
        triggerElement: ".textAnimation5",
        triggerHook: 1
    })
    .setTween(textAnimation5) // trigger a TweenMax.to tween
    .addTo(controller);
});