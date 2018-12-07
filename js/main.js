Barba.Pjax.start();
Barba.Prefetch.init()

var transitionAnimation = Barba.BaseTransition.extend({
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
            .to(window, 1, {scrollTo:0})
            .set(".color-wipe", { display: 'block', y: "0%" })
            .staggerFromTo(".color-wipe", 1, { width: "0%" }, {
                width: "100%",
                ease: Power3.easeOut,
                onComplete: () => { deferred.resolve(); }
            }, 0.1,);
        return deferred.promise;
    },

    fadeIn: function () {
        $(window).scrollTop(0);
        var _this = this;
        var $el = $(this.newContainer);
        var outTransition = new TimelineMax();
        outTransition
            .set($(this.oldContainer), { display: "none", delay: 0.5 })
            .set($el, { visibility: "visible", opacity: 0 })
            .to($el, 0.1, {
                opacity: 1,
                onComplete: function () {
                    _this.done();
                    console.log("done");
                }
            })
            .staggerFromTo(".color-wipe", 1, { width: "100%" }, { width: "0px", ease: Power3.easeIn, delay: 0.2 }, 0.2)
            .set(".color-wipe", { display: 'none' });
    }
});

Barba.Pjax.getTransition = function () {
    return transitionAnimation;
};






