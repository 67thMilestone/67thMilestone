Barba.Pjax.start();
Barba.Prefetch.init()
let Elclass;

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
            .set(".color-wipe", { display: 'block', y: "0%" })
            .staggerFromTo(".color-wipe", 1, { width: "0%" }, {
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
            .staggerFromTo(".color-wipe", 1, { width: "100%" }, { width: "0px", ease: Power3.easeIn, delay: 0.2 }, 0.2)
            .set(".color-wipe", { display: 'none' })
            .to($el, 0.7, {
                opacity: 1,
                onComplete: function () {
                    _this.done();
                }
            }, "-=0.4");
    }
});

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
            .to(".Wipe", 1, { y: "0%", ease: Power3.easeIn, delay:"0.2" })
            .set($(this.oldContainer), { display: "none" },"-=0.1")
            .set($el, { visibility: "visible", opacity: 0 },"-=0.1")
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

Barba.Dispatcher.on('linkClicked', function (HTMLElement, MouseEvent) {
    Elclass = $(HTMLElement).attr('class');
    console.log("inside " + Elclass)
});

Barba.Pjax.getTransition = function () {
    console.log("outside " + Elclass)
    if (Elclass == "t1")
        return transitionAnimation1;
    return transitionAnimation2;
};