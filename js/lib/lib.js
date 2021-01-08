

///////////////////////////     fancybox   //////////////////////////////////////
// ==================================================
// fancyBox v3.1.25
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2017 fancyApps
//
// ==================================================
;(function (window, document, $, undefined) {
    'use strict';

    // If there's no jQuery, fancyBox can't work
    // =========================================

    if ( !$ ) {
        return;
    }

    // Check if fancyBox is already initialized
    // ========================================

    if ( $.fn.fancybox ) {

        $.error('fancyBox already initialized');

        return;
    }

    // Private default settings
    // ========================

    var defaults = {

        // Enable infinite gallery navigation
        loop : false,

        // Space around image, ignored if zoomed-in or viewport smaller than 800px
        margin : [44, 0],

        // Horizontal space between slides
        gutter : 50,

        // Enable keyboard navigation
        keyboard : true,

        // Should display navigation arrows at the screen edges
        arrows : true,

        // Should display infobar (counter and arrows at the top)
        infobar : true,

        // Should display toolbar (buttons at the top)
        toolbar : true,

        // What buttons should appear in the top right corner.
        // Buttons will be created using templates from `btnTpl` option
        // and they will be placed into toolbar (class="fancybox-toolbar"` element)
        buttons : [
            'slideShow',
            'fullScreen',
            'thumbs',
            'close'
        ],

        // Detect "idle" time in seconds
        idleTime : 4,

        // Should display buttons at top right corner of the content
        // If 'auto' - they will be created for content having type 'html', 'inline' or 'ajax'
        // Use template from `btnTpl.smallBtn` for customization
        smallBtn : 'auto',

        // Disable right-click and use simple image protection for images
        protect : false,

        // Shortcut to make content "modal" - disable keyboard navigtion, hide buttons, etc
        modal : false,

        image : {

            // Wait for images to load before displaying
            // Requires predefined image dimensions
            // If 'auto' - will zoom in thumbnail if 'width' and 'height' attributes are found
            preload : "auto",

        },

        ajax : {

            // Object containing settings for ajax request
            settings : {

                // This helps to indicate that request comes from the modal
                // Feel free to change naming
                data : {
                    fancybox : true
                }
            }

        },

        iframe : {

            // Iframe template
            tpl : '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',

            // Preload iframe before displaying it
            // This allows to calculate iframe content width and height
            // (note: Due to "Same Origin Policy", you can't get cross domain data).
            preload : true,

            // Custom CSS styling for iframe wrapping element
            // You can use this to set custom iframe dimensions
            css : {},

            // Iframe tag attributes
            attr : {
                scrolling : 'auto'
            }

        },

        // Open/close animation type
        // Possible values:
        //   false            - disable
        //   "zoom"           - zoom images from/to thumbnail
        //   "fade"
        //   "zoom-in-out"
        //
        animationEffect : "zoom",

        // Duration in ms for open/close animation
        animationDuration : 366,

        // Should image change opacity while zooming
        // If opacity is 'auto', then opacity will be changed if image and thumbnail have different aspect ratios
        zoomOpacity : 'auto',

        // Transition effect between slides
        //
        // Possible values:
        //   false            - disable
        //   "fade'
        //   "slide'
        //   "circular'
        //   "tube'
        //   "zoom-in-out'
        //   "rotate'
        //
        transitionEffect : "fade",

        // Duration in ms for transition animation
        transitionDuration : 366,

        // Custom CSS class for slide element
        slideClass : '',

        // Custom CSS class for layout
        baseClass : '',

        // Base template for layout
        baseTpl	:
        '<div class="fancybox-container" role="dialog" tabindex="-1">' +
        '<div class="fancybox-bg"></div>' +
        '<div class="fancybox-inner">' +
        '<div class="fancybox-infobar">' +
        '<button data-fancybox-prev title="{{PREV}}" class="fancybox-button fancybox-button--left"></button>' +
        '<div class="fancybox-infobar__body">' +
        '<span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span>' +
        '</div>' +
        '<button data-fancybox-next title="{{NEXT}}" class="fancybox-button fancybox-button--right"></button>' +
        '</div>' +
        '<div class="fancybox-toolbar">' +
        '{{BUTTONS}}' +
        '</div>' +
        '<div class="fancybox-navigation">' +
        '<button data-fancybox-prev title="{{PREV}}" class="fancybox-arrow fancybox-arrow--left" />' +
        '<button data-fancybox-next title="{{NEXT}}" class="fancybox-arrow fancybox-arrow--right" />' +
        '</div>' +
        '<div class="fancybox-stage"></div>' +
        '<div class="fancybox-caption-wrap">' +
        '<div class="fancybox-caption"></div>' +
        '</div>' +
        '</div>' +
        '</div>',

        // Loading indicator template
        spinnerTpl : '<div class="fancybox-loading"></div>',

        // Error message template
        errorTpl : '<div class="fancybox-error"><p>{{ERROR}}<p></div>',

        btnTpl : {
            slideShow  : '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"></button>',
            fullScreen : '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"></button>',
            thumbs     : '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"></button>',
            close      : '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"></button>',

            // This small close button will be appended to your html/inline/ajax content by default,
            // if "smallBtn" option is not set to false
            smallBtn   : '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"></button>'
        },

        // Container is injected into this element
        parentEl : 'body',


        // Focus handling
        // ==============

        // Try to focus on the first focusable element after opening
        autoFocus : true,

        // Put focus back to active element after closing
        backFocus : true,

        // Do not let user to focus on element outside modal content
        trapFocus : true,


        // Module specific options
        // =======================

        fullScreen : {
            autoStart : false,
        },

        touch : {
            vertical : true,  // Allow to drag content vertically
            momentum : true   // Continue movement after releasing mouse/touch when panning
        },

        // Hash value when initializing manually,
        // set `false` to disable hash change
        hash : null,

        // Customize or add new media types
        // Example:
        /*
        media : {
            youtube : {
                params : {
                    autoplay : 0
                }
            }
        }
        */
        media : {},

        slideShow : {
            autoStart : false,
            speed     : 4000
        },

        thumbs : {
            autoStart   : false,   // Display thumbnails on opening
            hideOnClose : true     // Hide thumbnail grid when closing animation starts
        },

        // Callbacks
        //==========

        // See Documentation/API/Events for more information
        // Example:
        /*
            afterShow: function( instance, current ) {
                 console.info( 'Clicked element:' );
                 console.info( current.opts.$orig );
            }
        */

        onInit       : $.noop,  // When instance has been initialized

        beforeLoad   : $.noop,  // Before the content of a slide is being loaded
        afterLoad    : $.noop,  // When the content of a slide is done loading

        beforeShow   : $.noop,  // Before open animation starts
        afterShow    : $.noop,  // When content is done loading and animating

        beforeClose  : $.noop,  // Before the instance attempts to close. Return false to cancel the close.
        afterClose   : $.noop,  // After instance has been closed

        onActivate   : $.noop,  // When instance is brought to front
        onDeactivate : $.noop,  // When other instance has been activated


        // Interaction
        // ===========

        // Use options below to customize taken action when user clicks or double clicks on the fancyBox area,
        // each option can be string or method that returns value.
        //
        // Possible values:
        //   "close"           - close instance
        //   "next"            - move to next gallery item
        //   "nextOrClose"     - move to next gallery item or close if gallery has only one item
        //   "toggleControls"  - show/hide controls
        //   "zoom"            - zoom image (if loaded)
        //   false             - do nothing

        // Clicked on the content
        clickContent : function( current, event ) {
            return current.type === 'image' ? 'zoom' : false;
        },

        // Clicked on the slide
        clickSlide : 'close',

        // Clicked on the background (backdrop) element
        clickOutside : 'close',

        // Same as previous two, but for double click
        dblclickContent : false,
        dblclickSlide   : false,
        dblclickOutside : false,


        // Custom options when mobile device is detected
        // =============================================

        mobile : {
            clickContent : function( current, event ) {
                return current.type === 'image' ? 'toggleControls' : false;
            },
            clickSlide : function( current, event ) {
                return current.type === 'image' ? 'toggleControls' : "close";
            },
            dblclickContent : function( current, event ) {
                return current.type === 'image' ? 'zoom' : false;
            },
            dblclickSlide : function( current, event ) {
                return current.type === 'image' ? 'zoom' : false;
            }
        },


        // Internationalization
        // ============

        lang : 'en',
        i18n : {
            'en' : {
                CLOSE       : 'Close',
                NEXT        : 'Next',
                PREV        : 'Previous',
                ERROR       : 'The requested content cannot be loaded. <br/> Please try again later.',
                PLAY_START  : 'Start slideshow',
                PLAY_STOP   : 'Pause slideshow',
                FULL_SCREEN : 'Full screen',
                THUMBS      : 'Thumbnails'
            },
            'de' : {
                CLOSE       : 'Schliessen',
                NEXT        : 'Weiter',
                PREV        : 'Zurück',
                ERROR       : 'Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.',
                PLAY_START  : 'Diaschau starten',
                PLAY_STOP   : 'Diaschau beenden',
                FULL_SCREEN : 'Vollbild',
                THUMBS      : 'Vorschaubilder'
            }
        }

    };

    // Few useful variables and methods
    // ================================

    var $W = $(window);
    var $D = $(document);

    var called = 0;


    // Check if an object is a jQuery object and not a native JavaScript object
    // ========================================================================

    var isQuery = function ( obj ) {
        return obj && obj.hasOwnProperty && obj instanceof $;
    };


    // Handle multiple browsers for "requestAnimationFrame" and "cancelAnimationFrame"
    // ===============================================================================

    var requestAFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            // if all else fails, use setTimeout
            function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            };
    })();


    // Detect the supported transition-end event property name
    // =======================================================

    var transitionEnd = (function () {
        var t, el = document.createElement("fakeelement");

        var transitions = {
            "transition"      : "transitionend",
            "OTransition"     : "oTransitionEnd",
            "MozTransition"   : "transitionend",
            "WebkitTransition": "webkitTransitionEnd"
        };

        for (t in transitions) {
            if (el.style[t] !== undefined){
                return transitions[t];
            }
        }
    })();


    // Force redraw on an element.
    // This helps in cases where the browser doesn't redraw an updated element properly.
    // =================================================================================

    var forceRedraw = function( $el ) {
        return ( $el && $el.length && $el[0].offsetHeight );
    };


    // Class definition
    // ================

    var FancyBox = function( content, opts, index ) {
        var self = this;

        self.opts  = $.extend( true, { index : index }, defaults, opts || {} );

        // Exclude buttons option from deep merging
        if ( opts && $.isArray( opts.buttons ) ) {
            self.opts.buttons = opts.buttons;
        }

        self.id    = self.opts.id || ++called;
        self.group = [];

        self.currIndex = parseInt( self.opts.index, 10 ) || 0;
        self.prevIndex = null;

        self.prevPos = null;
        self.currPos = 0;

        self.firstRun = null;

        // Create group elements from original item collection
        self.createGroup( content );

        if ( !self.group.length ) {
            return;
        }

        // Save last active element and current scroll position
        self.$lastFocus = $(document.activeElement).blur();

        // Collection of gallery objects
        self.slides = {};

        self.init( content );

    };

    $.extend(FancyBox.prototype, {

        // Create DOM structure
        // ====================

        init : function() {
            var self = this;

            var testWidth, $container, buttonStr;

            var firstItemOpts = self.group[ self.currIndex ].opts;

            self.scrollTop  = $D.scrollTop();
            self.scrollLeft = $D.scrollLeft();


            // Hide scrollbars
            // ===============

            if ( !$.fancybox.getInstance() && !$.fancybox.isMobile && $( 'body' ).css('overflow') !== 'hidden' ) {
                testWidth = $( 'body' ).width();

                $( 'html' ).addClass( 'fancybox-enabled' );

                // Compare body width after applying "overflow: hidden"
                testWidth = $( 'body' ).width() - testWidth;

                // If width has changed - compensate missing scrollbars by adding right margin
                if ( testWidth > 1 ) {
                    $( 'head' ).append( '<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar, .fancybox-enabled body { margin-right: ' + testWidth + 'px; }</style>' );
                }
            }


            // Build html markup and set references
            // ====================================

            // Build html code for buttons and insert into main template
            buttonStr = '';

            $.each( firstItemOpts.buttons, function( index, value ) {
                buttonStr += ( firstItemOpts.btnTpl[ value ] || '' );
            });

            // Create markup from base template, it will be initially hidden to
            // avoid unnecessary work like painting while initializing is not complete
            $container = $( self.translate( self, firstItemOpts.baseTpl.replace( '\{\{BUTTONS\}\}', buttonStr ) ) )
                .addClass( 'fancybox-is-hidden' )
                .attr('id', 'fancybox-container-' + self.id)
                .addClass( firstItemOpts.baseClass )
                .data( 'FancyBox', self )
                .prependTo( firstItemOpts.parentEl );

            // Create object holding references to jQuery wrapped nodes
            self.$refs = {
                container : $container
            };

            [ 'bg', 'inner', 'infobar', 'toolbar', 'stage', 'caption' ].forEach(function(item) {
                self.$refs[ item ] = $container.find( '.fancybox-' + item );
            });

            // Check for redundant elements
            if ( !firstItemOpts.arrows || self.group.length < 2 ) {
                $container.find('.fancybox-navigation').remove();
            }

            if ( !firstItemOpts.infobar ) {
                self.$refs.infobar.remove();
            }

            if ( !firstItemOpts.toolbar ) {
                self.$refs.toolbar.remove();
            }

            self.trigger( 'onInit' );

            // Bring to front and enable events
            self.activate();

            // Build slides, load and reveal content
            self.jumpTo( self.currIndex );
        },


        // Simple i18n support - replaces object keys found in template
        // with corresponding values
        // ============================================================

        translate : function( obj, str ) {
            var arr = obj.opts.i18n[ obj.opts.lang ];

            return str.replace(/\{\{(\w+)\}\}/g, function(match, n) {
                var value = arr[n];

                if ( value === undefined ) {
                    return match;
                }

                return value;
            });
        },

        // Create array of gally item objects
        // Check if each object has valid type and content
        // ===============================================

        createGroup : function ( content ) {
            var self  = this;
            var items = $.makeArray( content );

            $.each(items, function( i, item ) {
                var obj  = {},
                    opts = {},
                    data = [],
                    $item,
                    type,
                    src,
                    srcParts;

                // Step 1 - Make sure we have an object
                // ====================================

                if ( $.isPlainObject( item ) ) {

                    // We probably have manual usage here, something like
                    // $.fancybox.open( [ { src : "image.jpg", type : "image" } ] )

                    obj  = item;
                    opts = item.opts || item;

                } else if ( $.type( item ) === 'object' && $( item ).length ) {

                    // Here we propbably have jQuery collection returned by some selector

                    $item = $( item );
                    data  = $item.data();

                    opts = 'options' in data ? data.options : {};
                    opts = $.type( opts ) === 'object' ? opts : {};

                    obj.src  = 'src' in data ? data.src : ( opts.src || $item.attr( 'href' ) );

                    [ 'width', 'height', 'thumb', 'type', 'filter' ].forEach(function(item) {
                        if ( item in data ) {
                            opts[ item ] = data[ item ];
                        }
                    });

                    if ( 'srcset' in data ) {
                        opts.image = { srcset : data.srcset };
                    }

                    opts.$orig = $item;

                    if ( !obj.type && !obj.src ) {
                        obj.type = 'inline';
                        obj.src  = item;
                    }

                } else {

                    // Assume we have a simple html code, for example:
                    // $.fancybox.open( '<div><h1>Hi!</h1></div>' );

                    obj = {
                        type : 'html',
                        src  : item + ''
                    };

                }

                // Each gallery object has full collection of options
                obj.opts = $.extend( true, {}, self.opts, opts );

                if ( $.fancybox.isMobile ) {
                    obj.opts = $.extend( true, {}, obj.opts, obj.opts.mobile );
                }


                // Step 2 - Make sure we have content type, if not - try to guess
                // ==============================================================

                type = obj.type || obj.opts.type;
                src  = obj.src || '';

                if ( !type && src ) {
                    if ( src.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ) {
                        type = 'image';

                    } else if ( src.match(/\.(pdf)((\?|#).*)?$/i) ) {
                        type = 'pdf';

                    } else if ( src.charAt(0) === '#' ) {
                        type = 'inline';
                    }
                }

                obj.type = type;


                // Step 3 - Some adjustments
                // =========================

                obj.index = self.group.length;

                // Check if $orig and $thumb objects exist
                if ( obj.opts.$orig && !obj.opts.$orig.length ) {
                    delete obj.opts.$orig;
                }

                if ( !obj.opts.$thumb && obj.opts.$orig ) {
                    obj.opts.$thumb = obj.opts.$orig.find( 'img:first' );
                }

                if ( obj.opts.$thumb && !obj.opts.$thumb.length ) {
                    delete obj.opts.$thumb;
                }

                // Caption is a "special" option, it can be passed as a method
                if ( $.type( obj.opts.caption ) === 'function' ) {
                    obj.opts.caption = obj.opts.caption.apply( item, [ self, obj ] );

                } else if ( 'caption' in data ) {
                    obj.opts.caption = data.caption;
                }

                // Make sure we have caption as a string
                obj.opts.caption = obj.opts.caption === undefined ? '' : obj.opts.caption + '';

                // Check if url contains "filter" used to filter the content
                // Example: "ajax.html #something"
                if ( type === 'ajax' ) {
                    srcParts = src.split(/\s+/, 2);

                    if ( srcParts.length > 1 ) {
                        obj.src = srcParts.shift();

                        obj.opts.filter = srcParts.shift();
                    }
                }

                if ( obj.opts.smallBtn == 'auto' ) {

                    if ( $.inArray( type, ['html', 'inline', 'ajax'] ) > -1 ) {
                        obj.opts.toolbar  = false;
                        obj.opts.smallBtn = true;

                    } else {
                        obj.opts.smallBtn = false;
                    }

                }

                // If the type is "pdf", then simply load file into iframe
                if ( type === 'pdf' ) {
                    obj.type = 'iframe';

                    obj.opts.iframe.preload = false;
                }

                // Hide all buttons and disable interactivity for modal items
                if ( obj.opts.modal ) {

                    obj.opts = $.extend(true, obj.opts, {
                        // Remove buttons
                        infobar : 0,
                        toolbar : 0,

                        smallBtn : 0,

                        // Disable keyboard navigation
                        keyboard : 0,

                        // Disable some modules
                        slideShow  : 0,
                        fullScreen : 0,
                        thumbs     : 0,
                        touch      : 0,

                        // Disable click event handlers
                        clickContent    : false,
                        clickSlide      : false,
                        clickOutside    : false,
                        dblclickContent : false,
                        dblclickSlide   : false,
                        dblclickOutside : false
                    });

                }

                // Step 4 - Add processed object to group
                // ======================================

                self.group.push( obj );

            });

        },


        // Attach an event handler functions for:
        //   - navigation buttons
        //   - browser scrolling, resizing;
        //   - focusing
        //   - keyboard
        //   - detect idle
        // ======================================

        addEvents : function() {
            var self = this;

            self.removeEvents();

            // Make navigation elements clickable
            self.$refs.container.on('click.fb-close', '[data-fancybox-close]', function(e) {
                e.stopPropagation();
                e.preventDefault();

                self.close( e );

            }).on( 'click.fb-prev touchend.fb-prev', '[data-fancybox-prev]', function(e) {
                e.stopPropagation();
                e.preventDefault();

                self.previous();

            }).on( 'click.fb-next touchend.fb-next', '[data-fancybox-next]', function(e) {
                e.stopPropagation();
                e.preventDefault();

                self.next();

            });


            // Handle page scrolling and browser resizing
            $W.on('orientationchange.fb resize.fb', function(e) {

                if ( e && e.originalEvent && e.originalEvent.type === "resize" ) {

                    requestAFrame(function() {
                        self.update();
                    });

                } else {

                    self.$refs.stage.hide();

                    setTimeout(function() {
                        self.$refs.stage.show();

                        self.update();
                    }, 500);

                }

            });

            // Trap keyboard focus inside of the modal, so the user does not accidentally tab outside of the modal
            // (a.k.a. "escaping the modal")
            $D.on('focusin.fb', function(e) {
                var instance = $.fancybox ? $.fancybox.getInstance() : null;

                if ( instance.isClosing || !instance.current || !instance.current.opts.trapFocus || $( e.target ).hasClass( 'fancybox-container' ) || $( e.target ).is( document ) ) {
                    return;
                }

                if ( instance && $( e.target ).css( 'position' ) !== 'fixed' && !instance.$refs.container.has( e.target ).length ) {
                    e.stopPropagation();

                    instance.focus();

                    // Sometimes page gets scrolled, set it back
                    $W.scrollTop( self.scrollTop ).scrollLeft( self.scrollLeft );
                }
            });


            // Enable keyboard navigation
            $D.on('keydown.fb', function (e) {
                var current = self.current,
                    keycode = e.keyCode || e.which;

                if ( !current || !current.opts.keyboard ) {
                    return;
                }

                if ( $(e.target).is('input') || $(e.target).is('textarea') ) {
                    return;
                }

                // Backspace and Esc keys
                if ( keycode === 8 || keycode === 27 ) {
                    e.preventDefault();

                    self.close( e );

                    return;
                }

                // Left arrow and Up arrow
                if ( keycode === 37 || keycode === 38 ) {
                    e.preventDefault();

                    self.previous();

                    return;
                }

                // Righ arrow and Down arrow
                if ( keycode === 39 || keycode === 40 ) {
                    e.preventDefault();

                    self.next();

                    return;
                }

                self.trigger('afterKeydown', e, keycode);
            });


            // Hide controls after some inactivity period
            if ( self.group[ self.currIndex ].opts.idleTime ) {
                self.idleSecondsCounter = 0;

                $D.on('mousemove.fb-idle mouseenter.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle', function() {
                    self.idleSecondsCounter = 0;

                    if ( self.isIdle ) {
                        self.showControls();
                    }

                    self.isIdle = false;
                });

                self.idleInterval = window.setInterval(function() {

                    self.idleSecondsCounter++;

                    if ( self.idleSecondsCounter >= self.group[ self.currIndex ].opts.idleTime ) {
                        self.isIdle = true;
                        self.idleSecondsCounter = 0;

                        self.hideControls();
                    }

                }, 1000);
            }

        },


        // Remove events added by the core
        // ===============================

        removeEvents : function () {
            var self = this;

            $W.off( 'orientationchange.fb resize.fb' );
            $D.off( 'focusin.fb keydown.fb .fb-idle' );

            this.$refs.container.off( '.fb-close .fb-prev .fb-next' );

            if ( self.idleInterval ) {
                window.clearInterval( self.idleInterval );

                self.idleInterval = null;
            }
        },


        // Change to previous gallery item
        // ===============================

        previous : function( duration ) {
            return this.jumpTo( this.currPos - 1, duration );
        },


        // Change to next gallery item
        // ===========================

        next : function( duration ) {
            return this.jumpTo( this.currPos + 1, duration );
        },


        // Switch to selected gallery item
        // ===============================

        jumpTo : function ( pos, duration, slide ) {
            var self = this,
                firstRun,
                loop,
                current,
                previous,
                canvasWidth,
                currentPos,
                transitionProps;

            var groupLen = self.group.length;

            if ( self.isSliding || self.isClosing || ( self.isAnimating && self.firstRun ) ) {
                return;
            }

            pos  = parseInt( pos, 10 );
            loop = self.current ? self.current.opts.loop : self.opts.loop;

            if ( !loop && ( pos < 0 || pos >= groupLen ) ) {
                return false;
            }

            firstRun = self.firstRun = ( self.firstRun === null );

            if ( groupLen < 2 && !firstRun && !!self.isSliding ) {
                return;
            }

            previous = self.current;

            self.prevIndex = self.currIndex;
            self.prevPos   = self.currPos;

            // Create slides
            current = self.createSlide( pos );

            if ( groupLen > 1 ) {
                if ( loop || current.index > 0 ) {
                    self.createSlide( pos - 1 );
                }

                if ( loop || current.index < groupLen - 1 ) {
                    self.createSlide( pos + 1 );
                }
            }

            self.current   = current;
            self.currIndex = current.index;
            self.currPos   = current.pos;

            self.trigger( 'beforeShow', firstRun );

            self.updateControls();

            currentPos = $.fancybox.getTranslate( current.$slide );

            current.isMoved        = ( currentPos.left !== 0 || currentPos.top !== 0 ) && !current.$slide.hasClass( 'fancybox-animated' );
            current.forcedDuration = undefined;

            if ( $.isNumeric( duration ) ) {
                current.forcedDuration = duration;
            } else {
                duration = current.opts[ firstRun ? 'animationDuration' : 'transitionDuration' ];
            }

            duration = parseInt( duration, 10 );

            // Fresh start - reveal container, current slide and start loading content
            if ( firstRun ) {

                if ( current.opts.animationEffect && duration ) {
                    self.$refs.container.css( 'transition-duration', duration + 'ms' );
                }

                self.$refs.container.removeClass( 'fancybox-is-hidden' );

                forceRedraw( self.$refs.container );

                self.$refs.container.addClass( 'fancybox-is-open' );

                // Make first slide visible (to display loading icon, if needed)
                current.$slide.addClass( 'fancybox-slide--current' );

                self.loadSlide( current );

                self.preload();

                return;
            }

            // Clean up
            $.each(self.slides, function( index, slide ) {
                $.fancybox.stop( slide.$slide );
            });

            // Make current that slide is visible even if content is still loading
            current.$slide.removeClass( 'fancybox-slide--next fancybox-slide--previous' ).addClass( 'fancybox-slide--current' );

            // If slides have been dragged, animate them to correct position
            if ( current.isMoved ) {
                canvasWidth = Math.round( current.$slide.width() );

                $.each(self.slides, function( index, slide ) {
                    var pos = slide.pos - current.pos;

                    $.fancybox.animate( slide.$slide, {
                        top  : 0,
                        left : ( pos * canvasWidth ) + ( pos * slide.opts.gutter )
                    }, duration, function() {

                        slide.$slide.removeAttr('style').removeClass( 'fancybox-slide--next fancybox-slide--previous' );

                        if ( slide.pos === self.currPos ) {
                            current.isMoved = false;

                            self.complete();
                        }
                    });
                });

            } else {
                self.$refs.stage.children().removeAttr( 'style' );
            }

            // Start transition that reveals current content
            // or wait when it will be loaded

            if ( current.isLoaded ) {
                self.revealContent( current );

            } else {
                self.loadSlide( current );
            }

            self.preload();

            if ( previous.pos === current.pos ) {
                return;
            }

            // Handle previous slide
            // =====================

            transitionProps = 'fancybox-slide--' + ( previous.pos > current.pos ? 'next' : 'previous' );

            previous.$slide.removeClass( 'fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous' );

            previous.isComplete = false;

            if ( !duration || ( !current.isMoved && !current.opts.transitionEffect ) ) {
                return;
            }

            if ( current.isMoved ) {
                previous.$slide.addClass( transitionProps );

            } else {

                transitionProps = 'fancybox-animated ' + transitionProps + ' fancybox-fx-' + current.opts.transitionEffect;

                $.fancybox.animate( previous.$slide, transitionProps, duration, function() {
                    previous.$slide.removeClass( transitionProps ).removeAttr( 'style' );
                });

            }

        },


        // Create new "slide" element
        // These are gallery items  that are actually added to DOM
        // =======================================================

        createSlide : function( pos ) {

            var self = this;
            var $slide;
            var index;

            index = pos % self.group.length;
            index = index < 0 ? self.group.length + index : index;

            if ( !self.slides[ pos ] && self.group[ index ] ) {
                $slide = $('<div class="fancybox-slide"></div>').appendTo( self.$refs.stage );

                self.slides[ pos ] = $.extend( true, {}, self.group[ index ], {
                    pos      : pos,
                    $slide   : $slide,
                    isLoaded : false,
                });

                self.updateSlide( self.slides[ pos ] );
            }

            return self.slides[ pos ];
        },


        // Scale image to the actual size of the image
        // ===========================================

        scaleToActual : function( x, y, duration ) {

            var self = this;

            var current = self.current;
            var $what   = current.$content;

            var imgPos, posX, posY, scaleX, scaleY;

            var canvasWidth  = parseInt( current.$slide.width(), 10 );
            var canvasHeight = parseInt( current.$slide.height(), 10 );

            var newImgWidth  = current.width;
            var newImgHeight = current.height;

            if ( !( current.type == 'image' && !current.hasError) || !$what || self.isAnimating) {
                return;
            }

            $.fancybox.stop( $what );

            self.isAnimating = true;

            x = x === undefined ? canvasWidth  * 0.5  : x;
            y = y === undefined ? canvasHeight * 0.5  : y;

            imgPos = $.fancybox.getTranslate( $what );

            scaleX  = newImgWidth  / imgPos.width;
            scaleY  = newImgHeight / imgPos.height;

            // Get center position for original image
            posX = ( canvasWidth * 0.5  - newImgWidth * 0.5 );
            posY = ( canvasHeight * 0.5 - newImgHeight * 0.5 );

            // Make sure image does not move away from edges
            if ( newImgWidth > canvasWidth ) {
                posX = imgPos.left * scaleX - ( ( x * scaleX ) - x );

                if ( posX > 0 ) {
                    posX = 0;
                }

                if ( posX <  canvasWidth - newImgWidth ) {
                    posX = canvasWidth - newImgWidth;
                }
            }

            if ( newImgHeight > canvasHeight) {
                posY = imgPos.top  * scaleY - ( ( y * scaleY ) - y );

                if ( posY > 0 ) {
                    posY = 0;
                }

                if ( posY <  canvasHeight - newImgHeight ) {
                    posY = canvasHeight - newImgHeight;
                }
            }

            self.updateCursor( newImgWidth, newImgHeight );

            $.fancybox.animate( $what, {
                top    : posY,
                left   : posX,
                scaleX : scaleX,
                scaleY : scaleY
            }, duration || 330, function() {
                self.isAnimating = false;
            });

            // Stop slideshow
            if ( self.SlideShow && self.SlideShow.isActive ) {
                self.SlideShow.stop();
            }
        },


        // Scale image to fit inside parent element
        // ========================================

        scaleToFit : function( duration ) {

            var self = this;

            var current = self.current;
            var $what   = current.$content;
            var end;

            if ( !( current.type == 'image' && !current.hasError) || !$what || self.isAnimating ) {
                return;
            }

            $.fancybox.stop( $what );

            self.isAnimating = true;

            end = self.getFitPos( current );

            self.updateCursor( end.width, end.height );

            $.fancybox.animate( $what, {
                top    : end.top,
                left   : end.left,
                scaleX : end.width  / $what.width(),
                scaleY : end.height / $what.height()
            }, duration || 330, function() {
                self.isAnimating = false;
            });

        },

        // Calculate image size to fit inside viewport
        // ===========================================

        getFitPos : function( slide ) {
            var self  = this;
            var $what = slide.$content;

            var imgWidth  = slide.width;
            var imgHeight = slide.height;

            var margin = slide.opts.margin;

            var canvasWidth, canvasHeight, minRatio, width, height;

            if ( !$what || !$what.length || ( !imgWidth && !imgHeight) ) {
                return false;
            }

            // Convert "margin to CSS style: [ top, right, bottom, left ]
            if ( $.type( margin ) === "number" ) {
                margin = [ margin, margin ];
            }

            if ( margin.length == 2 ) {
                margin = [ margin[0], margin[1], margin[0], margin[1] ];
            }

            if ( $W.width() < 800 ) {
                margin = [ 0, 0, 0, 0 ];
            }

            // We can not use $slide width here, because it can have different diemensions while in transiton
            canvasWidth  = parseInt( self.$refs.stage.width(), 10 )  - ( margin[ 1 ] + margin[ 3 ] );
            canvasHeight = parseInt( self.$refs.stage.height(), 10 ) - ( margin[ 0 ] + margin[ 2 ] );

            minRatio = Math.min(1, canvasWidth / imgWidth, canvasHeight / imgHeight );

            width  = Math.floor( minRatio * imgWidth );
            height = Math.floor( minRatio * imgHeight );

            // Use floor rounding to make sure it really fits
            return {
                top    : Math.floor( ( canvasHeight - height ) * 0.5 ) + margin[ 0 ],
                left   : Math.floor( ( canvasWidth  - width )  * 0.5 ) + margin[ 3 ],
                width  : width,
                height : height
            };

        },


        // Update position and content of all slides
        // =========================================

        update : function() {

            var self = this;

            $.each( self.slides, function( key, slide ) {
                self.updateSlide( slide );
            });

        },


        // Update slide position and scale content to fit
        // ==============================================

        updateSlide : function( slide ) {

            var self  = this;
            var $what = slide.$content;

            if ( $what && ( slide.width || slide.height ) ) {
                $.fancybox.stop( $what );

                $.fancybox.setTranslate( $what, self.getFitPos( slide ) );

                if ( slide.pos === self.currPos ) {
                    self.updateCursor();
                }
            }

            slide.$slide.trigger( 'refresh' );

            self.trigger( 'onUpdate', slide );

        },

        // Update cursor style depending if content can be zoomed
        // ======================================================

        updateCursor : function( nextWidth, nextHeight ) {

            var self = this;
            var isScaledDown;

            var $container = self.$refs.container.removeClass('fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut');

            if ( !self.current || self.isClosing ) {
                return;
            }

            if ( self.isZoomable() ) {

                $container.addClass( 'fancybox-is-zoomable' );

                if ( nextWidth !== undefined && nextHeight !== undefined ) {
                    isScaledDown = nextWidth < self.current.width && nextHeight < self.current.height;

                } else {
                    isScaledDown = self.isScaledDown();
                }

                if ( isScaledDown ) {

                    // If image is scaled down, then, obviously, it can be zoomed to full size
                    $container.addClass('fancybox-can-zoomIn');

                } else {

                    if ( self.current.opts.touch ) {

                        // If image size ir largen than available available and touch module is not disable,
                        // then user can do panning
                        $container.addClass('fancybox-can-drag');

                    } else {
                        $container.addClass('fancybox-can-zoomOut');
                    }

                }

            } else if ( self.current.opts.touch ) {
                $container.addClass('fancybox-can-drag');
            }

        },


        // Check if current slide is zoomable
        // ==================================

        isZoomable : function() {

            var self = this;

            var current = self.current;
            var fitPos;

            if ( !current || self.isClosing ) {
                return;
            }

            // Assume that slide is zoomable if
            //   - image is loaded successfuly
            //   - click action is "zoom"
            //   - actual size of the image is smaller than available area
            if ( current.type === 'image' && current.isLoaded && !current.hasError &&
                ( current.opts.clickContent === 'zoom' || ( $.isFunction( current.opts.clickContent ) && current.opts.clickContent( current ) ===  "zoom" ) )
            ) {

                fitPos = self.getFitPos( current );

                if ( current.width > fitPos.width || current.height > fitPos.height ) {
                    return true;
                }

            }

            return false;

        },


        // Check if current image dimensions are smaller than actual
        // =========================================================

        isScaledDown : function() {

            var self = this;

            var current = self.current;
            var $what   = current.$content;

            var rez = false;

            if ( $what ) {
                rez = $.fancybox.getTranslate( $what );
                rez = rez.width < current.width || rez.height < current.height;
            }

            return rez;

        },


        // Check if image dimensions exceed parent element
        // ===============================================

        canPan : function() {

            var self = this;

            var current = self.current;
            var $what   = current.$content;

            var rez = false;

            if ( $what ) {
                rez = self.getFitPos( current );
                rez = Math.abs( $what.width() - rez.width ) > 1  || Math.abs( $what.height() - rez.height ) > 1;

            }

            return rez;

        },


        // Load content into the slide
        // ===========================

        loadSlide : function( slide ) {

            var self = this, type, $slide;
            var ajaxLoad;

            if ( slide.isLoading ) {
                return;
            }

            if ( slide.isLoaded ) {
                return;
            }

            slide.isLoading = true;

            self.trigger( 'beforeLoad', slide );

            type   = slide.type;
            $slide = slide.$slide;

            $slide
                .off( 'refresh' )
                .trigger( 'onReset' )
                .addClass( 'fancybox-slide--' + ( type || 'unknown' ) )
                .addClass( slide.opts.slideClass );

            // Create content depending on the type

            switch ( type ) {

                case 'image':

                    self.setImage( slide );

                    break;

                case 'iframe':

                    self.setIframe( slide );

                    break;

                case 'html':

                    self.setContent( slide, slide.src || slide.content );

                    break;

                case 'inline':

                    if ( $( slide.src ).length ) {
                        self.setContent( slide, $( slide.src ) );

                    } else {
                        self.setError( slide );
                    }

                    break;

                case 'ajax':

                    self.showLoading( slide );

                    ajaxLoad = $.ajax( $.extend( {}, slide.opts.ajax.settings, {
                        url : slide.src,
                        success : function ( data, textStatus ) {

                            if ( textStatus === 'success' ) {
                                self.setContent( slide, data );
                            }

                        },
                        error : function ( jqXHR, textStatus ) {

                            if ( jqXHR && textStatus !== 'abort' ) {
                                self.setError( slide );
                            }

                        }
                    }));

                    $slide.one( 'onReset', function () {
                        ajaxLoad.abort();
                    });

                    break;

                default:

                    self.setError( slide );

                    break;

            }

            return true;

        },


        // Use thumbnail image, if possible
        // ================================

        setImage : function( slide ) {

            var self   = this;
            var srcset = slide.opts.image.srcset;

            var found, temp, pxRatio, windowWidth;

            // If we have "srcset", then we need to find matching "src" value.
            // This is necessary, because when you set an src attribute, the browser will preload the image
            // before any javascript or even CSS is applied.
            if ( srcset ) {
                pxRatio     = window.devicePixelRatio || 1;
                windowWidth = window.innerWidth  * pxRatio;

                temp = srcset.split(',').map(function ( el ) {
                    var ret = {};

                    el.trim().split(/\s+/).forEach(function ( el, i ) {
                        var value = parseInt( el.substring(0, el.length - 1), 10 );

                        if ( i === 0 ) {
                            return ( ret.url = el );
                        }

                        if ( value ) {
                            ret.value   = value;
                            ret.postfix = el[ el.length - 1 ];
                        }

                    });

                    return ret;
                });

                // Sort by value
                temp.sort(function (a, b) {
                    return a.value - b.value;
                });

                // Ok, now we have an array of all srcset values
                for ( var j = 0; j < temp.length; j++ ) {
                    var el = temp[ j ];

                    if ( ( el.postfix === 'w' && el.value >= windowWidth ) || ( el.postfix === 'x' && el.value >= pxRatio ) ) {
                        found = el;
                        break;
                    }
                }

                // If not found, take the last one
                if ( !found && temp.length ) {
                    found = temp[ temp.length - 1 ];
                }

                if ( found ) {
                    slide.src = found.url;

                    // If we have default width/height values, we can calculate height for matching source
                    if ( slide.width && slide.height && found.postfix == 'w' ) {
                        slide.height = ( slide.width / slide.height ) * found.value;
                        slide.width  = found.value;
                    }
                }
            }

            // This will be wrapper containing both ghost and actual image
            slide.$content = $('<div class="fancybox-image-wrap"></div>')
                .addClass( 'fancybox-is-hidden' )
                .appendTo( slide.$slide );


            // If we have a thumbnail, we can display it while actual image is loading
            // Users will not stare at black screen and actual image will appear gradually
            if ( slide.opts.preload !== false && slide.opts.width && slide.opts.height && ( slide.opts.thumb || slide.opts.$thumb ) ) {

                slide.width  = slide.opts.width;
                slide.height = slide.opts.height;

                slide.$ghost = $('<img />')
                    .one('error', function() {

                        $(this).remove();

                        slide.$ghost = null;

                        self.setBigImage( slide );

                    })
                    .one('load', function() {

                        self.afterLoad( slide );

                        self.setBigImage( slide );

                    })
                    .addClass( 'fancybox-image' )
                    .appendTo( slide.$content )
                    .attr( 'src', slide.opts.thumb || slide.opts.$thumb.attr( 'src' ) );

            } else {

                self.setBigImage( slide );

            }

        },


        // Create full-size image
        // ======================

        setBigImage : function ( slide ) {
            var self = this;
            var $img = $('<img />');

            slide.$image = $img
                .one('error', function() {

                    self.setError( slide );

                })
                .one('load', function() {

                    // Clear timeout that checks if loading icon needs to be displayed
                    clearTimeout( slide.timouts );

                    slide.timouts = null;

                    if ( self.isClosing ) {
                        return;
                    }

                    slide.width  = this.naturalWidth;
                    slide.height = this.naturalHeight;

                    if ( slide.opts.image.srcset ) {
                        $img.attr( 'sizes', '100vw' ).attr( 'srcset', slide.opts.image.srcset );
                    }

                    self.hideLoading( slide );

                    if ( slide.$ghost ) {

                        slide.timouts = setTimeout(function() {
                            slide.timouts = null;

                            slide.$ghost.hide();

                        }, Math.min( 300, Math.max( 1000, slide.height / 1600 ) ) );

                    } else {
                        self.afterLoad( slide );
                    }

                })
                .addClass( 'fancybox-image' )
                .attr('src', slide.src)
                .appendTo( slide.$content );

            if ( $img[0].complete ) {
                $img.trigger( 'load' );

            } else if( $img[0].error ) {
                $img.trigger( 'error' );

            } else {

                slide.timouts = setTimeout(function() {
                    if ( !$img[0].complete && !slide.hasError ) {
                        self.showLoading( slide );
                    }

                }, 100);

            }

        },


        // Create iframe wrapper, iframe and bindings
        // ==========================================

        setIframe : function( slide ) {
            var self	= this,
                opts    = slide.opts.iframe,
                $slide	= slide.$slide,
                $iframe;

            slide.$content = $('<div class="fancybox-content' + ( opts.preload ? ' fancybox-is-hidden' : '' ) + '"></div>')
                .css( opts.css )
                .appendTo( $slide );

            $iframe = $( opts.tpl.replace(/\{rnd\}/g, new Date().getTime()) )
                .attr( opts.attr )
                .appendTo( slide.$content );

            if ( opts.preload ) {

                self.showLoading( slide );

                // Unfortunately, it is not always possible to determine if iframe is successfully loaded
                // (due to browser security policy)

                $iframe.on('load.fb error.fb', function(e) {
                    this.isReady = 1;

                    slide.$slide.trigger( 'refresh' );

                    self.afterLoad( slide );
                });

                // Recalculate iframe content size
                // ===============================

                $slide.on('refresh.fb', function() {
                    var $wrap = slide.$content,
                        $contents,
                        $body,
                        scrollWidth,
                        frameWidth,
                        frameHeight;

                    if ( $iframe[0].isReady !== 1 ) {
                        return;
                    }

                    // Check if content is accessible,
                    // it will fail if frame is not with the same origin

                    try {
                        $contents = $iframe.contents();
                        $body     = $contents.find('body');

                    } catch (ignore) {}

                    // Calculate dimensions for the wrapper
                    if ( $body && $body.length && !( opts.css.width !== undefined && opts.css.height !== undefined ) ) {

                        scrollWidth = $iframe[0].contentWindow.document.documentElement.scrollWidth;

                        frameWidth	= Math.ceil( $body.outerWidth(true) + ( $wrap.width() - scrollWidth ) );
                        frameHeight	= Math.ceil( $body.outerHeight(true) );

                        // Resize wrapper to fit iframe content
                        $wrap.css({
                            'width'  : opts.css.width  === undefined ? frameWidth  + ( $wrap.outerWidth()  - $wrap.innerWidth() )  : opts.css.width,
                            'height' : opts.css.height === undefined ? frameHeight + ( $wrap.outerHeight() - $wrap.innerHeight() ) : opts.css.height
                        });

                    }

                    $wrap.removeClass( 'fancybox-is-hidden' );

                });

            } else {

                this.afterLoad( slide );

            }

            $iframe.attr( 'src', slide.src );

            if ( slide.opts.smallBtn === true ) {
                slide.$content.prepend( self.translate( slide, slide.opts.btnTpl.smallBtn ) );
            }

            // Remove iframe if closing or changing gallery item
            $slide.one( 'onReset', function () {

                // This helps IE not to throw errors when closing
                try {

                    $( this ).find( 'iframe' ).hide().attr( 'src', '//about:blank' );

                } catch ( ignore ) {}

                $( this ).empty();

                slide.isLoaded = false;

            });

        },


        // Wrap and append content to the slide
        // ======================================

        setContent : function ( slide, content ) {

            var self = this;

            if ( self.isClosing ) {
                return;
            }

            self.hideLoading( slide );

            slide.$slide.empty();

            if ( isQuery( content ) && content.parent().length ) {

                // If content is a jQuery object, then it will be moved to the slide.
                // The placeholder is created so we will know where to put it back.
                // If user is navigating gallery fast, then the content might be already inside fancyBox
                // =====================================================================================

                // Make sure content is not already moved to fancyBox
                content.parent( '.fancybox-slide--inline' ).trigger( 'onReset' );

                // Create temporary element marking original place of the content
                slide.$placeholder = $( '<div></div>' ).hide().insertAfter( content );

                // Make sure content is visible
                content.css('display', 'inline-block');

            } else if ( !slide.hasError ) {

                // If content is just a plain text, try to convert it to html
                if ( $.type( content ) === 'string' ) {
                    content = $('<div>').append( $.trim( content ) ).contents();

                    // If we have text node, then add wrapping element to make vertical alignment work
                    if ( content[0].nodeType === 3 ) {
                        content = $('<div>').html( content );
                    }
                }

                // If "filter" option is provided, then filter content
                if ( slide.opts.filter ) {
                    content = $('<div>').html( content ).find( slide.opts.filter );
                }

            }

            slide.$slide.one('onReset', function () {

                // Put content back
                if ( slide.$placeholder ) {
                    slide.$placeholder.after( content.hide() ).remove();

                    slide.$placeholder = null;
                }

                // Remove custom close button
                if ( slide.$smallBtn ) {
                    slide.$smallBtn.remove();

                    slide.$smallBtn = null;
                }

                // Remove content and mark slide as not loaded
                if ( !slide.hasError ) {
                    $(this).empty();

                    slide.isLoaded = false;
                }

            });

            slide.$content = $( content ).appendTo( slide.$slide );

            if ( slide.opts.smallBtn && !slide.$smallBtn ) {
                slide.$smallBtn = $( self.translate( slide, slide.opts.btnTpl.smallBtn ) ).appendTo( slide.$content.filter('div').first() );
            }

            this.afterLoad( slide );
        },

        // Display error message
        // =====================

        setError : function ( slide ) {

            slide.hasError = true;

            slide.$slide.removeClass( 'fancybox-slide--' + slide.type );

            this.setContent( slide, this.translate( slide, slide.opts.errorTpl ) );

        },


        // Show loading icon inside the slide
        // ==================================

        showLoading : function( slide ) {

            var self = this;

            slide = slide || self.current;

            if ( slide && !slide.$spinner ) {
                slide.$spinner = $( self.opts.spinnerTpl ).appendTo( slide.$slide );
            }

        },

        // Remove loading icon from the slide
        // ==================================

        hideLoading : function( slide ) {

            var self = this;

            slide = slide || self.current;

            if ( slide && slide.$spinner ) {
                slide.$spinner.remove();

                delete slide.$spinner;
            }

        },


        // Adjustments after slide content has been loaded
        // ===============================================

        afterLoad : function( slide ) {

            var self = this;

            if ( self.isClosing ) {
                return;
            }

            slide.isLoading = false;
            slide.isLoaded  = true;

            self.trigger( 'afterLoad', slide );

            self.hideLoading( slide );

            if ( slide.opts.protect && slide.$content && !slide.hasError ) {

                // Disable right click
                slide.$content.on( 'contextmenu.fb', function( e ) {
                    if ( e.button == 2 ) {
                        e.preventDefault();
                    }

                    return true;
                });

                // Add fake element on top of the image
                // This makes a bit harder for user to select image
                if ( slide.type === 'image' ) {
                    $( '<div class="fancybox-spaceball"></div>' ).appendTo( slide.$content );
                }

            }

            self.revealContent( slide );

        },


        // Make content visible
        // This method is called right after content has been loaded or
        // user navigates gallery and transition should start
        // ============================================================

        revealContent : function( slide ) {

            var self   = this;
            var $slide = slide.$slide;

            var effect, effectClassName, duration, opacity, end, start = false;

            effect   = slide.opts[ self.firstRun ? 'animationEffect'   : 'transitionEffect' ];
            duration = slide.opts[ self.firstRun ? 'animationDuration' : 'transitionDuration' ];

            duration = parseInt( slide.forcedDuration === undefined ? duration : slide.forcedDuration, 10 );

            if ( slide.isMoved || slide.pos !== self.currPos || !duration ) {
                effect = false;
            }

            // Check if can zoom
            if ( effect === 'zoom' && !( slide.pos === self.currPos && duration && slide.type === 'image' && !slide.hasError && ( start = self.getThumbPos( slide ) ) ) ) {
                effect = 'fade';
            }


            // Zoom animation
            // ==============

            if ( effect === 'zoom' ) {
                end = self.getFitPos( slide );

                end.scaleX = end.width  / start.width;
                end.scaleY = end.height / start.height;

                delete end.width;
                delete end.height;

                // Check if we need to animate opacity
                opacity = slide.opts.zoomOpacity;

                if ( opacity == 'auto' ) {
                    opacity = Math.abs( slide.width / slide.height - start.width / start.height ) > 0.1;
                }

                if ( opacity ) {
                    start.opacity = 0.1;
                    end.opacity   = 1;
                }

                // Draw image at start position
                $.fancybox.setTranslate( slide.$content.removeClass( 'fancybox-is-hidden' ), start );

                forceRedraw( slide.$content );

                // Start animation
                $.fancybox.animate( slide.$content, end, duration, function() {
                    self.complete();
                });

                return;
            }


            self.updateSlide( slide );


            // Simply show content
            // ===================

            if ( !effect ) {
                forceRedraw( $slide );

                slide.$content.removeClass( 'fancybox-is-hidden' );

                if ( slide.pos === self.currPos ) {
                    self.complete();
                }

                return;
            }

            $.fancybox.stop( $slide );

            effectClassName = 'fancybox-animated fancybox-slide--' + ( slide.pos > self.prevPos ? 'next' : 'previous' ) + ' fancybox-fx-' + effect;

            $slide.removeAttr( 'style' ).removeClass( 'fancybox-slide--current fancybox-slide--next fancybox-slide--previous' ).addClass( effectClassName );

            slide.$content.removeClass( 'fancybox-is-hidden' );

            //Force reflow for CSS3 transitions
            forceRedraw( $slide );

            $.fancybox.animate( $slide, 'fancybox-slide--current', duration, function(e) {
                $slide.removeClass( effectClassName ).removeAttr( 'style' );

                if ( slide.pos === self.currPos ) {
                    self.complete();
                }

            }, true);

        },


        // Check if we can and have to zoom from thumbnail
        //================================================

        getThumbPos : function( slide ) {

            var self = this;
            var rez  = false;

            // Check if element is inside the viewport by at least 1 pixel
            var isElementVisible = function( $el ) {
                var element = $el[0];

                var elementRect = element.getBoundingClientRect();
                var parentRects = [];

                var visibleInAllParents;

                while ( element.parentElement !== null ) {
                    if ( $(element.parentElement).css('overflow') === 'hidden'  || $(element.parentElement).css('overflow') === 'auto' ) {
                        parentRects.push(element.parentElement.getBoundingClientRect());
                    }

                    element = element.parentElement;
                }

                visibleInAllParents = parentRects.every(function(parentRect){
                    var visiblePixelX = Math.min(elementRect.right, parentRect.right) - Math.max(elementRect.left, parentRect.left);
                    var visiblePixelY = Math.min(elementRect.bottom, parentRect.bottom) - Math.max(elementRect.top, parentRect.top);

                    return visiblePixelX > 0 && visiblePixelY > 0;
                });

                return visibleInAllParents &&
                    elementRect.bottom > 0 && elementRect.right > 0 &&
                    elementRect.left < $(window).width() && elementRect.top < $(window).height();
            };

            var $thumb   = slide.opts.$thumb;
            var thumbPos = $thumb ? $thumb.offset() : 0;
            var slidePos;

            if ( thumbPos && $thumb[0].ownerDocument === document && isElementVisible( $thumb ) ) {
                slidePos = self.$refs.stage.offset();

                rez = {
                    top    : thumbPos.top  - slidePos.top  + parseFloat( $thumb.css( "border-top-width" ) || 0 ),
                    left   : thumbPos.left - slidePos.left + parseFloat( $thumb.css( "border-left-width" ) || 0 ),
                    width  : $thumb.width(),
                    height : $thumb.height(),
                    scaleX : 1,
                    scaleY : 1
                };
            }

            return rez;
        },


        // Final adjustments after current gallery item is moved to position
        // and it`s content is loaded
        // ==================================================================

        complete : function() {

            var self = this;

            var current = self.current;
            var slides  = {};

            if ( current.isMoved || !current.isLoaded || current.isComplete ) {
                return;
            }

            current.isComplete = true;

            current.$slide.siblings().trigger( 'onReset' );

            // Trigger any CSS3 transiton inside the slide
            forceRedraw( current.$slide );

            current.$slide.addClass( 'fancybox-slide--complete' );

            // Remove unnecessary slides
            $.each( self.slides, function( key, slide ) {
                if ( slide.pos >= self.currPos - 1 && slide.pos <= self.currPos + 1 ) {
                    slides[ slide.pos ] = slide;

                } else if ( slide ) {

                    $.fancybox.stop( slide.$slide );

                    slide.$slide.unbind().remove();
                }
            });

            self.slides = slides;

            self.updateCursor();

            self.trigger( 'afterShow' );

            // Try to focus on the first focusable element
            if ( $( document.activeElement ).is( '[disabled]' ) || ( current.opts.autoFocus && !( current.type == 'image' || current.type === 'iframe' ) ) ) {
                self.focus();
            }

        },


        // Preload next and previous slides
        // ================================

        preload : function() {
            var self = this;
            var next, prev;

            if ( self.group.length < 2 ) {
                return;
            }

            next  = self.slides[ self.currPos + 1 ];
            prev  = self.slides[ self.currPos - 1 ];

            if ( next && next.type === 'image' ) {
                self.loadSlide( next );
            }

            if ( prev && prev.type === 'image' ) {
                self.loadSlide( prev );
            }

        },


        // Try to find and focus on the first focusable element
        // ====================================================

        focus : function() {
            var current = this.current;
            var $el;

            if ( this.isClosing ) {
                return;
            }

            // Skip for images and iframes
            $el = current && current.isComplete ? current.$slide.find('button,:input,[tabindex],a').filter(':not([disabled]):visible:first') : null;
            $el = $el && $el.length ? $el : this.$refs.container;

            $el.focus();
        },


        // Activates current instance - brings container to the front and enables keyboard,
        // notifies other instances about deactivating
        // =================================================================================

        activate : function () {
            var self = this;

            // Deactivate all instances
            $( '.fancybox-container' ).each(function () {
                var instance = $(this).data( 'FancyBox' );

                // Skip self and closing instances
                if (instance && instance.uid !== self.uid && !instance.isClosing) {
                    instance.trigger( 'onDeactivate' );
                }

            });

            if ( self.current ) {
                if ( self.$refs.container.index() > 0 ) {
                    self.$refs.container.prependTo( document.body );
                }

                self.updateControls();
            }

            self.trigger( 'onActivate' );

            self.addEvents();

        },


        // Start closing procedure
        // This will start "zoom-out" animation if needed and clean everything up afterwards
        // =================================================================================

        close : function( e, d ) {

            var self    = this;
            var current = self.current;

            var effect, duration;
            var $what, opacity, start, end;

            var done = function() {
                self.cleanUp( e );
            };

            if ( self.isClosing ) {
                return false;
            }

            self.isClosing = true;

            // If beforeClose callback prevents closing, make sure content is centered
            if ( self.trigger( 'beforeClose', e ) === false ) {
                self.isClosing = false;

                requestAFrame(function() {
                    self.update();
                });

                return false;
            }

            // Remove all events
            // If there are multiple instances, they will be set again by "activate" method
            self.removeEvents();

            if ( current.timouts ) {
                clearTimeout( current.timouts );
            }

            $what    = current.$content;
            effect   = current.opts.animationEffect;
            duration = $.isNumeric( d ) ? d : ( effect ? current.opts.animationDuration : 0 );

            // Remove other slides
            current.$slide.off( transitionEnd ).removeClass( 'fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated' );

            current.$slide.siblings().trigger( 'onReset' ).remove();

            // Trigger animations
            if ( duration ) {
                self.$refs.container.removeClass( 'fancybox-is-open' ).addClass( 'fancybox-is-closing' );
            }

            // Clean up
            self.hideLoading( current );

            self.hideControls();

            self.updateCursor();

            // Check if possible to zoom-out
            if ( effect === 'zoom' && !( e !== true && $what && duration && current.type === 'image' && !current.hasError && ( end = self.getThumbPos( current ) ) ) ) {
                effect = 'fade';
            }

            if ( effect === 'zoom' ) {
                $.fancybox.stop( $what );

                start = $.fancybox.getTranslate( $what );

                start.width  = start.width  * start.scaleX;
                start.height = start.height * start.scaleY;

                // Check if we need to animate opacity
                opacity = current.opts.zoomOpacity;

                if ( opacity == 'auto' ) {
                    opacity = Math.abs( current.width / current.height - end.width / end.height ) > 0.1;
                }

                if ( opacity ) {
                    end.opacity = 0;
                }

                start.scaleX = start.width  / end.width;
                start.scaleY = start.height / end.height;

                start.width  = end.width;
                start.height = end.height;

                $.fancybox.setTranslate( current.$content, start );

                $.fancybox.animate( current.$content, end, duration, done );

                return true;
            }

            if ( effect && duration ) {

                // If skip animation
                if ( e === true ) {
                    setTimeout( done, duration );

                } else {
                    $.fancybox.animate( current.$slide.removeClass( 'fancybox-slide--current' ), 'fancybox-animated fancybox-slide--previous fancybox-fx-' + effect, duration, done );
                }

            } else {
                done();
            }

            return true;
        },


        // Final adjustments after removing the instance
        // =============================================

        cleanUp : function( e ) {
            var self = this,
                instance;

            self.current.$slide.trigger( 'onReset' );

            self.$refs.container.empty().remove();

            self.trigger( 'afterClose', e );

            // Place back focus
            if ( self.$lastFocus && !!self.current.opts.backFocus ) {
                self.$lastFocus.focus();
            }

            self.current = null;

            // Check if there are other instances
            instance = $.fancybox.getInstance();

            if ( instance ) {
                instance.activate();

            } else {

                $W.scrollTop( self.scrollTop ).scrollLeft( self.scrollLeft );

                $( 'html' ).removeClass( 'fancybox-enabled' );

                $( '#fancybox-style-noscroll' ).remove();
            }

        },


        // Call callback and trigger an event
        // ==================================

        trigger : function( name, slide ) {
            var args  = Array.prototype.slice.call(arguments, 1),
                self  = this,
                obj   = slide && slide.opts ? slide : self.current,
                rez;

            if ( obj ) {
                args.unshift( obj );

            } else {
                obj = self;
            }

            args.unshift( self );

            if ( $.isFunction( obj.opts[ name ] ) ) {
                rez = obj.opts[ name ].apply( obj, args );
            }

            if ( rez === false ) {
                return rez;
            }

            if ( name === 'afterClose' ) {
                $D.trigger( name + '.fb', args );

            } else {
                self.$refs.container.trigger( name + '.fb', args );
            }

        },


        // Update infobar values, navigation button states and reveal caption
        // ==================================================================

        updateControls : function ( force ) {

            var self = this;

            var current  = self.current;
            var index    = current.index;
            var opts     = current.opts;
            var caption  = opts.caption;
            var $caption = self.$refs.caption;

            // Recalculate content dimensions
            current.$slide.trigger( 'refresh' );

            self.$caption = caption && caption.length ? $caption.html( caption ) : null;

            if ( !self.isHiddenControls ) {
                self.showControls();
            }

            // Update info and navigation elements
            $('[data-fancybox-count]').html( self.group.length );
            $('[data-fancybox-index]').html( index + 1 );

            $('[data-fancybox-prev]').prop('disabled', ( !opts.loop && index <= 0 ) );
            $('[data-fancybox-next]').prop('disabled', ( !opts.loop && index >= self.group.length - 1 ) );

        },

        // Hide toolbar and caption
        // ========================

        hideControls : function () {

            this.isHiddenControls = true;

            this.$refs.container.removeClass('fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav');

        },

        showControls : function() {

            var self = this;
            var opts = self.current ? self.current.opts : self.opts;
            var $container = self.$refs.container;

            self.isHiddenControls   = false;
            self.idleSecondsCounter = 0;

            $container
                .toggleClass('fancybox-show-toolbar', !!( opts.toolbar && opts.buttons ) )
                .toggleClass('fancybox-show-infobar', !!( opts.infobar && self.group.length > 1 ) )
                .toggleClass('fancybox-show-nav',     !!( opts.arrows && self.group.length > 1 ) )
                .toggleClass('fancybox-is-modal',     !!opts.modal );

            if ( self.$caption ) {
                $container.addClass( 'fancybox-show-caption ');

            } else {
                $container.removeClass( 'fancybox-show-caption' );
            }

        },


        // Toggle toolbar and caption
        // ==========================

        toggleControls : function() {

            if ( this.isHiddenControls ) {
                this.showControls();

            } else {
                this.hideControls();
            }

        },


    });


    $.fancybox = {

        version  : "3.1.25",
        defaults : defaults,


        // Get current instance and execute a command.
        //
        // Examples of usage:
        //
        //   $instance = $.fancybox.getInstance();
        //   $.fancybox.getInstance().jumpTo( 1 );
        //   $.fancybox.getInstance( 'jumpTo', 1 );
        //   $.fancybox.getInstance( function() {
        //       console.info( this.currIndex );
        //   });
        // ======================================================

        getInstance : function ( command ) {
            var instance = $('.fancybox-container:not(".fancybox-is-closing"):first').data( 'FancyBox' );
            var args     = Array.prototype.slice.call(arguments, 1);

            if ( instance instanceof FancyBox ) {

                if ( $.type( command ) === 'string' ) {
                    instance[ command ].apply( instance, args );

                } else if ( $.type( command ) === 'function' ) {
                    command.apply( instance, args );

                }

                return instance;
            }

            return false;

        },


        // Create new instance
        // ===================

        open : function ( items, opts, index ) {
            return new FancyBox( items, opts, index );
        },


        // Close current or all instances
        // ==============================

        close : function ( all ) {
            var instance = this.getInstance();

            if ( instance ) {
                instance.close();

                // Try to find and close next instance

                if ( all === true ) {
                    this.close();
                }
            }

        },

        // Close instances and unbind all events
        // ==============================

        destroy : function() {

            this.close( true );

            $D.off( 'click.fb-start' );

        },


        // Try to detect mobile devices
        // ============================

        isMobile : document.createTouch !== undefined && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),


        // Detect if 'translate3d' support is available
        // ============================================

        use3d : (function() {
            var div = document.createElement('div');

            return window.getComputedStyle && window.getComputedStyle( div ).getPropertyValue('transform') && !(document.documentMode && document.documentMode < 11);
        }()),


        // Helper function to get current visual state of an element
        // returns array[ top, left, horizontal-scale, vertical-scale, opacity ]
        // =====================================================================

        getTranslate : function( $el ) {
            var matrix;

            if ( !$el || !$el.length ) {
                return false;
            }

            matrix  = $el.eq( 0 ).css('transform');

            if ( matrix && matrix.indexOf( 'matrix' ) !== -1 ) {
                matrix = matrix.split('(')[1];
                matrix = matrix.split(')')[0];
                matrix = matrix.split(',');
            } else {
                matrix = [];
            }

            if ( matrix.length ) {

                // If IE
                if ( matrix.length > 10 ) {
                    matrix = [ matrix[13], matrix[12], matrix[0], matrix[5] ];

                } else {
                    matrix = [ matrix[5], matrix[4], matrix[0], matrix[3]];
                }

                matrix = matrix.map(parseFloat);

            } else {
                matrix = [ 0, 0, 1, 1 ];

                var transRegex = /\.*translate\((.*)px,(.*)px\)/i;
                var transRez = transRegex.exec( $el.eq( 0 ).attr('style') );

                if ( transRez ) {
                    matrix[ 0 ] = parseFloat( transRez[2] );
                    matrix[ 1 ] = parseFloat( transRez[1] );
                }
            }

            return {
                top     : matrix[ 0 ],
                left    : matrix[ 1 ],
                scaleX  : matrix[ 2 ],
                scaleY  : matrix[ 3 ],
                opacity : parseFloat( $el.css('opacity') ),
                width   : $el.width(),
                height  : $el.height()
            };

        },


        // Shortcut for setting "translate3d" properties for element
        // Can set be used to set opacity, too
        // ========================================================

        setTranslate : function( $el, props ) {
            var str  = '';
            var css  = {};

            if ( !$el || !props ) {
                return;
            }

            if ( props.left !== undefined || props.top !== undefined ) {
                str = ( props.left === undefined ? $el.position().left : props.left )  + 'px, ' + ( props.top === undefined ? $el.position().top : props.top ) + 'px';

                if ( this.use3d ) {
                    str = 'translate3d(' + str + ', 0px)';

                } else {
                    str = 'translate(' + str + ')';
                }
            }

            if ( props.scaleX !== undefined && props.scaleY !== undefined ) {
                str = (str.length ? str + ' ' : '') + 'scale(' + props.scaleX + ', ' + props.scaleY + ')';
            }

            if ( str.length ) {
                css.transform = str;
            }

            if ( props.opacity !== undefined ) {
                css.opacity = props.opacity;
            }

            if ( props.width !== undefined ) {
                css.width = props.width;
            }

            if ( props.height !== undefined ) {
                css.height = props.height;
            }

            return $el.css( css );
        },


        // Simple CSS transition handler
        // =============================

        animate : function ( $el, to, duration, callback, leaveAnimationName ) {
            var event = transitionEnd || 'transitionend';

            if ( $.isFunction( duration ) ) {
                callback = duration;
                duration = null;
            }

            if ( !$.isPlainObject( to ) ) {
                $el.removeAttr('style');
            }

            $el.on( event, function(e) {

                // Skip events from child elements and z-index change
                if ( e && e.originalEvent && ( !$el.is( e.originalEvent.target ) || e.originalEvent.propertyName == 'z-index' ) ) {
                    return;
                }

                $el.off( event );

                if ( $.isPlainObject( to ) ) {

                    if ( to.scaleX !== undefined && to.scaleY !== undefined ) {
                        $el.css( 'transition-duration', '0ms' );

                        to.width  = Math.round( $el.width()  * to.scaleX );
                        to.height = Math.round( $el.height() * to.scaleY );

                        to.scaleX = 1;
                        to.scaleY = 1;

                        $.fancybox.setTranslate( $el, to );
                    }

                } else if ( leaveAnimationName !== true ) {
                    $el.removeClass( to );
                }

                if ( $.isFunction( callback ) ) {
                    callback( e );
                }

            });

            if ( $.isNumeric( duration ) ) {
                $el.css( 'transition-duration', duration + 'ms' );
            }

            if ( $.isPlainObject( to ) ) {
                $.fancybox.setTranslate( $el, to );

            } else {
                $el.addClass( to );
            }

            $el.data("timer", setTimeout(function() {
                $el.trigger( 'transitionend' );
            }, duration + 16));

        },

        stop : function( $el ) {
            clearTimeout( $el.data("timer") );

            $el.off( transitionEnd );
        }

    };


    // Default click handler for "fancyboxed" links
    // ============================================

    function _run( e ) {
        var target	= e.currentTarget,
            opts	= e.data ? e.data.options : {},
            items	= opts.selector ? $( opts.selector ) : ( e.data ? e.data.items : [] ),
            value	= $(target).attr( 'data-fancybox' ) || '',
            index	= 0,
            active  = $.fancybox.getInstance();

        e.preventDefault();
        e.stopPropagation();

        // Avoid opening multiple times
        if ( active && active.current.opts.$orig.is( target ) ) {
            return;
        }

        // Get all related items and find index for clicked one
        if ( value ) {
            items = items.length ? items.filter( '[data-fancybox="' + value + '"]' ) : $( '[data-fancybox="' + value + '"]' );
            index = items.index( target );

            // Sometimes current item can not be found
            // (for example, when slider clones items)
            if ( index < 0 ) {
                index = 0;
            }

        } else {
            items = [ target ];
        }

        $.fancybox.open( items, opts, index );
    }


    // Create a jQuery plugin
    // ======================

    $.fn.fancybox = function (options) {
        var selector;

        options  = options || {};
        selector = options.selector || false;

        if ( selector ) {

            $( 'body' ).off( 'click.fb-start', selector ).on( 'click.fb-start', selector, {
                options : options
            }, _run );

        } else {

            this.off( 'click.fb-start' ).on( 'click.fb-start', {
                items   : this,
                options : options
            }, _run);

        }

        return this;
    };


    // Self initializing plugin
    // ========================

    $D.on( 'click.fb-start', '[data-fancybox]', _run );

}( window, document, window.jQuery || jQuery ));

// ==========================================================================
//
// Media
// Adds additional media type support
//
// ==========================================================================
;(function ($) {

    'use strict';

    // Formats matching url to final form

    var format = function (url, rez, params) {
        if ( !url ) {
            return;
        }

        params = params || '';

        if ( $.type(params) === "object" ) {
            params = $.param(params, true);
        }

        $.each(rez, function (key, value) {
            url = url.replace('$' + key, value || '');
        });

        if (params.length) {
            url += (url.indexOf('?') > 0 ? '&' : '?') + params;
        }

        return url;
    };

    // Object containing properties for each media type

    var defaults = {
        youtube : {
            matcher : /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
            params  : {
                autoplay : 1,
                autohide : 1,
                fs  : 1,
                rel : 0,
                hd  : 1,
                wmode : 'transparent',
                enablejsapi : 1,
                html5 : 1
            },
            paramPlace : 8,
            type  : 'iframe',
            url   : '//www.youtube.com/embed/$4',
            thumb : '//img.youtube.com/vi/$4/hqdefault.jpg'
        },

        vimeo : {
            matcher : /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
            params  : {
                autoplay : 1,
                hd : 1,
                show_title    : 1,
                show_byline   : 1,
                show_portrait : 0,
                fullscreen    : 1,
                api : 1
            },
            paramPlace : 3,
            type : 'iframe',
            url : '//player.vimeo.com/video/$2'
        },

        metacafe : {
            matcher : /metacafe.com\/watch\/(\d+)\/(.*)?/,
            type    : 'iframe',
            url     : '//www.metacafe.com/embed/$1/?ap=1'
        },

        dailymotion : {
            matcher : /dailymotion.com\/video\/(.*)\/?(.*)/,
            params : {
                additionalInfos : 0,
                autoStart : 1
            },
            type : 'iframe',
            url  : '//www.dailymotion.com/embed/video/$1'
        },

        vine : {
            matcher : /vine.co\/v\/([a-zA-Z0-9\?\=\-]+)/,
            type    : 'iframe',
            url     : '//vine.co/v/$1/embed/simple'
        },

        instagram : {
            matcher : /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
            type    : 'image',
            url     : '//$1/p/$2/media/?size=l'
        },

        // Examples:
        // http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
        // https://www.google.com/maps/@37.7852006,-122.4146355,14.65z
        // https://www.google.com/maps/place/Googleplex/@37.4220041,-122.0833494,17z/data=!4m5!3m4!1s0x0:0x6c296c66619367e0!8m2!3d37.4219998!4d-122.0840572
        gmap_place : {
            matcher : /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
            type    : 'iframe',
            url     : function (rez) {
                return '//maps.google.' + rez[2] + '/?ll=' + ( rez[9] ? rez[9] + '&z=' + Math.floor(  rez[10]  ) + ( rez[12] ? rez[12].replace(/^\//, "&") : '' )  : rez[12] ) + '&output=' + ( rez[12] && rez[12].indexOf('layer=c') > 0 ? 'svembed' : 'embed' );
            }
        },

        // Examples:
        // https://www.google.com/maps/search/Empire+State+Building/
        // https://www.google.com/maps/search/?api=1&query=centurylink+field
        // https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393
        gmap_search : {
            matcher : /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
            type    : 'iframe',
            url     : function (rez) {
                return '//maps.google.' + rez[2] + '/maps?q=' + rez[5].replace('query=', 'q=').replace('api=1', '') + '&output=embed';
            }
        }
    };

    $(document).on('onInit.fb', function (e, instance) {

        $.each(instance.group, function( i, item ) {

            var url	 = item.src || '',
                type = false,
                media,
                thumb,
                rez,
                params,
                urlParams,
                o,
                provider;

            // Skip items that already have content type
            if ( item.type ) {
                return;
            }

            media = $.extend( true, {}, defaults, item.opts.media );

            // Look for any matching media type
            $.each(media, function ( n, el ) {
                rez = url.match(el.matcher);
                o   = {};
                provider = n;

                if (!rez) {
                    return;
                }

                type = el.type;

                if ( el.paramPlace && rez[ el.paramPlace ] ) {
                    urlParams = rez[ el.paramPlace ];

                    if ( urlParams[ 0 ] == '?' ) {
                        urlParams = urlParams.substring(1);
                    }

                    urlParams = urlParams.split('&');

                    for ( var m = 0; m < urlParams.length; ++m ) {
                        var p = urlParams[ m ].split('=', 2);

                        if ( p.length == 2 ) {
                            o[ p[0] ] = decodeURIComponent( p[1].replace(/\+/g, " ") );
                        }
                    }
                }

                params = $.extend( true, {}, el.params, item.opts[ n ], o );

                url   = $.type(el.url) === "function" ? el.url.call(this, rez, params, item) : format(el.url, rez, params);
                thumb = $.type(el.thumb) === "function" ? el.thumb.call(this, rez, params, item) : format(el.thumb, rez);

                if ( provider === 'vimeo' ) {
                    url = url.replace('&%23', '#');
                }

                return false;
            });

            // If it is found, then change content type and update the url

            if ( type ) {
                item.src  = url;
                item.type = type;

                if ( !item.opts.thumb && !( item.opts.$thumb && item.opts.$thumb.length ) ) {
                    item.opts.thumb = thumb;
                }

                if ( type === 'iframe' ) {
                    $.extend(true, item.opts, {
                        iframe : {
                            preload : false,
                            attr : {
                                scrolling : "no"
                            }
                        }
                    });

                    item.contentProvider = provider;

                    item.opts.slideClass += ' fancybox-slide--' + ( provider == 'gmap_place' || provider == 'gmap_search' ? 'map' : 'video' );
                }

            } else {

                // If no content type is found, then set it to `image` as fallback
                item.type = 'image';
            }

        });

    });

}(window.jQuery));

// ==========================================================================
//
// Guestures
// Adds touch guestures, handles click and tap events
//
// ==========================================================================
;(function (window, document, $) {
    'use strict';

    var requestAFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            // if all else fails, use setTimeout
            function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            };
    })();


    var cancelAFrame = (function () {
        return window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.oCancelAnimationFrame ||
            function (id) {
                window.clearTimeout(id);
            };
    })();


    var pointers = function( e ) {
        var result = [];

        e = e.originalEvent || e || window.e;
        e = e.touches && e.touches.length ? e.touches : ( e.changedTouches && e.changedTouches.length ? e.changedTouches : [ e ] );

        for ( var key in e ) {

            if ( e[ key ].pageX ) {
                result.push( { x : e[ key ].pageX, y : e[ key ].pageY } );

            } else if ( e[ key ].clientX ) {
                result.push( { x : e[ key ].clientX, y : e[ key ].clientY } );
            }
        }

        return result;
    };

    var distance = function( point2, point1, what ) {
        if ( !point1 || !point2 ) {
            return 0;
        }

        if ( what === 'x' ) {
            return point2.x - point1.x;

        } else if ( what === 'y' ) {
            return point2.y - point1.y;
        }

        return Math.sqrt( Math.pow( point2.x - point1.x, 2 ) + Math.pow( point2.y - point1.y, 2 ) );
    };

    var isClickable = function( $el ) {

        if ( $el.is('a,button,input,select,textarea') || $.isFunction( $el.get(0).onclick ) || $el.data('selectable') ) {
            return true;
        }

        // Check for attributes like data-fancybox-next or data-fancybox-close
        for ( var i = 0, atts = $el[0].attributes, n = atts.length; i < n; i++ ) {
            if ( atts[i].nodeName.substr(0, 14) === 'data-fancybox-' ) {
                return true;
            }
        }

        return false;
    };

    var hasScrollbars = function( el ) {
        var overflowY = window.getComputedStyle( el )['overflow-y'];
        var overflowX = window.getComputedStyle( el )['overflow-x'];

        var vertical   = (overflowY === 'scroll' || overflowY === 'auto') && el.scrollHeight > el.clientHeight;
        var horizontal = (overflowX === 'scroll' || overflowX === 'auto') && el.scrollWidth > el.clientWidth;

        return vertical || horizontal;
    };

    var isScrollable = function ( $el ) {
        var rez = false;

        while ( true ) {
            rez	= hasScrollbars( $el.get(0) );

            if ( rez ) {
                break;
            }

            $el = $el.parent();

            if ( !$el.length || $el.hasClass( 'fancybox-stage' ) || $el.is( 'body' ) ) {
                break;
            }
        }

        return rez;
    };


    var Guestures = function ( instance ) {
        var self = this;

        self.instance = instance;

        self.$bg        = instance.$refs.bg;
        self.$stage     = instance.$refs.stage;
        self.$container = instance.$refs.container;

        self.destroy();

        self.$container.on( 'touchstart.fb.touch mousedown.fb.touch', $.proxy(self, 'ontouchstart') );
    };

    Guestures.prototype.destroy = function() {
        this.$container.off( '.fb.touch' );
    };

    Guestures.prototype.ontouchstart = function( e ) {
        var self = this;

        var $target  = $( e.target );
        var instance = self.instance;
        var current  = instance.current;
        var $content = current.$content;

        var isTouchDevice = ( e.type == 'touchstart' );

        // Do not respond to both events
        if ( isTouchDevice ) {
            self.$container.off( 'mousedown.fb.touch' );
        }

        // Ignore clicks while zooming or closing
        if ( !current || self.instance.isAnimating || self.instance.isClosing ) {
            e.stopPropagation();
            e.preventDefault();

            return;
        }

        // Ignore right click
        if ( e.originalEvent && e.originalEvent.button == 2 ) {
            return;
        }

        // Ignore taping on links, buttons, input elements
        if ( !$target.length || isClickable( $target ) || isClickable( $target.parent() ) ) {
            return;
        }

        // Ignore clicks on the scrollbar
        if ( e.originalEvent.clientX > $target[0].clientWidth + $target.offset().left ) {
            return;
        }

        self.startPoints = pointers( e );

        // Prevent zooming if already swiping
        if ( !self.startPoints || ( self.startPoints.length > 1 && instance.isSliding ) ) {
            return;
        }

        self.$target  = $target;
        self.$content = $content;
        self.canTap   = true;

        $(document).off( '.fb.touch' );

        $(document).on( isTouchDevice ? 'touchend.fb.touch touchcancel.fb.touch' : 'mouseup.fb.touch mouseleave.fb.touch',  $.proxy(self, "ontouchend"));
        $(document).on( isTouchDevice ? 'touchmove.fb.touch' : 'mousemove.fb.touch',  $.proxy(self, "ontouchmove"));

        if ( !(instance.current.opts.touch || instance.canPan() ) || !( $target.is( self.$stage ) || self.$stage.find( $target ).length ) ) {

            // Prevent ghosting
            if ( $target.is('img') ) {
                e.preventDefault();
            }

            return;
        }

        e.stopPropagation();

        if ( !( $.fancybox.isMobile && ( isScrollable( self.$target ) || isScrollable( self.$target.parent() ) ) ) ) {
            e.preventDefault();
        }

        self.canvasWidth  = Math.round( current.$slide[0].clientWidth );
        self.canvasHeight = Math.round( current.$slide[0].clientHeight );

        self.startTime = new Date().getTime();
        self.distanceX = self.distanceY = self.distance = 0;

        self.isPanning = false;
        self.isSwiping = false;
        self.isZooming = false;

        self.sliderStartPos  = self.sliderLastPos || { top: 0, left: 0 };
        self.contentStartPos = $.fancybox.getTranslate( self.$content );
        self.contentLastPos  = null;

        if ( self.startPoints.length === 1 && !self.isZooming ) {
            self.canTap = !instance.isSliding;

            if ( current.type === 'image' && ( self.contentStartPos.width > self.canvasWidth + 1 || self.contentStartPos.height > self.canvasHeight + 1 ) ) {

                $.fancybox.stop( self.$content );

                self.$content.css( 'transition-duration', '0ms' );

                self.isPanning = true;

            } else {

                self.isSwiping = true;
            }

            self.$container.addClass('fancybox-controls--isGrabbing');
        }

        if ( self.startPoints.length === 2 && !instance.isAnimating && !current.hasError && current.type === 'image' && ( current.isLoaded || current.$ghost ) ) {
            self.isZooming = true;

            self.isSwiping = false;
            self.isPanning = false;

            $.fancybox.stop( self.$content );

            self.$content.css( 'transition-duration', '0ms' );

            self.centerPointStartX = ( ( self.startPoints[0].x + self.startPoints[1].x ) * 0.5 ) - $(window).scrollLeft();
            self.centerPointStartY = ( ( self.startPoints[0].y + self.startPoints[1].y ) * 0.5 ) - $(window).scrollTop();

            self.percentageOfImageAtPinchPointX = ( self.centerPointStartX - self.contentStartPos.left ) / self.contentStartPos.width;
            self.percentageOfImageAtPinchPointY = ( self.centerPointStartY - self.contentStartPos.top  ) / self.contentStartPos.height;

            self.startDistanceBetweenFingers = distance( self.startPoints[0], self.startPoints[1] );
        }

    };

    Guestures.prototype.ontouchmove = function( e ) {

        var self = this;

        self.newPoints = pointers( e );

        if ( $.fancybox.isMobile && ( isScrollable( self.$target ) || isScrollable( self.$target.parent() ) ) ) {
            e.stopPropagation();

            self.canTap = false;

            return;
        }

        if ( !( self.instance.current.opts.touch || self.instance.canPan() ) || !self.newPoints || !self.newPoints.length ) {
            return;
        }

        self.distanceX = distance( self.newPoints[0], self.startPoints[0], 'x' );
        self.distanceY = distance( self.newPoints[0], self.startPoints[0], 'y' );

        self.distance = distance( self.newPoints[0], self.startPoints[0] );

        // Skip false ontouchmove events (Chrome)
        if ( self.distance > 0 ) {

            if ( !( self.$target.is( self.$stage ) || self.$stage.find( self.$target ).length ) ) {
                return;
            }

            e.stopPropagation();
            e.preventDefault();

            if ( self.isSwiping ) {
                self.onSwipe();

            } else if ( self.isPanning ) {
                self.onPan();

            } else if ( self.isZooming ) {
                self.onZoom();
            }

        }

    };

    Guestures.prototype.onSwipe = function() {

        var self = this;

        var swiping = self.isSwiping;
        var left    = self.sliderStartPos.left || 0;
        var angle;

        if ( swiping === true ) {

            if ( Math.abs( self.distance ) > 10 )  {

                self.canTap = false;

                if ( self.instance.group.length < 2 && self.instance.opts.touch.vertical ) {
                    self.isSwiping  = 'y';

                } else if ( self.instance.isSliding || self.instance.opts.touch.vertical === false || ( self.instance.opts.touch.vertical === 'auto' && $( window ).width() > 800 ) ) {
                    self.isSwiping  = 'x';

                } else {
                    angle = Math.abs( Math.atan2( self.distanceY, self.distanceX ) * 180 / Math.PI );

                    self.isSwiping = ( angle > 45 && angle < 135 ) ? 'y' : 'x';
                }

                self.instance.isSliding = self.isSwiping;

                // Reset points to avoid jumping, because we dropped first swipes to calculate the angle
                self.startPoints = self.newPoints;

                $.each(self.instance.slides, function( index, slide ) {
                    $.fancybox.stop( slide.$slide );

                    slide.$slide.css( 'transition-duration', '0ms' );

                    slide.inTransition = false;

                    if ( slide.pos === self.instance.current.pos ) {
                        self.sliderStartPos.left = $.fancybox.getTranslate( slide.$slide ).left;
                    }
                });

                //self.instance.current.isMoved = true;

                // Stop slideshow
                if ( self.instance.SlideShow && self.instance.SlideShow.isActive ) {
                    self.instance.SlideShow.stop();
                }
            }

        } else {

            if ( swiping == 'x' ) {

                // Sticky edges
                if ( self.distanceX > 0 && ( self.instance.group.length < 2 || ( self.instance.current.index === 0 && !self.instance.current.opts.loop ) ) ) {
                    left = left + Math.pow( self.distanceX, 0.8 );

                } else if ( self.distanceX < 0 && ( self.instance.group.length < 2 || ( self.instance.current.index === self.instance.group.length - 1 && !self.instance.current.opts.loop ) ) ) {
                    left = left - Math.pow( -self.distanceX, 0.8 );

                } else {
                    left = left + self.distanceX;
                }

            }

            self.sliderLastPos = {
                top  : swiping == 'x' ? 0 : self.sliderStartPos.top + self.distanceY,
                left : left
            };

            if ( self.requestId ) {
                cancelAFrame( self.requestId );

                self.requestId = null;
            }

            self.requestId = requestAFrame(function() {

                if ( self.sliderLastPos ) {
                    $.each(self.instance.slides, function( index, slide ) {
                        var pos = slide.pos - self.instance.currPos;

                        $.fancybox.setTranslate( slide.$slide, {
                            top  : self.sliderLastPos.top,
                            left : self.sliderLastPos.left + ( pos * self.canvasWidth ) + ( pos * slide.opts.gutter )
                        });
                    });

                    self.$container.addClass( 'fancybox-is-sliding' );
                }

            });

        }

    };

    Guestures.prototype.onPan = function() {

        var self = this;

        var newOffsetX, newOffsetY, newPos;

        self.canTap = false;

        if ( self.contentStartPos.width > self.canvasWidth ) {
            newOffsetX = self.contentStartPos.left + self.distanceX;

        } else {
            newOffsetX = self.contentStartPos.left;
        }

        newOffsetY = self.contentStartPos.top + self.distanceY;

        newPos = self.limitMovement( newOffsetX, newOffsetY, self.contentStartPos.width, self.contentStartPos.height );

        newPos.scaleX = self.contentStartPos.scaleX;
        newPos.scaleY = self.contentStartPos.scaleY;

        self.contentLastPos = newPos;

        if ( self.requestId ) {
            cancelAFrame( self.requestId );

            self.requestId = null;
        }

        self.requestId = requestAFrame(function() {
            $.fancybox.setTranslate( self.$content, self.contentLastPos );
        });
    };

    // Make panning sticky to the edges
    Guestures.prototype.limitMovement = function( newOffsetX, newOffsetY, newWidth, newHeight ) {

        var self = this;

        var minTranslateX, minTranslateY, maxTranslateX, maxTranslateY;

        var canvasWidth  = self.canvasWidth;
        var canvasHeight = self.canvasHeight;

        var currentOffsetX = self.contentStartPos.left;
        var currentOffsetY = self.contentStartPos.top;

        var distanceX = self.distanceX;
        var distanceY = self.distanceY;

        // Slow down proportionally to traveled distance

        minTranslateX = Math.max(0, canvasWidth  * 0.5 - newWidth  * 0.5 );
        minTranslateY = Math.max(0, canvasHeight * 0.5 - newHeight * 0.5 );

        maxTranslateX = Math.min( canvasWidth  - newWidth,  canvasWidth  * 0.5 - newWidth  * 0.5 );
        maxTranslateY = Math.min( canvasHeight - newHeight, canvasHeight * 0.5 - newHeight * 0.5 );

        if ( newWidth > canvasWidth ) {

            //   ->
            if ( distanceX > 0 && newOffsetX > minTranslateX ) {
                newOffsetX = minTranslateX - 1 + Math.pow( -minTranslateX + currentOffsetX + distanceX, 0.8 ) || 0;
            }

            //    <-
            if ( distanceX  < 0 && newOffsetX < maxTranslateX ) {
                newOffsetX = maxTranslateX + 1 - Math.pow( maxTranslateX - currentOffsetX - distanceX, 0.8 ) || 0;
            }

        }

        if ( newHeight > canvasHeight ) {

            //   \/
            if ( distanceY > 0 && newOffsetY > minTranslateY ) {
                newOffsetY = minTranslateY - 1 + Math.pow(-minTranslateY + currentOffsetY + distanceY, 0.8 ) || 0;
            }

            //   /\
            if ( distanceY < 0 && newOffsetY < maxTranslateY ) {
                newOffsetY = maxTranslateY + 1 - Math.pow ( maxTranslateY - currentOffsetY - distanceY, 0.8 ) || 0;
            }

        }

        return {
            top  : newOffsetY,
            left : newOffsetX
        };

    };


    Guestures.prototype.limitPosition = function( newOffsetX, newOffsetY, newWidth, newHeight ) {

        var self = this;

        var canvasWidth  = self.canvasWidth;
        var canvasHeight = self.canvasHeight;

        if ( newWidth > canvasWidth ) {
            newOffsetX = newOffsetX > 0 ? 0 : newOffsetX;
            newOffsetX = newOffsetX < canvasWidth - newWidth ? canvasWidth - newWidth : newOffsetX;

        } else {

            // Center horizontally
            newOffsetX = Math.max( 0, canvasWidth / 2 - newWidth / 2 );

        }

        if ( newHeight > canvasHeight ) {
            newOffsetY = newOffsetY > 0 ? 0 : newOffsetY;
            newOffsetY = newOffsetY < canvasHeight - newHeight ? canvasHeight - newHeight : newOffsetY;

        } else {

            // Center vertically
            newOffsetY = Math.max( 0, canvasHeight / 2 - newHeight / 2 );

        }

        return {
            top  : newOffsetY,
            left : newOffsetX
        };

    };

    Guestures.prototype.onZoom = function() {

        var self = this;

        // Calculate current distance between points to get pinch ratio and new width and height

        var currentWidth  = self.contentStartPos.width;
        var currentHeight = self.contentStartPos.height;

        var currentOffsetX = self.contentStartPos.left;
        var currentOffsetY = self.contentStartPos.top;

        var endDistanceBetweenFingers = distance( self.newPoints[0], self.newPoints[1] );

        var pinchRatio = endDistanceBetweenFingers / self.startDistanceBetweenFingers;

        var newWidth  = Math.floor( currentWidth  * pinchRatio );
        var newHeight = Math.floor( currentHeight * pinchRatio );

        // This is the translation due to pinch-zooming
        var translateFromZoomingX = (currentWidth  - newWidth)  * self.percentageOfImageAtPinchPointX;
        var translateFromZoomingY = (currentHeight - newHeight) * self.percentageOfImageAtPinchPointY;

        //Point between the two touches

        var centerPointEndX = ((self.newPoints[0].x + self.newPoints[1].x) / 2) - $(window).scrollLeft();
        var centerPointEndY = ((self.newPoints[0].y + self.newPoints[1].y) / 2) - $(window).scrollTop();

        // And this is the translation due to translation of the centerpoint
        // between the two fingers

        var translateFromTranslatingX = centerPointEndX - self.centerPointStartX;
        var translateFromTranslatingY = centerPointEndY - self.centerPointStartY;

        // The new offset is the old/current one plus the total translation

        var newOffsetX = currentOffsetX + ( translateFromZoomingX + translateFromTranslatingX );
        var newOffsetY = currentOffsetY + ( translateFromZoomingY + translateFromTranslatingY );

        var newPos = {
            top    : newOffsetY,
            left   : newOffsetX,
            scaleX : self.contentStartPos.scaleX * pinchRatio,
            scaleY : self.contentStartPos.scaleY * pinchRatio
        };

        self.canTap = false;

        self.newWidth  = newWidth;
        self.newHeight = newHeight;

        self.contentLastPos = newPos;

        if ( self.requestId ) {
            cancelAFrame( self.requestId );

            self.requestId = null;
        }

        self.requestId = requestAFrame(function() {
            $.fancybox.setTranslate( self.$content, self.contentLastPos );
        });

    };

    Guestures.prototype.ontouchend = function( e ) {

        var self = this;
        var dMs  = Math.max( (new Date().getTime() ) - self.startTime, 1);

        var swiping = self.isSwiping;
        var panning = self.isPanning;
        var zooming = self.isZooming;

        self.endPoints = pointers( e );

        self.$container.removeClass( 'fancybox-controls--isGrabbing' );

        $(document).off( '.fb.touch' );

        if ( self.requestId ) {
            cancelAFrame( self.requestId );

            self.requestId = null;
        }

        self.isSwiping = false;
        self.isPanning = false;
        self.isZooming = false;

        if ( self.canTap )  {
            return self.onTap( e );
        }

        self.speed = 366;

        // Speed in px/ms
        self.velocityX = self.distanceX / dMs * 0.5;
        self.velocityY = self.distanceY / dMs * 0.5;

        self.speedX = Math.max( self.speed * 0.5, Math.min( self.speed * 1.5, ( 1 / Math.abs( self.velocityX ) ) * self.speed ) );

        if ( panning ) {
            self.endPanning();

        } else if ( zooming ) {
            self.endZooming();

        } else {
            self.endSwiping( swiping );
        }

        return;
    };

    Guestures.prototype.endSwiping = function( swiping ) {

        var self = this;
        var ret = false;

        self.instance.isSliding = false;
        self.sliderLastPos      = null;

        // Close if swiped vertically / navigate if horizontally
        if ( swiping == 'y' && Math.abs( self.distanceY ) > 50 ) {

            // Continue vertical movement
            $.fancybox.animate( self.instance.current.$slide, {
                top     : self.sliderStartPos.top + self.distanceY + ( self.velocityY * 150 ),
                opacity : 0
            }, 150 );

            ret = self.instance.close( true, 300 );

        } else if ( swiping == 'x' && self.distanceX > 50 && self.instance.group.length > 1 ) {
            ret = self.instance.previous( self.speedX );

        } else if ( swiping == 'x' && self.distanceX < -50  && self.instance.group.length > 1 ) {
            ret = self.instance.next( self.speedX );
        }

        if ( ret === false && ( swiping == 'x' || swiping == 'y' ) ) {
            self.instance.jumpTo( self.instance.current.index, 150 );
        }

        self.$container.removeClass( 'fancybox-is-sliding' );

    };

    // Limit panning from edges
    // ========================

    Guestures.prototype.endPanning = function() {

        var self = this;
        var newOffsetX, newOffsetY, newPos;

        if ( !self.contentLastPos ) {
            return;
        }

        if ( self.instance.current.opts.touch.momentum === false ) {
            newOffsetX = self.contentLastPos.left;
            newOffsetY = self.contentLastPos.top;

        } else {

            // Continue movement
            newOffsetX = self.contentLastPos.left + ( self.velocityX * self.speed );
            newOffsetY = self.contentLastPos.top  + ( self.velocityY * self.speed );
        }

        newPos = self.limitPosition( newOffsetX, newOffsetY, self.contentStartPos.width, self.contentStartPos.height );

        newPos.width  = self.contentStartPos.width;
        newPos.height = self.contentStartPos.height;

        $.fancybox.animate( self.$content, newPos, 330 );
    };


    Guestures.prototype.endZooming = function() {

        var self = this;

        var current = self.instance.current;

        var newOffsetX, newOffsetY, newPos, reset;

        var newWidth  = self.newWidth;
        var newHeight = self.newHeight;

        if ( !self.contentLastPos ) {
            return;
        }

        newOffsetX = self.contentLastPos.left;
        newOffsetY = self.contentLastPos.top;

        reset = {
            top    : newOffsetY,
            left   : newOffsetX,
            width  : newWidth,
            height : newHeight,
            scaleX : 1,
            scaleY : 1
        };

        // Reset scalex/scaleY values; this helps for perfomance and does not break animation
        $.fancybox.setTranslate( self.$content, reset );

        if ( newWidth < self.canvasWidth && newHeight < self.canvasHeight ) {
            self.instance.scaleToFit( 150 );

        } else if ( newWidth > current.width || newHeight > current.height ) {
            self.instance.scaleToActual( self.centerPointStartX, self.centerPointStartY, 150 );

        } else {

            newPos = self.limitPosition( newOffsetX, newOffsetY, newWidth, newHeight );

            // Switch from scale() to width/height or animation will not work correctly
            $.fancybox.setTranslate( self.content, $.fancybox.getTranslate( self.$content ) );

            $.fancybox.animate( self.$content, newPos, 150 );
        }

    };

    Guestures.prototype.onTap = function(e) {
        var self    = this;
        var $target = $( e.target );

        var instance = self.instance;
        var current  = instance.current;

        var endPoints = ( e && pointers( e ) ) || self.startPoints;

        var tapX = endPoints[0] ? endPoints[0].x - self.$stage.offset().left : 0;
        var tapY = endPoints[0] ? endPoints[0].y - self.$stage.offset().top  : 0;

        var where;

        var process = function ( prefix ) {

            var action = current.opts[ prefix ];

            if ( $.isFunction( action ) ) {
                action = action.apply( instance, [ current, e ] );
            }

            if ( !action) {
                return;
            }

            switch ( action ) {

                case "close" :

                    instance.close( self.startEvent );

                    break;

                case "toggleControls" :

                    instance.toggleControls( true );

                    break;

                case "next" :

                    instance.next();

                    break;

                case "nextOrClose" :

                    if ( instance.group.length > 1 ) {
                        instance.next();

                    } else {
                        instance.close( self.startEvent );
                    }

                    break;

                case "zoom" :

                    if ( current.type == 'image' && ( current.isLoaded || current.$ghost ) ) {

                        if ( instance.canPan() ) {
                            instance.scaleToFit();

                        } else if ( instance.isScaledDown() ) {
                            instance.scaleToActual( tapX, tapY );

                        } else if ( instance.group.length < 2 ) {
                            instance.close( self.startEvent );
                        }
                    }

                    break;
            }

        };

        // Ignore right click
        if ( e.originalEvent && e.originalEvent.button == 2 ) {
            return;
        }

        // Skip if current slide is not in the center
        if ( instance.isSliding ) {
            return;
        }

        // Skip if clicked on the scrollbar
        if ( tapX > $target[0].clientWidth + $target.offset().left ) {
            return;
        }

        // Check where is clicked
        if ( $target.is( '.fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container' ) ) {
            where = 'Outside';

        } else if ( $target.is( '.fancybox-slide' ) ) {
            where = 'Slide';

        } else if  ( instance.current.$content && instance.current.$content.has( e.target ).length ) {
            where = 'Content';

        } else {
            return;
        }

        // Check if this is a double tap
        if ( self.tapped ) {

            // Stop previously created single tap
            clearTimeout( self.tapped );
            self.tapped = null;

            // Skip if distance between taps is too big
            if ( Math.abs( tapX - self.tapX ) > 50 || Math.abs( tapY - self.tapY ) > 50 || instance.isSliding ) {
                return this;
            }

            // OK, now we assume that this is a double-tap
            process( 'dblclick' + where );

        } else {

            // Single tap will be processed if user has not clicked second time within 300ms
            // or there is no need to wait for double-tap
            self.tapX = tapX;
            self.tapY = tapY;

            if ( current.opts[ 'dblclick' + where ] && current.opts[ 'dblclick' + where ] !== current.opts[ 'click' + where ] ) {
                self.tapped = setTimeout(function() {
                    self.tapped = null;

                    process( 'click' + where );

                }, 300);

            } else {
                process( 'click' + where );
            }

        }

        return this;
    };

    $(document).on('onActivate.fb', function (e, instance) {
        if ( instance && !instance.Guestures ) {
            instance.Guestures = new Guestures( instance );
        }
    });

    $(document).on('beforeClose.fb', function (e, instance) {
        if ( instance && instance.Guestures ) {
            instance.Guestures.destroy();
        }
    });


}(window, document, window.jQuery));

// ==========================================================================
//
// SlideShow
// Enables slideshow functionality
//
// Example of usage:
// $.fancybox.getInstance().SlideShow.start()
//
// ==========================================================================
;(function (document, $) {
    'use strict';

    var SlideShow = function( instance ) {
        this.instance = instance;
        this.init();
    };

    $.extend( SlideShow.prototype, {
        timer    : null,
        isActive : false,
        $button  : null,
        speed    : 3000,

        init : function() {
            var self = this;

            self.$button = self.instance.$refs.toolbar.find('[data-fancybox-play]').on('click', function() {
                self.toggle();
            });

            if ( self.instance.group.length < 2 || !self.instance.group[ self.instance.currIndex ].opts.slideShow ) {
                self.$button.hide();
            }
        },

        set : function() {
            var self = this;

            // Check if reached last element
            if ( self.instance && self.instance.current && (self.instance.current.opts.loop || self.instance.currIndex < self.instance.group.length - 1 )) {
                self.timer = setTimeout(function() {
                    self.instance.next();

                }, self.instance.current.opts.slideShow.speed || self.speed);

            } else {
                self.stop();
                self.instance.idleSecondsCounter = 0;
                self.instance.showControls();
            }

        },

        clear : function() {
            var self = this;

            clearTimeout( self.timer );

            self.timer = null;
        },

        start : function() {
            var self = this;
            var current = self.instance.current;

            if ( self.instance && current && ( current.opts.loop || current.index < self.instance.group.length - 1 )) {

                self.isActive = true;

                self.$button
                    .attr( 'title', current.opts.i18n[ current.opts.lang ].PLAY_STOP )
                    .addClass( 'fancybox-button--pause' );

                if ( current.isComplete ) {
                    self.set();
                }
            }
        },

        stop : function() {
            var self = this;
            var current = self.instance.current;

            self.clear();

            self.$button
                .attr( 'title', current.opts.i18n[ current.opts.lang ].PLAY_START )
                .removeClass( 'fancybox-button--pause' );

            self.isActive = false;
        },

        toggle : function() {
            var self = this;

            if ( self.isActive ) {
                self.stop();

            } else {
                self.start();
            }
        }

    });

    $(document).on({
        'onInit.fb' : function(e, instance) {
            if ( instance && !instance.SlideShow ) {
                instance.SlideShow = new SlideShow( instance );
            }
        },

        'beforeShow.fb' : function(e, instance, current, firstRun) {
            var SlideShow = instance && instance.SlideShow;

            if ( firstRun ) {

                if ( SlideShow && current.opts.slideShow.autoStart ) {
                    SlideShow.start();
                }

            } else if ( SlideShow && SlideShow.isActive )  {
                SlideShow.clear();
            }
        },

        'afterShow.fb' : function(e, instance, current) {
            var SlideShow = instance && instance.SlideShow;

            if ( SlideShow && SlideShow.isActive ) {
                SlideShow.set();
            }
        },

        'afterKeydown.fb' : function(e, instance, current, keypress, keycode) {
            var SlideShow = instance && instance.SlideShow;

            // "P" or Spacebar
            if ( SlideShow && current.opts.slideShow && ( keycode === 80 || keycode === 32 ) && !$(document.activeElement).is( 'button,a,input' ) ) {
                keypress.preventDefault();

                SlideShow.toggle();
            }
        },

        'beforeClose.fb onDeactivate.fb' : function(e, instance) {
            var SlideShow = instance && instance.SlideShow;

            if ( SlideShow ) {
                SlideShow.stop();
            }
        }
    });

    // Page Visibility API to pause slideshow when window is not active
    $(document).on("visibilitychange", function() {
        var instance  = $.fancybox.getInstance();
        var SlideShow = instance && instance.SlideShow;

        if ( SlideShow && SlideShow.isActive ) {
            if ( document.hidden ) {
                SlideShow.clear();

            } else {
                SlideShow.set();
            }
        }
    });

}(document, window.jQuery));

// ==========================================================================
//
// FullScreen
// Adds fullscreen functionality
//
// ==========================================================================
;(function (document, $) {
    'use strict';

    // Collection of methods supported by user browser
    var fn = (function () {

        var fnMap = [
            [
                'requestFullscreen',
                'exitFullscreen',
                'fullscreenElement',
                'fullscreenEnabled',
                'fullscreenchange',
                'fullscreenerror'
            ],
            // new WebKit
            [
                'webkitRequestFullscreen',
                'webkitExitFullscreen',
                'webkitFullscreenElement',
                'webkitFullscreenEnabled',
                'webkitfullscreenchange',
                'webkitfullscreenerror'

            ],
            // old WebKit (Safari 5.1)
            [
                'webkitRequestFullScreen',
                'webkitCancelFullScreen',
                'webkitCurrentFullScreenElement',
                'webkitCancelFullScreen',
                'webkitfullscreenchange',
                'webkitfullscreenerror'

            ],
            [
                'mozRequestFullScreen',
                'mozCancelFullScreen',
                'mozFullScreenElement',
                'mozFullScreenEnabled',
                'mozfullscreenchange',
                'mozfullscreenerror'
            ],
            [
                'msRequestFullscreen',
                'msExitFullscreen',
                'msFullscreenElement',
                'msFullscreenEnabled',
                'MSFullscreenChange',
                'MSFullscreenError'
            ]
        ];

        var val;
        var ret = {};
        var i, j;

        for ( i = 0; i < fnMap.length; i++ ) {
            val = fnMap[ i ];

            if ( val && val[ 1 ] in document ) {
                for ( j = 0; j < val.length; j++ ) {
                    ret[ fnMap[ 0 ][ j ] ] = val[ j ];
                }

                return ret;
            }
        }

        return false;
    })();

    // If browser does not have Full Screen API, then simply unset default button template and stop
    if ( !fn ) {

        if ( $ && $.fancybox ) {
            $.fancybox.defaults.btnTpl.fullScreen = false;
        }

        return;
    }

    var FullScreen = {

        request : function ( elem ) {

            elem = elem || document.documentElement;

            elem[ fn.requestFullscreen ]( elem.ALLOW_KEYBOARD_INPUT );

        },
        exit : function () {

            document[ fn.exitFullscreen ]();

        },
        toggle : function ( elem ) {

            elem = elem || document.documentElement;

            if ( this.isFullscreen() ) {
                this.exit();

            } else {
                this.request( elem );
            }

        },
        isFullscreen : function()  {

            return Boolean( document[ fn.fullscreenElement ] );

        },
        enabled : function()  {

            return Boolean( document[ fn.fullscreenEnabled ] );

        }
    };

    $(document).on({
        'onInit.fb' : function(e, instance) {
            var $container;

            var $button = instance.$refs.toolbar.find('[data-fancybox-fullscreen]');

            if ( instance && !instance.FullScreen && instance.group[ instance.currIndex ].opts.fullScreen ) {
                $container = instance.$refs.container;

                $container.on('click.fb-fullscreen', '[data-fancybox-fullscreen]', function(e) {

                    e.stopPropagation();
                    e.preventDefault();

                    FullScreen.toggle( $container[ 0 ] );

                });

                if ( instance.opts.fullScreen && instance.opts.fullScreen.autoStart === true ) {
                    FullScreen.request( $container[ 0 ] );
                }

                // Expose API
                instance.FullScreen = FullScreen;

            } else {
                $button.hide();
            }

        },

        'afterKeydown.fb' : function(e, instance, current, keypress, keycode) {

            // "P" or Spacebar
            if ( instance && instance.FullScreen && keycode === 70 ) {
                keypress.preventDefault();

                instance.FullScreen.toggle( instance.$refs.container[ 0 ] );
            }

        },

        'beforeClose.fb' : function( instance ) {
            if ( instance && instance.FullScreen ) {
                FullScreen.exit();
            }
        }
    });

    $(document).on(fn.fullscreenchange, function() {
        var instance = $.fancybox.getInstance();

        // If image is zooming, then force to stop and reposition properly
        if ( instance.current && instance.current.type === 'image' && instance.isAnimating ) {
            instance.current.$content.css( 'transition', 'none' );

            instance.isAnimating = false;

            instance.update( true, true, 0 );
        }

        instance.trigger('onFullscreenChange', FullScreen.isFullscreen() );

    });

}(document, window.jQuery));

// ==========================================================================
//
// Thumbs
// Displays thumbnails in a grid
//
// ==========================================================================
;(function (document, $) {
    'use strict';

    var FancyThumbs = function( instance ) {
        this.instance = instance;
        this.init();
    };

    $.extend( FancyThumbs.prototype, {

        $button		: null,
        $grid		: null,
        $list		: null,
        isVisible	: false,

        init : function() {
            var self = this;

            var first  = self.instance.group[0],
                second = self.instance.group[1];

            self.$button = self.instance.$refs.toolbar.find( '[data-fancybox-thumbs]' );

            if ( self.instance.group.length > 1 && self.instance.group[ self.instance.currIndex ].opts.thumbs && (
                ( first.type == 'image'  || first.opts.thumb  || first.opts.$thumb ) &&
                ( second.type == 'image' || second.opts.thumb || second.opts.$thumb )
            )) {

                self.$button.on('click', function() {
                    self.toggle();
                });

                self.isActive = true;

            } else {
                self.$button.hide();

                self.isActive = false;
            }

        },

        create : function() {
            var instance = this.instance,
                list,
                src;

            this.$grid = $('<div class="fancybox-thumbs"></div>').appendTo( instance.$refs.container );

            list = '<ul>';

            $.each(instance.group, function( i, item ) {

                src = item.opts.thumb || ( item.opts.$thumb ? item.opts.$thumb.attr('src') : null );

                if ( !src && item.type === 'image' ) {
                    src = item.src;
                }

                if ( src && src.length ) {
                    list += '<li data-index="' + i + '"  tabindex="0" class="fancybox-thumbs-loading"><img data-src="' + src + '" /></li>';
                }

            });

            list += '</ul>';

            this.$list = $( list ).appendTo( this.$grid ).on('click', 'li', function() {
                instance.jumpTo( $(this).data('index') );
            });

            this.$list.find('img').hide().one('load', function() {

                var $parent		= $(this).parent().removeClass('fancybox-thumbs-loading'),
                    thumbWidth	= $parent.outerWidth(),
                    thumbHeight	= $parent.outerHeight(),
                    width,
                    height,
                    widthRatio,
                    heightRatio;

                width  = this.naturalWidth	|| this.width;
                height = this.naturalHeight	|| this.height;

                //Calculate thumbnail width/height and center it

                widthRatio  = width  / thumbWidth;
                heightRatio = height / thumbHeight;

                if (widthRatio >= 1 && heightRatio >= 1) {
                    if (widthRatio > heightRatio) {
                        width  = width / heightRatio;
                        height = thumbHeight;

                    } else {
                        width  = thumbWidth;
                        height = height / widthRatio;
                    }
                }

                $(this).css({
                    width         : Math.floor(width),
                    height        : Math.floor(height),
                    'margin-top'  : Math.min( 0, Math.floor(thumbHeight * 0.3 - height * 0.3 ) ),
                    'margin-left' : Math.min( 0, Math.floor(thumbWidth  * 0.5 - width  * 0.5 ) )
                }).show();

            })
                .each(function() {
                    this.src = $( this ).data( 'src' );
                });

        },

        focus : function() {

            if ( this.instance.current ) {
                this.$list
                    .children()
                    .removeClass('fancybox-thumbs-active')
                    .filter('[data-index="' + this.instance.current.index  + '"]')
                    .addClass('fancybox-thumbs-active')
                    .focus();
            }

        },

        close : function() {
            this.$grid.hide();
        },

        update : function() {

            this.instance.$refs.container.toggleClass( 'fancybox-show-thumbs', this.isVisible );

            if ( this.isVisible ) {

                if ( !this.$grid ) {
                    this.create();
                }

                this.instance.trigger( 'onThumbsShow' );

                this.focus();

            } else if ( this.$grid ) {
                this.instance.trigger( 'onThumbsHide' );
            }

            // Update content position
            this.instance.update();

        },

        hide : function() {
            this.isVisible = false;
            this.update();
        },

        show : function() {
            this.isVisible = true;
            this.update();
        },

        toggle : function() {
            this.isVisible = !this.isVisible;
            this.update();
        }

    });

    $(document).on({

        'onInit.fb' : function(e, instance) {
            if ( instance && !instance.Thumbs ) {
                instance.Thumbs = new FancyThumbs( instance );
            }
        },

        'beforeShow.fb' : function(e, instance, item, firstRun) {
            var Thumbs = instance && instance.Thumbs;

            if ( !Thumbs || !Thumbs.isActive ) {
                return;
            }

            if ( item.modal ) {
                Thumbs.$button.hide();

                Thumbs.hide();

                return;
            }

            if ( firstRun && instance.opts.thumbs.autoStart === true ) {
                Thumbs.show();
            }

            if ( Thumbs.isVisible ) {
                Thumbs.focus();
            }
        },

        'afterKeydown.fb' : function(e, instance, current, keypress, keycode) {
            var Thumbs = instance && instance.Thumbs;

            // "G"
            if ( Thumbs && Thumbs.isActive && keycode === 71 ) {
                keypress.preventDefault();

                Thumbs.toggle();
            }
        },

        'beforeClose.fb' : function( e, instance ) {
            var Thumbs = instance && instance.Thumbs;

            if ( Thumbs && Thumbs.isVisible && instance.opts.thumbs.hideOnClose !== false ) {
                Thumbs.close();
            }
        }

    });

}(document, window.jQuery));

// ==========================================================================
//
// Hash
// Enables linking to each modal
//
// ==========================================================================
;(function (document, window, $) {
    'use strict';

    // Simple $.escapeSelector polyfill (for jQuery prior v3)
    if ( !$.escapeSelector ) {
        $.escapeSelector = function( sel ) {
            var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
            var fcssescape = function( ch, asCodePoint ) {
                if ( asCodePoint ) {
                    // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
                    if ( ch === "\0" ) {
                        return "\uFFFD";
                    }

                    // Control characters and (dependent upon position) numbers get escaped as code points
                    return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
                }

                // Other potentially-special ASCII characters get backslash-escaped
                return "\\" + ch;
            };

            return ( sel + "" ).replace( rcssescape, fcssescape );
        };
    }

    // Create new history entry only once
    var shouldCreateHistory = true;

    // Variable containing last hash value set by fancyBox
    // It will be used to determine if fancyBox needs to close after hash change is detected
    var currentHash = null;

    // Throttling the history change
    var timerID = null;

    // Get info about gallery name and current index from url
    function parseUrl() {
        var hash    = window.location.hash.substr( 1 );
        var rez     = hash.split( '-' );
        var index   = rez.length > 1 && /^\+?\d+$/.test( rez[ rez.length - 1 ] ) ? parseInt( rez.pop( -1 ), 10 ) || 1 : 1;
        var gallery = rez.join( '-' );

        // Index is starting from 1
        if ( index < 1 ) {
            index = 1;
        }

        return {
            hash    : hash,
            index   : index,
            gallery : gallery
        };
    }

    // Trigger click evnt on links to open new fancyBox instance
    function triggerFromUrl( url ) {
        var $el;

        if ( url.gallery !== '' ) {

            // If we can find element matching 'data-fancybox' atribute, then trigger click event for that ..
            $el = $( "[data-fancybox='" + $.escapeSelector( url.gallery ) + "']" ).eq( url.index - 1 );

            if ( !$el.length ) {
                // .. if not, try finding element by ID
                $el = $( "#" + $.escapeSelector( url.gallery ) + "" );
            }

            if ( $el.length ) {
                shouldCreateHistory = false;

                $el.trigger( 'click' );
            }

        }
    }

    // Get gallery name from current instance
    function getGalleryID( instance ) {
        var opts;

        if ( !instance ) {
            return false;
        }

        opts = instance.current ? instance.current.opts : instance.opts;

        return opts.hash || ( opts.$orig ? opts.$orig.data( 'fancybox' ) : ''  );
    }

    // Star when DOM becomes ready
    $(function() {

        // Small delay is used to allow other scripts to process "dom ready" event
        setTimeout(function() {

            // Check if this module is not disabled
            if ( $.fancybox.defaults.hash === false ) {
                return;
            }

            // Update hash when opening/closing fancyBox
            $(document).on({
                'onInit.fb' : function( e, instance ) {
                    var url, gallery;

                    if ( instance.group[ instance.currIndex ].opts.hash === false ) {
                        return;
                    }

                    url     = parseUrl();
                    gallery = getGalleryID( instance );

                    // Make sure gallery start index matches index from hash
                    if ( gallery && url.gallery && gallery == url.gallery ) {
                        instance.currIndex = url.index - 1;
                    }

                },

                'beforeShow.fb' : function( e, instance, current ) {
                    var gallery;

                    if ( !current || current.opts.hash === false ) {
                        return;
                    }

                    gallery = getGalleryID( instance );

                    // Update window hash
                    if ( gallery && gallery !== '' ) {

                        if ( window.location.hash.indexOf( gallery ) < 0 ) {
                            instance.opts.origHash = window.location.hash;
                        }

                        currentHash = gallery + ( instance.group.length > 1 ? '-' + ( current.index + 1 ) : '' );

                        if ( 'replaceState' in window.history ) {
                            if ( timerID ) {
                                clearTimeout( timerID );
                            }

                            timerID = setTimeout(function() {
                                window.history[ shouldCreateHistory ? 'pushState' : 'replaceState' ]( {} , document.title, window.location.pathname + window.location.search + '#' +  currentHash );

                                timerID = null;

                                shouldCreateHistory = false;

                            }, 300);

                        } else {
                            window.location.hash = currentHash;
                        }

                    }

                },

                'beforeClose.fb' : function( e, instance, current ) {
                    var gallery, origHash;

                    if ( timerID ) {
                        clearTimeout( timerID );
                    }

                    if ( current.opts.hash === false ) {
                        return;
                    }

                    gallery  = getGalleryID( instance );
                    origHash = instance && instance.opts.origHash ? instance.opts.origHash : '';

                    // Remove hash from location bar
                    if ( gallery && gallery !== '' ) {

                        if ( 'replaceState' in history ) {
                            window.history.replaceState( {} , document.title, window.location.pathname + window.location.search + origHash );

                        } else {
                            window.location.hash = origHash;

                            // Keep original scroll position
                            $( window ).scrollTop( instance.scrollTop ).scrollLeft( instance.scrollLeft );
                        }
                    }

                    currentHash = null;
                }
            });

            // Check if need to close after url has changed
            $(window).on('hashchange.fb', function() {
                var url = parseUrl();

                if ( $.fancybox.getInstance() ) {
                    if ( currentHash && currentHash !== url.gallery + '-' + url.index && !( url.index === 1 && currentHash == url.gallery ) ) {
                        currentHash = null;

                        $.fancybox.close();
                    }

                } else if ( url.gallery !== '' ) {
                    triggerFromUrl( url );
                }
            });

            // Check current hash and trigger click event on matching element to start fancyBox, if needed
            triggerFromUrl( parseUrl() );

        }, 50);

    });

}(document, window, window.jQuery));
function isIE () {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}



/*! npm.im/object-fit-images 3.2.4 */
var objectFitImages=function(){"use strict";function t(t,e){return"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='"+t+"' height='"+e+"'%3E%3C/svg%3E"}function e(t){if(t.srcset&&!p&&window.picturefill){var e=window.picturefill._;t[e.ns]&&t[e.ns].evaled||e.fillImg(t,{reselect:!0}),t[e.ns].curSrc||(t[e.ns].supported=!1,e.fillImg(t,{reselect:!0})),t.currentSrc=t[e.ns].curSrc||t.src}}function i(t){for(var e,i=getComputedStyle(t).fontFamily,r={};null!==(e=u.exec(i));)r[e[1]]=e[2];return r}function r(e,i,r){var n=t(i||1,r||0);b.call(e,"src")!==n&&h.call(e,"src",n)}function n(t,e){t.naturalWidth?e(t):setTimeout(n,100,t,e)}function c(t){var c=i(t),o=t[l];if(c["object-fit"]=c["object-fit"]||"fill",!o.img){if("fill"===c["object-fit"])return;if(!o.skipTest&&f&&!c["object-position"])return}if(!o.img){o.img=new Image(t.width,t.height),o.img.srcset=b.call(t,"data-ofi-srcset")||t.srcset,o.img.src=b.call(t,"data-ofi-src")||t.src,h.call(t,"data-ofi-src",t.src),t.srcset&&h.call(t,"data-ofi-srcset",t.srcset),r(t,t.naturalWidth||t.width,t.naturalHeight||t.height),t.srcset&&(t.srcset="");try{s(t)}catch(t){window.console&&console.warn("https://bit.ly/ofi-old-browser")}}e(o.img),t.style.backgroundImage='url("'+(o.img.currentSrc||o.img.src).replace(/"/g,'\\"')+'")',t.style.backgroundPosition=c["object-position"]||"center",t.style.backgroundRepeat="no-repeat",t.style.backgroundOrigin="content-box",/scale-down/.test(c["object-fit"])?n(o.img,function(){o.img.naturalWidth>t.width||o.img.naturalHeight>t.height?t.style.backgroundSize="contain":t.style.backgroundSize="auto"}):t.style.backgroundSize=c["object-fit"].replace("none","auto").replace("fill","100% 100%"),n(o.img,function(e){r(t,e.naturalWidth,e.naturalHeight)})}function s(t){var e={get:function(e){return t[l].img[e?e:"src"]},set:function(e,i){return t[l].img[i?i:"src"]=e,h.call(t,"data-ofi-"+i,e),c(t),e}};Object.defineProperty(t,"src",e),Object.defineProperty(t,"currentSrc",{get:function(){return e.get("currentSrc")}}),Object.defineProperty(t,"srcset",{get:function(){return e.get("srcset")},set:function(t){return e.set(t,"srcset")}})}function o(){function t(t,e){return t[l]&&t[l].img&&("src"===e||"srcset"===e)?t[l].img:t}d||(HTMLImageElement.prototype.getAttribute=function(e){return b.call(t(this,e),e)},HTMLImageElement.prototype.setAttribute=function(e,i){return h.call(t(this,e),e,String(i))})}function a(t,e){var i=!y&&!t;if(e=e||{},t=t||"img",d&&!e.skipTest||!m)return!1;"img"===t?t=document.getElementsByTagName("img"):"string"==typeof t?t=document.querySelectorAll(t):"length"in t||(t=[t]);for(var r=0;r<t.length;r++)t[r][l]=t[r][l]||{skipTest:e.skipTest},c(t[r]);i&&(document.body.addEventListener("load",function(t){"IMG"===t.target.tagName&&a(t.target,{skipTest:e.skipTest})},!0),y=!0,t="img"),e.watchMQ&&window.addEventListener("resize",a.bind(null,t,{skipTest:e.skipTest}))}var l="fregante:object-fit-images",u=/(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,g="undefined"==typeof Image?{style:{"object-position":1}}:new Image,f="object-fit"in g.style,d="object-position"in g.style,m="background-size"in g.style,p="string"==typeof g.currentSrc,b=g.getAttribute,h=g.setAttribute,y=!1;return a.supportsObjectFit=f,a.supportsObjectPosition=d,o(),a}();
(function (ELEMENT) {
    ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
    ELEMENT.closest = ELEMENT.closest || function closest(selector) {
        if (!this) return null;
        if (this.matches(selector)) return this;
        if (!this.parentElement) {
            return null
        }
        else return this.parentElement.closest(selector)
    };
}(Element.prototype));


if ('NodeList' in window && !NodeList.prototype.forEach) {
    console.info('polyfill for IE11');
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

/////////////////////////  svgPolyFill  ////////////////////////
!function(a,b){"function"==typeof define&&define.amd?// AMD. Register as an anonymous module unless amdModuleId is set
    define([],function(){return a.svg4everybody=b()}):"object"==typeof exports?module.exports=b():a.svg4everybody=b()}(this,function(){/*! svg4everybody v2.0.3 | github.com/jonathantneal/svg4everybody */
    function a(a,b){
        if(b){
            var c=document.createDocumentFragment(),d=!a.getAttribute("viewBox")&&b.getAttribute("viewBox");
            d&&a.setAttribute("viewBox",d);
            for(// clone the target
                var e=b.cloneNode(!0);e.childNodes.length;)c.appendChild(e.firstChild);
            a.appendChild(c)}}function b(b){
        b.onreadystatechange=function(){
            if(4===b.readyState){
                var c=b._cachedDocument;
                c||(c=b._cachedDocument=document.implementation.createHTMLDocument(""),c.body.innerHTML=b.responseText,b._cachedTarget={}),// clear the xhr embeds list and embed each item
                    b._embeds.splice(0).map(function(d){
                        var e=b._cachedTarget[d.id];
                        e||(e=b._cachedTarget[d.id]=c.getElementById(d.id)),
                            a(d.svg,e)})}},
            b.onreadystatechange()}function c(c){function d(){
        for(
            var c=0;c<o.length;){
            var i=o[c],j=i.parentNode;if(j&&/svg/i.test(j.nodeName)){var k=i.getAttribute("xlink:href");
                if(e){
                    var l=document.createElement("img");
                    l.style.cssText="display:inline-block;height:100%;width:100%",// set the fallback size using the svg size
                        l.setAttribute("width",j.getAttribute("width")||j.clientWidth),l.setAttribute("height",j.getAttribute("height")||j.clientHeight),
                        l.src=f(k,j,i),
                        j.replaceChild(l,i)}else if(h&&(!g.validate||g.validate(k,j,i))){
                    j.removeChild(i);
                    var p=k.split("#"),q=p.shift(),r=p.join("#");
                    if(q.length){
                        var s=m[q];
                        s||(s=m[q]=new XMLHttpRequest,s.open("GET",q),s.send(),s._embeds=[]),
                            s._embeds.push({svg:j,id:r}),
                            b(s)}else
                        a(j,document.getElementById(r))}}else
                ++c}
        n(d,67)}var e,f,g=Object(c);f=g.fallback||function(a){return a.replace(/\?[^#]+/,"").replace("#",".").replace(/^\./,"")+".png"+(/\?[^#]+/.exec(a)||[""])[0]},e="nosvg"in g?g.nosvg:/\bMSIE [1-8]\b/.test(navigator.userAgent),e&&(document.createElement("svg"),document.createElement("use"));
        var h,i=/\bMSIE [1-8]\.0\b/,j=/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,k=/\bAppleWebKit\/(\d+)\b/,l=/\bEdge\/12\.(\d+)\b/;h="polyfill"in g?g.polyfill:i.test(navigator.userAgent)||j.test(navigator.userAgent)||(navigator.userAgent.match(l)||[])[1]<10547||(navigator.userAgent.match(k)||[])[1]<537;
        var m={},n=window.requestAnimationFrame||setTimeout,o=document.getElementsByTagName("use");
        h&&d()}return c});


/**
 * Swiper 5.4.5
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://swiperjs.com
 *
 * Copyright 2014-2020 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: June 16, 2020
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Swiper = factory());
}(this, (function () { 'use strict';

    /**
     * SSR Window 2.0.0
     * Better handling for window object in SSR environment
     * https://github.com/nolimits4web/ssr-window
     *
     * Copyright 2020, Vladimir Kharlampidi
     *
     * Licensed under MIT
     *
     * Released on: May 12, 2020
     */
    /* eslint-disable no-param-reassign */
    function isObject(obj) {
        return (obj !== null &&
            typeof obj === 'object' &&
            'constructor' in obj &&
            obj.constructor === Object);
    }
    function extend(target, src) {
        if (target === void 0) { target = {}; }
        if (src === void 0) { src = {}; }
        Object.keys(src).forEach(function (key) {
            if (typeof target[key] === 'undefined')
                { target[key] = src[key]; }
            else if (isObject(src[key]) &&
                isObject(target[key]) &&
                Object.keys(src[key]).length > 0) {
                extend(target[key], src[key]);
            }
        });
    }

    var doc = typeof document !== 'undefined' ? document : {};
    var ssrDocument = {
        body: {},
        addEventListener: function () { },
        removeEventListener: function () { },
        activeElement: {
            blur: function () { },
            nodeName: '',
        },
        querySelector: function () {
            return null;
        },
        querySelectorAll: function () {
            return [];
        },
        getElementById: function () {
            return null;
        },
        createEvent: function () {
            return {
                initEvent: function () { },
            };
        },
        createElement: function () {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute: function () { },
                getElementsByTagName: function () {
                    return [];
                },
            };
        },
        createElementNS: function () {
            return {};
        },
        importNode: function () {
            return null;
        },
        location: {
            hash: '',
            host: '',
            hostname: '',
            href: '',
            origin: '',
            pathname: '',
            protocol: '',
            search: '',
        },
    };
    extend(doc, ssrDocument);

    var win = typeof window !== 'undefined' ? window : {};
    var ssrWindow = {
        document: ssrDocument,
        navigator: {
            userAgent: '',
        },
        location: {
            hash: '',
            host: '',
            hostname: '',
            href: '',
            origin: '',
            pathname: '',
            protocol: '',
            search: '',
        },
        history: {
            replaceState: function () { },
            pushState: function () { },
            go: function () { },
            back: function () { },
        },
        CustomEvent: function CustomEvent() {
            return this;
        },
        addEventListener: function () { },
        removeEventListener: function () { },
        getComputedStyle: function () {
            return {
                getPropertyValue: function () {
                    return '';
                },
            };
        },
        Image: function () { },
        Date: function () { },
        screen: {},
        setTimeout: function () { },
        clearTimeout: function () { },
        matchMedia: function () {
            return {};
        },
    };
    extend(win, ssrWindow);

    /**
     * Dom7 2.1.5
     * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
     * http://framework7.io/docs/dom.html
     *
     * Copyright 2020, Vladimir Kharlampidi
     * The iDangero.us
     * http://www.idangero.us/
     *
     * Licensed under MIT
     *
     * Released on: May 15, 2020
     */

    var Dom7 = function Dom7(arr) {
      var self = this;
      // Create array-like object
      for (var i = 0; i < arr.length; i += 1) {
        self[i] = arr[i];
      }
      self.length = arr.length;
      // Return collection with methods
      return this;
    };

    function $(selector, context) {
      var arr = [];
      var i = 0;
      if (selector && !context) {
        if (selector instanceof Dom7) {
          return selector;
        }
      }
      if (selector) {
          // String
        if (typeof selector === 'string') {
          var els;
          var tempParent;
          var html = selector.trim();
          if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
            var toCreate = 'div';
            if (html.indexOf('<li') === 0) { toCreate = 'ul'; }
            if (html.indexOf('<tr') === 0) { toCreate = 'tbody'; }
            if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) { toCreate = 'tr'; }
            if (html.indexOf('<tbody') === 0) { toCreate = 'table'; }
            if (html.indexOf('<option') === 0) { toCreate = 'select'; }
            tempParent = doc.createElement(toCreate);
            tempParent.innerHTML = html;
            for (i = 0; i < tempParent.childNodes.length; i += 1) {
              arr.push(tempParent.childNodes[i]);
            }
          } else {
            if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
              // Pure ID selector
              els = [doc.getElementById(selector.trim().split('#')[1])];
            } else {
              // Other selectors
              els = (context || doc).querySelectorAll(selector.trim());
            }
            for (i = 0; i < els.length; i += 1) {
              if (els[i]) { arr.push(els[i]); }
            }
          }
        } else if (selector.nodeType || selector === win || selector === doc) {
          // Node/element
          arr.push(selector);
        } else if (selector.length > 0 && selector[0].nodeType) {
          // Array of elements or instance of Dom
          for (i = 0; i < selector.length; i += 1) {
            arr.push(selector[i]);
          }
        }
      }
      return new Dom7(arr);
    }

    $.fn = Dom7.prototype;
    $.Class = Dom7;
    $.Dom7 = Dom7;

    function unique(arr) {
      var uniqueArray = [];
      for (var i = 0; i < arr.length; i += 1) {
        if (uniqueArray.indexOf(arr[i]) === -1) { uniqueArray.push(arr[i]); }
      }
      return uniqueArray;
    }

    // Classes and attributes
    function addClass(className) {
      if (typeof className === 'undefined') {
        return this;
      }
      var classes = className.split(' ');
      for (var i = 0; i < classes.length; i += 1) {
        for (var j = 0; j < this.length; j += 1) {
          if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') { this[j].classList.add(classes[i]); }
        }
      }
      return this;
    }
    function removeClass(className) {
      var classes = className.split(' ');
      for (var i = 0; i < classes.length; i += 1) {
        for (var j = 0; j < this.length; j += 1) {
          if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') { this[j].classList.remove(classes[i]); }
        }
      }
      return this;
    }
    function hasClass(className) {
      if (!this[0]) { return false; }
      return this[0].classList.contains(className);
    }
    function toggleClass(className) {
      var classes = className.split(' ');
      for (var i = 0; i < classes.length; i += 1) {
        for (var j = 0; j < this.length; j += 1) {
          if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') { this[j].classList.toggle(classes[i]); }
        }
      }
      return this;
    }
    function attr(attrs, value) {
      var arguments$1 = arguments;

      if (arguments.length === 1 && typeof attrs === 'string') {
        // Get attr
        if (this[0]) { return this[0].getAttribute(attrs); }
        return undefined;
      }

      // Set attrs
      for (var i = 0; i < this.length; i += 1) {
        if (arguments$1.length === 2) {
          // String
          this[i].setAttribute(attrs, value);
        } else {
          // Object
          // eslint-disable-next-line
          for (var attrName in attrs) {
            this[i][attrName] = attrs[attrName];
            this[i].setAttribute(attrName, attrs[attrName]);
          }
        }
      }
      return this;
    }
    // eslint-disable-next-line
    function removeAttr(attr) {
      for (var i = 0; i < this.length; i += 1) {
        this[i].removeAttribute(attr);
      }
      return this;
    }
    function data(key, value) {
      var el;
      if (typeof value === 'undefined') {
        el = this[0];
        // Get value
        if (el) {
          if (el.dom7ElementDataStorage && (key in el.dom7ElementDataStorage)) {
            return el.dom7ElementDataStorage[key];
          }

          var dataKey = el.getAttribute(("data-" + key));
          if (dataKey) {
            return dataKey;
          }
          return undefined;
        }
        return undefined;
      }

      // Set value
      for (var i = 0; i < this.length; i += 1) {
        el = this[i];
        if (!el.dom7ElementDataStorage) { el.dom7ElementDataStorage = {}; }
        el.dom7ElementDataStorage[key] = value;
      }
      return this;
    }
    // Transforms
    // eslint-disable-next-line
    function transform(transform) {
      for (var i = 0; i < this.length; i += 1) {
        var elStyle = this[i].style;
        elStyle.webkitTransform = transform;
        elStyle.transform = transform;
      }
      return this;
    }
    function transition(duration) {
      if (typeof duration !== 'string') {
        duration = duration + "ms"; // eslint-disable-line
      }
      for (var i = 0; i < this.length; i += 1) {
        var elStyle = this[i].style;
        elStyle.webkitTransitionDuration = duration;
        elStyle.transitionDuration = duration;
      }
      return this;
    }
    // Events
    function on() {
      var assign;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      var eventType = args[0];
      var targetSelector = args[1];
      var listener = args[2];
      var capture = args[3];
      if (typeof args[1] === 'function') {
        (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
        targetSelector = undefined;
      }
      if (!capture) { capture = false; }

      function handleLiveEvent(e) {
        var target = e.target;
        if (!target) { return; }
        var eventData = e.target.dom7EventData || [];
        if (eventData.indexOf(e) < 0) {
          eventData.unshift(e);
        }
        if ($(target).is(targetSelector)) { listener.apply(target, eventData); }
        else {
          var parents = $(target).parents(); // eslint-disable-line
          for (var k = 0; k < parents.length; k += 1) {
            if ($(parents[k]).is(targetSelector)) { listener.apply(parents[k], eventData); }
          }
        }
      }
      function handleEvent(e) {
        var eventData = e && e.target ? e.target.dom7EventData || [] : [];
        if (eventData.indexOf(e) < 0) {
          eventData.unshift(e);
        }
        listener.apply(this, eventData);
      }
      var events = eventType.split(' ');
      var j;
      for (var i = 0; i < this.length; i += 1) {
        var el = this[i];
        if (!targetSelector) {
          for (j = 0; j < events.length; j += 1) {
            var event = events[j];
            if (!el.dom7Listeners) { el.dom7Listeners = {}; }
            if (!el.dom7Listeners[event]) { el.dom7Listeners[event] = []; }
            el.dom7Listeners[event].push({
              listener: listener,
              proxyListener: handleEvent,
            });
            el.addEventListener(event, handleEvent, capture);
          }
        } else {
          // Live events
          for (j = 0; j < events.length; j += 1) {
            var event$1 = events[j];
            if (!el.dom7LiveListeners) { el.dom7LiveListeners = {}; }
            if (!el.dom7LiveListeners[event$1]) { el.dom7LiveListeners[event$1] = []; }
            el.dom7LiveListeners[event$1].push({
              listener: listener,
              proxyListener: handleLiveEvent,
            });
            el.addEventListener(event$1, handleLiveEvent, capture);
          }
        }
      }
      return this;
    }
    function off() {
      var assign;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      var eventType = args[0];
      var targetSelector = args[1];
      var listener = args[2];
      var capture = args[3];
      if (typeof args[1] === 'function') {
        (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
        targetSelector = undefined;
      }
      if (!capture) { capture = false; }

      var events = eventType.split(' ');
      for (var i = 0; i < events.length; i += 1) {
        var event = events[i];
        for (var j = 0; j < this.length; j += 1) {
          var el = this[j];
          var handlers = (void 0);
          if (!targetSelector && el.dom7Listeners) {
            handlers = el.dom7Listeners[event];
          } else if (targetSelector && el.dom7LiveListeners) {
            handlers = el.dom7LiveListeners[event];
          }
          if (handlers && handlers.length) {
            for (var k = handlers.length - 1; k >= 0; k -= 1) {
              var handler = handlers[k];
              if (listener && handler.listener === listener) {
                el.removeEventListener(event, handler.proxyListener, capture);
                handlers.splice(k, 1);
              } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
                el.removeEventListener(event, handler.proxyListener, capture);
                handlers.splice(k, 1);
              } else if (!listener) {
                el.removeEventListener(event, handler.proxyListener, capture);
                handlers.splice(k, 1);
              }
            }
          }
        }
      }
      return this;
    }
    function trigger() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var events = args[0].split(' ');
      var eventData = args[1];
      for (var i = 0; i < events.length; i += 1) {
        var event = events[i];
        for (var j = 0; j < this.length; j += 1) {
          var el = this[j];
          var evt = (void 0);
          try {
            evt = new win.CustomEvent(event, {
              detail: eventData,
              bubbles: true,
              cancelable: true,
            });
          } catch (e) {
            evt = doc.createEvent('Event');
            evt.initEvent(event, true, true);
            evt.detail = eventData;
          }
          // eslint-disable-next-line
          el.dom7EventData = args.filter(function (data, dataIndex) { return dataIndex > 0; });
          el.dispatchEvent(evt);
          el.dom7EventData = [];
          delete el.dom7EventData;
        }
      }
      return this;
    }
    function transitionEnd(callback) {
      var events = ['webkitTransitionEnd', 'transitionend'];
      var dom = this;
      var i;
      function fireCallBack(e) {
        /* jshint validthis:true */
        if (e.target !== this) { return; }
        callback.call(this, e);
        for (i = 0; i < events.length; i += 1) {
          dom.off(events[i], fireCallBack);
        }
      }
      if (callback) {
        for (i = 0; i < events.length; i += 1) {
          dom.on(events[i], fireCallBack);
        }
      }
      return this;
    }
    function outerWidth(includeMargins) {
      if (this.length > 0) {
        if (includeMargins) {
          // eslint-disable-next-line
          var styles = this.styles();
          return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
        }
        return this[0].offsetWidth;
      }
      return null;
    }
    function outerHeight(includeMargins) {
      if (this.length > 0) {
        if (includeMargins) {
          // eslint-disable-next-line
          var styles = this.styles();
          return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
        }
        return this[0].offsetHeight;
      }
      return null;
    }
    function offset() {
      if (this.length > 0) {
        var el = this[0];
        var box = el.getBoundingClientRect();
        var body = doc.body;
        var clientTop = el.clientTop || body.clientTop || 0;
        var clientLeft = el.clientLeft || body.clientLeft || 0;
        var scrollTop = el === win ? win.scrollY : el.scrollTop;
        var scrollLeft = el === win ? win.scrollX : el.scrollLeft;
        return {
          top: (box.top + scrollTop) - clientTop,
          left: (box.left + scrollLeft) - clientLeft,
        };
      }

      return null;
    }
    function styles() {
      if (this[0]) { return win.getComputedStyle(this[0], null); }
      return {};
    }
    function css(props, value) {
      var i;
      if (arguments.length === 1) {
        if (typeof props === 'string') {
          if (this[0]) { return win.getComputedStyle(this[0], null).getPropertyValue(props); }
        } else {
          for (i = 0; i < this.length; i += 1) {
            // eslint-disable-next-line
            for (var prop in props) {
              this[i].style[prop] = props[prop];
            }
          }
          return this;
        }
      }
      if (arguments.length === 2 && typeof props === 'string') {
        for (i = 0; i < this.length; i += 1) {
          this[i].style[props] = value;
        }
        return this;
      }
      return this;
    }
    // Iterate over the collection passing elements to `callback`
    function each(callback) {
      // Don't bother continuing without a callback
      if (!callback) { return this; }
      // Iterate over the current collection
      for (var i = 0; i < this.length; i += 1) {
        // If the callback returns false
        if (callback.call(this[i], i, this[i]) === false) {
          // End the loop early
          return this;
        }
      }
      // Return `this` to allow chained DOM operations
      return this;
    }
    function filter(callback) {
      var matchedItems = [];
      var dom = this;
      for (var i = 0; i < dom.length; i += 1) {
        if (callback.call(dom[i], i, dom[i])) { matchedItems.push(dom[i]); }
      }
      return new Dom7(matchedItems);
    }
    // eslint-disable-next-line
    function html(html) {
      if (typeof html === 'undefined') {
        return this[0] ? this[0].innerHTML : undefined;
      }

      for (var i = 0; i < this.length; i += 1) {
        this[i].innerHTML = html;
      }
      return this;
    }
    // eslint-disable-next-line
    function text(text) {
      if (typeof text === 'undefined') {
        if (this[0]) {
          return this[0].textContent.trim();
        }
        return null;
      }

      for (var i = 0; i < this.length; i += 1) {
        this[i].textContent = text;
      }
      return this;
    }
    function is(selector) {
      var el = this[0];
      var compareWith;
      var i;
      if (!el || typeof selector === 'undefined') { return false; }
      if (typeof selector === 'string') {
        if (el.matches) { return el.matches(selector); }
        else if (el.webkitMatchesSelector) { return el.webkitMatchesSelector(selector); }
        else if (el.msMatchesSelector) { return el.msMatchesSelector(selector); }

        compareWith = $(selector);
        for (i = 0; i < compareWith.length; i += 1) {
          if (compareWith[i] === el) { return true; }
        }
        return false;
      } else if (selector === doc) { return el === doc; }
      else if (selector === win) { return el === win; }

      if (selector.nodeType || selector instanceof Dom7) {
        compareWith = selector.nodeType ? [selector] : selector;
        for (i = 0; i < compareWith.length; i += 1) {
          if (compareWith[i] === el) { return true; }
        }
        return false;
      }
      return false;
    }
    function index() {
      var child = this[0];
      var i;
      if (child) {
        i = 0;
        // eslint-disable-next-line
        while ((child = child.previousSibling) !== null) {
          if (child.nodeType === 1) { i += 1; }
        }
        return i;
      }
      return undefined;
    }
    // eslint-disable-next-line
    function eq(index) {
      if (typeof index === 'undefined') { return this; }
      var length = this.length;
      var returnIndex;
      if (index > length - 1) {
        return new Dom7([]);
      }
      if (index < 0) {
        returnIndex = length + index;
        if (returnIndex < 0) { return new Dom7([]); }
        return new Dom7([this[returnIndex]]);
      }
      return new Dom7([this[index]]);
    }
    function append() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var newChild;

      for (var k = 0; k < args.length; k += 1) {
        newChild = args[k];
        for (var i = 0; i < this.length; i += 1) {
          if (typeof newChild === 'string') {
            var tempDiv = doc.createElement('div');
            tempDiv.innerHTML = newChild;
            while (tempDiv.firstChild) {
              this[i].appendChild(tempDiv.firstChild);
            }
          } else if (newChild instanceof Dom7) {
            for (var j = 0; j < newChild.length; j += 1) {
              this[i].appendChild(newChild[j]);
            }
          } else {
            this[i].appendChild(newChild);
          }
        }
      }

      return this;
    }
    function prepend(newChild) {
      var i;
      var j;
      for (i = 0; i < this.length; i += 1) {
        if (typeof newChild === 'string') {
          var tempDiv = doc.createElement('div');
          tempDiv.innerHTML = newChild;
          for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
          }
        } else if (newChild instanceof Dom7) {
          for (j = 0; j < newChild.length; j += 1) {
            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
          }
        } else {
          this[i].insertBefore(newChild, this[i].childNodes[0]);
        }
      }
      return this;
    }
    function next(selector) {
      if (this.length > 0) {
        if (selector) {
          if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
            return new Dom7([this[0].nextElementSibling]);
          }
          return new Dom7([]);
        }

        if (this[0].nextElementSibling) { return new Dom7([this[0].nextElementSibling]); }
        return new Dom7([]);
      }
      return new Dom7([]);
    }
    function nextAll(selector) {
      var nextEls = [];
      var el = this[0];
      if (!el) { return new Dom7([]); }
      while (el.nextElementSibling) {
        var next = el.nextElementSibling; // eslint-disable-line
        if (selector) {
          if ($(next).is(selector)) { nextEls.push(next); }
        } else { nextEls.push(next); }
        el = next;
      }
      return new Dom7(nextEls);
    }
    function prev(selector) {
      if (this.length > 0) {
        var el = this[0];
        if (selector) {
          if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
            return new Dom7([el.previousElementSibling]);
          }
          return new Dom7([]);
        }

        if (el.previousElementSibling) { return new Dom7([el.previousElementSibling]); }
        return new Dom7([]);
      }
      return new Dom7([]);
    }
    function prevAll(selector) {
      var prevEls = [];
      var el = this[0];
      if (!el) { return new Dom7([]); }
      while (el.previousElementSibling) {
        var prev = el.previousElementSibling; // eslint-disable-line
        if (selector) {
          if ($(prev).is(selector)) { prevEls.push(prev); }
        } else { prevEls.push(prev); }
        el = prev;
      }
      return new Dom7(prevEls);
    }
    function parent(selector) {
      var parents = []; // eslint-disable-line
      for (var i = 0; i < this.length; i += 1) {
        if (this[i].parentNode !== null) {
          if (selector) {
            if ($(this[i].parentNode).is(selector)) { parents.push(this[i].parentNode); }
          } else {
            parents.push(this[i].parentNode);
          }
        }
      }
      return $(unique(parents));
    }
    function parents(selector) {
      var parents = []; // eslint-disable-line
      for (var i = 0; i < this.length; i += 1) {
        var parent = this[i].parentNode; // eslint-disable-line
        while (parent) {
          if (selector) {
            if ($(parent).is(selector)) { parents.push(parent); }
          } else {
            parents.push(parent);
          }
          parent = parent.parentNode;
        }
      }
      return $(unique(parents));
    }
    function closest(selector) {
      var closest = this; // eslint-disable-line
      if (typeof selector === 'undefined') {
        return new Dom7([]);
      }
      if (!closest.is(selector)) {
        closest = closest.parents(selector).eq(0);
      }
      return closest;
    }
    function find(selector) {
      var foundElements = [];
      for (var i = 0; i < this.length; i += 1) {
        var found = this[i].querySelectorAll(selector);
        for (var j = 0; j < found.length; j += 1) {
          foundElements.push(found[j]);
        }
      }
      return new Dom7(foundElements);
    }
    function children(selector) {
      var children = []; // eslint-disable-line
      for (var i = 0; i < this.length; i += 1) {
        var childNodes = this[i].childNodes;

        for (var j = 0; j < childNodes.length; j += 1) {
          if (!selector) {
            if (childNodes[j].nodeType === 1) { children.push(childNodes[j]); }
          } else if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) {
            children.push(childNodes[j]);
          }
        }
      }
      return new Dom7(unique(children));
    }
    function remove() {
      for (var i = 0; i < this.length; i += 1) {
        if (this[i].parentNode) { this[i].parentNode.removeChild(this[i]); }
      }
      return this;
    }
    function add() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dom = this;
      var i;
      var j;
      for (i = 0; i < args.length; i += 1) {
        var toAdd = $(args[i]);
        for (j = 0; j < toAdd.length; j += 1) {
          dom[dom.length] = toAdd[j];
          dom.length += 1;
        }
      }
      return dom;
    }

    var Methods = {
      addClass: addClass,
      removeClass: removeClass,
      hasClass: hasClass,
      toggleClass: toggleClass,
      attr: attr,
      removeAttr: removeAttr,
      data: data,
      transform: transform,
      transition: transition,
      on: on,
      off: off,
      trigger: trigger,
      transitionEnd: transitionEnd,
      outerWidth: outerWidth,
      outerHeight: outerHeight,
      offset: offset,
      css: css,
      each: each,
      html: html,
      text: text,
      is: is,
      index: index,
      eq: eq,
      append: append,
      prepend: prepend,
      next: next,
      nextAll: nextAll,
      prev: prev,
      prevAll: prevAll,
      parent: parent,
      parents: parents,
      closest: closest,
      find: find,
      children: children,
      filter: filter,
      remove: remove,
      add: add,
      styles: styles,
    };

    Object.keys(Methods).forEach(function (methodName) {
      $.fn[methodName] = $.fn[methodName] || Methods[methodName];
    });

    var Utils = {
      deleteProps: function deleteProps(obj) {
        var object = obj;
        Object.keys(object).forEach(function (key) {
          try {
            object[key] = null;
          } catch (e) {
            // no getter for object
          }
          try {
            delete object[key];
          } catch (e) {
            // something got wrong
          }
        });
      },
      nextTick: function nextTick(callback, delay) {
        if ( delay === void 0 ) delay = 0;

        return setTimeout(callback, delay);
      },
      now: function now() {
        return Date.now();
      },
      getTranslate: function getTranslate(el, axis) {
        if ( axis === void 0 ) axis = 'x';

        var matrix;
        var curTransform;
        var transformMatrix;

        var curStyle = win.getComputedStyle(el, null);

        if (win.WebKitCSSMatrix) {
          curTransform = curStyle.transform || curStyle.webkitTransform;
          if (curTransform.split(',').length > 6) {
            curTransform = curTransform.split(', ').map(function (a) { return a.replace(',', '.'); }).join(', ');
          }
          // Some old versions of Webkit choke when 'none' is passed; pass
          // empty string instead in this case
          transformMatrix = new win.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
        } else {
          transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
          matrix = transformMatrix.toString().split(',');
        }

        if (axis === 'x') {
          // Latest Chrome and webkits Fix
          if (win.WebKitCSSMatrix) { curTransform = transformMatrix.m41; }
          // Crazy IE10 Matrix
          else if (matrix.length === 16) { curTransform = parseFloat(matrix[12]); }
          // Normal Browsers
          else { curTransform = parseFloat(matrix[4]); }
        }
        if (axis === 'y') {
          // Latest Chrome and webkits Fix
          if (win.WebKitCSSMatrix) { curTransform = transformMatrix.m42; }
          // Crazy IE10 Matrix
          else if (matrix.length === 16) { curTransform = parseFloat(matrix[13]); }
          // Normal Browsers
          else { curTransform = parseFloat(matrix[5]); }
        }
        return curTransform || 0;
      },
      parseUrlQuery: function parseUrlQuery(url) {
        var query = {};
        var urlToParse = url || win.location.href;
        var i;
        var params;
        var param;
        var length;
        if (typeof urlToParse === 'string' && urlToParse.length) {
          urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
          params = urlToParse.split('&').filter(function (paramsPart) { return paramsPart !== ''; });
          length = params.length;

          for (i = 0; i < length; i += 1) {
            param = params[i].replace(/#\S+/g, '').split('=');
            query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
          }
        }
        return query;
      },
      isObject: function isObject(o) {
        return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
      },
      extend: function extend() {
        var args = [], len$1 = arguments.length;
        while ( len$1-- ) args[ len$1 ] = arguments[ len$1 ];

        var to = Object(args[0]);
        for (var i = 1; i < args.length; i += 1) {
          var nextSource = args[i];
          if (nextSource !== undefined && nextSource !== null) {
            var keysArray = Object.keys(Object(nextSource));
            for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
              var nextKey = keysArray[nextIndex];
              var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
              if (desc !== undefined && desc.enumerable) {
                if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                  Utils.extend(to[nextKey], nextSource[nextKey]);
                } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                  to[nextKey] = {};
                  Utils.extend(to[nextKey], nextSource[nextKey]);
                } else {
                  to[nextKey] = nextSource[nextKey];
                }
              }
            }
          }
        }
        return to;
      },
    };

    var Support = (function Support() {
      return {
        touch: !!(('ontouchstart' in win) || (win.DocumentTouch && doc instanceof win.DocumentTouch)),

        pointerEvents: !!win.PointerEvent && ('maxTouchPoints' in win.navigator) && win.navigator.maxTouchPoints >= 0,

        observer: (function checkObserver() {
          return ('MutationObserver' in win || 'WebkitMutationObserver' in win);
        }()),

        passiveListener: (function checkPassiveListener() {
          var supportsPassive = false;
          try {
            var opts = Object.defineProperty({}, 'passive', {
              // eslint-disable-next-line
              get: function get() {
                supportsPassive = true;
              },
            });
            win.addEventListener('testPassiveListener', null, opts);
          } catch (e) {
            // No support
          }
          return supportsPassive;
        }()),

        gestures: (function checkGestures() {
          return 'ongesturestart' in win;
        }()),
      };
    }());

    var SwiperClass = function SwiperClass(params) {
      if ( params === void 0 ) params = {};

      var self = this;
      self.params = params;

      // Events
      self.eventsListeners = {};

      if (self.params && self.params.on) {
        Object.keys(self.params.on).forEach(function (eventName) {
          self.on(eventName, self.params.on[eventName]);
        });
      }
    };

    var staticAccessors = { components: { configurable: true } };

    SwiperClass.prototype.on = function on (events, handler, priority) {
      var self = this;
      if (typeof handler !== 'function') { return self; }
      var method = priority ? 'unshift' : 'push';
      events.split(' ').forEach(function (event) {
        if (!self.eventsListeners[event]) { self.eventsListeners[event] = []; }
        self.eventsListeners[event][method](handler);
      });
      return self;
    };

    SwiperClass.prototype.once = function once (events, handler, priority) {
      var self = this;
      if (typeof handler !== 'function') { return self; }
      function onceHandler() {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

        self.off(events, onceHandler);
        if (onceHandler.f7proxy) {
          delete onceHandler.f7proxy;
        }
        handler.apply(self, args);
      }
      onceHandler.f7proxy = handler;
      return self.on(events, onceHandler, priority);
    };

    SwiperClass.prototype.off = function off (events, handler) {
      var self = this;
      if (!self.eventsListeners) { return self; }
      events.split(' ').forEach(function (event) {
        if (typeof handler === 'undefined') {
          self.eventsListeners[event] = [];
        } else if (self.eventsListeners[event] && self.eventsListeners[event].length) {
          self.eventsListeners[event].forEach(function (eventHandler, index) {
            if (eventHandler === handler || (eventHandler.f7proxy && eventHandler.f7proxy === handler)) {
              self.eventsListeners[event].splice(index, 1);
            }
          });
        }
      });
      return self;
    };

    SwiperClass.prototype.emit = function emit () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

      var self = this;
      if (!self.eventsListeners) { return self; }
      var events;
      var data;
      var context;
      if (typeof args[0] === 'string' || Array.isArray(args[0])) {
        events = args[0];
        data = args.slice(1, args.length);
        context = self;
      } else {
        events = args[0].events;
        data = args[0].data;
        context = args[0].context || self;
      }
      var eventsArray = Array.isArray(events) ? events : events.split(' ');
      eventsArray.forEach(function (event) {
        if (self.eventsListeners && self.eventsListeners[event]) {
          var handlers = [];
          self.eventsListeners[event].forEach(function (eventHandler) {
            handlers.push(eventHandler);
          });
          handlers.forEach(function (eventHandler) {
            eventHandler.apply(context, data);
          });
        }
      });
      return self;
    };

    SwiperClass.prototype.useModulesParams = function useModulesParams (instanceParams) {
      var instance = this;
      if (!instance.modules) { return; }
      Object.keys(instance.modules).forEach(function (moduleName) {
        var module = instance.modules[moduleName];
        // Extend params
        if (module.params) {
          Utils.extend(instanceParams, module.params);
        }
      });
    };

    SwiperClass.prototype.useModules = function useModules (modulesParams) {
        if ( modulesParams === void 0 ) modulesParams = {};

      var instance = this;
      if (!instance.modules) { return; }
      Object.keys(instance.modules).forEach(function (moduleName) {
        var module = instance.modules[moduleName];
        var moduleParams = modulesParams[moduleName] || {};
        // Extend instance methods and props
        if (module.instance) {
          Object.keys(module.instance).forEach(function (modulePropName) {
            var moduleProp = module.instance[modulePropName];
            if (typeof moduleProp === 'function') {
              instance[modulePropName] = moduleProp.bind(instance);
            } else {
              instance[modulePropName] = moduleProp;
            }
          });
        }
        // Add event listeners
        if (module.on && instance.on) {
          Object.keys(module.on).forEach(function (moduleEventName) {
            instance.on(moduleEventName, module.on[moduleEventName]);
          });
        }

        // Module create callback
        if (module.create) {
          module.create.bind(instance)(moduleParams);
        }
      });
    };

    staticAccessors.components.set = function (components) {
      var Class = this;
      if (!Class.use) { return; }
      Class.use(components);
    };

    SwiperClass.installModule = function installModule (module) {
        var params = [], len = arguments.length - 1;
        while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

      var Class = this;
      if (!Class.prototype.modules) { Class.prototype.modules = {}; }
      var name = module.name || (((Object.keys(Class.prototype.modules).length) + "_" + (Utils.now())));
      Class.prototype.modules[name] = module;
      // Prototype
      if (module.proto) {
        Object.keys(module.proto).forEach(function (key) {
          Class.prototype[key] = module.proto[key];
        });
      }
      // Class
      if (module.static) {
        Object.keys(module.static).forEach(function (key) {
          Class[key] = module.static[key];
        });
      }
      // Callback
      if (module.install) {
        module.install.apply(Class, params);
      }
      return Class;
    };

    SwiperClass.use = function use (module) {
        var params = [], len = arguments.length - 1;
        while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

      var Class = this;
      if (Array.isArray(module)) {
        module.forEach(function (m) { return Class.installModule(m); });
        return Class;
      }
      return Class.installModule.apply(Class, [ module ].concat( params ));
    };

    Object.defineProperties( SwiperClass, staticAccessors );

    function updateSize () {
      var swiper = this;
      var width;
      var height;
      var $el = swiper.$el;
      if (typeof swiper.params.width !== 'undefined') {
        width = swiper.params.width;
      } else {
        width = $el[0].clientWidth;
      }
      if (typeof swiper.params.height !== 'undefined') {
        height = swiper.params.height;
      } else {
        height = $el[0].clientHeight;
      }
      if ((width === 0 && swiper.isHorizontal()) || (height === 0 && swiper.isVertical())) {
        return;
      }

      // Subtract paddings
      width = width - parseInt($el.css('padding-left'), 10) - parseInt($el.css('padding-right'), 10);
      height = height - parseInt($el.css('padding-top'), 10) - parseInt($el.css('padding-bottom'), 10);

      Utils.extend(swiper, {
        width: width,
        height: height,
        size: swiper.isHorizontal() ? width : height,
      });
    }

    function updateSlides () {
      var swiper = this;
      var params = swiper.params;

      var $wrapperEl = swiper.$wrapperEl;
      var swiperSize = swiper.size;
      var rtl = swiper.rtlTranslate;
      var wrongRTL = swiper.wrongRTL;
      var isVirtual = swiper.virtual && params.virtual.enabled;
      var previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
      var slides = $wrapperEl.children(("." + (swiper.params.slideClass)));
      var slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
      var snapGrid = [];
      var slidesGrid = [];
      var slidesSizesGrid = [];

      function slidesForMargin(slideIndex) {
        if (!params.cssMode) { return true; }
        if (slideIndex === slides.length - 1) {
          return false;
        }
        return true;
      }

      var offsetBefore = params.slidesOffsetBefore;
      if (typeof offsetBefore === 'function') {
        offsetBefore = params.slidesOffsetBefore.call(swiper);
      }

      var offsetAfter = params.slidesOffsetAfter;
      if (typeof offsetAfter === 'function') {
        offsetAfter = params.slidesOffsetAfter.call(swiper);
      }

      var previousSnapGridLength = swiper.snapGrid.length;
      var previousSlidesGridLength = swiper.snapGrid.length;

      var spaceBetween = params.spaceBetween;
      var slidePosition = -offsetBefore;
      var prevSlideSize = 0;
      var index = 0;
      if (typeof swiperSize === 'undefined') {
        return;
      }
      if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
        spaceBetween = (parseFloat(spaceBetween.replace('%', '')) / 100) * swiperSize;
      }

      swiper.virtualSize = -spaceBetween;

      // reset margins
      if (rtl) { slides.css({ marginLeft: '', marginTop: '' }); }
      else { slides.css({ marginRight: '', marginBottom: '' }); }

      var slidesNumberEvenToRows;
      if (params.slidesPerColumn > 1) {
        if (Math.floor(slidesLength / params.slidesPerColumn) === slidesLength / swiper.params.slidesPerColumn) {
          slidesNumberEvenToRows = slidesLength;
        } else {
          slidesNumberEvenToRows = Math.ceil(slidesLength / params.slidesPerColumn) * params.slidesPerColumn;
        }
        if (params.slidesPerView !== 'auto' && params.slidesPerColumnFill === 'row') {
          slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, params.slidesPerView * params.slidesPerColumn);
        }
      }

      // Calc slides
      var slideSize;
      var slidesPerColumn = params.slidesPerColumn;
      var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
      var numFullColumns = Math.floor(slidesLength / params.slidesPerColumn);
      for (var i = 0; i < slidesLength; i += 1) {
        slideSize = 0;
        var slide = slides.eq(i);
        if (params.slidesPerColumn > 1) {
          // Set slides order
          var newSlideOrderIndex = (void 0);
          var column = (void 0);
          var row = (void 0);
          if (params.slidesPerColumnFill === 'row' && params.slidesPerGroup > 1) {
            var groupIndex = Math.floor(i / (params.slidesPerGroup * params.slidesPerColumn));
            var slideIndexInGroup = i - params.slidesPerColumn * params.slidesPerGroup * groupIndex;
            var columnsInGroup = groupIndex === 0
              ? params.slidesPerGroup
              : Math.min(Math.ceil((slidesLength - groupIndex * slidesPerColumn * params.slidesPerGroup) / slidesPerColumn), params.slidesPerGroup);
            row = Math.floor(slideIndexInGroup / columnsInGroup);
            column = (slideIndexInGroup - row * columnsInGroup) + groupIndex * params.slidesPerGroup;

            newSlideOrderIndex = column + ((row * slidesNumberEvenToRows) / slidesPerColumn);
            slide
              .css({
                '-webkit-box-ordinal-group': newSlideOrderIndex,
                '-moz-box-ordinal-group': newSlideOrderIndex,
                '-ms-flex-order': newSlideOrderIndex,
                '-webkit-order': newSlideOrderIndex,
                order: newSlideOrderIndex,
              });
          } else if (params.slidesPerColumnFill === 'column') {
            column = Math.floor(i / slidesPerColumn);
            row = i - (column * slidesPerColumn);
            if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn - 1)) {
              row += 1;
              if (row >= slidesPerColumn) {
                row = 0;
                column += 1;
              }
            }
          } else {
            row = Math.floor(i / slidesPerRow);
            column = i - (row * slidesPerRow);
          }
          slide.css(
            ("margin-" + (swiper.isHorizontal() ? 'top' : 'left')),
            (row !== 0 && params.spaceBetween) && (((params.spaceBetween) + "px"))
          );
        }
        if (slide.css('display') === 'none') { continue; } // eslint-disable-line

        if (params.slidesPerView === 'auto') {
          var slideStyles = win.getComputedStyle(slide[0], null);
          var currentTransform = slide[0].style.transform;
          var currentWebKitTransform = slide[0].style.webkitTransform;
          if (currentTransform) {
            slide[0].style.transform = 'none';
          }
          if (currentWebKitTransform) {
            slide[0].style.webkitTransform = 'none';
          }
          if (params.roundLengths) {
            slideSize = swiper.isHorizontal()
              ? slide.outerWidth(true)
              : slide.outerHeight(true);
          } else {
            // eslint-disable-next-line
            if (swiper.isHorizontal()) {
              var width = parseFloat(slideStyles.getPropertyValue('width'));
              var paddingLeft = parseFloat(slideStyles.getPropertyValue('padding-left'));
              var paddingRight = parseFloat(slideStyles.getPropertyValue('padding-right'));
              var marginLeft = parseFloat(slideStyles.getPropertyValue('margin-left'));
              var marginRight = parseFloat(slideStyles.getPropertyValue('margin-right'));
              var boxSizing = slideStyles.getPropertyValue('box-sizing');
              if (boxSizing && boxSizing === 'border-box') {
                slideSize = width + marginLeft + marginRight;
              } else {
                slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight;
              }
            } else {
              var height = parseFloat(slideStyles.getPropertyValue('height'));
              var paddingTop = parseFloat(slideStyles.getPropertyValue('padding-top'));
              var paddingBottom = parseFloat(slideStyles.getPropertyValue('padding-bottom'));
              var marginTop = parseFloat(slideStyles.getPropertyValue('margin-top'));
              var marginBottom = parseFloat(slideStyles.getPropertyValue('margin-bottom'));
              var boxSizing$1 = slideStyles.getPropertyValue('box-sizing');
              if (boxSizing$1 && boxSizing$1 === 'border-box') {
                slideSize = height + marginTop + marginBottom;
              } else {
                slideSize = height + paddingTop + paddingBottom + marginTop + marginBottom;
              }
            }
          }
          if (currentTransform) {
            slide[0].style.transform = currentTransform;
          }
          if (currentWebKitTransform) {
            slide[0].style.webkitTransform = currentWebKitTransform;
          }
          if (params.roundLengths) { slideSize = Math.floor(slideSize); }
        } else {
          slideSize = (swiperSize - ((params.slidesPerView - 1) * spaceBetween)) / params.slidesPerView;
          if (params.roundLengths) { slideSize = Math.floor(slideSize); }

          if (slides[i]) {
            if (swiper.isHorizontal()) {
              slides[i].style.width = slideSize + "px";
            } else {
              slides[i].style.height = slideSize + "px";
            }
          }
        }
        if (slides[i]) {
          slides[i].swiperSlideSize = slideSize;
        }
        slidesSizesGrid.push(slideSize);


        if (params.centeredSlides) {
          slidePosition = slidePosition + (slideSize / 2) + (prevSlideSize / 2) + spaceBetween;
          if (prevSlideSize === 0 && i !== 0) { slidePosition = slidePosition - (swiperSize / 2) - spaceBetween; }
          if (i === 0) { slidePosition = slidePosition - (swiperSize / 2) - spaceBetween; }
          if (Math.abs(slidePosition) < 1 / 1000) { slidePosition = 0; }
          if (params.roundLengths) { slidePosition = Math.floor(slidePosition); }
          if ((index) % params.slidesPerGroup === 0) { snapGrid.push(slidePosition); }
          slidesGrid.push(slidePosition);
        } else {
          if (params.roundLengths) { slidePosition = Math.floor(slidePosition); }
          if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) { snapGrid.push(slidePosition); }
          slidesGrid.push(slidePosition);
          slidePosition = slidePosition + slideSize + spaceBetween;
        }

        swiper.virtualSize += slideSize + spaceBetween;

        prevSlideSize = slideSize;

        index += 1;
      }
      swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
      var newSlidesGrid;

      if (
        rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
        $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") });
      }
      if (params.setWrapperSize) {
        if (swiper.isHorizontal()) { $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
        else { $wrapperEl.css({ height: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
      }

      if (params.slidesPerColumn > 1) {
        swiper.virtualSize = (slideSize + params.spaceBetween) * slidesNumberEvenToRows;
        swiper.virtualSize = Math.ceil(swiper.virtualSize / params.slidesPerColumn) - params.spaceBetween;
        if (swiper.isHorizontal()) { $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
        else { $wrapperEl.css({ height: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
        if (params.centeredSlides) {
          newSlidesGrid = [];
          for (var i$1 = 0; i$1 < snapGrid.length; i$1 += 1) {
            var slidesGridItem = snapGrid[i$1];
            if (params.roundLengths) { slidesGridItem = Math.floor(slidesGridItem); }
            if (snapGrid[i$1] < swiper.virtualSize + snapGrid[0]) { newSlidesGrid.push(slidesGridItem); }
          }
          snapGrid = newSlidesGrid;
        }
      }

      // Remove last grid elements depending on width
      if (!params.centeredSlides) {
        newSlidesGrid = [];
        for (var i$2 = 0; i$2 < snapGrid.length; i$2 += 1) {
          var slidesGridItem$1 = snapGrid[i$2];
          if (params.roundLengths) { slidesGridItem$1 = Math.floor(slidesGridItem$1); }
          if (snapGrid[i$2] <= swiper.virtualSize - swiperSize) {
            newSlidesGrid.push(slidesGridItem$1);
          }
        }
        snapGrid = newSlidesGrid;
        if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
          snapGrid.push(swiper.virtualSize - swiperSize);
        }
      }
      if (snapGrid.length === 0) { snapGrid = [0]; }

      if (params.spaceBetween !== 0) {
        if (swiper.isHorizontal()) {
          if (rtl) { slides.filter(slidesForMargin).css({ marginLeft: (spaceBetween + "px") }); }
          else { slides.filter(slidesForMargin).css({ marginRight: (spaceBetween + "px") }); }
        } else { slides.filter(slidesForMargin).css({ marginBottom: (spaceBetween + "px") }); }
      }

      if (params.centeredSlides && params.centeredSlidesBounds) {
        var allSlidesSize = 0;
        slidesSizesGrid.forEach(function (slideSizeValue) {
          allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
        });
        allSlidesSize -= params.spaceBetween;
        var maxSnap = allSlidesSize - swiperSize;
        snapGrid = snapGrid.map(function (snap) {
          if (snap < 0) { return -offsetBefore; }
          if (snap > maxSnap) { return maxSnap + offsetAfter; }
          return snap;
        });
      }

      if (params.centerInsufficientSlides) {
        var allSlidesSize$1 = 0;
        slidesSizesGrid.forEach(function (slideSizeValue) {
          allSlidesSize$1 += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
        });
        allSlidesSize$1 -= params.spaceBetween;
        if (allSlidesSize$1 < swiperSize) {
          var allSlidesOffset = (swiperSize - allSlidesSize$1) / 2;
          snapGrid.forEach(function (snap, snapIndex) {
            snapGrid[snapIndex] = snap - allSlidesOffset;
          });
          slidesGrid.forEach(function (snap, snapIndex) {
            slidesGrid[snapIndex] = snap + allSlidesOffset;
          });
        }
      }

      Utils.extend(swiper, {
        slides: slides,
        snapGrid: snapGrid,
        slidesGrid: slidesGrid,
        slidesSizesGrid: slidesSizesGrid,
      });

      if (slidesLength !== previousSlidesLength) {
        swiper.emit('slidesLengthChange');
      }
      if (snapGrid.length !== previousSnapGridLength) {
        if (swiper.params.watchOverflow) { swiper.checkOverflow(); }
        swiper.emit('snapGridLengthChange');
      }
      if (slidesGrid.length !== previousSlidesGridLength) {
        swiper.emit('slidesGridLengthChange');
      }

      if (params.watchSlidesProgress || params.watchSlidesVisibility) {
        swiper.updateSlidesOffset();
      }
    }

    function updateAutoHeight (speed) {
      var swiper = this;
      var activeSlides = [];
      var newHeight = 0;
      var i;
      if (typeof speed === 'number') {
        swiper.setTransition(speed);
      } else if (speed === true) {
        swiper.setTransition(swiper.params.speed);
      }
      // Find slides currently in view
      if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
        if (swiper.params.centeredSlides) {
          swiper.visibleSlides.each(function (index, slide) {
            activeSlides.push(slide);
          });
        } else {
          for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
            var index = swiper.activeIndex + i;
            if (index > swiper.slides.length) { break; }
            activeSlides.push(swiper.slides.eq(index)[0]);
          }
        }
      } else {
        activeSlides.push(swiper.slides.eq(swiper.activeIndex)[0]);
      }

      // Find new height from highest slide in view
      for (i = 0; i < activeSlides.length; i += 1) {
        if (typeof activeSlides[i] !== 'undefined') {
          var height = activeSlides[i].offsetHeight;
          newHeight = height > newHeight ? height : newHeight;
        }
      }

      // Update Height
      if (newHeight) { swiper.$wrapperEl.css('height', (newHeight + "px")); }
    }

    function updateSlidesOffset () {
      var swiper = this;
      var slides = swiper.slides;
      for (var i = 0; i < slides.length; i += 1) {
        slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
      }
    }

    function updateSlidesProgress (translate) {
      if ( translate === void 0 ) translate = (this && this.translate) || 0;

      var swiper = this;
      var params = swiper.params;

      var slides = swiper.slides;
      var rtl = swiper.rtlTranslate;

      if (slides.length === 0) { return; }
      if (typeof slides[0].swiperSlideOffset === 'undefined') { swiper.updateSlidesOffset(); }

      var offsetCenter = -translate;
      if (rtl) { offsetCenter = translate; }

      // Visible Slides
      slides.removeClass(params.slideVisibleClass);

      swiper.visibleSlidesIndexes = [];
      swiper.visibleSlides = [];

      for (var i = 0; i < slides.length; i += 1) {
        var slide = slides[i];
        var slideProgress = (
          (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0)) - slide.swiperSlideOffset
        ) / (slide.swiperSlideSize + params.spaceBetween);
        if (params.watchSlidesVisibility || (params.centeredSlides && params.autoHeight)) {
          var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
          var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
          var isVisible = (slideBefore >= 0 && slideBefore < swiper.size - 1)
                    || (slideAfter > 1 && slideAfter <= swiper.size)
                    || (slideBefore <= 0 && slideAfter >= swiper.size);
          if (isVisible) {
            swiper.visibleSlides.push(slide);
            swiper.visibleSlidesIndexes.push(i);
            slides.eq(i).addClass(params.slideVisibleClass);
          }
        }
        slide.progress = rtl ? -slideProgress : slideProgress;
      }
      swiper.visibleSlides = $(swiper.visibleSlides);
    }

    function updateProgress (translate) {
      var swiper = this;
      if (typeof translate === 'undefined') {
        var multiplier = swiper.rtlTranslate ? -1 : 1;
        // eslint-disable-next-line
        translate = (swiper && swiper.translate && (swiper.translate * multiplier)) || 0;
      }
      var params = swiper.params;
      var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
      var progress = swiper.progress;
      var isBeginning = swiper.isBeginning;
      var isEnd = swiper.isEnd;
      var wasBeginning = isBeginning;
      var wasEnd = isEnd;
      if (translatesDiff === 0) {
        progress = 0;
        isBeginning = true;
        isEnd = true;
      } else {
        progress = (translate - swiper.minTranslate()) / (translatesDiff);
        isBeginning = progress <= 0;
        isEnd = progress >= 1;
      }
      Utils.extend(swiper, {
        progress: progress,
        isBeginning: isBeginning,
        isEnd: isEnd,
      });

      if (params.watchSlidesProgress || params.watchSlidesVisibility || (params.centeredSlides && params.autoHeight)) { swiper.updateSlidesProgress(translate); }

      if (isBeginning && !wasBeginning) {
        swiper.emit('reachBeginning toEdge');
      }
      if (isEnd && !wasEnd) {
        swiper.emit('reachEnd toEdge');
      }
      if ((wasBeginning && !isBeginning) || (wasEnd && !isEnd)) {
        swiper.emit('fromEdge');
      }

      swiper.emit('progress', progress);
    }

    function updateSlidesClasses () {
      var swiper = this;

      var slides = swiper.slides;
      var params = swiper.params;
      var $wrapperEl = swiper.$wrapperEl;
      var activeIndex = swiper.activeIndex;
      var realIndex = swiper.realIndex;
      var isVirtual = swiper.virtual && params.virtual.enabled;

      slides.removeClass(((params.slideActiveClass) + " " + (params.slideNextClass) + " " + (params.slidePrevClass) + " " + (params.slideDuplicateActiveClass) + " " + (params.slideDuplicateNextClass) + " " + (params.slideDuplicatePrevClass)));

      var activeSlide;
      if (isVirtual) {
        activeSlide = swiper.$wrapperEl.find(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + activeIndex + "\"]"));
      } else {
        activeSlide = slides.eq(activeIndex);
      }

      // Active classes
      activeSlide.addClass(params.slideActiveClass);

      if (params.loop) {
        // Duplicate to all looped slides
        if (activeSlide.hasClass(params.slideDuplicateClass)) {
          $wrapperEl
            .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + realIndex + "\"]"))
            .addClass(params.slideDuplicateActiveClass);
        } else {
          $wrapperEl
            .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]"))
            .addClass(params.slideDuplicateActiveClass);
        }
      }
      // Next Slide
      var nextSlide = activeSlide.nextAll(("." + (params.slideClass))).eq(0).addClass(params.slideNextClass);
      if (params.loop && nextSlide.length === 0) {
        nextSlide = slides.eq(0);
        nextSlide.addClass(params.slideNextClass);
      }
      // Prev Slide
      var prevSlide = activeSlide.prevAll(("." + (params.slideClass))).eq(0).addClass(params.slidePrevClass);
      if (params.loop && prevSlide.length === 0) {
        prevSlide = slides.eq(-1);
        prevSlide.addClass(params.slidePrevClass);
      }
      if (params.loop) {
        // Duplicate to all looped slides
        if (nextSlide.hasClass(params.slideDuplicateClass)) {
          $wrapperEl
            .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + (nextSlide.attr('data-swiper-slide-index')) + "\"]"))
            .addClass(params.slideDuplicateNextClass);
        } else {
          $wrapperEl
            .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + (nextSlide.attr('data-swiper-slide-index')) + "\"]"))
            .addClass(params.slideDuplicateNextClass);
        }
        if (prevSlide.hasClass(params.slideDuplicateClass)) {
          $wrapperEl
            .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + (prevSlide.attr('data-swiper-slide-index')) + "\"]"))
            .addClass(params.slideDuplicatePrevClass);
        } else {
          $wrapperEl
            .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + (prevSlide.attr('data-swiper-slide-index')) + "\"]"))
            .addClass(params.slideDuplicatePrevClass);
        }
      }
    }

    function updateActiveIndex (newActiveIndex) {
      var swiper = this;
      var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
      var slidesGrid = swiper.slidesGrid;
      var snapGrid = swiper.snapGrid;
      var params = swiper.params;
      var previousIndex = swiper.activeIndex;
      var previousRealIndex = swiper.realIndex;
      var previousSnapIndex = swiper.snapIndex;
      var activeIndex = newActiveIndex;
      var snapIndex;
      if (typeof activeIndex === 'undefined') {
        for (var i = 0; i < slidesGrid.length; i += 1) {
          if (typeof slidesGrid[i + 1] !== 'undefined') {
            if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - ((slidesGrid[i + 1] - slidesGrid[i]) / 2)) {
              activeIndex = i;
            } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
              activeIndex = i + 1;
            }
          } else if (translate >= slidesGrid[i]) {
            activeIndex = i;
          }
        }
        // Normalize slideIndex
        if (params.normalizeSlideIndex) {
          if (activeIndex < 0 || typeof activeIndex === 'undefined') { activeIndex = 0; }
        }
      }
      if (snapGrid.indexOf(translate) >= 0) {
        snapIndex = snapGrid.indexOf(translate);
      } else {
        var skip = Math.min(params.slidesPerGroupSkip, activeIndex);
        snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
      }
      if (snapIndex >= snapGrid.length) { snapIndex = snapGrid.length - 1; }
      if (activeIndex === previousIndex) {
        if (snapIndex !== previousSnapIndex) {
          swiper.snapIndex = snapIndex;
          swiper.emit('snapIndexChange');
        }
        return;
      }

      // Get real index
      var realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);

      Utils.extend(swiper, {
        snapIndex: snapIndex,
        realIndex: realIndex,
        previousIndex: previousIndex,
        activeIndex: activeIndex,
      });
      swiper.emit('activeIndexChange');
      swiper.emit('snapIndexChange');
      if (previousRealIndex !== realIndex) {
        swiper.emit('realIndexChange');
      }
      if (swiper.initialized || swiper.params.runCallbacksOnInit) {
        swiper.emit('slideChange');
      }
    }

    function updateClickedSlide (e) {
      var swiper = this;
      var params = swiper.params;
      var slide = $(e.target).closest(("." + (params.slideClass)))[0];
      var slideFound = false;
      if (slide) {
        for (var i = 0; i < swiper.slides.length; i += 1) {
          if (swiper.slides[i] === slide) { slideFound = true; }
        }
      }

      if (slide && slideFound) {
        swiper.clickedSlide = slide;
        if (swiper.virtual && swiper.params.virtual.enabled) {
          swiper.clickedIndex = parseInt($(slide).attr('data-swiper-slide-index'), 10);
        } else {
          swiper.clickedIndex = $(slide).index();
        }
      } else {
        swiper.clickedSlide = undefined;
        swiper.clickedIndex = undefined;
        return;
      }
      if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
        swiper.slideToClickedSlide();
      }
    }

    var update = {
      updateSize: updateSize,
      updateSlides: updateSlides,
      updateAutoHeight: updateAutoHeight,
      updateSlidesOffset: updateSlidesOffset,
      updateSlidesProgress: updateSlidesProgress,
      updateProgress: updateProgress,
      updateSlidesClasses: updateSlidesClasses,
      updateActiveIndex: updateActiveIndex,
      updateClickedSlide: updateClickedSlide,
    };

    function getTranslate (axis) {
      if ( axis === void 0 ) axis = this.isHorizontal() ? 'x' : 'y';

      var swiper = this;

      var params = swiper.params;
      var rtl = swiper.rtlTranslate;
      var translate = swiper.translate;
      var $wrapperEl = swiper.$wrapperEl;

      if (params.virtualTranslate) {
        return rtl ? -translate : translate;
      }
      if (params.cssMode) {
        return translate;
      }

      var currentTranslate = Utils.getTranslate($wrapperEl[0], axis);
      if (rtl) { currentTranslate = -currentTranslate; }

      return currentTranslate || 0;
    }

    function setTranslate (translate, byController) {
      var swiper = this;
      var rtl = swiper.rtlTranslate;
      var params = swiper.params;
      var $wrapperEl = swiper.$wrapperEl;
      var wrapperEl = swiper.wrapperEl;
      var progress = swiper.progress;
      var x = 0;
      var y = 0;
      var z = 0;

      if (swiper.isHorizontal()) {
        x = rtl ? -translate : translate;
      } else {
        y = translate;
      }

      if (params.roundLengths) {
        x = Math.floor(x);
        y = Math.floor(y);
      }

      if (params.cssMode) {
        wrapperEl[swiper.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = swiper.isHorizontal() ? -x : -y;
      } else if (!params.virtualTranslate) {
        $wrapperEl.transform(("translate3d(" + x + "px, " + y + "px, " + z + "px)"));
      }
      swiper.previousTranslate = swiper.translate;
      swiper.translate = swiper.isHorizontal() ? x : y;

      // Check if we need to update progress
      var newProgress;
      var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
      if (translatesDiff === 0) {
        newProgress = 0;
      } else {
        newProgress = (translate - swiper.minTranslate()) / (translatesDiff);
      }
      if (newProgress !== progress) {
        swiper.updateProgress(translate);
      }

      swiper.emit('setTranslate', swiper.translate, byController);
    }

    function minTranslate () {
      return (-this.snapGrid[0]);
    }

    function maxTranslate () {
      return (-this.snapGrid[this.snapGrid.length - 1]);
    }

    function translateTo (translate, speed, runCallbacks, translateBounds, internal) {
      var obj;

      if ( translate === void 0 ) translate = 0;
      if ( speed === void 0 ) speed = this.params.speed;
      if ( runCallbacks === void 0 ) runCallbacks = true;
      if ( translateBounds === void 0 ) translateBounds = true;
      var swiper = this;

      var params = swiper.params;
      var wrapperEl = swiper.wrapperEl;

      if (swiper.animating && params.preventInteractionOnTransition) {
        return false;
      }

      var minTranslate = swiper.minTranslate();
      var maxTranslate = swiper.maxTranslate();
      var newTranslate;
      if (translateBounds && translate > minTranslate) { newTranslate = minTranslate; }
      else if (translateBounds && translate < maxTranslate) { newTranslate = maxTranslate; }
      else { newTranslate = translate; }

      // Update progress
      swiper.updateProgress(newTranslate);

      if (params.cssMode) {
        var isH = swiper.isHorizontal();
        if (speed === 0) {
          wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
        } else {
          // eslint-disable-next-line
          if (wrapperEl.scrollTo) {
            wrapperEl.scrollTo(( obj = {}, obj[isH ? 'left' : 'top'] = -newTranslate, obj.behavior = 'smooth', obj ));
          } else {
            wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
          }
        }
        return true;
      }

      if (speed === 0) {
        swiper.setTransition(0);
        swiper.setTranslate(newTranslate);
        if (runCallbacks) {
          swiper.emit('beforeTransitionStart', speed, internal);
          swiper.emit('transitionEnd');
        }
      } else {
        swiper.setTransition(speed);
        swiper.setTranslate(newTranslate);
        if (runCallbacks) {
          swiper.emit('beforeTransitionStart', speed, internal);
          swiper.emit('transitionStart');
        }
        if (!swiper.animating) {
          swiper.animating = true;
          if (!swiper.onTranslateToWrapperTransitionEnd) {
            swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
              if (!swiper || swiper.destroyed) { return; }
              if (e.target !== this) { return; }
              swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
              swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);
              swiper.onTranslateToWrapperTransitionEnd = null;
              delete swiper.onTranslateToWrapperTransitionEnd;
              if (runCallbacks) {
                swiper.emit('transitionEnd');
              }
            };
          }
          swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
          swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);
        }
      }

      return true;
    }

    var translate = {
      getTranslate: getTranslate,
      setTranslate: setTranslate,
      minTranslate: minTranslate,
      maxTranslate: maxTranslate,
      translateTo: translateTo,
    };

    function setTransition (duration, byController) {
      var swiper = this;

      if (!swiper.params.cssMode) {
        swiper.$wrapperEl.transition(duration);
      }

      swiper.emit('setTransition', duration, byController);
    }

    function transitionStart (runCallbacks, direction) {
      if ( runCallbacks === void 0 ) runCallbacks = true;

      var swiper = this;
      var activeIndex = swiper.activeIndex;
      var params = swiper.params;
      var previousIndex = swiper.previousIndex;
      if (params.cssMode) { return; }
      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }

      var dir = direction;
      if (!dir) {
        if (activeIndex > previousIndex) { dir = 'next'; }
        else if (activeIndex < previousIndex) { dir = 'prev'; }
        else { dir = 'reset'; }
      }

      swiper.emit('transitionStart');

      if (runCallbacks && activeIndex !== previousIndex) {
        if (dir === 'reset') {
          swiper.emit('slideResetTransitionStart');
          return;
        }
        swiper.emit('slideChangeTransitionStart');
        if (dir === 'next') {
          swiper.emit('slideNextTransitionStart');
        } else {
          swiper.emit('slidePrevTransitionStart');
        }
      }
    }

    function transitionEnd$1 (runCallbacks, direction) {
      if ( runCallbacks === void 0 ) runCallbacks = true;

      var swiper = this;
      var activeIndex = swiper.activeIndex;
      var previousIndex = swiper.previousIndex;
      var params = swiper.params;
      swiper.animating = false;
      if (params.cssMode) { return; }
      swiper.setTransition(0);

      var dir = direction;
      if (!dir) {
        if (activeIndex > previousIndex) { dir = 'next'; }
        else if (activeIndex < previousIndex) { dir = 'prev'; }
        else { dir = 'reset'; }
      }

      swiper.emit('transitionEnd');

      if (runCallbacks && activeIndex !== previousIndex) {
        if (dir === 'reset') {
          swiper.emit('slideResetTransitionEnd');
          return;
        }
        swiper.emit('slideChangeTransitionEnd');
        if (dir === 'next') {
          swiper.emit('slideNextTransitionEnd');
        } else {
          swiper.emit('slidePrevTransitionEnd');
        }
      }
    }

    var transition$1 = {
      setTransition: setTransition,
      transitionStart: transitionStart,
      transitionEnd: transitionEnd$1,
    };

    function slideTo (index, speed, runCallbacks, internal) {
      var obj;

      if ( index === void 0 ) index = 0;
      if ( speed === void 0 ) speed = this.params.speed;
      if ( runCallbacks === void 0 ) runCallbacks = true;
      var swiper = this;
      var slideIndex = index;
      if (slideIndex < 0) { slideIndex = 0; }

      var params = swiper.params;
      var snapGrid = swiper.snapGrid;
      var slidesGrid = swiper.slidesGrid;
      var previousIndex = swiper.previousIndex;
      var activeIndex = swiper.activeIndex;
      var rtl = swiper.rtlTranslate;
      var wrapperEl = swiper.wrapperEl;
      if (swiper.animating && params.preventInteractionOnTransition) {
        return false;
      }

      var skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
      var snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
      if (snapIndex >= snapGrid.length) { snapIndex = snapGrid.length - 1; }

      if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
        swiper.emit('beforeSlideChangeStart');
      }

      var translate = -snapGrid[snapIndex];

      // Update progress
      swiper.updateProgress(translate);

      // Normalize slideIndex
      if (params.normalizeSlideIndex) {
        for (var i = 0; i < slidesGrid.length; i += 1) {
          if (-Math.floor(translate * 100) >= Math.floor(slidesGrid[i] * 100)) {
            slideIndex = i;
          }
        }
      }
      // Directions locks
      if (swiper.initialized && slideIndex !== activeIndex) {
        if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
          return false;
        }
        if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
          if ((activeIndex || 0) !== slideIndex) { return false; }
        }
      }

      var direction;
      if (slideIndex > activeIndex) { direction = 'next'; }
      else if (slideIndex < activeIndex) { direction = 'prev'; }
      else { direction = 'reset'; }


      // Update Index
      if ((rtl && -translate === swiper.translate) || (!rtl && translate === swiper.translate)) {
        swiper.updateActiveIndex(slideIndex);
        // Update Height
        if (params.autoHeight) {
          swiper.updateAutoHeight();
        }
        swiper.updateSlidesClasses();
        if (params.effect !== 'slide') {
          swiper.setTranslate(translate);
        }
        if (direction !== 'reset') {
          swiper.transitionStart(runCallbacks, direction);
          swiper.transitionEnd(runCallbacks, direction);
        }
        return false;
      }
      if (params.cssMode) {
        var isH = swiper.isHorizontal();
        var t = -translate;
        if (rtl) {
          t = wrapperEl.scrollWidth - wrapperEl.offsetWidth - t;
        }
        if (speed === 0) {
          wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
        } else {
          // eslint-disable-next-line
          if (wrapperEl.scrollTo) {
            wrapperEl.scrollTo(( obj = {}, obj[isH ? 'left' : 'top'] = t, obj.behavior = 'smooth', obj ));
          } else {
            wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
          }
        }
        return true;
      }

      if (speed === 0) {
        swiper.setTransition(0);
        swiper.setTranslate(translate);
        swiper.updateActiveIndex(slideIndex);
        swiper.updateSlidesClasses();
        swiper.emit('beforeTransitionStart', speed, internal);
        swiper.transitionStart(runCallbacks, direction);
        swiper.transitionEnd(runCallbacks, direction);
      } else {
        swiper.setTransition(speed);
        swiper.setTranslate(translate);
        swiper.updateActiveIndex(slideIndex);
        swiper.updateSlidesClasses();
        swiper.emit('beforeTransitionStart', speed, internal);
        swiper.transitionStart(runCallbacks, direction);
        if (!swiper.animating) {
          swiper.animating = true;
          if (!swiper.onSlideToWrapperTransitionEnd) {
            swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
              if (!swiper || swiper.destroyed) { return; }
              if (e.target !== this) { return; }
              swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
              swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
              swiper.onSlideToWrapperTransitionEnd = null;
              delete swiper.onSlideToWrapperTransitionEnd;
              swiper.transitionEnd(runCallbacks, direction);
            };
          }
          swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
          swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
        }
      }

      return true;
    }

    function slideToLoop (index, speed, runCallbacks, internal) {
      if ( index === void 0 ) index = 0;
      if ( speed === void 0 ) speed = this.params.speed;
      if ( runCallbacks === void 0 ) runCallbacks = true;

      var swiper = this;
      var newIndex = index;
      if (swiper.params.loop) {
        newIndex += swiper.loopedSlides;
      }

      return swiper.slideTo(newIndex, speed, runCallbacks, internal);
    }

    /* eslint no-unused-vars: "off" */
    function slideNext (speed, runCallbacks, internal) {
      if ( speed === void 0 ) speed = this.params.speed;
      if ( runCallbacks === void 0 ) runCallbacks = true;

      var swiper = this;
      var params = swiper.params;
      var animating = swiper.animating;
      var increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup;
      if (params.loop) {
        if (animating) { return false; }
        swiper.loopFix();
        // eslint-disable-next-line
        swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
      }
      return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
    }

    /* eslint no-unused-vars: "off" */
    function slidePrev (speed, runCallbacks, internal) {
      if ( speed === void 0 ) speed = this.params.speed;
      if ( runCallbacks === void 0 ) runCallbacks = true;

      var swiper = this;
      var params = swiper.params;
      var animating = swiper.animating;
      var snapGrid = swiper.snapGrid;
      var slidesGrid = swiper.slidesGrid;
      var rtlTranslate = swiper.rtlTranslate;

      if (params.loop) {
        if (animating) { return false; }
        swiper.loopFix();
        // eslint-disable-next-line
        swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
      }
      var translate = rtlTranslate ? swiper.translate : -swiper.translate;
      function normalize(val) {
        if (val < 0) { return -Math.floor(Math.abs(val)); }
        return Math.floor(val);
      }
      var normalizedTranslate = normalize(translate);
      var normalizedSnapGrid = snapGrid.map(function (val) { return normalize(val); });
      var normalizedSlidesGrid = slidesGrid.map(function (val) { return normalize(val); });

      var currentSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate)];
      var prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
      if (typeof prevSnap === 'undefined' && params.cssMode) {
        snapGrid.forEach(function (snap) {
          if (!prevSnap && normalizedTranslate >= snap) { prevSnap = snap; }
        });
      }
      var prevIndex;
      if (typeof prevSnap !== 'undefined') {
        prevIndex = slidesGrid.indexOf(prevSnap);
        if (prevIndex < 0) { prevIndex = swiper.activeIndex - 1; }
      }
      return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    }

    /* eslint no-unused-vars: "off" */
    function slideReset (speed, runCallbacks, internal) {
      if ( speed === void 0 ) speed = this.params.speed;
      if ( runCallbacks === void 0 ) runCallbacks = true;

      var swiper = this;
      return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
    }

    /* eslint no-unused-vars: "off" */
    function slideToClosest (speed, runCallbacks, internal, threshold) {
      if ( speed === void 0 ) speed = this.params.speed;
      if ( runCallbacks === void 0 ) runCallbacks = true;
      if ( threshold === void 0 ) threshold = 0.5;

      var swiper = this;
      var index = swiper.activeIndex;
      var skip = Math.min(swiper.params.slidesPerGroupSkip, index);
      var snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);

      var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;

      if (translate >= swiper.snapGrid[snapIndex]) {
        // The current translate is on or after the current snap index, so the choice
        // is between the current index and the one after it.
        var currentSnap = swiper.snapGrid[snapIndex];
        var nextSnap = swiper.snapGrid[snapIndex + 1];
        if ((translate - currentSnap) > (nextSnap - currentSnap) * threshold) {
          index += swiper.params.slidesPerGroup;
        }
      } else {
        // The current translate is before the current snap index, so the choice
        // is between the current index and the one before it.
        var prevSnap = swiper.snapGrid[snapIndex - 1];
        var currentSnap$1 = swiper.snapGrid[snapIndex];
        if ((translate - prevSnap) <= (currentSnap$1 - prevSnap) * threshold) {
          index -= swiper.params.slidesPerGroup;
        }
      }
      index = Math.max(index, 0);
      index = Math.min(index, swiper.slidesGrid.length - 1);

      return swiper.slideTo(index, speed, runCallbacks, internal);
    }

    function slideToClickedSlide () {
      var swiper = this;
      var params = swiper.params;
      var $wrapperEl = swiper.$wrapperEl;

      var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
      var slideToIndex = swiper.clickedIndex;
      var realIndex;
      if (params.loop) {
        if (swiper.animating) { return; }
        realIndex = parseInt($(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);
        if (params.centeredSlides) {
          if (
            (slideToIndex < swiper.loopedSlides - (slidesPerView / 2))
            || (slideToIndex > (swiper.slides.length - swiper.loopedSlides) + (slidesPerView / 2))
          ) {
            swiper.loopFix();
            slideToIndex = $wrapperEl
              .children(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + (params.slideDuplicateClass) + ")"))
              .eq(0)
              .index();

            Utils.nextTick(function () {
              swiper.slideTo(slideToIndex);
            });
          } else {
            swiper.slideTo(slideToIndex);
          }
        } else if (slideToIndex > swiper.slides.length - slidesPerView) {
          swiper.loopFix();
          slideToIndex = $wrapperEl
            .children(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + (params.slideDuplicateClass) + ")"))
            .eq(0)
            .index();

          Utils.nextTick(function () {
            swiper.slideTo(slideToIndex);
          });
        } else {
          swiper.slideTo(slideToIndex);
        }
      } else {
        swiper.slideTo(slideToIndex);
      }
    }

    var slide = {
      slideTo: slideTo,
      slideToLoop: slideToLoop,
      slideNext: slideNext,
      slidePrev: slidePrev,
      slideReset: slideReset,
      slideToClosest: slideToClosest,
      slideToClickedSlide: slideToClickedSlide,
    };

    function loopCreate () {
      var swiper = this;
      var params = swiper.params;
      var $wrapperEl = swiper.$wrapperEl;
      // Remove duplicated slides
      $wrapperEl.children(("." + (params.slideClass) + "." + (params.slideDuplicateClass))).remove();

      var slides = $wrapperEl.children(("." + (params.slideClass)));

      if (params.loopFillGroupWithBlank) {
        var blankSlidesNum = params.slidesPerGroup - (slides.length % params.slidesPerGroup);
        if (blankSlidesNum !== params.slidesPerGroup) {
          for (var i = 0; i < blankSlidesNum; i += 1) {
            var blankNode = $(doc.createElement('div')).addClass(((params.slideClass) + " " + (params.slideBlankClass)));
            $wrapperEl.append(blankNode);
          }
          slides = $wrapperEl.children(("." + (params.slideClass)));
        }
      }

      if (params.slidesPerView === 'auto' && !params.loopedSlides) { params.loopedSlides = slides.length; }

      swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
      swiper.loopedSlides += params.loopAdditionalSlides;
      if (swiper.loopedSlides > slides.length) {
        swiper.loopedSlides = slides.length;
      }

      var prependSlides = [];
      var appendSlides = [];
      slides.each(function (index, el) {
        var slide = $(el);
        if (index < swiper.loopedSlides) { appendSlides.push(el); }
        if (index < slides.length && index >= slides.length - swiper.loopedSlides) { prependSlides.push(el); }
        slide.attr('data-swiper-slide-index', index);
      });
      for (var i$1 = 0; i$1 < appendSlides.length; i$1 += 1) {
        $wrapperEl.append($(appendSlides[i$1].cloneNode(true)).addClass(params.slideDuplicateClass));
      }
      for (var i$2 = prependSlides.length - 1; i$2 >= 0; i$2 -= 1) {
        $wrapperEl.prepend($(prependSlides[i$2].cloneNode(true)).addClass(params.slideDuplicateClass));
      }
    }

    function loopFix () {
      var swiper = this;

      swiper.emit('beforeLoopFix');

      var activeIndex = swiper.activeIndex;
      var slides = swiper.slides;
      var loopedSlides = swiper.loopedSlides;
      var allowSlidePrev = swiper.allowSlidePrev;
      var allowSlideNext = swiper.allowSlideNext;
      var snapGrid = swiper.snapGrid;
      var rtl = swiper.rtlTranslate;
      var newIndex;
      swiper.allowSlidePrev = true;
      swiper.allowSlideNext = true;

      var snapTranslate = -snapGrid[activeIndex];
      var diff = snapTranslate - swiper.getTranslate();

      // Fix For Negative Oversliding
      if (activeIndex < loopedSlides) {
        newIndex = (slides.length - (loopedSlides * 3)) + activeIndex;
        newIndex += loopedSlides;
        var slideChanged = swiper.slideTo(newIndex, 0, false, true);
        if (slideChanged && diff !== 0) {
          swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
        }
      } else if (activeIndex >= slides.length - loopedSlides) {
        // Fix For Positive Oversliding
        newIndex = -slides.length + activeIndex + loopedSlides;
        newIndex += loopedSlides;
        var slideChanged$1 = swiper.slideTo(newIndex, 0, false, true);
        if (slideChanged$1 && diff !== 0) {
          swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
        }
      }
      swiper.allowSlidePrev = allowSlidePrev;
      swiper.allowSlideNext = allowSlideNext;

      swiper.emit('loopFix');
    }

    function loopDestroy () {
      var swiper = this;
      var $wrapperEl = swiper.$wrapperEl;
      var params = swiper.params;
      var slides = swiper.slides;
      $wrapperEl.children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + ",." + (params.slideClass) + "." + (params.slideBlankClass))).remove();
      slides.removeAttr('data-swiper-slide-index');
    }

    var loop = {
      loopCreate: loopCreate,
      loopFix: loopFix,
      loopDestroy: loopDestroy,
    };

    function setGrabCursor (moving) {
      var swiper = this;
      if (Support.touch || !swiper.params.simulateTouch || (swiper.params.watchOverflow && swiper.isLocked) || swiper.params.cssMode) { return; }
      var el = swiper.el;
      el.style.cursor = 'move';
      el.style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
      el.style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
      el.style.cursor = moving ? 'grabbing' : 'grab';
    }

    function unsetGrabCursor () {
      var swiper = this;
      if (Support.touch || (swiper.params.watchOverflow && swiper.isLocked) || swiper.params.cssMode) { return; }
      swiper.el.style.cursor = '';
    }

    var grabCursor = {
      setGrabCursor: setGrabCursor,
      unsetGrabCursor: unsetGrabCursor,
    };

    function appendSlide (slides) {
      var swiper = this;
      var $wrapperEl = swiper.$wrapperEl;
      var params = swiper.params;
      if (params.loop) {
        swiper.loopDestroy();
      }
      if (typeof slides === 'object' && 'length' in slides) {
        for (var i = 0; i < slides.length; i += 1) {
          if (slides[i]) { $wrapperEl.append(slides[i]); }
        }
      } else {
        $wrapperEl.append(slides);
      }
      if (params.loop) {
        swiper.loopCreate();
      }
      if (!(params.observer && Support.observer)) {
        swiper.update();
      }
    }

    function prependSlide (slides) {
      var swiper = this;
      var params = swiper.params;
      var $wrapperEl = swiper.$wrapperEl;
      var activeIndex = swiper.activeIndex;

      if (params.loop) {
        swiper.loopDestroy();
      }
      var newActiveIndex = activeIndex + 1;
      if (typeof slides === 'object' && 'length' in slides) {
        for (var i = 0; i < slides.length; i += 1) {
          if (slides[i]) { $wrapperEl.prepend(slides[i]); }
        }
        newActiveIndex = activeIndex + slides.length;
      } else {
        $wrapperEl.prepend(slides);
      }
      if (params.loop) {
        swiper.loopCreate();
      }
      if (!(params.observer && Support.observer)) {
        swiper.update();
      }
      swiper.slideTo(newActiveIndex, 0, false);
    }

    function addSlide (index, slides) {
      var swiper = this;
      var $wrapperEl = swiper.$wrapperEl;
      var params = swiper.params;
      var activeIndex = swiper.activeIndex;
      var activeIndexBuffer = activeIndex;
      if (params.loop) {
        activeIndexBuffer -= swiper.loopedSlides;
        swiper.loopDestroy();
        swiper.slides = $wrapperEl.children(("." + (params.slideClass)));
      }
      var baseLength = swiper.slides.length;
      if (index <= 0) {
        swiper.prependSlide(slides);
        return;
      }
      if (index >= baseLength) {
        swiper.appendSlide(slides);
        return;
      }
      var newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;

      var slidesBuffer = [];
      for (var i = baseLength - 1; i >= index; i -= 1) {
        var currentSlide = swiper.slides.eq(i);
        currentSlide.remove();
        slidesBuffer.unshift(currentSlide);
      }

      if (typeof slides === 'object' && 'length' in slides) {
        for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
          if (slides[i$1]) { $wrapperEl.append(slides[i$1]); }
        }
        newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
      } else {
        $wrapperEl.append(slides);
      }

      for (var i$2 = 0; i$2 < slidesBuffer.length; i$2 += 1) {
        $wrapperEl.append(slidesBuffer[i$2]);
      }

      if (params.loop) {
        swiper.loopCreate();
      }
      if (!(params.observer && Support.observer)) {
        swiper.update();
      }
      if (params.loop) {
        swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
      } else {
        swiper.slideTo(newActiveIndex, 0, false);
      }
    }

    function removeSlide (slidesIndexes) {
      var swiper = this;
      var params = swiper.params;
      var $wrapperEl = swiper.$wrapperEl;
      var activeIndex = swiper.activeIndex;

      var activeIndexBuffer = activeIndex;
      if (params.loop) {
        activeIndexBuffer -= swiper.loopedSlides;
        swiper.loopDestroy();
        swiper.slides = $wrapperEl.children(("." + (params.slideClass)));
      }
      var newActiveIndex = activeIndexBuffer;
      var indexToRemove;

      if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
        for (var i = 0; i < slidesIndexes.length; i += 1) {
          indexToRemove = slidesIndexes[i];
          if (swiper.slides[indexToRemove]) { swiper.slides.eq(indexToRemove).remove(); }
          if (indexToRemove < newActiveIndex) { newActiveIndex -= 1; }
        }
        newActiveIndex = Math.max(newActiveIndex, 0);
      } else {
        indexToRemove = slidesIndexes;
        if (swiper.slides[indexToRemove]) { swiper.slides.eq(indexToRemove).remove(); }
        if (indexToRemove < newActiveIndex) { newActiveIndex -= 1; }
        newActiveIndex = Math.max(newActiveIndex, 0);
      }

      if (params.loop) {
        swiper.loopCreate();
      }

      if (!(params.observer && Support.observer)) {
        swiper.update();
      }
      if (params.loop) {
        swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
      } else {
        swiper.slideTo(newActiveIndex, 0, false);
      }
    }

    function removeAllSlides () {
      var swiper = this;

      var slidesIndexes = [];
      for (var i = 0; i < swiper.slides.length; i += 1) {
        slidesIndexes.push(i);
      }
      swiper.removeSlide(slidesIndexes);
    }

    var manipulation = {
      appendSlide: appendSlide,
      prependSlide: prependSlide,
      addSlide: addSlide,
      removeSlide: removeSlide,
      removeAllSlides: removeAllSlides,
    };

    var Device = (function Device() {
      var platform = win.navigator.platform;
      var ua = win.navigator.userAgent;

      var device = {
        ios: false,
        android: false,
        androidChrome: false,
        desktop: false,
        iphone: false,
        ipod: false,
        ipad: false,
        edge: false,
        ie: false,
        firefox: false,
        macos: false,
        windows: false,
        cordova: !!(win.cordova || win.phonegap),
        phonegap: !!(win.cordova || win.phonegap),
        electron: false,
      };

      var screenWidth = win.screen.width;
      var screenHeight = win.screen.height;

      var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
      var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
      var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
      var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
      var ie = ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
      var edge = ua.indexOf('Edge/') >= 0;
      var firefox = ua.indexOf('Gecko/') >= 0 && ua.indexOf('Firefox/') >= 0;
      var windows = platform === 'Win32';
      var electron = ua.toLowerCase().indexOf('electron') >= 0;
      var macos = platform === 'MacIntel';

      // iPadOs 13 fix
      if (!ipad
        && macos
        && Support.touch
        && (
          (screenWidth === 1024 && screenHeight === 1366) // Pro 12.9
          || (screenWidth === 834 && screenHeight === 1194) // Pro 11
          || (screenWidth === 834 && screenHeight === 1112) // Pro 10.5
          || (screenWidth === 768 && screenHeight === 1024) // other
        )
      ) {
        ipad = ua.match(/(Version)\/([\d.]+)/);
        macos = false;
      }

      device.ie = ie;
      device.edge = edge;
      device.firefox = firefox;

      // Android
      if (android && !windows) {
        device.os = 'android';
        device.osVersion = android[2];
        device.android = true;
        device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
      }
      if (ipad || iphone || ipod) {
        device.os = 'ios';
        device.ios = true;
      }
      // iOS
      if (iphone && !ipod) {
        device.osVersion = iphone[2].replace(/_/g, '.');
        device.iphone = true;
      }
      if (ipad) {
        device.osVersion = ipad[2].replace(/_/g, '.');
        device.ipad = true;
      }
      if (ipod) {
        device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
        device.ipod = true;
      }
      // iOS 8+ changed UA
      if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
        if (device.osVersion.split('.')[0] === '10') {
          device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
        }
      }

      // Webview
      device.webView = !!((iphone || ipad || ipod) && (ua.match(/.*AppleWebKit(?!.*Safari)/i) || win.navigator.standalone))
        || (win.matchMedia && win.matchMedia('(display-mode: standalone)').matches);
      device.webview = device.webView;
      device.standalone = device.webView;

      // Desktop
      device.desktop = !(device.ios || device.android) || electron;
      if (device.desktop) {
        device.electron = electron;
        device.macos = macos;
        device.windows = windows;
        if (device.macos) {
          device.os = 'macos';
        }
        if (device.windows) {
          device.os = 'windows';
        }
      }

      // Pixel Ratio
      device.pixelRatio = win.devicePixelRatio || 1;

      // Export object
      return device;
    }());

    function onTouchStart (event) {
      var swiper = this;
      var data = swiper.touchEventsData;
      var params = swiper.params;
      var touches = swiper.touches;

      if (swiper.animating && params.preventInteractionOnTransition) {
        return;
      }
      var e = event;
      if (e.originalEvent) { e = e.originalEvent; }
      var $targetEl = $(e.target);

      if (params.touchEventsTarget === 'wrapper') {
        if (!$targetEl.closest(swiper.wrapperEl).length) { return; }
      }
      data.isTouchEvent = e.type === 'touchstart';
      if (!data.isTouchEvent && 'which' in e && e.which === 3) { return; }
      if (!data.isTouchEvent && 'button' in e && e.button > 0) { return; }
      if (data.isTouched && data.isMoved) { return; }
      if (params.noSwiping && $targetEl.closest(params.noSwipingSelector ? params.noSwipingSelector : ("." + (params.noSwipingClass)))[0]) {
        swiper.allowClick = true;
        return;
      }
      if (params.swipeHandler) {
        if (!$targetEl.closest(params.swipeHandler)[0]) { return; }
      }

      touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      var startX = touches.currentX;
      var startY = touches.currentY;

      // Do NOT start if iOS edge swipe is detected. Otherwise iOS app cannot swipe-to-go-back anymore

      var edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
      var edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
      if (
        edgeSwipeDetection
        && ((startX <= edgeSwipeThreshold)
        || (startX >= win.screen.width - edgeSwipeThreshold))
      ) {
        return;
      }

      Utils.extend(data, {
        isTouched: true,
        isMoved: false,
        allowTouchCallbacks: true,
        isScrolling: undefined,
        startMoving: undefined,
      });

      touches.startX = startX;
      touches.startY = startY;
      data.touchStartTime = Utils.now();
      swiper.allowClick = true;
      swiper.updateSize();
      swiper.swipeDirection = undefined;
      if (params.threshold > 0) { data.allowThresholdMove = false; }
      if (e.type !== 'touchstart') {
        var preventDefault = true;
        if ($targetEl.is(data.formElements)) { preventDefault = false; }
        if (
          doc.activeElement
          && $(doc.activeElement).is(data.formElements)
          && doc.activeElement !== $targetEl[0]
        ) {
          doc.activeElement.blur();
        }

        var shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
        if (params.touchStartForcePreventDefault || shouldPreventDefault) {
          e.preventDefault();
        }
      }
      swiper.emit('touchStart', e);
    }

    function onTouchMove (event) {
      var swiper = this;
      var data = swiper.touchEventsData;
      var params = swiper.params;
      var touches = swiper.touches;
      var rtl = swiper.rtlTranslate;
      var e = event;
      if (e.originalEvent) { e = e.originalEvent; }
      if (!data.isTouched) {
        if (data.startMoving && data.isScrolling) {
          swiper.emit('touchMoveOpposite', e);
        }
        return;
      }
      if (data.isTouchEvent && e.type !== 'touchmove') { return; }
      var targetTouch = e.type === 'touchmove' && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
      var pageX = e.type === 'touchmove' ? targetTouch.pageX : e.pageX;
      var pageY = e.type === 'touchmove' ? targetTouch.pageY : e.pageY;
      if (e.preventedByNestedSwiper) {
        touches.startX = pageX;
        touches.startY = pageY;
        return;
      }
      if (!swiper.allowTouchMove) {
        // isMoved = true;
        swiper.allowClick = false;
        if (data.isTouched) {
          Utils.extend(touches, {
            startX: pageX,
            startY: pageY,
            currentX: pageX,
            currentY: pageY,
          });
          data.touchStartTime = Utils.now();
        }
        return;
      }
      if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
        if (swiper.isVertical()) {
          // Vertical
          if (
            (pageY < touches.startY && swiper.translate <= swiper.maxTranslate())
            || (pageY > touches.startY && swiper.translate >= swiper.minTranslate())
          ) {
            data.isTouched = false;
            data.isMoved = false;
            return;
          }
        } else if (
          (pageX < touches.startX && swiper.translate <= swiper.maxTranslate())
          || (pageX > touches.startX && swiper.translate >= swiper.minTranslate())
        ) {
          return;
        }
      }
      if (data.isTouchEvent && doc.activeElement) {
        if (e.target === doc.activeElement && $(e.target).is(data.formElements)) {
          data.isMoved = true;
          swiper.allowClick = false;
          return;
        }
      }
      if (data.allowTouchCallbacks) {
        swiper.emit('touchMove', e);
      }
      if (e.targetTouches && e.targetTouches.length > 1) { return; }

      touches.currentX = pageX;
      touches.currentY = pageY;

      var diffX = touches.currentX - touches.startX;
      var diffY = touches.currentY - touches.startY;
      if (swiper.params.threshold && Math.sqrt((Math.pow( diffX, 2 )) + (Math.pow( diffY, 2 ))) < swiper.params.threshold) { return; }

      if (typeof data.isScrolling === 'undefined') {
        var touchAngle;
        if ((swiper.isHorizontal() && touches.currentY === touches.startY) || (swiper.isVertical() && touches.currentX === touches.startX)) {
          data.isScrolling = false;
        } else {
          // eslint-disable-next-line
          if ((diffX * diffX) + (diffY * diffY) >= 25) {
            touchAngle = (Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180) / Math.PI;
            data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : (90 - touchAngle > params.touchAngle);
          }
        }
      }
      if (data.isScrolling) {
        swiper.emit('touchMoveOpposite', e);
      }
      if (typeof data.startMoving === 'undefined') {
        if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
          data.startMoving = true;
        }
      }
      if (data.isScrolling) {
        data.isTouched = false;
        return;
      }
      if (!data.startMoving) {
        return;
      }
      swiper.allowClick = false;
      if (!params.cssMode && e.cancelable) {
        e.preventDefault();
      }
      if (params.touchMoveStopPropagation && !params.nested) {
        e.stopPropagation();
      }

      if (!data.isMoved) {
        if (params.loop) {
          swiper.loopFix();
        }
        data.startTranslate = swiper.getTranslate();
        swiper.setTransition(0);
        if (swiper.animating) {
          swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
        }
        data.allowMomentumBounce = false;
        // Grab Cursor
        if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
          swiper.setGrabCursor(true);
        }
        swiper.emit('sliderFirstMove', e);
      }
      swiper.emit('sliderMove', e);
      data.isMoved = true;

      var diff = swiper.isHorizontal() ? diffX : diffY;
      touches.diff = diff;

      diff *= params.touchRatio;
      if (rtl) { diff = -diff; }

      swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
      data.currentTranslate = diff + data.startTranslate;

      var disableParentSwiper = true;
      var resistanceRatio = params.resistanceRatio;
      if (params.touchReleaseOnEdges) {
        resistanceRatio = 0;
      }
      if ((diff > 0 && data.currentTranslate > swiper.minTranslate())) {
        disableParentSwiper = false;
        if (params.resistance) { data.currentTranslate = (swiper.minTranslate() - 1) + (Math.pow( (-swiper.minTranslate() + data.startTranslate + diff), resistanceRatio )); }
      } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
        disableParentSwiper = false;
        if (params.resistance) { data.currentTranslate = (swiper.maxTranslate() + 1) - (Math.pow( (swiper.maxTranslate() - data.startTranslate - diff), resistanceRatio )); }
      }

      if (disableParentSwiper) {
        e.preventedByNestedSwiper = true;
      }

      // Directions locks
      if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
        data.currentTranslate = data.startTranslate;
      }
      if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
        data.currentTranslate = data.startTranslate;
      }


      // Threshold
      if (params.threshold > 0) {
        if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
          if (!data.allowThresholdMove) {
            data.allowThresholdMove = true;
            touches.startX = touches.currentX;
            touches.startY = touches.currentY;
            data.currentTranslate = data.startTranslate;
            touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
            return;
          }
        } else {
          data.currentTranslate = data.startTranslate;
          return;
        }
      }

      if (!params.followFinger || params.cssMode) { return; }

      // Update active index in free mode
      if (params.freeMode || params.watchSlidesProgress || params.watchSlidesVisibility) {
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      if (params.freeMode) {
        // Velocity
        if (data.velocities.length === 0) {
          data.velocities.push({
            position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
            time: data.touchStartTime,
          });
        }
        data.velocities.push({
          position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
          time: Utils.now(),
        });
      }
      // Update progress
      swiper.updateProgress(data.currentTranslate);
      // Update translate
      swiper.setTranslate(data.currentTranslate);
    }

    function onTouchEnd (event) {
      var swiper = this;
      var data = swiper.touchEventsData;

      var params = swiper.params;
      var touches = swiper.touches;
      var rtl = swiper.rtlTranslate;
      var $wrapperEl = swiper.$wrapperEl;
      var slidesGrid = swiper.slidesGrid;
      var snapGrid = swiper.snapGrid;
      var e = event;
      if (e.originalEvent) { e = e.originalEvent; }
      if (data.allowTouchCallbacks) {
        swiper.emit('touchEnd', e);
      }
      data.allowTouchCallbacks = false;
      if (!data.isTouched) {
        if (data.isMoved && params.grabCursor) {
          swiper.setGrabCursor(false);
        }
        data.isMoved = false;
        data.startMoving = false;
        return;
      }
      // Return Grab Cursor
      if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
        swiper.setGrabCursor(false);
      }

      // Time diff
      var touchEndTime = Utils.now();
      var timeDiff = touchEndTime - data.touchStartTime;

      // Tap, doubleTap, Click
      if (swiper.allowClick) {
        swiper.updateClickedSlide(e);
        swiper.emit('tap click', e);
        if (timeDiff < 300 && (touchEndTime - data.lastClickTime) < 300) {
          swiper.emit('doubleTap doubleClick', e);
        }
      }

      data.lastClickTime = Utils.now();
      Utils.nextTick(function () {
        if (!swiper.destroyed) { swiper.allowClick = true; }
      });

      if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
        data.isTouched = false;
        data.isMoved = false;
        data.startMoving = false;
        return;
      }
      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;

      var currentPos;
      if (params.followFinger) {
        currentPos = rtl ? swiper.translate : -swiper.translate;
      } else {
        currentPos = -data.currentTranslate;
      }

      if (params.cssMode) {
        return;
      }

      if (params.freeMode) {
        if (currentPos < -swiper.minTranslate()) {
          swiper.slideTo(swiper.activeIndex);
          return;
        }
        if (currentPos > -swiper.maxTranslate()) {
          if (swiper.slides.length < snapGrid.length) {
            swiper.slideTo(snapGrid.length - 1);
          } else {
            swiper.slideTo(swiper.slides.length - 1);
          }
          return;
        }

        if (params.freeModeMomentum) {
          if (data.velocities.length > 1) {
            var lastMoveEvent = data.velocities.pop();
            var velocityEvent = data.velocities.pop();

            var distance = lastMoveEvent.position - velocityEvent.position;
            var time = lastMoveEvent.time - velocityEvent.time;
            swiper.velocity = distance / time;
            swiper.velocity /= 2;
            if (Math.abs(swiper.velocity) < params.freeModeMinimumVelocity) {
              swiper.velocity = 0;
            }
            // this implies that the user stopped moving a finger then released.
            // There would be no events with distance zero, so the last event is stale.
            if (time > 150 || (Utils.now() - lastMoveEvent.time) > 300) {
              swiper.velocity = 0;
            }
          } else {
            swiper.velocity = 0;
          }
          swiper.velocity *= params.freeModeMomentumVelocityRatio;

          data.velocities.length = 0;
          var momentumDuration = 1000 * params.freeModeMomentumRatio;
          var momentumDistance = swiper.velocity * momentumDuration;

          var newPosition = swiper.translate + momentumDistance;
          if (rtl) { newPosition = -newPosition; }

          var doBounce = false;
          var afterBouncePosition;
          var bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeModeMomentumBounceRatio;
          var needsLoopFix;
          if (newPosition < swiper.maxTranslate()) {
            if (params.freeModeMomentumBounce) {
              if (newPosition + swiper.maxTranslate() < -bounceAmount) {
                newPosition = swiper.maxTranslate() - bounceAmount;
              }
              afterBouncePosition = swiper.maxTranslate();
              doBounce = true;
              data.allowMomentumBounce = true;
            } else {
              newPosition = swiper.maxTranslate();
            }
            if (params.loop && params.centeredSlides) { needsLoopFix = true; }
          } else if (newPosition > swiper.minTranslate()) {
            if (params.freeModeMomentumBounce) {
              if (newPosition - swiper.minTranslate() > bounceAmount) {
                newPosition = swiper.minTranslate() + bounceAmount;
              }
              afterBouncePosition = swiper.minTranslate();
              doBounce = true;
              data.allowMomentumBounce = true;
            } else {
              newPosition = swiper.minTranslate();
            }
            if (params.loop && params.centeredSlides) { needsLoopFix = true; }
          } else if (params.freeModeSticky) {
            var nextSlide;
            for (var j = 0; j < snapGrid.length; j += 1) {
              if (snapGrid[j] > -newPosition) {
                nextSlide = j;
                break;
              }
            }

            if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
              newPosition = snapGrid[nextSlide];
            } else {
              newPosition = snapGrid[nextSlide - 1];
            }
            newPosition = -newPosition;
          }
          if (needsLoopFix) {
            swiper.once('transitionEnd', function () {
              swiper.loopFix();
            });
          }
          // Fix duration
          if (swiper.velocity !== 0) {
            if (rtl) {
              momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
            } else {
              momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
            }
            if (params.freeModeSticky) {
              // If freeModeSticky is active and the user ends a swipe with a slow-velocity
              // event, then durations can be 20+ seconds to slide one (or zero!) slides.
              // It's easy to see this when simulating touch with mouse events. To fix this,
              // limit single-slide swipes to the default slide duration. This also has the
              // nice side effect of matching slide speed if the user stopped moving before
              // lifting finger or mouse vs. moving slowly before lifting the finger/mouse.
              // For faster swipes, also apply limits (albeit higher ones).
              var moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
              var currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];
              if (moveDistance < currentSlideSize) {
                momentumDuration = params.speed;
              } else if (moveDistance < 2 * currentSlideSize) {
                momentumDuration = params.speed * 1.5;
              } else {
                momentumDuration = params.speed * 2.5;
              }
            }
          } else if (params.freeModeSticky) {
            swiper.slideToClosest();
            return;
          }

          if (params.freeModeMomentumBounce && doBounce) {
            swiper.updateProgress(afterBouncePosition);
            swiper.setTransition(momentumDuration);
            swiper.setTranslate(newPosition);
            swiper.transitionStart(true, swiper.swipeDirection);
            swiper.animating = true;
            $wrapperEl.transitionEnd(function () {
              if (!swiper || swiper.destroyed || !data.allowMomentumBounce) { return; }
              swiper.emit('momentumBounce');
              swiper.setTransition(params.speed);
              setTimeout(function () {
                swiper.setTranslate(afterBouncePosition);
                $wrapperEl.transitionEnd(function () {
                  if (!swiper || swiper.destroyed) { return; }
                  swiper.transitionEnd();
                });
              }, 0);
            });
          } else if (swiper.velocity) {
            swiper.updateProgress(newPosition);
            swiper.setTransition(momentumDuration);
            swiper.setTranslate(newPosition);
            swiper.transitionStart(true, swiper.swipeDirection);
            if (!swiper.animating) {
              swiper.animating = true;
              $wrapperEl.transitionEnd(function () {
                if (!swiper || swiper.destroyed) { return; }
                swiper.transitionEnd();
              });
            }
          } else {
            swiper.updateProgress(newPosition);
          }

          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();
        } else if (params.freeModeSticky) {
          swiper.slideToClosest();
          return;
        }

        if (!params.freeModeMomentum || timeDiff >= params.longSwipesMs) {
          swiper.updateProgress();
          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();
        }
        return;
      }

      // Find current slide
      var stopIndex = 0;
      var groupSize = swiper.slidesSizesGrid[0];
      for (var i = 0; i < slidesGrid.length; i += (i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup)) {
        var increment$1 = (i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup);
        if (typeof slidesGrid[i + increment$1] !== 'undefined') {
          if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment$1]) {
            stopIndex = i;
            groupSize = slidesGrid[i + increment$1] - slidesGrid[i];
          }
        } else if (currentPos >= slidesGrid[i]) {
          stopIndex = i;
          groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
        }
      }

      // Find current slide size
      var ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
      var increment = (stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup);

      if (timeDiff > params.longSwipesMs) {
        // Long touches
        if (!params.longSwipes) {
          swiper.slideTo(swiper.activeIndex);
          return;
        }
        if (swiper.swipeDirection === 'next') {
          if (ratio >= params.longSwipesRatio) { swiper.slideTo(stopIndex + increment); }
          else { swiper.slideTo(stopIndex); }
        }
        if (swiper.swipeDirection === 'prev') {
          if (ratio > (1 - params.longSwipesRatio)) { swiper.slideTo(stopIndex + increment); }
          else { swiper.slideTo(stopIndex); }
        }
      } else {
        // Short swipes
        if (!params.shortSwipes) {
          swiper.slideTo(swiper.activeIndex);
          return;
        }
        var isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
        if (!isNavButtonTarget) {
          if (swiper.swipeDirection === 'next') {
            swiper.slideTo(stopIndex + increment);
          }
          if (swiper.swipeDirection === 'prev') {
            swiper.slideTo(stopIndex);
          }
        } else if (e.target === swiper.navigation.nextEl) {
          swiper.slideTo(stopIndex + increment);
        } else {
          swiper.slideTo(stopIndex);
        }
      }
    }

    function onResize () {
      var swiper = this;

      var params = swiper.params;
      var el = swiper.el;

      if (el && el.offsetWidth === 0) { return; }

      // Breakpoints
      if (params.breakpoints) {
        swiper.setBreakpoint();
      }

      // Save locks
      var allowSlideNext = swiper.allowSlideNext;
      var allowSlidePrev = swiper.allowSlidePrev;
      var snapGrid = swiper.snapGrid;

      // Disable locks on resize
      swiper.allowSlideNext = true;
      swiper.allowSlidePrev = true;

      swiper.updateSize();
      swiper.updateSlides();

      swiper.updateSlidesClasses();
      if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides) {
        swiper.slideTo(swiper.slides.length - 1, 0, false, true);
      } else {
        swiper.slideTo(swiper.activeIndex, 0, false, true);
      }

      if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
        swiper.autoplay.run();
      }
      // Return locks after resize
      swiper.allowSlidePrev = allowSlidePrev;
      swiper.allowSlideNext = allowSlideNext;

      if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }
    }

    function onClick (e) {
      var swiper = this;
      if (!swiper.allowClick) {
        if (swiper.params.preventClicks) { e.preventDefault(); }
        if (swiper.params.preventClicksPropagation && swiper.animating) {
          e.stopPropagation();
          e.stopImmediatePropagation();
        }
      }
    }

    function onScroll () {
      var swiper = this;
      var wrapperEl = swiper.wrapperEl;
      var rtlTranslate = swiper.rtlTranslate;
      swiper.previousTranslate = swiper.translate;
      if (swiper.isHorizontal()) {
        if (rtlTranslate) {
          swiper.translate = ((wrapperEl.scrollWidth - wrapperEl.offsetWidth) - wrapperEl.scrollLeft);
        } else {
          swiper.translate = -wrapperEl.scrollLeft;
        }
      } else {
        swiper.translate = -wrapperEl.scrollTop;
      }
      // eslint-disable-next-line
      if (swiper.translate === -0) { swiper.translate = 0; }

      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();

      var newProgress;
      var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
      if (translatesDiff === 0) {
        newProgress = 0;
      } else {
        newProgress = (swiper.translate - swiper.minTranslate()) / (translatesDiff);
      }
      if (newProgress !== swiper.progress) {
        swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
      }

      swiper.emit('setTranslate', swiper.translate, false);
    }

    var dummyEventAttached = false;
    function dummyEventListener() {}

    function attachEvents() {
      var swiper = this;
      var params = swiper.params;
      var touchEvents = swiper.touchEvents;
      var el = swiper.el;
      var wrapperEl = swiper.wrapperEl;

      swiper.onTouchStart = onTouchStart.bind(swiper);
      swiper.onTouchMove = onTouchMove.bind(swiper);
      swiper.onTouchEnd = onTouchEnd.bind(swiper);
      if (params.cssMode) {
        swiper.onScroll = onScroll.bind(swiper);
      }

      swiper.onClick = onClick.bind(swiper);

      var capture = !!params.nested;

      // Touch Events
      if (!Support.touch && Support.pointerEvents) {
        el.addEventListener(touchEvents.start, swiper.onTouchStart, false);
        doc.addEventListener(touchEvents.move, swiper.onTouchMove, capture);
        doc.addEventListener(touchEvents.end, swiper.onTouchEnd, false);
      } else {
        if (Support.touch) {
          var passiveListener = touchEvents.start === 'touchstart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
          el.addEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
          el.addEventListener(touchEvents.move, swiper.onTouchMove, Support.passiveListener ? { passive: false, capture: capture } : capture);
          el.addEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
          if (touchEvents.cancel) {
            el.addEventListener(touchEvents.cancel, swiper.onTouchEnd, passiveListener);
          }
          if (!dummyEventAttached) {
            doc.addEventListener('touchstart', dummyEventListener);
            dummyEventAttached = true;
          }
        }
        if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
          el.addEventListener('mousedown', swiper.onTouchStart, false);
          doc.addEventListener('mousemove', swiper.onTouchMove, capture);
          doc.addEventListener('mouseup', swiper.onTouchEnd, false);
        }
      }
      // Prevent Links Clicks
      if (params.preventClicks || params.preventClicksPropagation) {
        el.addEventListener('click', swiper.onClick, true);
      }
      if (params.cssMode) {
        wrapperEl.addEventListener('scroll', swiper.onScroll);
      }

      // Resize handler
      if (params.updateOnWindowResize) {
        swiper.on((Device.ios || Device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate'), onResize, true);
      } else {
        swiper.on('observerUpdate', onResize, true);
      }
    }

    function detachEvents() {
      var swiper = this;

      var params = swiper.params;
      var touchEvents = swiper.touchEvents;
      var el = swiper.el;
      var wrapperEl = swiper.wrapperEl;

      var capture = !!params.nested;

      // Touch Events
      if (!Support.touch && Support.pointerEvents) {
        el.removeEventListener(touchEvents.start, swiper.onTouchStart, false);
        doc.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
        doc.removeEventListener(touchEvents.end, swiper.onTouchEnd, false);
      } else {
        if (Support.touch) {
          var passiveListener = touchEvents.start === 'onTouchStart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
          el.removeEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
          el.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
          el.removeEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
          if (touchEvents.cancel) {
            el.removeEventListener(touchEvents.cancel, swiper.onTouchEnd, passiveListener);
          }
        }
        if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
          el.removeEventListener('mousedown', swiper.onTouchStart, false);
          doc.removeEventListener('mousemove', swiper.onTouchMove, capture);
          doc.removeEventListener('mouseup', swiper.onTouchEnd, false);
        }
      }
      // Prevent Links Clicks
      if (params.preventClicks || params.preventClicksPropagation) {
        el.removeEventListener('click', swiper.onClick, true);
      }

      if (params.cssMode) {
        wrapperEl.removeEventListener('scroll', swiper.onScroll);
      }

      // Resize handler
      swiper.off((Device.ios || Device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate'), onResize);
    }

    var events = {
      attachEvents: attachEvents,
      detachEvents: detachEvents,
    };

    function setBreakpoint () {
      var swiper = this;
      var activeIndex = swiper.activeIndex;
      var initialized = swiper.initialized;
      var loopedSlides = swiper.loopedSlides; if ( loopedSlides === void 0 ) loopedSlides = 0;
      var params = swiper.params;
      var $el = swiper.$el;
      var breakpoints = params.breakpoints;
      if (!breakpoints || (breakpoints && Object.keys(breakpoints).length === 0)) { return; }

      // Get breakpoint for window width and update parameters
      var breakpoint = swiper.getBreakpoint(breakpoints);

      if (breakpoint && swiper.currentBreakpoint !== breakpoint) {
        var breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;
        if (breakpointOnlyParams) {
          ['slidesPerView', 'spaceBetween', 'slidesPerGroup', 'slidesPerGroupSkip', 'slidesPerColumn'].forEach(function (param) {
            var paramValue = breakpointOnlyParams[param];
            if (typeof paramValue === 'undefined') { return; }
            if (param === 'slidesPerView' && (paramValue === 'AUTO' || paramValue === 'auto')) {
              breakpointOnlyParams[param] = 'auto';
            } else if (param === 'slidesPerView') {
              breakpointOnlyParams[param] = parseFloat(paramValue);
            } else {
              breakpointOnlyParams[param] = parseInt(paramValue, 10);
            }
          });
        }

        var breakpointParams = breakpointOnlyParams || swiper.originalParams;
        var wasMultiRow = params.slidesPerColumn > 1;
        var isMultiRow = breakpointParams.slidesPerColumn > 1;
        if (wasMultiRow && !isMultiRow) {
          $el.removeClass(((params.containerModifierClass) + "multirow " + (params.containerModifierClass) + "multirow-column"));
        } else if (!wasMultiRow && isMultiRow) {
          $el.addClass(((params.containerModifierClass) + "multirow"));
          if (breakpointParams.slidesPerColumnFill === 'column') {
            $el.addClass(((params.containerModifierClass) + "multirow-column"));
          }
        }

        var directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
        var needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);

        if (directionChanged && initialized) {
          swiper.changeDirection();
        }

        Utils.extend(swiper.params, breakpointParams);

        Utils.extend(swiper, {
          allowTouchMove: swiper.params.allowTouchMove,
          allowSlideNext: swiper.params.allowSlideNext,
          allowSlidePrev: swiper.params.allowSlidePrev,
        });

        swiper.currentBreakpoint = breakpoint;

        if (needsReLoop && initialized) {
          swiper.loopDestroy();
          swiper.loopCreate();
          swiper.updateSlides();
          swiper.slideTo((activeIndex - loopedSlides) + swiper.loopedSlides, 0, false);
        }

        swiper.emit('breakpoint', breakpointParams);
      }
    }

    function getBreakpoint (breakpoints) {
      // Get breakpoint for window width
      if (!breakpoints) { return undefined; }
      var breakpoint = false;

      var points = Object.keys(breakpoints).map(function (point) {
        if (typeof point === 'string' && point.indexOf('@') === 0) {
          var minRatio = parseFloat(point.substr(1));
          var value = win.innerHeight * minRatio;
          return { value: value, point: point };
        }
        return { value: point, point: point };
      });

      points.sort(function (a, b) { return parseInt(a.value, 10) - parseInt(b.value, 10); });
      for (var i = 0; i < points.length; i += 1) {
        var ref = points[i];
        var point = ref.point;
        var value = ref.value;
        if (value <= win.innerWidth) {
          breakpoint = point;
        }
      }
      return breakpoint || 'max';
    }

    var breakpoints = { setBreakpoint: setBreakpoint, getBreakpoint: getBreakpoint };

    function addClasses () {
      var swiper = this;
      var classNames = swiper.classNames;
      var params = swiper.params;
      var rtl = swiper.rtl;
      var $el = swiper.$el;
      var suffixes = [];

      suffixes.push('initialized');
      suffixes.push(params.direction);

      if (params.freeMode) {
        suffixes.push('free-mode');
      }
      if (params.autoHeight) {
        suffixes.push('autoheight');
      }
      if (rtl) {
        suffixes.push('rtl');
      }
      if (params.slidesPerColumn > 1) {
        suffixes.push('multirow');
        if (params.slidesPerColumnFill === 'column') {
          suffixes.push('multirow-column');
        }
      }
      if (Device.android) {
        suffixes.push('android');
      }
      if (Device.ios) {
        suffixes.push('ios');
      }

      if (params.cssMode) {
        suffixes.push('css-mode');
      }

      suffixes.forEach(function (suffix) {
        classNames.push(params.containerModifierClass + suffix);
      });

      $el.addClass(classNames.join(' '));
    }

    function removeClasses () {
      var swiper = this;
      var $el = swiper.$el;
      var classNames = swiper.classNames;

      $el.removeClass(classNames.join(' '));
    }

    var classes = { addClasses: addClasses, removeClasses: removeClasses };

    function loadImage (imageEl, src, srcset, sizes, checkForComplete, callback) {
      var image;
      function onReady() {
        if (callback) { callback(); }
      }
      var isPicture = $(imageEl).parent('picture')[0];

      if (!isPicture && (!imageEl.complete || !checkForComplete)) {
        if (src) {
          image = new win.Image();
          image.onload = onReady;
          image.onerror = onReady;
          if (sizes) {
            image.sizes = sizes;
          }
          if (srcset) {
            image.srcset = srcset;
          }
          if (src) {
            image.src = src;
          }
        } else {
          onReady();
        }
      } else {
        // image already loaded...
        onReady();
      }
    }

    function preloadImages () {
      var swiper = this;
      swiper.imagesToLoad = swiper.$el.find('img');
      function onReady() {
        if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) { return; }
        if (swiper.imagesLoaded !== undefined) { swiper.imagesLoaded += 1; }
        if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
          if (swiper.params.updateOnImagesReady) { swiper.update(); }
          swiper.emit('imagesReady');
        }
      }
      for (var i = 0; i < swiper.imagesToLoad.length; i += 1) {
        var imageEl = swiper.imagesToLoad[i];
        swiper.loadImage(
          imageEl,
          imageEl.currentSrc || imageEl.getAttribute('src'),
          imageEl.srcset || imageEl.getAttribute('srcset'),
          imageEl.sizes || imageEl.getAttribute('sizes'),
          true,
          onReady
        );
      }
    }

    var images = {
      loadImage: loadImage,
      preloadImages: preloadImages,
    };

    function checkOverflow() {
      var swiper = this;
      var params = swiper.params;
      var wasLocked = swiper.isLocked;
      var lastSlidePosition = swiper.slides.length > 0 && (params.slidesOffsetBefore + (params.spaceBetween * (swiper.slides.length - 1)) + ((swiper.slides[0]).offsetWidth) * swiper.slides.length);

      if (params.slidesOffsetBefore && params.slidesOffsetAfter && lastSlidePosition) {
        swiper.isLocked = lastSlidePosition <= swiper.size;
      } else {
        swiper.isLocked = swiper.snapGrid.length === 1;
      }

      swiper.allowSlideNext = !swiper.isLocked;
      swiper.allowSlidePrev = !swiper.isLocked;

      // events
      if (wasLocked !== swiper.isLocked) { swiper.emit(swiper.isLocked ? 'lock' : 'unlock'); }

      if (wasLocked && wasLocked !== swiper.isLocked) {
        swiper.isEnd = false;
        if (swiper.navigation) { swiper.navigation.update(); }
      }
    }

    var checkOverflow$1 = { checkOverflow: checkOverflow };

    var defaults = {
      init: true,
      direction: 'horizontal',
      touchEventsTarget: 'container',
      initialSlide: 0,
      speed: 300,
      cssMode: false,
      updateOnWindowResize: true,
      //
      preventInteractionOnTransition: false,

      // To support iOS's swipe-to-go-back gesture (when being used in-app).
      edgeSwipeDetection: false,
      edgeSwipeThreshold: 20,

      // Free mode
      freeMode: false,
      freeModeMomentum: true,
      freeModeMomentumRatio: 1,
      freeModeMomentumBounce: true,
      freeModeMomentumBounceRatio: 1,
      freeModeMomentumVelocityRatio: 1,
      freeModeSticky: false,
      freeModeMinimumVelocity: 0.02,

      // Autoheight
      autoHeight: false,

      // Set wrapper width
      setWrapperSize: false,

      // Virtual Translate
      virtualTranslate: false,

      // Effects
      effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'

      // Breakpoints
      breakpoints: undefined,

      // Slides grid
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerColumn: 1,
      slidesPerColumnFill: 'column',
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      centeredSlides: false,
      centeredSlidesBounds: false,
      slidesOffsetBefore: 0, // in px
      slidesOffsetAfter: 0, // in px
      normalizeSlideIndex: true,
      centerInsufficientSlides: false,

      // Disable swiper and hide navigation when container not overflow
      watchOverflow: false,

      // Round length
      roundLengths: false,

      // Touches
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: true,
      shortSwipes: true,
      longSwipes: true,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: true,
      allowTouchMove: true,
      threshold: 0,
      touchMoveStopPropagation: false,
      touchStartPreventDefault: true,
      touchStartForcePreventDefault: false,
      touchReleaseOnEdges: false,

      // Unique Navigation Elements
      uniqueNavElements: true,

      // Resistance
      resistance: true,
      resistanceRatio: 0.85,

      // Progress
      watchSlidesProgress: false,
      watchSlidesVisibility: false,

      // Cursor
      grabCursor: false,

      // Clicks
      preventClicks: true,
      preventClicksPropagation: true,
      slideToClickedSlide: false,

      // Images
      preloadImages: true,
      updateOnImagesReady: true,

      // loop
      loop: false,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopFillGroupWithBlank: false,

      // Swiping/no swiping
      allowSlidePrev: true,
      allowSlideNext: true,
      swipeHandler: null, // '.swipe-handler',
      noSwiping: true,
      noSwipingClass: 'swiper-no-swiping',
      noSwipingSelector: null,

      // Passive Listeners
      passiveListeners: true,

      // NS
      containerModifierClass: 'swiper-container-', // NEW
      slideClass: 'swiper-slide',
      slideBlankClass: 'swiper-slide-invisible-blank',
      slideActiveClass: 'swiper-slide-active',
      slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
      slideVisibleClass: 'swiper-slide-visible',
      slideDuplicateClass: 'swiper-slide-duplicate',
      slideNextClass: 'swiper-slide-next',
      slideDuplicateNextClass: 'swiper-slide-duplicate-next',
      slidePrevClass: 'swiper-slide-prev',
      slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
      wrapperClass: 'swiper-wrapper',

      // Callbacks
      runCallbacksOnInit: true,
    };

    /* eslint no-param-reassign: "off" */

    var prototypes = {
      update: update,
      translate: translate,
      transition: transition$1,
      slide: slide,
      loop: loop,
      grabCursor: grabCursor,
      manipulation: manipulation,
      events: events,
      breakpoints: breakpoints,
      checkOverflow: checkOverflow$1,
      classes: classes,
      images: images,
    };

    var extendedDefaults = {};

    var Swiper = /*@__PURE__*/(function (SwiperClass) {
      function Swiper() {
        var assign;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        var el;
        var params;
        if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
          params = args[0];
        } else {
          (assign = args, el = assign[0], params = assign[1]);
        }
        if (!params) { params = {}; }

        params = Utils.extend({}, params);
        if (el && !params.el) { params.el = el; }

        SwiperClass.call(this, params);

        Object.keys(prototypes).forEach(function (prototypeGroup) {
          Object.keys(prototypes[prototypeGroup]).forEach(function (protoMethod) {
            if (!Swiper.prototype[protoMethod]) {
              Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
            }
          });
        });

        // Swiper Instance
        var swiper = this;
        if (typeof swiper.modules === 'undefined') {
          swiper.modules = {};
        }
        Object.keys(swiper.modules).forEach(function (moduleName) {
          var module = swiper.modules[moduleName];
          if (module.params) {
            var moduleParamName = Object.keys(module.params)[0];
            var moduleParams = module.params[moduleParamName];
            if (typeof moduleParams !== 'object' || moduleParams === null) { return; }
            if (!(moduleParamName in params && 'enabled' in moduleParams)) { return; }
            if (params[moduleParamName] === true) {
              params[moduleParamName] = { enabled: true };
            }
            if (
              typeof params[moduleParamName] === 'object'
              && !('enabled' in params[moduleParamName])
            ) {
              params[moduleParamName].enabled = true;
            }
            if (!params[moduleParamName]) { params[moduleParamName] = { enabled: false }; }
          }
        });

        // Extend defaults with modules params
        var swiperParams = Utils.extend({}, defaults);
        swiper.useModulesParams(swiperParams);

        // Extend defaults with passed params
        swiper.params = Utils.extend({}, swiperParams, extendedDefaults, params);
        swiper.originalParams = Utils.extend({}, swiper.params);
        swiper.passedParams = Utils.extend({}, params);

        // Save Dom lib
        swiper.$ = $;

        // Find el
        var $el = $(swiper.params.el);
        el = $el[0];

        if (!el) {
          return undefined;
        }

        if ($el.length > 1) {
          var swipers = [];
          $el.each(function (index, containerEl) {
            var newParams = Utils.extend({}, params, { el: containerEl });
            swipers.push(new Swiper(newParams));
          });
          return swipers;
        }

        el.swiper = swiper;
        $el.data('swiper', swiper);

        // Find Wrapper
        var $wrapperEl;
        if (el && el.shadowRoot && el.shadowRoot.querySelector) {
          $wrapperEl = $(el.shadowRoot.querySelector(("." + (swiper.params.wrapperClass))));
          // Children needs to return slot items
          $wrapperEl.children = function (options) { return $el.children(options); };
        } else {
          $wrapperEl = $el.children(("." + (swiper.params.wrapperClass)));
        }
        // Extend Swiper
        Utils.extend(swiper, {
          $el: $el,
          el: el,
          $wrapperEl: $wrapperEl,
          wrapperEl: $wrapperEl[0],

          // Classes
          classNames: [],

          // Slides
          slides: $(),
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],

          // isDirection
          isHorizontal: function isHorizontal() {
            return swiper.params.direction === 'horizontal';
          },
          isVertical: function isVertical() {
            return swiper.params.direction === 'vertical';
          },
          // RTL
          rtl: (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
          rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
          wrongRTL: $wrapperEl.css('display') === '-webkit-box',

          // Indexes
          activeIndex: 0,
          realIndex: 0,

          //
          isBeginning: true,
          isEnd: false,

          // Props
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: false,

          // Locks
          allowSlideNext: swiper.params.allowSlideNext,
          allowSlidePrev: swiper.params.allowSlidePrev,

          // Touch Events
          touchEvents: (function touchEvents() {
            var touch = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
            var desktop = ['mousedown', 'mousemove', 'mouseup'];
            if (Support.pointerEvents) {
              desktop = ['pointerdown', 'pointermove', 'pointerup'];
            }
            swiper.touchEventsTouch = {
              start: touch[0],
              move: touch[1],
              end: touch[2],
              cancel: touch[3],
            };
            swiper.touchEventsDesktop = {
              start: desktop[0],
              move: desktop[1],
              end: desktop[2],
            };
            return Support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
          }()),
          touchEventsData: {
            isTouched: undefined,
            isMoved: undefined,
            allowTouchCallbacks: undefined,
            touchStartTime: undefined,
            isScrolling: undefined,
            currentTranslate: undefined,
            startTranslate: undefined,
            allowThresholdMove: undefined,
            // Form elements to match
            formElements: 'input, select, option, textarea, button, video, label',
            // Last click time
            lastClickTime: Utils.now(),
            clickTimeout: undefined,
            // Velocities
            velocities: [],
            allowMomentumBounce: undefined,
            isTouchEvent: undefined,
            startMoving: undefined,
          },

          // Clicks
          allowClick: true,

          // Touches
          allowTouchMove: swiper.params.allowTouchMove,

          touches: {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0,
          },

          // Images
          imagesToLoad: [],
          imagesLoaded: 0,

        });

        // Install Modules
        swiper.useModules();

        // Init
        if (swiper.params.init) {
          swiper.init();
        }

        // Return app instance
        return swiper;
      }

      if ( SwiperClass ) Swiper.__proto__ = SwiperClass;
      Swiper.prototype = Object.create( SwiperClass && SwiperClass.prototype );
      Swiper.prototype.constructor = Swiper;

      var staticAccessors = { extendedDefaults: { configurable: true },defaults: { configurable: true },Class: { configurable: true },$: { configurable: true } };

      Swiper.prototype.slidesPerViewDynamic = function slidesPerViewDynamic () {
        var swiper = this;
        var params = swiper.params;
        var slides = swiper.slides;
        var slidesGrid = swiper.slidesGrid;
        var swiperSize = swiper.size;
        var activeIndex = swiper.activeIndex;
        var spv = 1;
        if (params.centeredSlides) {
          var slideSize = slides[activeIndex].swiperSlideSize;
          var breakLoop;
          for (var i = activeIndex + 1; i < slides.length; i += 1) {
            if (slides[i] && !breakLoop) {
              slideSize += slides[i].swiperSlideSize;
              spv += 1;
              if (slideSize > swiperSize) { breakLoop = true; }
            }
          }
          for (var i$1 = activeIndex - 1; i$1 >= 0; i$1 -= 1) {
            if (slides[i$1] && !breakLoop) {
              slideSize += slides[i$1].swiperSlideSize;
              spv += 1;
              if (slideSize > swiperSize) { breakLoop = true; }
            }
          }
        } else {
          for (var i$2 = activeIndex + 1; i$2 < slides.length; i$2 += 1) {
            if (slidesGrid[i$2] - slidesGrid[activeIndex] < swiperSize) {
              spv += 1;
            }
          }
        }
        return spv;
      };

      Swiper.prototype.update = function update () {
        var swiper = this;
        if (!swiper || swiper.destroyed) { return; }
        var snapGrid = swiper.snapGrid;
        var params = swiper.params;
        // Breakpoints
        if (params.breakpoints) {
          swiper.setBreakpoint();
        }
        swiper.updateSize();
        swiper.updateSlides();
        swiper.updateProgress();
        swiper.updateSlidesClasses();

        function setTranslate() {
          var translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
          var newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
          swiper.setTranslate(newTranslate);
          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();
        }
        var translated;
        if (swiper.params.freeMode) {
          setTranslate();
          if (swiper.params.autoHeight) {
            swiper.updateAutoHeight();
          }
        } else {
          if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
            translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
          } else {
            translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
          }
          if (!translated) {
            setTranslate();
          }
        }
        if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
          swiper.checkOverflow();
        }
        swiper.emit('update');
      };

      Swiper.prototype.changeDirection = function changeDirection (newDirection, needUpdate) {
        if ( needUpdate === void 0 ) needUpdate = true;

        var swiper = this;
        var currentDirection = swiper.params.direction;
        if (!newDirection) {
          // eslint-disable-next-line
          newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
        }
        if ((newDirection === currentDirection) || (newDirection !== 'horizontal' && newDirection !== 'vertical')) {
          return swiper;
        }

        swiper.$el
          .removeClass(("" + (swiper.params.containerModifierClass) + currentDirection))
          .addClass(("" + (swiper.params.containerModifierClass) + newDirection));

        swiper.params.direction = newDirection;

        swiper.slides.each(function (slideIndex, slideEl) {
          if (newDirection === 'vertical') {
            slideEl.style.width = '';
          } else {
            slideEl.style.height = '';
          }
        });

        swiper.emit('changeDirection');
        if (needUpdate) { swiper.update(); }

        return swiper;
      };

      Swiper.prototype.init = function init () {
        var swiper = this;
        if (swiper.initialized) { return; }

        swiper.emit('beforeInit');

        // Set breakpoint
        if (swiper.params.breakpoints) {
          swiper.setBreakpoint();
        }

        // Add Classes
        swiper.addClasses();

        // Create loop
        if (swiper.params.loop) {
          swiper.loopCreate();
        }

        // Update size
        swiper.updateSize();

        // Update slides
        swiper.updateSlides();

        if (swiper.params.watchOverflow) {
          swiper.checkOverflow();
        }

        // Set Grab Cursor
        if (swiper.params.grabCursor) {
          swiper.setGrabCursor();
        }

        if (swiper.params.preloadImages) {
          swiper.preloadImages();
        }

        // Slide To Initial Slide
        if (swiper.params.loop) {
          swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit);
        } else {
          swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit);
        }

        // Attach events
        swiper.attachEvents();

        // Init Flag
        swiper.initialized = true;

        // Emit
        swiper.emit('init');
      };

      Swiper.prototype.destroy = function destroy (deleteInstance, cleanStyles) {
        if ( deleteInstance === void 0 ) deleteInstance = true;
        if ( cleanStyles === void 0 ) cleanStyles = true;

        var swiper = this;
        var params = swiper.params;
        var $el = swiper.$el;
        var $wrapperEl = swiper.$wrapperEl;
        var slides = swiper.slides;

        if (typeof swiper.params === 'undefined' || swiper.destroyed) {
          return null;
        }

        swiper.emit('beforeDestroy');

        // Init Flag
        swiper.initialized = false;

        // Detach events
        swiper.detachEvents();

        // Destroy loop
        if (params.loop) {
          swiper.loopDestroy();
        }

        // Cleanup styles
        if (cleanStyles) {
          swiper.removeClasses();
          $el.removeAttr('style');
          $wrapperEl.removeAttr('style');
          if (slides && slides.length) {
            slides
              .removeClass([
                params.slideVisibleClass,
                params.slideActiveClass,
                params.slideNextClass,
                params.slidePrevClass ].join(' '))
              .removeAttr('style')
              .removeAttr('data-swiper-slide-index');
          }
        }

        swiper.emit('destroy');

        // Detach emitter events
        Object.keys(swiper.eventsListeners).forEach(function (eventName) {
          swiper.off(eventName);
        });

        if (deleteInstance !== false) {
          swiper.$el[0].swiper = null;
          swiper.$el.data('swiper', null);
          Utils.deleteProps(swiper);
        }
        swiper.destroyed = true;

        return null;
      };

      Swiper.extendDefaults = function extendDefaults (newDefaults) {
        Utils.extend(extendedDefaults, newDefaults);
      };

      staticAccessors.extendedDefaults.get = function () {
        return extendedDefaults;
      };

      staticAccessors.defaults.get = function () {
        return defaults;
      };

      staticAccessors.Class.get = function () {
        return SwiperClass;
      };

      staticAccessors.$.get = function () {
        return $;
      };

      Object.defineProperties( Swiper, staticAccessors );

      return Swiper;
    }(SwiperClass));

    var Device$1 = {
      name: 'device',
      proto: {
        device: Device,
      },
      static: {
        device: Device,
      },
    };

    var Support$1 = {
      name: 'support',
      proto: {
        support: Support,
      },
      static: {
        support: Support,
      },
    };

    var Browser = (function Browser() {
      function isSafari() {
        var ua = win.navigator.userAgent.toLowerCase();
        return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
      }
      return {
        isEdge: !!win.navigator.userAgent.match(/Edge/g),
        isSafari: isSafari(),
        isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(win.navigator.userAgent),
      };
    }());

    var Browser$1 = {
      name: 'browser',
      proto: {
        browser: Browser,
      },
      static: {
        browser: Browser,
      },
    };

    var Resize = {
      name: 'resize',
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          resize: {
            resizeHandler: function resizeHandler() {
              if (!swiper || swiper.destroyed || !swiper.initialized) { return; }
              swiper.emit('beforeResize');
              swiper.emit('resize');
            },
            orientationChangeHandler: function orientationChangeHandler() {
              if (!swiper || swiper.destroyed || !swiper.initialized) { return; }
              swiper.emit('orientationchange');
            },
          },
        });
      },
      on: {
        init: function init() {
          var swiper = this;
          // Emit resize
          win.addEventListener('resize', swiper.resize.resizeHandler);

          // Emit orientationchange
          win.addEventListener('orientationchange', swiper.resize.orientationChangeHandler);
        },
        destroy: function destroy() {
          var swiper = this;
          win.removeEventListener('resize', swiper.resize.resizeHandler);
          win.removeEventListener('orientationchange', swiper.resize.orientationChangeHandler);
        },
      },
    };

    var Observer = {
      func: win.MutationObserver || win.WebkitMutationObserver,
      attach: function attach(target, options) {
        if ( options === void 0 ) options = {};

        var swiper = this;

        var ObserverFunc = Observer.func;
        var observer = new ObserverFunc(function (mutations) {
          // The observerUpdate event should only be triggered
          // once despite the number of mutations.  Additional
          // triggers are redundant and are very costly
          if (mutations.length === 1) {
            swiper.emit('observerUpdate', mutations[0]);
            return;
          }
          var observerUpdate = function observerUpdate() {
            swiper.emit('observerUpdate', mutations[0]);
          };

          if (win.requestAnimationFrame) {
            win.requestAnimationFrame(observerUpdate);
          } else {
            win.setTimeout(observerUpdate, 0);
          }
        });

        observer.observe(target, {
          attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
          childList: typeof options.childList === 'undefined' ? true : options.childList,
          characterData: typeof options.characterData === 'undefined' ? true : options.characterData,
        });

        swiper.observer.observers.push(observer);
      },
      init: function init() {
        var swiper = this;
        if (!Support.observer || !swiper.params.observer) { return; }
        if (swiper.params.observeParents) {
          var containerParents = swiper.$el.parents();
          for (var i = 0; i < containerParents.length; i += 1) {
            swiper.observer.attach(containerParents[i]);
          }
        }
        // Observe container
        swiper.observer.attach(swiper.$el[0], { childList: swiper.params.observeSlideChildren });

        // Observe wrapper
        swiper.observer.attach(swiper.$wrapperEl[0], { attributes: false });
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.observer.observers.forEach(function (observer) {
          observer.disconnect();
        });
        swiper.observer.observers = [];
      },
    };

    var Observer$1 = {
      name: 'observer',
      params: {
        observer: false,
        observeParents: false,
        observeSlideChildren: false,
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          observer: {
            init: Observer.init.bind(swiper),
            attach: Observer.attach.bind(swiper),
            destroy: Observer.destroy.bind(swiper),
            observers: [],
          },
        });
      },
      on: {
        init: function init() {
          var swiper = this;
          swiper.observer.init();
        },
        destroy: function destroy() {
          var swiper = this;
          swiper.observer.destroy();
        },
      },
    };

    var Virtual = {
      update: function update(force) {
        var swiper = this;
        var ref = swiper.params;
        var slidesPerView = ref.slidesPerView;
        var slidesPerGroup = ref.slidesPerGroup;
        var centeredSlides = ref.centeredSlides;
        var ref$1 = swiper.params.virtual;
        var addSlidesBefore = ref$1.addSlidesBefore;
        var addSlidesAfter = ref$1.addSlidesAfter;
        var ref$2 = swiper.virtual;
        var previousFrom = ref$2.from;
        var previousTo = ref$2.to;
        var slides = ref$2.slides;
        var previousSlidesGrid = ref$2.slidesGrid;
        var renderSlide = ref$2.renderSlide;
        var previousOffset = ref$2.offset;
        swiper.updateActiveIndex();
        var activeIndex = swiper.activeIndex || 0;

        var offsetProp;
        if (swiper.rtlTranslate) { offsetProp = 'right'; }
        else { offsetProp = swiper.isHorizontal() ? 'left' : 'top'; }

        var slidesAfter;
        var slidesBefore;
        if (centeredSlides) {
          slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
          slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
        } else {
          slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesBefore;
          slidesBefore = slidesPerGroup + addSlidesAfter;
        }
        var from = Math.max((activeIndex || 0) - slidesBefore, 0);
        var to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
        var offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);

        Utils.extend(swiper.virtual, {
          from: from,
          to: to,
          offset: offset,
          slidesGrid: swiper.slidesGrid,
        });

        function onRendered() {
          swiper.updateSlides();
          swiper.updateProgress();
          swiper.updateSlidesClasses();
          if (swiper.lazy && swiper.params.lazy.enabled) {
            swiper.lazy.load();
          }
        }

        if (previousFrom === from && previousTo === to && !force) {
          if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
            swiper.slides.css(offsetProp, (offset + "px"));
          }
          swiper.updateProgress();
          return;
        }
        if (swiper.params.virtual.renderExternal) {
          swiper.params.virtual.renderExternal.call(swiper, {
            offset: offset,
            from: from,
            to: to,
            slides: (function getSlides() {
              var slidesToRender = [];
              for (var i = from; i <= to; i += 1) {
                slidesToRender.push(slides[i]);
              }
              return slidesToRender;
            }()),
          });
          onRendered();
          return;
        }
        var prependIndexes = [];
        var appendIndexes = [];
        if (force) {
          swiper.$wrapperEl.find(("." + (swiper.params.slideClass))).remove();
        } else {
          for (var i = previousFrom; i <= previousTo; i += 1) {
            if (i < from || i > to) {
              swiper.$wrapperEl.find(("." + (swiper.params.slideClass) + "[data-swiper-slide-index=\"" + i + "\"]")).remove();
            }
          }
        }
        for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
          if (i$1 >= from && i$1 <= to) {
            if (typeof previousTo === 'undefined' || force) {
              appendIndexes.push(i$1);
            } else {
              if (i$1 > previousTo) { appendIndexes.push(i$1); }
              if (i$1 < previousFrom) { prependIndexes.push(i$1); }
            }
          }
        }
        appendIndexes.forEach(function (index) {
          swiper.$wrapperEl.append(renderSlide(slides[index], index));
        });
        prependIndexes.sort(function (a, b) { return b - a; }).forEach(function (index) {
          swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
        });
        swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, (offset + "px"));
        onRendered();
      },
      renderSlide: function renderSlide(slide, index) {
        var swiper = this;
        var params = swiper.params.virtual;
        if (params.cache && swiper.virtual.cache[index]) {
          return swiper.virtual.cache[index];
        }
        var $slideEl = params.renderSlide
          ? $(params.renderSlide.call(swiper, slide, index))
          : $(("<div class=\"" + (swiper.params.slideClass) + "\" data-swiper-slide-index=\"" + index + "\">" + slide + "</div>"));
        if (!$slideEl.attr('data-swiper-slide-index')) { $slideEl.attr('data-swiper-slide-index', index); }
        if (params.cache) { swiper.virtual.cache[index] = $slideEl; }
        return $slideEl;
      },
      appendSlide: function appendSlide(slides) {
        var swiper = this;
        if (typeof slides === 'object' && 'length' in slides) {
          for (var i = 0; i < slides.length; i += 1) {
            if (slides[i]) { swiper.virtual.slides.push(slides[i]); }
          }
        } else {
          swiper.virtual.slides.push(slides);
        }
        swiper.virtual.update(true);
      },
      prependSlide: function prependSlide(slides) {
        var swiper = this;
        var activeIndex = swiper.activeIndex;
        var newActiveIndex = activeIndex + 1;
        var numberOfNewSlides = 1;

        if (Array.isArray(slides)) {
          for (var i = 0; i < slides.length; i += 1) {
            if (slides[i]) { swiper.virtual.slides.unshift(slides[i]); }
          }
          newActiveIndex = activeIndex + slides.length;
          numberOfNewSlides = slides.length;
        } else {
          swiper.virtual.slides.unshift(slides);
        }
        if (swiper.params.virtual.cache) {
          var cache = swiper.virtual.cache;
          var newCache = {};
          Object.keys(cache).forEach(function (cachedIndex) {
            var $cachedEl = cache[cachedIndex];
            var cachedElIndex = $cachedEl.attr('data-swiper-slide-index');
            if (cachedElIndex) {
              $cachedEl.attr('data-swiper-slide-index', parseInt(cachedElIndex, 10) + 1);
            }
            newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = $cachedEl;
          });
          swiper.virtual.cache = newCache;
        }
        swiper.virtual.update(true);
        swiper.slideTo(newActiveIndex, 0);
      },
      removeSlide: function removeSlide(slidesIndexes) {
        var swiper = this;
        if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) { return; }
        var activeIndex = swiper.activeIndex;
        if (Array.isArray(slidesIndexes)) {
          for (var i = slidesIndexes.length - 1; i >= 0; i -= 1) {
            swiper.virtual.slides.splice(slidesIndexes[i], 1);
            if (swiper.params.virtual.cache) {
              delete swiper.virtual.cache[slidesIndexes[i]];
            }
            if (slidesIndexes[i] < activeIndex) { activeIndex -= 1; }
            activeIndex = Math.max(activeIndex, 0);
          }
        } else {
          swiper.virtual.slides.splice(slidesIndexes, 1);
          if (swiper.params.virtual.cache) {
            delete swiper.virtual.cache[slidesIndexes];
          }
          if (slidesIndexes < activeIndex) { activeIndex -= 1; }
          activeIndex = Math.max(activeIndex, 0);
        }
        swiper.virtual.update(true);
        swiper.slideTo(activeIndex, 0);
      },
      removeAllSlides: function removeAllSlides() {
        var swiper = this;
        swiper.virtual.slides = [];
        if (swiper.params.virtual.cache) {
          swiper.virtual.cache = {};
        }
        swiper.virtual.update(true);
        swiper.slideTo(0, 0);
      },
    };

    var Virtual$1 = {
      name: 'virtual',
      params: {
        virtual: {
          enabled: false,
          slides: [],
          cache: true,
          renderSlide: null,
          renderExternal: null,
          addSlidesBefore: 0,
          addSlidesAfter: 0,
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          virtual: {
            update: Virtual.update.bind(swiper),
            appendSlide: Virtual.appendSlide.bind(swiper),
            prependSlide: Virtual.prependSlide.bind(swiper),
            removeSlide: Virtual.removeSlide.bind(swiper),
            removeAllSlides: Virtual.removeAllSlides.bind(swiper),
            renderSlide: Virtual.renderSlide.bind(swiper),
            slides: swiper.params.virtual.slides,
            cache: {},
          },
        });
      },
      on: {
        beforeInit: function beforeInit() {
          var swiper = this;
          if (!swiper.params.virtual.enabled) { return; }
          swiper.classNames.push(((swiper.params.containerModifierClass) + "virtual"));
          var overwriteParams = {
            watchSlidesProgress: true,
          };
          Utils.extend(swiper.params, overwriteParams);
          Utils.extend(swiper.originalParams, overwriteParams);

          if (!swiper.params.initialSlide) {
            swiper.virtual.update();
          }
        },
        setTranslate: function setTranslate() {
          var swiper = this;
          if (!swiper.params.virtual.enabled) { return; }
          swiper.virtual.update();
        },
      },
    };

    var Keyboard = {
      handle: function handle(event) {
        var swiper = this;
        var rtl = swiper.rtlTranslate;
        var e = event;
        if (e.originalEvent) { e = e.originalEvent; } // jquery fix
        var kc = e.keyCode || e.charCode;
        var pageUpDown = swiper.params.keyboard.pageUpDown;
        var isPageUp = pageUpDown && kc === 33;
        var isPageDown = pageUpDown && kc === 34;
        var isArrowLeft = kc === 37;
        var isArrowRight = kc === 39;
        var isArrowUp = kc === 38;
        var isArrowDown = kc === 40;
        // Directions locks
        if (!swiper.allowSlideNext && ((swiper.isHorizontal() && isArrowRight) || (swiper.isVertical() && isArrowDown) || isPageDown)) {
          return false;
        }
        if (!swiper.allowSlidePrev && ((swiper.isHorizontal() && isArrowLeft) || (swiper.isVertical() && isArrowUp) || isPageUp)) {
          return false;
        }
        if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
          return undefined;
        }
        if (doc.activeElement && doc.activeElement.nodeName && (doc.activeElement.nodeName.toLowerCase() === 'input' || doc.activeElement.nodeName.toLowerCase() === 'textarea')) {
          return undefined;
        }
        if (swiper.params.keyboard.onlyInViewport && (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)) {
          var inView = false;
          // Check that swiper should be inside of visible area of window
          if (swiper.$el.parents(("." + (swiper.params.slideClass))).length > 0 && swiper.$el.parents(("." + (swiper.params.slideActiveClass))).length === 0) {
            return undefined;
          }
          var windowWidth = win.innerWidth;
          var windowHeight = win.innerHeight;
          var swiperOffset = swiper.$el.offset();
          if (rtl) { swiperOffset.left -= swiper.$el[0].scrollLeft; }
          var swiperCoord = [
            [swiperOffset.left, swiperOffset.top],
            [swiperOffset.left + swiper.width, swiperOffset.top],
            [swiperOffset.left, swiperOffset.top + swiper.height],
            [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height] ];
          for (var i = 0; i < swiperCoord.length; i += 1) {
            var point = swiperCoord[i];
            if (
              point[0] >= 0 && point[0] <= windowWidth
              && point[1] >= 0 && point[1] <= windowHeight
            ) {
              inView = true;
            }
          }
          if (!inView) { return undefined; }
        }
        if (swiper.isHorizontal()) {
          if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
            if (e.preventDefault) { e.preventDefault(); }
            else { e.returnValue = false; }
          }
          if (((isPageDown || isArrowRight) && !rtl) || ((isPageUp || isArrowLeft) && rtl)) { swiper.slideNext(); }
          if (((isPageUp || isArrowLeft) && !rtl) || ((isPageDown || isArrowRight) && rtl)) { swiper.slidePrev(); }
        } else {
          if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
            if (e.preventDefault) { e.preventDefault(); }
            else { e.returnValue = false; }
          }
          if (isPageDown || isArrowDown) { swiper.slideNext(); }
          if (isPageUp || isArrowUp) { swiper.slidePrev(); }
        }
        swiper.emit('keyPress', kc);
        return undefined;
      },
      enable: function enable() {
        var swiper = this;
        if (swiper.keyboard.enabled) { return; }
        $(doc).on('keydown', swiper.keyboard.handle);
        swiper.keyboard.enabled = true;
      },
      disable: function disable() {
        var swiper = this;
        if (!swiper.keyboard.enabled) { return; }
        $(doc).off('keydown', swiper.keyboard.handle);
        swiper.keyboard.enabled = false;
      },
    };

    var Keyboard$1 = {
      name: 'keyboard',
      params: {
        keyboard: {
          enabled: false,
          onlyInViewport: true,
          pageUpDown: true,
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          keyboard: {
            enabled: false,
            enable: Keyboard.enable.bind(swiper),
            disable: Keyboard.disable.bind(swiper),
            handle: Keyboard.handle.bind(swiper),
          },
        });
      },
      on: {
        init: function init() {
          var swiper = this;
          if (swiper.params.keyboard.enabled) {
            swiper.keyboard.enable();
          }
        },
        destroy: function destroy() {
          var swiper = this;
          if (swiper.keyboard.enabled) {
            swiper.keyboard.disable();
          }
        },
      },
    };

    function isEventSupported() {
      var eventName = 'onwheel';
      var isSupported = eventName in doc;

      if (!isSupported) {
        var element = doc.createElement('div');
        element.setAttribute(eventName, 'return;');
        isSupported = typeof element[eventName] === 'function';
      }

      if (!isSupported
        && doc.implementation
        && doc.implementation.hasFeature
        // always returns true in newer browsers as per the standard.
        // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
        && doc.implementation.hasFeature('', '') !== true
      ) {
        // This is the only way to test support for the `wheel` event in IE9+.
        isSupported = doc.implementation.hasFeature('Events.wheel', '3.0');
      }

      return isSupported;
    }
    var Mousewheel = {
      lastScrollTime: Utils.now(),
      lastEventBeforeSnap: undefined,
      recentWheelEvents: [],
      event: function event() {
        if (win.navigator.userAgent.indexOf('firefox') > -1) { return 'DOMMouseScroll'; }
        return isEventSupported() ? 'wheel' : 'mousewheel';
      },
      normalize: function normalize(e) {
        // Reasonable defaults
        var PIXEL_STEP = 10;
        var LINE_HEIGHT = 40;
        var PAGE_HEIGHT = 800;

        var sX = 0;
        var sY = 0; // spinX, spinY
        var pX = 0;
        var pY = 0; // pixelX, pixelY

        // Legacy
        if ('detail' in e) {
          sY = e.detail;
        }
        if ('wheelDelta' in e) {
          sY = -e.wheelDelta / 120;
        }
        if ('wheelDeltaY' in e) {
          sY = -e.wheelDeltaY / 120;
        }
        if ('wheelDeltaX' in e) {
          sX = -e.wheelDeltaX / 120;
        }

        // side scrolling on FF with DOMMouseScroll
        if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
          sX = sY;
          sY = 0;
        }

        pX = sX * PIXEL_STEP;
        pY = sY * PIXEL_STEP;

        if ('deltaY' in e) {
          pY = e.deltaY;
        }
        if ('deltaX' in e) {
          pX = e.deltaX;
        }

        if (e.shiftKey && !pX) { // if user scrolls with shift he wants horizontal scroll
          pX = pY;
          pY = 0;
        }

        if ((pX || pY) && e.deltaMode) {
          if (e.deltaMode === 1) { // delta in LINE units
            pX *= LINE_HEIGHT;
            pY *= LINE_HEIGHT;
          } else { // delta in PAGE units
            pX *= PAGE_HEIGHT;
            pY *= PAGE_HEIGHT;
          }
        }

        // Fall-back if spin cannot be determined
        if (pX && !sX) {
          sX = (pX < 1) ? -1 : 1;
        }
        if (pY && !sY) {
          sY = (pY < 1) ? -1 : 1;
        }

        return {
          spinX: sX,
          spinY: sY,
          pixelX: pX,
          pixelY: pY,
        };
      },
      handleMouseEnter: function handleMouseEnter() {
        var swiper = this;
        swiper.mouseEntered = true;
      },
      handleMouseLeave: function handleMouseLeave() {
        var swiper = this;
        swiper.mouseEntered = false;
      },
      handle: function handle(event) {
        var e = event;
        var swiper = this;
        var params = swiper.params.mousewheel;

        if (swiper.params.cssMode) {
          e.preventDefault();
        }

        var target = swiper.$el;
        if (swiper.params.mousewheel.eventsTarged !== 'container') {
          target = $(swiper.params.mousewheel.eventsTarged);
        }
        if (!swiper.mouseEntered && !target[0].contains(e.target) && !params.releaseOnEdges) { return true; }

        if (e.originalEvent) { e = e.originalEvent; } // jquery fix
        var delta = 0;
        var rtlFactor = swiper.rtlTranslate ? -1 : 1;

        var data = Mousewheel.normalize(e);

        if (params.forceToAxis) {
          if (swiper.isHorizontal()) {
            if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) { delta = -data.pixelX * rtlFactor; }
            else { return true; }
          } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) { delta = -data.pixelY; }
          else { return true; }
        } else {
          delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
        }

        if (delta === 0) { return true; }

        if (params.invert) { delta = -delta; }

        if (!swiper.params.freeMode) {
          // Register the new event in a variable which stores the relevant data
          var newEvent = {
            time: Utils.now(),
            delta: Math.abs(delta),
            direction: Math.sign(delta),
            raw: event,
          };

          // Keep the most recent events
          var recentWheelEvents = swiper.mousewheel.recentWheelEvents;
          if (recentWheelEvents.length >= 2) {
            recentWheelEvents.shift(); // only store the last N events
          }
          var prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
          recentWheelEvents.push(newEvent);

          // If there is at least one previous recorded event:
          //   If direction has changed or
          //   if the scroll is quicker than the previous one:
          //     Animate the slider.
          // Else (this is the first time the wheel is moved):
          //     Animate the slider.
          if (prevEvent) {
            if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta || newEvent.time > prevEvent.time + 150) {
              swiper.mousewheel.animateSlider(newEvent);
            }
          } else {
            swiper.mousewheel.animateSlider(newEvent);
          }

          // If it's time to release the scroll:
          //   Return now so you don't hit the preventDefault.
          if (swiper.mousewheel.releaseScroll(newEvent)) {
            return true;
          }
        } else {
          // Freemode or scrollContainer:

          // If we recently snapped after a momentum scroll, then ignore wheel events
          // to give time for the deceleration to finish. Stop ignoring after 500 msecs
          // or if it's a new scroll (larger delta or inverse sign as last event before
          // an end-of-momentum snap).
          var newEvent$1 = { time: Utils.now(), delta: Math.abs(delta), direction: Math.sign(delta) };
          var ref = swiper.mousewheel;
          var lastEventBeforeSnap = ref.lastEventBeforeSnap;
          var ignoreWheelEvents = lastEventBeforeSnap
            && newEvent$1.time < lastEventBeforeSnap.time + 500
            && newEvent$1.delta <= lastEventBeforeSnap.delta
            && newEvent$1.direction === lastEventBeforeSnap.direction;
          if (!ignoreWheelEvents) {
            swiper.mousewheel.lastEventBeforeSnap = undefined;

            if (swiper.params.loop) {
              swiper.loopFix();
            }
            var position = swiper.getTranslate() + (delta * params.sensitivity);
            var wasBeginning = swiper.isBeginning;
            var wasEnd = swiper.isEnd;

            if (position >= swiper.minTranslate()) { position = swiper.minTranslate(); }
            if (position <= swiper.maxTranslate()) { position = swiper.maxTranslate(); }

            swiper.setTransition(0);
            swiper.setTranslate(position);
            swiper.updateProgress();
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();

            if ((!wasBeginning && swiper.isBeginning) || (!wasEnd && swiper.isEnd)) {
              swiper.updateSlidesClasses();
            }

            if (swiper.params.freeModeSticky) {
              // When wheel scrolling starts with sticky (aka snap) enabled, then detect
              // the end of a momentum scroll by storing recent (N=15?) wheel events.
              // 1. do all N events have decreasing or same (absolute value) delta?
              // 2. did all N events arrive in the last M (M=500?) msecs?
              // 3. does the earliest event have an (absolute value) delta that's
              //    at least P (P=1?) larger than the most recent event's delta?
              // 4. does the latest event have a delta that's smaller than Q (Q=6?) pixels?
              // If 1-4 are "yes" then we're near the end of a momuntum scroll deceleration.
              // Snap immediately and ignore remaining wheel events in this scroll.
              // See comment above for "remaining wheel events in this scroll" determination.
              // If 1-4 aren't satisfied, then wait to snap until 500ms after the last event.
              clearTimeout(swiper.mousewheel.timeout);
              swiper.mousewheel.timeout = undefined;
              var recentWheelEvents$1 = swiper.mousewheel.recentWheelEvents;
              if (recentWheelEvents$1.length >= 15) {
                recentWheelEvents$1.shift(); // only store the last N events
              }
              var prevEvent$1 = recentWheelEvents$1.length ? recentWheelEvents$1[recentWheelEvents$1.length - 1] : undefined;
              var firstEvent = recentWheelEvents$1[0];
              recentWheelEvents$1.push(newEvent$1);
              if (prevEvent$1 && (newEvent$1.delta > prevEvent$1.delta || newEvent$1.direction !== prevEvent$1.direction)) {
                // Increasing or reverse-sign delta means the user started scrolling again. Clear the wheel event log.
                recentWheelEvents$1.splice(0);
              } else if (recentWheelEvents$1.length >= 15
                  && newEvent$1.time - firstEvent.time < 500
                  && firstEvent.delta - newEvent$1.delta >= 1
                  && newEvent$1.delta <= 6
              ) {
                // We're at the end of the deceleration of a momentum scroll, so there's no need
                // to wait for more events. Snap ASAP on the next tick.
                // Also, because there's some remaining momentum we'll bias the snap in the
                // direction of the ongoing scroll because it's better UX for the scroll to snap
                // in the same direction as the scroll instead of reversing to snap.  Therefore,
                // if it's already scrolled more than 20% in the current direction, keep going.
                var snapToThreshold = delta > 0 ? 0.8 : 0.2;
                swiper.mousewheel.lastEventBeforeSnap = newEvent$1;
                recentWheelEvents$1.splice(0);
                swiper.mousewheel.timeout = Utils.nextTick(function () {
                  swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
                }, 0); // no delay; move on next tick
              }
              if (!swiper.mousewheel.timeout) {
                // if we get here, then we haven't detected the end of a momentum scroll, so
                // we'll consider a scroll "complete" when there haven't been any wheel events
                // for 500ms.
                swiper.mousewheel.timeout = Utils.nextTick(function () {
                  var snapToThreshold = 0.5;
                  swiper.mousewheel.lastEventBeforeSnap = newEvent$1;
                  recentWheelEvents$1.splice(0);
                  swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
                }, 500);
              }
            }

            // Emit event
            if (!ignoreWheelEvents) { swiper.emit('scroll', e); }

            // Stop autoplay
            if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) { swiper.autoplay.stop(); }
            // Return page scroll on edge positions
            if (position === swiper.minTranslate() || position === swiper.maxTranslate()) { return true; }
          }
        }

        if (e.preventDefault) { e.preventDefault(); }
        else { e.returnValue = false; }
        return false;
      },
      animateSlider: function animateSlider(newEvent) {
        var swiper = this;
        // If the movement is NOT big enough and
        // if the last time the user scrolled was too close to the current one (avoid continuously triggering the slider):
        //   Don't go any further (avoid insignificant scroll movement).
        if (newEvent.delta >= 6 && Utils.now() - swiper.mousewheel.lastScrollTime < 60) {
          // Return false as a default
          return true;
        }
        // If user is scrolling towards the end:
        //   If the slider hasn't hit the latest slide or
        //   if the slider is a loop and
        //   if the slider isn't moving right now:
        //     Go to next slide and
        //     emit a scroll event.
        // Else (the user is scrolling towards the beginning) and
        // if the slider hasn't hit the first slide or
        // if the slider is a loop and
        // if the slider isn't moving right now:
        //   Go to prev slide and
        //   emit a scroll event.
        if (newEvent.direction < 0) {
          if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
            swiper.slideNext();
            swiper.emit('scroll', newEvent.raw);
          }
        } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
          swiper.slidePrev();
          swiper.emit('scroll', newEvent.raw);
        }
        // If you got here is because an animation has been triggered so store the current time
        swiper.mousewheel.lastScrollTime = (new win.Date()).getTime();
        // Return false as a default
        return false;
      },
      releaseScroll: function releaseScroll(newEvent) {
        var swiper = this;
        var params = swiper.params.mousewheel;
        if (newEvent.direction < 0) {
          if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
            // Return true to animate scroll on edges
            return true;
          }
        } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {
          // Return true to animate scroll on edges
          return true;
        }
        return false;
      },
      enable: function enable() {
        var swiper = this;
        var event = Mousewheel.event();
        if (swiper.params.cssMode) {
          swiper.wrapperEl.removeEventListener(event, swiper.mousewheel.handle);
          return true;
        }
        if (!event) { return false; }
        if (swiper.mousewheel.enabled) { return false; }
        var target = swiper.$el;
        if (swiper.params.mousewheel.eventsTarged !== 'container') {
          target = $(swiper.params.mousewheel.eventsTarged);
        }
        target.on('mouseenter', swiper.mousewheel.handleMouseEnter);
        target.on('mouseleave', swiper.mousewheel.handleMouseLeave);
        target.on(event, swiper.mousewheel.handle);
        swiper.mousewheel.enabled = true;
        return true;
      },
      disable: function disable() {
        var swiper = this;
        var event = Mousewheel.event();
        if (swiper.params.cssMode) {
          swiper.wrapperEl.addEventListener(event, swiper.mousewheel.handle);
          return true;
        }
        if (!event) { return false; }
        if (!swiper.mousewheel.enabled) { return false; }
        var target = swiper.$el;
        if (swiper.params.mousewheel.eventsTarged !== 'container') {
          target = $(swiper.params.mousewheel.eventsTarged);
        }
        target.off(event, swiper.mousewheel.handle);
        swiper.mousewheel.enabled = false;
        return true;
      },
    };

    var Mousewheel$1 = {
      name: 'mousewheel',
      params: {
        mousewheel: {
          enabled: false,
          releaseOnEdges: false,
          invert: false,
          forceToAxis: false,
          sensitivity: 1,
          eventsTarged: 'container',
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          mousewheel: {
            enabled: false,
            enable: Mousewheel.enable.bind(swiper),
            disable: Mousewheel.disable.bind(swiper),
            handle: Mousewheel.handle.bind(swiper),
            handleMouseEnter: Mousewheel.handleMouseEnter.bind(swiper),
            handleMouseLeave: Mousewheel.handleMouseLeave.bind(swiper),
            animateSlider: Mousewheel.animateSlider.bind(swiper),
            releaseScroll: Mousewheel.releaseScroll.bind(swiper),
            lastScrollTime: Utils.now(),
            lastEventBeforeSnap: undefined,
            recentWheelEvents: [],
          },
        });
      },
      on: {
        init: function init() {
          var swiper = this;
          if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
            swiper.mousewheel.disable();
          }
          if (swiper.params.mousewheel.enabled) { swiper.mousewheel.enable(); }
        },
        destroy: function destroy() {
          var swiper = this;
          if (swiper.params.cssMode) {
            swiper.mousewheel.enable();
          }
          if (swiper.mousewheel.enabled) { swiper.mousewheel.disable(); }
        },
      },
    };

    var Navigation = {
      update: function update() {
        // Update Navigation Buttons
        var swiper = this;
        var params = swiper.params.navigation;

        if (swiper.params.loop) { return; }
        var ref = swiper.navigation;
        var $nextEl = ref.$nextEl;
        var $prevEl = ref.$prevEl;

        if ($prevEl && $prevEl.length > 0) {
          if (swiper.isBeginning) {
            $prevEl.addClass(params.disabledClass);
          } else {
            $prevEl.removeClass(params.disabledClass);
          }
          $prevEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
        }
        if ($nextEl && $nextEl.length > 0) {
          if (swiper.isEnd) {
            $nextEl.addClass(params.disabledClass);
          } else {
            $nextEl.removeClass(params.disabledClass);
          }
          $nextEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
        }
      },
      onPrevClick: function onPrevClick(e) {
        var swiper = this;
        e.preventDefault();
        if (swiper.isBeginning && !swiper.params.loop) { return; }
        swiper.slidePrev();
      },
      onNextClick: function onNextClick(e) {
        var swiper = this;
        e.preventDefault();
        if (swiper.isEnd && !swiper.params.loop) { return; }
        swiper.slideNext();
      },
      init: function init() {
        var swiper = this;
        var params = swiper.params.navigation;
        if (!(params.nextEl || params.prevEl)) { return; }

        var $nextEl;
        var $prevEl;
        if (params.nextEl) {
          $nextEl = $(params.nextEl);
          if (
            swiper.params.uniqueNavElements
            && typeof params.nextEl === 'string'
            && $nextEl.length > 1
            && swiper.$el.find(params.nextEl).length === 1
          ) {
            $nextEl = swiper.$el.find(params.nextEl);
          }
        }
        if (params.prevEl) {
          $prevEl = $(params.prevEl);
          if (
            swiper.params.uniqueNavElements
            && typeof params.prevEl === 'string'
            && $prevEl.length > 1
            && swiper.$el.find(params.prevEl).length === 1
          ) {
            $prevEl = swiper.$el.find(params.prevEl);
          }
        }

        if ($nextEl && $nextEl.length > 0) {
          $nextEl.on('click', swiper.navigation.onNextClick);
        }
        if ($prevEl && $prevEl.length > 0) {
          $prevEl.on('click', swiper.navigation.onPrevClick);
        }

        Utils.extend(swiper.navigation, {
          $nextEl: $nextEl,
          nextEl: $nextEl && $nextEl[0],
          $prevEl: $prevEl,
          prevEl: $prevEl && $prevEl[0],
        });
      },
      destroy: function destroy() {
        var swiper = this;
        var ref = swiper.navigation;
        var $nextEl = ref.$nextEl;
        var $prevEl = ref.$prevEl;
        if ($nextEl && $nextEl.length) {
          $nextEl.off('click', swiper.navigation.onNextClick);
          $nextEl.removeClass(swiper.params.navigation.disabledClass);
        }
        if ($prevEl && $prevEl.length) {
          $prevEl.off('click', swiper.navigation.onPrevClick);
          $prevEl.removeClass(swiper.params.navigation.disabledClass);
        }
      },
    };

    var Navigation$1 = {
      name: 'navigation',
      params: {
        navigation: {
          nextEl: null,
          prevEl: null,

          hideOnClick: false,
          disabledClass: 'swiper-button-disabled',
          hiddenClass: 'swiper-button-hidden',
          lockClass: 'swiper-button-lock',
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          navigation: {
            init: Navigation.init.bind(swiper),
            update: Navigation.update.bind(swiper),
            destroy: Navigation.destroy.bind(swiper),
            onNextClick: Navigation.onNextClick.bind(swiper),
            onPrevClick: Navigation.onPrevClick.bind(swiper),
          },
        });
      },
      on: {
        init: function init() {
          var swiper = this;
          swiper.navigation.init();
          swiper.navigation.update();
        },
        toEdge: function toEdge() {
          var swiper = this;
          swiper.navigation.update();
        },
        fromEdge: function fromEdge() {
          var swiper = this;
          swiper.navigation.update();
        },
        destroy: function destroy() {
          var swiper = this;
          swiper.navigation.destroy();
        },
        click: function click(e) {
          var swiper = this;
          var ref = swiper.navigation;
          var $nextEl = ref.$nextEl;
          var $prevEl = ref.$prevEl;
          if (
            swiper.params.navigation.hideOnClick
            && !$(e.target).is($prevEl)
            && !$(e.target).is($nextEl)
          ) {
            var isHidden;
            if ($nextEl) {
              isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass);
            } else if ($prevEl) {
              isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
            }
            if (isHidden === true) {
              swiper.emit('navigationShow', swiper);
            } else {
              swiper.emit('navigationHide', swiper);
            }
            if ($nextEl) {
              $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
            }
            if ($prevEl) {
              $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
            }
          }
        },
      },
    };

    var Pagination = {
      update: function update() {
        // Render || Update Pagination bullets/items
        var swiper = this;
        var rtl = swiper.rtl;
        var params = swiper.params.pagination;
        if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
        var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
        var $el = swiper.pagination.$el;
        // Current/Total
        var current;
        var total = swiper.params.loop ? Math.ceil((slidesLength - (swiper.loopedSlides * 2)) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
        if (swiper.params.loop) {
          current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
          if (current > slidesLength - 1 - (swiper.loopedSlides * 2)) {
            current -= (slidesLength - (swiper.loopedSlides * 2));
          }
          if (current > total - 1) { current -= total; }
          if (current < 0 && swiper.params.paginationType !== 'bullets') { current = total + current; }
        } else if (typeof swiper.snapIndex !== 'undefined') {
          current = swiper.snapIndex;
        } else {
          current = swiper.activeIndex || 0;
        }
        // Types
        if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
          var bullets = swiper.pagination.bullets;
          var firstIndex;
          var lastIndex;
          var midIndex;
          if (params.dynamicBullets) {
            swiper.pagination.bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
            $el.css(swiper.isHorizontal() ? 'width' : 'height', ((swiper.pagination.bulletSize * (params.dynamicMainBullets + 4)) + "px"));
            if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
              swiper.pagination.dynamicBulletIndex += (current - swiper.previousIndex);
              if (swiper.pagination.dynamicBulletIndex > (params.dynamicMainBullets - 1)) {
                swiper.pagination.dynamicBulletIndex = params.dynamicMainBullets - 1;
              } else if (swiper.pagination.dynamicBulletIndex < 0) {
                swiper.pagination.dynamicBulletIndex = 0;
              }
            }
            firstIndex = current - swiper.pagination.dynamicBulletIndex;
            lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
            midIndex = (lastIndex + firstIndex) / 2;
          }
          bullets.removeClass(((params.bulletActiveClass) + " " + (params.bulletActiveClass) + "-next " + (params.bulletActiveClass) + "-next-next " + (params.bulletActiveClass) + "-prev " + (params.bulletActiveClass) + "-prev-prev " + (params.bulletActiveClass) + "-main"));
          if ($el.length > 1) {
            bullets.each(function (index, bullet) {
              var $bullet = $(bullet);
              var bulletIndex = $bullet.index();
              if (bulletIndex === current) {
                $bullet.addClass(params.bulletActiveClass);
              }
              if (params.dynamicBullets) {
                if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                  $bullet.addClass(((params.bulletActiveClass) + "-main"));
                }
                if (bulletIndex === firstIndex) {
                  $bullet
                    .prev()
                    .addClass(((params.bulletActiveClass) + "-prev"))
                    .prev()
                    .addClass(((params.bulletActiveClass) + "-prev-prev"));
                }
                if (bulletIndex === lastIndex) {
                  $bullet
                    .next()
                    .addClass(((params.bulletActiveClass) + "-next"))
                    .next()
                    .addClass(((params.bulletActiveClass) + "-next-next"));
                }
              }
            });
          } else {
            var $bullet = bullets.eq(current);
            var bulletIndex = $bullet.index();
            $bullet.addClass(params.bulletActiveClass);
            if (params.dynamicBullets) {
              var $firstDisplayedBullet = bullets.eq(firstIndex);
              var $lastDisplayedBullet = bullets.eq(lastIndex);
              for (var i = firstIndex; i <= lastIndex; i += 1) {
                bullets.eq(i).addClass(((params.bulletActiveClass) + "-main"));
              }
              if (swiper.params.loop) {
                if (bulletIndex >= bullets.length - params.dynamicMainBullets) {
                  for (var i$1 = params.dynamicMainBullets; i$1 >= 0; i$1 -= 1) {
                    bullets.eq(bullets.length - i$1).addClass(((params.bulletActiveClass) + "-main"));
                  }
                  bullets.eq(bullets.length - params.dynamicMainBullets - 1).addClass(((params.bulletActiveClass) + "-prev"));
                } else {
                  $firstDisplayedBullet
                    .prev()
                    .addClass(((params.bulletActiveClass) + "-prev"))
                    .prev()
                    .addClass(((params.bulletActiveClass) + "-prev-prev"));
                  $lastDisplayedBullet
                    .next()
                    .addClass(((params.bulletActiveClass) + "-next"))
                    .next()
                    .addClass(((params.bulletActiveClass) + "-next-next"));
                }
              } else {
                $firstDisplayedBullet
                  .prev()
                  .addClass(((params.bulletActiveClass) + "-prev"))
                  .prev()
                  .addClass(((params.bulletActiveClass) + "-prev-prev"));
                $lastDisplayedBullet
                  .next()
                  .addClass(((params.bulletActiveClass) + "-next"))
                  .next()
                  .addClass(((params.bulletActiveClass) + "-next-next"));
              }
            }
          }
          if (params.dynamicBullets) {
            var dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
            var bulletsOffset = (((swiper.pagination.bulletSize * dynamicBulletsLength) - (swiper.pagination.bulletSize)) / 2) - (midIndex * swiper.pagination.bulletSize);
            var offsetProp = rtl ? 'right' : 'left';
            bullets.css(swiper.isHorizontal() ? offsetProp : 'top', (bulletsOffset + "px"));
          }
        }
        if (params.type === 'fraction') {
          $el.find(("." + (params.currentClass))).text(params.formatFractionCurrent(current + 1));
          $el.find(("." + (params.totalClass))).text(params.formatFractionTotal(total));
        }
        if (params.type === 'progressbar') {
          var progressbarDirection;
          if (params.progressbarOpposite) {
            progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
          } else {
            progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
          }
          var scale = (current + 1) / total;
          var scaleX = 1;
          var scaleY = 1;
          if (progressbarDirection === 'horizontal') {
            scaleX = scale;
          } else {
            scaleY = scale;
          }
          $el.find(("." + (params.progressbarFillClass))).transform(("translate3d(0,0,0) scaleX(" + scaleX + ") scaleY(" + scaleY + ")")).transition(swiper.params.speed);
        }
        if (params.type === 'custom' && params.renderCustom) {
          $el.html(params.renderCustom(swiper, current + 1, total));
          swiper.emit('paginationRender', swiper, $el[0]);
        } else {
          swiper.emit('paginationUpdate', swiper, $el[0]);
        }
        $el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
      },
      render: function render() {
        // Render Container
        var swiper = this;
        var params = swiper.params.pagination;
        if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
        var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;

        var $el = swiper.pagination.$el;
        var paginationHTML = '';
        if (params.type === 'bullets') {
          var numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - (swiper.loopedSlides * 2)) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
          for (var i = 0; i < numberOfBullets; i += 1) {
            if (params.renderBullet) {
              paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
            } else {
              paginationHTML += "<" + (params.bulletElement) + " class=\"" + (params.bulletClass) + "\"></" + (params.bulletElement) + ">";
            }
          }
          $el.html(paginationHTML);
          swiper.pagination.bullets = $el.find(("." + (params.bulletClass)));
        }
        if (params.type === 'fraction') {
          if (params.renderFraction) {
            paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
          } else {
            paginationHTML = "<span class=\"" + (params.currentClass) + "\"></span>"
            + ' / '
            + "<span class=\"" + (params.totalClass) + "\"></span>";
          }
          $el.html(paginationHTML);
        }
        if (params.type === 'progressbar') {
          if (params.renderProgressbar) {
            paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
          } else {
            paginationHTML = "<span class=\"" + (params.progressbarFillClass) + "\"></span>";
          }
          $el.html(paginationHTML);
        }
        if (params.type !== 'custom') {
          swiper.emit('paginationRender', swiper.pagination.$el[0]);
        }
      },
      init: function init() {
        var swiper = this;
        var params = swiper.params.pagination;
        if (!params.el) { return; }

        var $el = $(params.el);
        if ($el.length === 0) { return; }

        if (
          swiper.params.uniqueNavElements
          && typeof params.el === 'string'
          && $el.length > 1
        ) {
          $el = swiper.$el.find(params.el);
        }

        if (params.type === 'bullets' && params.clickable) {
          $el.addClass(params.clickableClass);
        }

        $el.addClass(params.modifierClass + params.type);

        if (params.type === 'bullets' && params.dynamicBullets) {
          $el.addClass(("" + (params.modifierClass) + (params.type) + "-dynamic"));
          swiper.pagination.dynamicBulletIndex = 0;
          if (params.dynamicMainBullets < 1) {
            params.dynamicMainBullets = 1;
          }
        }
        if (params.type === 'progressbar' && params.progressbarOpposite) {
          $el.addClass(params.progressbarOppositeClass);
        }

        if (params.clickable) {
          $el.on('click', ("." + (params.bulletClass)), function onClick(e) {
            e.preventDefault();
            var index = $(this).index() * swiper.params.slidesPerGroup;
            if (swiper.params.loop) { index += swiper.loopedSlides; }
            swiper.slideTo(index);
          });
        }

        Utils.extend(swiper.pagination, {
          $el: $el,
          el: $el[0],
        });
      },
      destroy: function destroy() {
        var swiper = this;
        var params = swiper.params.pagination;
        if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
        var $el = swiper.pagination.$el;

        $el.removeClass(params.hiddenClass);
        $el.removeClass(params.modifierClass + params.type);
        if (swiper.pagination.bullets) { swiper.pagination.bullets.removeClass(params.bulletActiveClass); }
        if (params.clickable) {
          $el.off('click', ("." + (params.bulletClass)));
        }
      },
    };

    var Pagination$1 = {
      name: 'pagination',
      params: {
        pagination: {
          el: null,
          bulletElement: 'span',
          clickable: false,
          hideOnClick: false,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: false,
          type: 'bullets', // 'bullets' or 'progressbar' or 'fraction' or 'custom'
          dynamicBullets: false,
          dynamicMainBullets: 1,
          formatFractionCurrent: function (number) { return number; },
          formatFractionTotal: function (number) { return number; },
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
          modifierClass: 'swiper-pagination-', // NEW
          currentClass: 'swiper-pagination-current',
          totalClass: 'swiper-pagination-total',
          hiddenClass: 'swiper-pagination-hidden',
          progressbarFillClass: 'swiper-pagination-progressbar-fill',
          progressbarOppositeClass: 'swiper-pagination-progressbar-opposite',
          clickableClass: 'swiper-pagination-clickable', // NEW
          lockClass: 'swiper-pagination-lock',
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          pagination: {
            init: Pagination.init.bind(swiper),
            render: Pagination.render.bind(swiper),
            update: Pagination.update.bind(swiper),
            destroy: Pagination.destroy.bind(swiper),
            dynamicBulletIndex: 0,
          },
        });
      },
      on: {
        init: function init() {
          var swiper = this;
          swiper.pagination.init();
          swiper.pagination.render();
          swiper.pagination.update();
        },
        activeIndexChange: function activeIndexChange() {
          var swiper = this;
          if (swiper.params.loop) {
            swiper.pagination.update();
          } else if (typeof swiper.snapIndex === 'undefined') {
            swiper.pagination.update();
          }
        },
        snapIndexChange: function snapIndexChange() {
          var swiper = this;
          if (!swiper.params.loop) {
            swiper.pagination.update();
          }
        },
        slidesLengthChange: function slidesLengthChange() {
          var swiper = this;
          if (swiper.params.loop) {
            swiper.pagination.render();
            swiper.pagination.update();
          }
        },
        snapGridLengthChange: function snapGridLengthChange() {
          var swiper = this;
          if (!swiper.params.loop) {
            swiper.pagination.render();
            swiper.pagination.update();
          }
        },
        destroy: function destroy() {
          var swiper = this;
          swiper.pagination.destroy();
        },
        click: function click(e) {
          var swiper = this;
          if (
            swiper.params.pagination.el
            && swiper.params.pagination.hideOnClick
            && swiper.pagination.$el.length > 0
            && !$(e.target).hasClass(swiper.params.pagination.bulletClass)
          ) {
            var isHidden = swiper.pagination.$el.hasClass(swiper.params.pagination.hiddenClass);
            if (isHidden === true) {
              swiper.emit('paginationShow', swiper);
            } else {
              swiper.emit('paginationHide', swiper);
            }
            swiper.pagination.$el.toggleClass(swiper.params.pagination.hiddenClass);
          }
        },
      },
    };

    var Scrollbar = {
      setTranslate: function setTranslate() {
        var swiper = this;
        if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }
        var scrollbar = swiper.scrollbar;
        var rtl = swiper.rtlTranslate;
        var progress = swiper.progress;
        var dragSize = scrollbar.dragSize;
        var trackSize = scrollbar.trackSize;
        var $dragEl = scrollbar.$dragEl;
        var $el = scrollbar.$el;
        var params = swiper.params.scrollbar;

        var newSize = dragSize;
        var newPos = (trackSize - dragSize) * progress;
        if (rtl) {
          newPos = -newPos;
          if (newPos > 0) {
            newSize = dragSize - newPos;
            newPos = 0;
          } else if (-newPos + dragSize > trackSize) {
            newSize = trackSize + newPos;
          }
        } else if (newPos < 0) {
          newSize = dragSize + newPos;
          newPos = 0;
        } else if (newPos + dragSize > trackSize) {
          newSize = trackSize - newPos;
        }
        if (swiper.isHorizontal()) {
          $dragEl.transform(("translate3d(" + newPos + "px, 0, 0)"));
          $dragEl[0].style.width = newSize + "px";
        } else {
          $dragEl.transform(("translate3d(0px, " + newPos + "px, 0)"));
          $dragEl[0].style.height = newSize + "px";
        }
        if (params.hide) {
          clearTimeout(swiper.scrollbar.timeout);
          $el[0].style.opacity = 1;
          swiper.scrollbar.timeout = setTimeout(function () {
            $el[0].style.opacity = 0;
            $el.transition(400);
          }, 1000);
        }
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }
        swiper.scrollbar.$dragEl.transition(duration);
      },
      updateSize: function updateSize() {
        var swiper = this;
        if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }

        var scrollbar = swiper.scrollbar;
        var $dragEl = scrollbar.$dragEl;
        var $el = scrollbar.$el;

        $dragEl[0].style.width = '';
        $dragEl[0].style.height = '';
        var trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;

        var divider = swiper.size / swiper.virtualSize;
        var moveDivider = divider * (trackSize / swiper.size);
        var dragSize;
        if (swiper.params.scrollbar.dragSize === 'auto') {
          dragSize = trackSize * divider;
        } else {
          dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
        }

        if (swiper.isHorizontal()) {
          $dragEl[0].style.width = dragSize + "px";
        } else {
          $dragEl[0].style.height = dragSize + "px";
        }

        if (divider >= 1) {
          $el[0].style.display = 'none';
        } else {
          $el[0].style.display = '';
        }
        if (swiper.params.scrollbar.hide) {
          $el[0].style.opacity = 0;
        }
        Utils.extend(scrollbar, {
          trackSize: trackSize,
          divider: divider,
          moveDivider: moveDivider,
          dragSize: dragSize,
        });
        scrollbar.$el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](swiper.params.scrollbar.lockClass);
      },
      getPointerPosition: function getPointerPosition(e) {
        var swiper = this;
        if (swiper.isHorizontal()) {
          return ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].clientX : e.clientX);
        }
        return ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].clientY : e.clientY);
      },
      setDragPosition: function setDragPosition(e) {
        var swiper = this;
        var scrollbar = swiper.scrollbar;
        var rtl = swiper.rtlTranslate;
        var $el = scrollbar.$el;
        var dragSize = scrollbar.dragSize;
        var trackSize = scrollbar.trackSize;
        var dragStartPos = scrollbar.dragStartPos;

        var positionRatio;
        positionRatio = ((scrollbar.getPointerPosition(e)) - $el.offset()[swiper.isHorizontal() ? 'left' : 'top']
          - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
        positionRatio = Math.max(Math.min(positionRatio, 1), 0);
        if (rtl) {
          positionRatio = 1 - positionRatio;
        }

        var position = swiper.minTranslate() + ((swiper.maxTranslate() - swiper.minTranslate()) * positionRatio);

        swiper.updateProgress(position);
        swiper.setTranslate(position);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      },
      onDragStart: function onDragStart(e) {
        var swiper = this;
        var params = swiper.params.scrollbar;
        var scrollbar = swiper.scrollbar;
        var $wrapperEl = swiper.$wrapperEl;
        var $el = scrollbar.$el;
        var $dragEl = scrollbar.$dragEl;
        swiper.scrollbar.isTouched = true;
        swiper.scrollbar.dragStartPos = (e.target === $dragEl[0] || e.target === $dragEl)
          ? scrollbar.getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top'] : null;
        e.preventDefault();
        e.stopPropagation();

        $wrapperEl.transition(100);
        $dragEl.transition(100);
        scrollbar.setDragPosition(e);

        clearTimeout(swiper.scrollbar.dragTimeout);

        $el.transition(0);
        if (params.hide) {
          $el.css('opacity', 1);
        }
        if (swiper.params.cssMode) {
          swiper.$wrapperEl.css('scroll-snap-type', 'none');
        }
        swiper.emit('scrollbarDragStart', e);
      },
      onDragMove: function onDragMove(e) {
        var swiper = this;
        var scrollbar = swiper.scrollbar;
        var $wrapperEl = swiper.$wrapperEl;
        var $el = scrollbar.$el;
        var $dragEl = scrollbar.$dragEl;

        if (!swiper.scrollbar.isTouched) { return; }
        if (e.preventDefault) { e.preventDefault(); }
        else { e.returnValue = false; }
        scrollbar.setDragPosition(e);
        $wrapperEl.transition(0);
        $el.transition(0);
        $dragEl.transition(0);
        swiper.emit('scrollbarDragMove', e);
      },
      onDragEnd: function onDragEnd(e) {
        var swiper = this;

        var params = swiper.params.scrollbar;
        var scrollbar = swiper.scrollbar;
        var $wrapperEl = swiper.$wrapperEl;
        var $el = scrollbar.$el;

        if (!swiper.scrollbar.isTouched) { return; }
        swiper.scrollbar.isTouched = false;
        if (swiper.params.cssMode) {
          swiper.$wrapperEl.css('scroll-snap-type', '');
          $wrapperEl.transition('');
        }
        if (params.hide) {
          clearTimeout(swiper.scrollbar.dragTimeout);
          swiper.scrollbar.dragTimeout = Utils.nextTick(function () {
            $el.css('opacity', 0);
            $el.transition(400);
          }, 1000);
        }
        swiper.emit('scrollbarDragEnd', e);
        if (params.snapOnRelease) {
          swiper.slideToClosest();
        }
      },
      enableDraggable: function enableDraggable() {
        var swiper = this;
        if (!swiper.params.scrollbar.el) { return; }
        var scrollbar = swiper.scrollbar;
        var touchEventsTouch = swiper.touchEventsTouch;
        var touchEventsDesktop = swiper.touchEventsDesktop;
        var params = swiper.params;
        var $el = scrollbar.$el;
        var target = $el[0];
        var activeListener = Support.passiveListener && params.passiveListeners ? { passive: false, capture: false } : false;
        var passiveListener = Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
        if (!Support.touch) {
          target.addEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
          doc.addEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
          doc.addEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
        } else {
          target.addEventListener(touchEventsTouch.start, swiper.scrollbar.onDragStart, activeListener);
          target.addEventListener(touchEventsTouch.move, swiper.scrollbar.onDragMove, activeListener);
          target.addEventListener(touchEventsTouch.end, swiper.scrollbar.onDragEnd, passiveListener);
        }
      },
      disableDraggable: function disableDraggable() {
        var swiper = this;
        if (!swiper.params.scrollbar.el) { return; }
        var scrollbar = swiper.scrollbar;
        var touchEventsTouch = swiper.touchEventsTouch;
        var touchEventsDesktop = swiper.touchEventsDesktop;
        var params = swiper.params;
        var $el = scrollbar.$el;
        var target = $el[0];
        var activeListener = Support.passiveListener && params.passiveListeners ? { passive: false, capture: false } : false;
        var passiveListener = Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
        if (!Support.touch) {
          target.removeEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
          doc.removeEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
          doc.removeEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
        } else {
          target.removeEventListener(touchEventsTouch.start, swiper.scrollbar.onDragStart, activeListener);
          target.removeEventListener(touchEventsTouch.move, swiper.scrollbar.onDragMove, activeListener);
          target.removeEventListener(touchEventsTouch.end, swiper.scrollbar.onDragEnd, passiveListener);
        }
      },
      init: function init() {
        var swiper = this;
        if (!swiper.params.scrollbar.el) { return; }
        var scrollbar = swiper.scrollbar;
        var $swiperEl = swiper.$el;
        var params = swiper.params.scrollbar;

        var $el = $(params.el);
        if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && $swiperEl.find(params.el).length === 1) {
          $el = $swiperEl.find(params.el);
        }

        var $dragEl = $el.find(("." + (swiper.params.scrollbar.dragClass)));
        if ($dragEl.length === 0) {
          $dragEl = $(("<div class=\"" + (swiper.params.scrollbar.dragClass) + "\"></div>"));
          $el.append($dragEl);
        }

        Utils.extend(scrollbar, {
          $el: $el,
          el: $el[0],
          $dragEl: $dragEl,
          dragEl: $dragEl[0],
        });

        if (params.draggable) {
          scrollbar.enableDraggable();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.scrollbar.disableDraggable();
      },
    };

    var Scrollbar$1 = {
      name: 'scrollbar',
      params: {
        scrollbar: {
          el: null,
          dragSize: 'auto',
          hide: false,
          draggable: false,
          snapOnRelease: true,
          lockClass: 'swiper-scrollbar-lock',
          dragClass: 'swiper-scrollbar-drag',
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          scrollbar: {
            init: Scrollbar.init.bind(swiper),
            destroy: Scrollbar.destroy.bind(swiper),
            updateSize: Scrollbar.updateSize.bind(swiper),
            setTranslate: Scrollbar.setTranslate.bind(swiper),
            setTransition: Scrollbar.setTransition.bind(swiper),
            enableDraggable: Scrollbar.enableDraggable.bind(swiper),
            disableDraggable: Scrollbar.disableDraggable.bind(swiper),
            setDragPosition: Scrollbar.setDragPosition.bind(swiper),
            getPointerPosition: Scrollbar.getPointerPosition.bind(swiper),
            onDragStart: Scrollbar.onDragStart.bind(swiper),
            onDragMove: Scrollbar.onDragMove.bind(swiper),
            onDragEnd: Scrollbar.onDragEnd.bind(swiper),
            isTouched: false,
            timeout: null,
            dragTimeout: null,
          },
        });
      },
      on: {
        init: function init() {
          var swiper = this;
          swiper.scrollbar.init();
          swiper.scrollbar.updateSize();
          swiper.scrollbar.setTranslate();
        },
        update: function update() {
          var swiper = this;
          swiper.scrollbar.updateSize();
        },
        resize: function resize() {
          var swiper = this;
          swiper.scrollbar.updateSize();
        },
        observerUpdate: function observerUpdate() {
          var swiper = this;
          swiper.scrollbar.updateSize();
        },
        setTranslate: function setTranslate() {
          var swiper = this;
          swiper.scrollbar.setTranslate();
        },
        setTransition: function setTransition(duration) {
          var swiper = this;
          swiper.scrollbar.setTransition(duration);
        },
        destroy: function destroy() {
          var swiper = this;
          swiper.scrollbar.destroy();
        },
      },
    };

    var Parallax = {
      setTransform: function setTransform(el, progress) {
        var swiper = this;
        var rtl = swiper.rtl;

        var $el = $(el);
        var rtlFactor = rtl ? -1 : 1;

        var p = $el.attr('data-swiper-parallax') || '0';
        var x = $el.attr('data-swiper-parallax-x');
        var y = $el.attr('data-swiper-parallax-y');
        var scale = $el.attr('data-swiper-parallax-scale');
        var opacity = $el.attr('data-swiper-parallax-opacity');

        if (x || y) {
          x = x || '0';
          y = y || '0';
        } else if (swiper.isHorizontal()) {
          x = p;
          y = '0';
        } else {
          y = p;
          x = '0';
        }

        if ((x).indexOf('%') >= 0) {
          x = (parseInt(x, 10) * progress * rtlFactor) + "%";
        } else {
          x = (x * progress * rtlFactor) + "px";
        }
        if ((y).indexOf('%') >= 0) {
          y = (parseInt(y, 10) * progress) + "%";
        } else {
          y = (y * progress) + "px";
        }

        if (typeof opacity !== 'undefined' && opacity !== null) {
          var currentOpacity = opacity - ((opacity - 1) * (1 - Math.abs(progress)));
          $el[0].style.opacity = currentOpacity;
        }
        if (typeof scale === 'undefined' || scale === null) {
          $el.transform(("translate3d(" + x + ", " + y + ", 0px)"));
        } else {
          var currentScale = scale - ((scale - 1) * (1 - Math.abs(progress)));
          $el.transform(("translate3d(" + x + ", " + y + ", 0px) scale(" + currentScale + ")"));
        }
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        var $el = swiper.$el;
        var slides = swiper.slides;
        var progress = swiper.progress;
        var snapGrid = swiper.snapGrid;
        $el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]')
          .each(function (index, el) {
            swiper.parallax.setTransform(el, progress);
          });
        slides.each(function (slideIndex, slideEl) {
          var slideProgress = slideEl.progress;
          if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
            slideProgress += Math.ceil(slideIndex / 2) - (progress * (snapGrid.length - 1));
          }
          slideProgress = Math.min(Math.max(slideProgress, -1), 1);
          $(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]')
            .each(function (index, el) {
              swiper.parallax.setTransform(el, slideProgress);
            });
        });
      },
      setTransition: function setTransition(duration) {
        if ( duration === void 0 ) duration = this.params.speed;

        var swiper = this;
        var $el = swiper.$el;
        $el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]')
          .each(function (index, parallaxEl) {
            var $parallaxEl = $(parallaxEl);
            var parallaxDuration = parseInt($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;
            if (duration === 0) { parallaxDuration = 0; }
            $parallaxEl.transition(parallaxDuration);
          });
      },
    };

    var Parallax$1 = {
      name: 'parallax',
      params: {
        parallax: {
          enabled: false,
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          parallax: {
            setTransform: Parallax.setTransform.bind(swiper),
            setTranslate: Parallax.setTranslate.bind(swiper),
            setTransition: Parallax.setTransition.bind(swiper),
          },
        });
      },
      on: {
        beforeInit: function beforeInit() {
          var swiper = this;
          if (!swiper.params.parallax.enabled) { return; }
          swiper.params.watchSlidesProgress = true;
          swiper.originalParams.watchSlidesProgress = true;
        },
        init: function init() {
          var swiper = this;
          if (!swiper.params.parallax.enabled) { return; }
          swiper.parallax.setTranslate();
        },
        setTranslate: function setTranslate() {
          var swiper = this;
          if (!swiper.params.parallax.enabled) { return; }
          swiper.parallax.setTranslate();
        },
        setTransition: function setTransition(duration) {
          var swiper = this;
          if (!swiper.params.parallax.enabled) { return; }
          swiper.parallax.setTransition(duration);
        },
      },
    };

    var Zoom = {
      // Calc Scale From Multi-touches
      getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
        if (e.targetTouches.length < 2) { return 1; }
        var x1 = e.targetTouches[0].pageX;
        var y1 = e.targetTouches[0].pageY;
        var x2 = e.targetTouches[1].pageX;
        var y2 = e.targetTouches[1].pageY;
        var distance = Math.sqrt((Math.pow( (x2 - x1), 2 )) + (Math.pow( (y2 - y1), 2 )));
        return distance;
      },
      // Events
      onGestureStart: function onGestureStart(e) {
        var swiper = this;
        var params = swiper.params.zoom;
        var zoom = swiper.zoom;
        var gesture = zoom.gesture;
        zoom.fakeGestureTouched = false;
        zoom.fakeGestureMoved = false;
        if (!Support.gestures) {
          if (e.type !== 'touchstart' || (e.type === 'touchstart' && e.targetTouches.length < 2)) {
            return;
          }
          zoom.fakeGestureTouched = true;
          gesture.scaleStart = Zoom.getDistanceBetweenTouches(e);
        }
        if (!gesture.$slideEl || !gesture.$slideEl.length) {
          gesture.$slideEl = $(e.target).closest(("." + (swiper.params.slideClass)));
          if (gesture.$slideEl.length === 0) { gesture.$slideEl = swiper.slides.eq(swiper.activeIndex); }
          gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas, picture, .swiper-zoom-target');
          gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
          gesture.maxRatio = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
          if (gesture.$imageWrapEl.length === 0) {
            gesture.$imageEl = undefined;
            return;
          }
        }
        if (gesture.$imageEl) {
          gesture.$imageEl.transition(0);
        }
        swiper.zoom.isScaling = true;
      },
      onGestureChange: function onGestureChange(e) {
        var swiper = this;
        var params = swiper.params.zoom;
        var zoom = swiper.zoom;
        var gesture = zoom.gesture;
        if (!Support.gestures) {
          if (e.type !== 'touchmove' || (e.type === 'touchmove' && e.targetTouches.length < 2)) {
            return;
          }
          zoom.fakeGestureMoved = true;
          gesture.scaleMove = Zoom.getDistanceBetweenTouches(e);
        }
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
        if (Support.gestures) {
          zoom.scale = e.scale * zoom.currentScale;
        } else {
          zoom.scale = (gesture.scaleMove / gesture.scaleStart) * zoom.currentScale;
        }
        if (zoom.scale > gesture.maxRatio) {
          zoom.scale = (gesture.maxRatio - 1) + (Math.pow( ((zoom.scale - gesture.maxRatio) + 1), 0.5 ));
        }
        if (zoom.scale < params.minRatio) {
          zoom.scale = (params.minRatio + 1) - (Math.pow( ((params.minRatio - zoom.scale) + 1), 0.5 ));
        }
        gesture.$imageEl.transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
      },
      onGestureEnd: function onGestureEnd(e) {
        var swiper = this;
        var params = swiper.params.zoom;
        var zoom = swiper.zoom;
        var gesture = zoom.gesture;
        if (!Support.gestures) {
          if (!zoom.fakeGestureTouched || !zoom.fakeGestureMoved) {
            return;
          }
          if (e.type !== 'touchend' || (e.type === 'touchend' && e.changedTouches.length < 2 && !Device.android)) {
            return;
          }
          zoom.fakeGestureTouched = false;
          zoom.fakeGestureMoved = false;
        }
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
        zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
        gesture.$imageEl.transition(swiper.params.speed).transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
        zoom.currentScale = zoom.scale;
        zoom.isScaling = false;
        if (zoom.scale === 1) { gesture.$slideEl = undefined; }
      },
      onTouchStart: function onTouchStart(e) {
        var swiper = this;
        var zoom = swiper.zoom;
        var gesture = zoom.gesture;
        var image = zoom.image;
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
        if (image.isTouched) { return; }
        if (Device.android && e.cancelable) { e.preventDefault(); }
        image.isTouched = true;
        image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      },
      onTouchMove: function onTouchMove(e) {
        var swiper = this;
        var zoom = swiper.zoom;
        var gesture = zoom.gesture;
        var image = zoom.image;
        var velocity = zoom.velocity;
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
        swiper.allowClick = false;
        if (!image.isTouched || !gesture.$slideEl) { return; }

        if (!image.isMoved) {
          image.width = gesture.$imageEl[0].offsetWidth;
          image.height = gesture.$imageEl[0].offsetHeight;
          image.startX = Utils.getTranslate(gesture.$imageWrapEl[0], 'x') || 0;
          image.startY = Utils.getTranslate(gesture.$imageWrapEl[0], 'y') || 0;
          gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
          gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
          gesture.$imageWrapEl.transition(0);
          if (swiper.rtl) {
            image.startX = -image.startX;
            image.startY = -image.startY;
          }
        }
        // Define if we need image drag
        var scaledWidth = image.width * zoom.scale;
        var scaledHeight = image.height * zoom.scale;

        if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) { return; }

        image.minX = Math.min(((gesture.slideWidth / 2) - (scaledWidth / 2)), 0);
        image.maxX = -image.minX;
        image.minY = Math.min(((gesture.slideHeight / 2) - (scaledHeight / 2)), 0);
        image.maxY = -image.minY;

        image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

        if (!image.isMoved && !zoom.isScaling) {
          if (
            swiper.isHorizontal()
            && (
              (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x)
              || (Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)
            )
          ) {
            image.isTouched = false;
            return;
          } if (
            !swiper.isHorizontal()
            && (
              (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y)
              || (Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)
            )
          ) {
            image.isTouched = false;
            return;
          }
        }
        if (e.cancelable) {
          e.preventDefault();
        }
        e.stopPropagation();

        image.isMoved = true;
        image.currentX = (image.touchesCurrent.x - image.touchesStart.x) + image.startX;
        image.currentY = (image.touchesCurrent.y - image.touchesStart.y) + image.startY;

        if (image.currentX < image.minX) {
          image.currentX = (image.minX + 1) - (Math.pow( ((image.minX - image.currentX) + 1), 0.8 ));
        }
        if (image.currentX > image.maxX) {
          image.currentX = (image.maxX - 1) + (Math.pow( ((image.currentX - image.maxX) + 1), 0.8 ));
        }

        if (image.currentY < image.minY) {
          image.currentY = (image.minY + 1) - (Math.pow( ((image.minY - image.currentY) + 1), 0.8 ));
        }
        if (image.currentY > image.maxY) {
          image.currentY = (image.maxY - 1) + (Math.pow( ((image.currentY - image.maxY) + 1), 0.8 ));
        }

        // Velocity
        if (!velocity.prevPositionX) { velocity.prevPositionX = image.touchesCurrent.x; }
        if (!velocity.prevPositionY) { velocity.prevPositionY = image.touchesCurrent.y; }
        if (!velocity.prevTime) { velocity.prevTime = Date.now(); }
        velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
        velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
        if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) { velocity.x = 0; }
        if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) { velocity.y = 0; }
        velocity.prevPositionX = image.touchesCurrent.x;
        velocity.prevPositionY = image.touchesCurrent.y;
        velocity.prevTime = Date.now();

        gesture.$imageWrapEl.transform(("translate3d(" + (image.currentX) + "px, " + (image.currentY) + "px,0)"));
      },
      onTouchEnd: function onTouchEnd() {
        var swiper = this;
        var zoom = swiper.zoom;
        var gesture = zoom.gesture;
        var image = zoom.image;
        var velocity = zoom.velocity;
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
        if (!image.isTouched || !image.isMoved) {
          image.isTouched = false;
          image.isMoved = false;
          return;
        }
        image.isTouched = false;
        image.isMoved = false;
        var momentumDurationX = 300;
        var momentumDurationY = 300;
        var momentumDistanceX = velocity.x * momentumDurationX;
        var newPositionX = image.currentX + momentumDistanceX;
        var momentumDistanceY = velocity.y * momentumDurationY;
        var newPositionY = image.currentY + momentumDistanceY;

        // Fix duration
        if (velocity.x !== 0) { momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x); }
        if (velocity.y !== 0) { momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y); }
        var momentumDuration = Math.max(momentumDurationX, momentumDurationY);

        image.currentX = newPositionX;
        image.currentY = newPositionY;

        // Define if we need image drag
        var scaledWidth = image.width * zoom.scale;
        var scaledHeight = image.height * zoom.scale;
        image.minX = Math.min(((gesture.slideWidth / 2) - (scaledWidth / 2)), 0);
        image.maxX = -image.minX;
        image.minY = Math.min(((gesture.slideHeight / 2) - (scaledHeight / 2)), 0);
        image.maxY = -image.minY;
        image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
        image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);

        gesture.$imageWrapEl.transition(momentumDuration).transform(("translate3d(" + (image.currentX) + "px, " + (image.currentY) + "px,0)"));
      },
      onTransitionEnd: function onTransitionEnd() {
        var swiper = this;
        var zoom = swiper.zoom;
        var gesture = zoom.gesture;
        if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
          if (gesture.$imageEl) {
            gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');
          }
          if (gesture.$imageWrapEl) {
            gesture.$imageWrapEl.transform('translate3d(0,0,0)');
          }

          zoom.scale = 1;
          zoom.currentScale = 1;

          gesture.$slideEl = undefined;
          gesture.$imageEl = undefined;
          gesture.$imageWrapEl = undefined;
        }
      },
      // Toggle Zoom
      toggle: function toggle(e) {
        var swiper = this;
        var zoom = swiper.zoom;

        if (zoom.scale && zoom.scale !== 1) {
          // Zoom Out
          zoom.out();
        } else {
          // Zoom In
          zoom.in(e);
        }
      },
      in: function in$1(e) {
        var swiper = this;

        var zoom = swiper.zoom;
        var params = swiper.params.zoom;
        var gesture = zoom.gesture;
        var image = zoom.image;

        if (!gesture.$slideEl) {
          if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
            gesture.$slideEl = swiper.$wrapperEl.children(("." + (swiper.params.slideActiveClass)));
          } else {
            gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
          }
          gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas, picture, .swiper-zoom-target');
          gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
        }
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }

        gesture.$slideEl.addClass(("" + (params.zoomedSlideClass)));

        var touchX;
        var touchY;
        var offsetX;
        var offsetY;
        var diffX;
        var diffY;
        var translateX;
        var translateY;
        var imageWidth;
        var imageHeight;
        var scaledWidth;
        var scaledHeight;
        var translateMinX;
        var translateMinY;
        var translateMaxX;
        var translateMaxY;
        var slideWidth;
        var slideHeight;

        if (typeof image.touchesStart.x === 'undefined' && e) {
          touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
          touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
        } else {
          touchX = image.touchesStart.x;
          touchY = image.touchesStart.y;
        }

        zoom.scale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
        zoom.currentScale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
        if (e) {
          slideWidth = gesture.$slideEl[0].offsetWidth;
          slideHeight = gesture.$slideEl[0].offsetHeight;
          offsetX = gesture.$slideEl.offset().left;
          offsetY = gesture.$slideEl.offset().top;
          diffX = (offsetX + (slideWidth / 2)) - touchX;
          diffY = (offsetY + (slideHeight / 2)) - touchY;

          imageWidth = gesture.$imageEl[0].offsetWidth;
          imageHeight = gesture.$imageEl[0].offsetHeight;
          scaledWidth = imageWidth * zoom.scale;
          scaledHeight = imageHeight * zoom.scale;

          translateMinX = Math.min(((slideWidth / 2) - (scaledWidth / 2)), 0);
          translateMinY = Math.min(((slideHeight / 2) - (scaledHeight / 2)), 0);
          translateMaxX = -translateMinX;
          translateMaxY = -translateMinY;

          translateX = diffX * zoom.scale;
          translateY = diffY * zoom.scale;

          if (translateX < translateMinX) {
            translateX = translateMinX;
          }
          if (translateX > translateMaxX) {
            translateX = translateMaxX;
          }

          if (translateY < translateMinY) {
            translateY = translateMinY;
          }
          if (translateY > translateMaxY) {
            translateY = translateMaxY;
          }
        } else {
          translateX = 0;
          translateY = 0;
        }
        gesture.$imageWrapEl.transition(300).transform(("translate3d(" + translateX + "px, " + translateY + "px,0)"));
        gesture.$imageEl.transition(300).transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
      },
      out: function out() {
        var swiper = this;

        var zoom = swiper.zoom;
        var params = swiper.params.zoom;
        var gesture = zoom.gesture;

        if (!gesture.$slideEl) {
          if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
            gesture.$slideEl = swiper.$wrapperEl.children(("." + (swiper.params.slideActiveClass)));
          } else {
            gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
          }
          gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas, picture, .swiper-zoom-target');
          gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
        }
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }

        zoom.scale = 1;
        zoom.currentScale = 1;
        gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
        gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
        gesture.$slideEl.removeClass(("" + (params.zoomedSlideClass)));
        gesture.$slideEl = undefined;
      },
      // Attach/Detach Events
      enable: function enable() {
        var swiper = this;
        var zoom = swiper.zoom;
        if (zoom.enabled) { return; }
        zoom.enabled = true;

        var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;
        var activeListenerWithCapture = Support.passiveListener ? { passive: false, capture: true } : true;

        var slideSelector = "." + (swiper.params.slideClass);

        // Scale image
        if (Support.gestures) {
          swiper.$wrapperEl.on('gesturestart', slideSelector, zoom.onGestureStart, passiveListener);
          swiper.$wrapperEl.on('gesturechange', slideSelector, zoom.onGestureChange, passiveListener);
          swiper.$wrapperEl.on('gestureend', slideSelector, zoom.onGestureEnd, passiveListener);
        } else if (swiper.touchEvents.start === 'touchstart') {
          swiper.$wrapperEl.on(swiper.touchEvents.start, slideSelector, zoom.onGestureStart, passiveListener);
          swiper.$wrapperEl.on(swiper.touchEvents.move, slideSelector, zoom.onGestureChange, activeListenerWithCapture);
          swiper.$wrapperEl.on(swiper.touchEvents.end, slideSelector, zoom.onGestureEnd, passiveListener);
          if (swiper.touchEvents.cancel) {
            swiper.$wrapperEl.on(swiper.touchEvents.cancel, slideSelector, zoom.onGestureEnd, passiveListener);
          }
        }

        // Move image
        swiper.$wrapperEl.on(swiper.touchEvents.move, ("." + (swiper.params.zoom.containerClass)), zoom.onTouchMove, activeListenerWithCapture);
      },
      disable: function disable() {
        var swiper = this;
        var zoom = swiper.zoom;
        if (!zoom.enabled) { return; }

        swiper.zoom.enabled = false;

        var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;
        var activeListenerWithCapture = Support.passiveListener ? { passive: false, capture: true } : true;

        var slideSelector = "." + (swiper.params.slideClass);

        // Scale image
        if (Support.gestures) {
          swiper.$wrapperEl.off('gesturestart', slideSelector, zoom.onGestureStart, passiveListener);
          swiper.$wrapperEl.off('gesturechange', slideSelector, zoom.onGestureChange, passiveListener);
          swiper.$wrapperEl.off('gestureend', slideSelector, zoom.onGestureEnd, passiveListener);
        } else if (swiper.touchEvents.start === 'touchstart') {
          swiper.$wrapperEl.off(swiper.touchEvents.start, slideSelector, zoom.onGestureStart, passiveListener);
          swiper.$wrapperEl.off(swiper.touchEvents.move, slideSelector, zoom.onGestureChange, activeListenerWithCapture);
          swiper.$wrapperEl.off(swiper.touchEvents.end, slideSelector, zoom.onGestureEnd, passiveListener);
          if (swiper.touchEvents.cancel) {
            swiper.$wrapperEl.off(swiper.touchEvents.cancel, slideSelector, zoom.onGestureEnd, passiveListener);
          }
        }

        // Move image
        swiper.$wrapperEl.off(swiper.touchEvents.move, ("." + (swiper.params.zoom.containerClass)), zoom.onTouchMove, activeListenerWithCapture);
      },
    };

    var Zoom$1 = {
      name: 'zoom',
      params: {
        zoom: {
          enabled: false,
          maxRatio: 3,
          minRatio: 1,
          toggle: true,
          containerClass: 'swiper-zoom-container',
          zoomedSlideClass: 'swiper-slide-zoomed',
        },
      },
      create: function create() {
        var swiper = this;
        var zoom = {
          enabled: false,
          scale: 1,
          currentScale: 1,
          isScaling: false,
          gesture: {
            $slideEl: undefined,
            slideWidth: undefined,
            slideHeight: undefined,
            $imageEl: undefined,
            $imageWrapEl: undefined,
            maxRatio: 3,
          },
          image: {
            isTouched: undefined,
            isMoved: undefined,
            currentX: undefined,
            currentY: undefined,
            minX: undefined,
            minY: undefined,
            maxX: undefined,
            maxY: undefined,
            width: undefined,
            height: undefined,
            startX: undefined,
            startY: undefined,
            touchesStart: {},
            touchesCurrent: {},
          },
          velocity: {
            x: undefined,
            y: undefined,
            prevPositionX: undefined,
            prevPositionY: undefined,
            prevTime: undefined,
          },
        };

        ('onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out').split(' ').forEach(function (methodName) {
          zoom[methodName] = Zoom[methodName].bind(swiper);
        });
        Utils.extend(swiper, {
          zoom: zoom,
        });

        var scale = 1;
        Object.defineProperty(swiper.zoom, 'scale', {
          get: function get() {
            return scale;
          },
          set: function set(value) {
            if (scale !== value) {
              var imageEl = swiper.zoom.gesture.$imageEl ? swiper.zoom.gesture.$imageEl[0] : undefined;
              var slideEl = swiper.zoom.gesture.$slideEl ? swiper.zoom.gesture.$slideEl[0] : undefined;
              swiper.emit('zoomChange', value, imageEl, slideEl);
            }
            scale = value;
          },
        });
      },
      on: {
        init: function init() {
          var swiper = this;
          if (swiper.params.zoom.enabled) {
            swiper.zoom.enable();
          }
        },
        destroy: function destroy() {
          var swiper = this;
          swiper.zoom.disable();
        },
        touchStart: function touchStart(e) {
          var swiper = this;
          if (!swiper.zoom.enabled) { return; }
          swiper.zoom.onTouchStart(e);
        },
        touchEnd: function touchEnd(e) {
          var swiper = this;
          if (!swiper.zoom.enabled) { return; }
          swiper.zoom.onTouchEnd(e);
        },
        doubleTap: function doubleTap(e) {
          var swiper = this;
          if (swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
            swiper.zoom.toggle(e);
          }
        },
        transitionEnd: function transitionEnd() {
          var swiper = this;
          if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
            swiper.zoom.onTransitionEnd();
          }
        },
        slideChange: function slideChange() {
          var swiper = this;
          if (swiper.zoom.enabled && swiper.params.zoom.enabled && swiper.params.cssMode) {
            swiper.zoom.onTransitionEnd();
          }
        },
      },
    };

    var Lazy = {
      loadInSlide: function loadInSlide(index, loadInDuplicate) {
        if ( loadInDuplicate === void 0 ) loadInDuplicate = true;

        var swiper = this;
        var params = swiper.params.lazy;
        if (typeof index === 'undefined') { return; }
        if (swiper.slides.length === 0) { return; }
        var isVirtual = swiper.virtual && swiper.params.virtual.enabled;

        var $slideEl = isVirtual
          ? swiper.$wrapperEl.children(("." + (swiper.params.slideClass) + "[data-swiper-slide-index=\"" + index + "\"]"))
          : swiper.slides.eq(index);

        var $images = $slideEl.find(("." + (params.elementClass) + ":not(." + (params.loadedClass) + "):not(." + (params.loadingClass) + ")"));
        if ($slideEl.hasClass(params.elementClass) && !$slideEl.hasClass(params.loadedClass) && !$slideEl.hasClass(params.loadingClass)) {
          $images = $images.add($slideEl[0]);
        }
        if ($images.length === 0) { return; }

        $images.each(function (imageIndex, imageEl) {
          var $imageEl = $(imageEl);
          $imageEl.addClass(params.loadingClass);

          var background = $imageEl.attr('data-background');
          var src = $imageEl.attr('data-src');
          var srcset = $imageEl.attr('data-srcset');
          var sizes = $imageEl.attr('data-sizes');
          var $pictureEl = $imageEl.parent('picture');

          swiper.loadImage($imageEl[0], (src || background), srcset, sizes, false, function () {
            if (typeof swiper === 'undefined' || swiper === null || !swiper || (swiper && !swiper.params) || swiper.destroyed) { return; }
            if (background) {
              $imageEl.css('background-image', ("url(\"" + background + "\")"));
              $imageEl.removeAttr('data-background');
            } else {
              if (srcset) {
                $imageEl.attr('srcset', srcset);
                $imageEl.removeAttr('data-srcset');
              }
              if (sizes) {
                $imageEl.attr('sizes', sizes);
                $imageEl.removeAttr('data-sizes');
              }
              if ($pictureEl.length) {
                $pictureEl.children('source').each(function (sourceIndex, sourceEl) {
                  var $source = $(sourceEl);

                  if ($source.attr('data-srcset')) {
                    $source.attr('srcset', $source.attr('data-srcset'));
                    $source.removeAttr('data-srcset');
                  }
                });
              }
              if (src) {
                $imageEl.attr('src', src);
                $imageEl.removeAttr('data-src');
              }
            }

            $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
            $slideEl.find(("." + (params.preloaderClass))).remove();
            if (swiper.params.loop && loadInDuplicate) {
              var slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');
              if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
                var originalSlide = swiper.$wrapperEl.children(("[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]:not(." + (swiper.params.slideDuplicateClass) + ")"));
                swiper.lazy.loadInSlide(originalSlide.index(), false);
              } else {
                var duplicatedSlide = swiper.$wrapperEl.children(("." + (swiper.params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]"));
                swiper.lazy.loadInSlide(duplicatedSlide.index(), false);
              }
            }
            swiper.emit('lazyImageReady', $slideEl[0], $imageEl[0]);
            if (swiper.params.autoHeight) {
              swiper.updateAutoHeight();
            }
          });

          swiper.emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
        });
      },
      load: function load() {
        var swiper = this;
        var $wrapperEl = swiper.$wrapperEl;
        var swiperParams = swiper.params;
        var slides = swiper.slides;
        var activeIndex = swiper.activeIndex;
        var isVirtual = swiper.virtual && swiperParams.virtual.enabled;
        var params = swiperParams.lazy;

        var slidesPerView = swiperParams.slidesPerView;
        if (slidesPerView === 'auto') {
          slidesPerView = 0;
        }

        function slideExist(index) {
          if (isVirtual) {
            if ($wrapperEl.children(("." + (swiperParams.slideClass) + "[data-swiper-slide-index=\"" + index + "\"]")).length) {
              return true;
            }
          } else if (slides[index]) { return true; }
          return false;
        }

        function slideIndex(slideEl) {
          if (isVirtual) {
            return $(slideEl).attr('data-swiper-slide-index');
          }
          return $(slideEl).index();
        }

        if (!swiper.lazy.initialImageLoaded) { swiper.lazy.initialImageLoaded = true; }
        if (swiper.params.watchSlidesVisibility) {
          $wrapperEl.children(("." + (swiperParams.slideVisibleClass))).each(function (elIndex, slideEl) {
            var index = isVirtual ? $(slideEl).attr('data-swiper-slide-index') : $(slideEl).index();
            swiper.lazy.loadInSlide(index);
          });
        } else if (slidesPerView > 1) {
          for (var i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
            if (slideExist(i)) { swiper.lazy.loadInSlide(i); }
          }
        } else {
          swiper.lazy.loadInSlide(activeIndex);
        }
        if (params.loadPrevNext) {
          if (slidesPerView > 1 || (params.loadPrevNextAmount && params.loadPrevNextAmount > 1)) {
            var amount = params.loadPrevNextAmount;
            var spv = slidesPerView;
            var maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
            var minIndex = Math.max(activeIndex - Math.max(spv, amount), 0);
            // Next Slides
            for (var i$1 = activeIndex + slidesPerView; i$1 < maxIndex; i$1 += 1) {
              if (slideExist(i$1)) { swiper.lazy.loadInSlide(i$1); }
            }
            // Prev Slides
            for (var i$2 = minIndex; i$2 < activeIndex; i$2 += 1) {
              if (slideExist(i$2)) { swiper.lazy.loadInSlide(i$2); }
            }
          } else {
            var nextSlide = $wrapperEl.children(("." + (swiperParams.slideNextClass)));
            if (nextSlide.length > 0) { swiper.lazy.loadInSlide(slideIndex(nextSlide)); }

            var prevSlide = $wrapperEl.children(("." + (swiperParams.slidePrevClass)));
            if (prevSlide.length > 0) { swiper.lazy.loadInSlide(slideIndex(prevSlide)); }
          }
        }
      },
    };

    var Lazy$1 = {
      name: 'lazy',
      params: {
        lazy: {
          enabled: false,
          loadPrevNext: false,
          loadPrevNextAmount: 1,
          loadOnTransitionStart: false,

          elementClass: 'swiper-lazy',
          loadingClass: 'swiper-lazy-loading',
          loadedClass: 'swiper-lazy-loaded',
          preloaderClass: 'swiper-lazy-preloader',
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          lazy: {
            initialImageLoaded: false,
            load: Lazy.load.bind(swiper),
            loadInSlide: Lazy.loadInSlide.bind(swiper),
          },
        });
      },
      on: {
        beforeInit: function beforeInit() {
          var swiper = this;
          if (swiper.params.lazy.enabled && swiper.params.preloadImages) {
            swiper.params.preloadImages = false;
          }
        },
        init: function init() {
          var swiper = this;
          if (swiper.params.lazy.enabled && !swiper.params.loop && swiper.params.initialSlide === 0) {
            swiper.lazy.load();
          }
        },
        scroll: function scroll() {
          var swiper = this;
          if (swiper.params.freeMode && !swiper.params.freeModeSticky) {
            swiper.lazy.load();
          }
        },
        resize: function resize() {
          var swiper = this;
          if (swiper.params.lazy.enabled) {
            swiper.lazy.load();
          }
        },
        scrollbarDragMove: function scrollbarDragMove() {
          var swiper = this;
          if (swiper.params.lazy.enabled) {
            swiper.lazy.load();
          }
        },
        transitionStart: function transitionStart() {
          var swiper = this;
          if (swiper.params.lazy.enabled) {
            if (swiper.params.lazy.loadOnTransitionStart || (!swiper.params.lazy.loadOnTransitionStart && !swiper.lazy.initialImageLoaded)) {
              swiper.lazy.load();
            }
          }
        },
        transitionEnd: function transitionEnd() {
          var swiper = this;
          if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
            swiper.lazy.load();
          }
        },
        slideChange: function slideChange() {
          var swiper = this;
          if (swiper.params.lazy.enabled && swiper.params.cssMode) {
            swiper.lazy.load();
          }
        },
      },
    };

    /* eslint no-bitwise: ["error", { "allow": [">>"] }] */

    var Controller = {
      LinearSpline: function LinearSpline(x, y) {
        var binarySearch = (function search() {
          var maxIndex;
          var minIndex;
          var guess;
          return function (array, val) {
            minIndex = -1;
            maxIndex = array.length;
            while (maxIndex - minIndex > 1) {
              guess = maxIndex + minIndex >> 1;
              if (array[guess] <= val) {
                minIndex = guess;
              } else {
                maxIndex = guess;
              }
            }
            return maxIndex;
          };
        }());
        this.x = x;
        this.y = y;
        this.lastIndex = x.length - 1;
        // Given an x value (x2), return the expected y2 value:
        // (x1,y1) is the known point before given value,
        // (x3,y3) is the known point after given value.
        var i1;
        var i3;

        this.interpolate = function interpolate(x2) {
          if (!x2) { return 0; }

          // Get the indexes of x1 and x3 (the array indexes before and after given x2):
          i3 = binarySearch(this.x, x2);
          i1 = i3 - 1;

          // We have our indexes i1 & i3, so we can calculate already:
          // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
          return (((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1])) + this.y[i1];
        };
        return this;
      },
      // xxx: for now i will just save one spline function to to
      getInterpolateFunction: function getInterpolateFunction(c) {
        var swiper = this;
        if (!swiper.controller.spline) {
          swiper.controller.spline = swiper.params.loop
            ? new Controller.LinearSpline(swiper.slidesGrid, c.slidesGrid)
            : new Controller.LinearSpline(swiper.snapGrid, c.snapGrid);
        }
      },
      setTranslate: function setTranslate(setTranslate$1, byController) {
        var swiper = this;
        var controlled = swiper.controller.control;
        var multiplier;
        var controlledTranslate;
        function setControlledTranslate(c) {
          // this will create an Interpolate function based on the snapGrids
          // x is the Grid of the scrolled scroller and y will be the controlled scroller
          // it makes sense to create this only once and recall it for the interpolation
          // the function does a lot of value caching for performance
          var translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
          if (swiper.params.controller.by === 'slide') {
            swiper.controller.getInterpolateFunction(c);
            // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
            // but it did not work out
            controlledTranslate = -swiper.controller.spline.interpolate(-translate);
          }

          if (!controlledTranslate || swiper.params.controller.by === 'container') {
            multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
            controlledTranslate = ((translate - swiper.minTranslate()) * multiplier) + c.minTranslate();
          }

          if (swiper.params.controller.inverse) {
            controlledTranslate = c.maxTranslate() - controlledTranslate;
          }
          c.updateProgress(controlledTranslate);
          c.setTranslate(controlledTranslate, swiper);
          c.updateActiveIndex();
          c.updateSlidesClasses();
        }
        if (Array.isArray(controlled)) {
          for (var i = 0; i < controlled.length; i += 1) {
            if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
              setControlledTranslate(controlled[i]);
            }
          }
        } else if (controlled instanceof Swiper && byController !== controlled) {
          setControlledTranslate(controlled);
        }
      },
      setTransition: function setTransition(duration, byController) {
        var swiper = this;
        var controlled = swiper.controller.control;
        var i;
        function setControlledTransition(c) {
          c.setTransition(duration, swiper);
          if (duration !== 0) {
            c.transitionStart();
            if (c.params.autoHeight) {
              Utils.nextTick(function () {
                c.updateAutoHeight();
              });
            }
            c.$wrapperEl.transitionEnd(function () {
              if (!controlled) { return; }
              if (c.params.loop && swiper.params.controller.by === 'slide') {
                c.loopFix();
              }
              c.transitionEnd();
            });
          }
        }
        if (Array.isArray(controlled)) {
          for (i = 0; i < controlled.length; i += 1) {
            if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
              setControlledTransition(controlled[i]);
            }
          }
        } else if (controlled instanceof Swiper && byController !== controlled) {
          setControlledTransition(controlled);
        }
      },
    };
    var Controller$1 = {
      name: 'controller',
      params: {
        controller: {
          control: undefined,
          inverse: false,
          by: 'slide', // or 'container'
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          controller: {
            control: swiper.params.controller.control,
            getInterpolateFunction: Controller.getInterpolateFunction.bind(swiper),
            setTranslate: Controller.setTranslate.bind(swiper),
            setTransition: Controller.setTransition.bind(swiper),
          },
        });
      },
      on: {
        update: function update() {
          var swiper = this;
          if (!swiper.controller.control) { return; }
          if (swiper.controller.spline) {
            swiper.controller.spline = undefined;
            delete swiper.controller.spline;
          }
        },
        resize: function resize() {
          var swiper = this;
          if (!swiper.controller.control) { return; }
          if (swiper.controller.spline) {
            swiper.controller.spline = undefined;
            delete swiper.controller.spline;
          }
        },
        observerUpdate: function observerUpdate() {
          var swiper = this;
          if (!swiper.controller.control) { return; }
          if (swiper.controller.spline) {
            swiper.controller.spline = undefined;
            delete swiper.controller.spline;
          }
        },
        setTranslate: function setTranslate(translate, byController) {
          var swiper = this;
          if (!swiper.controller.control) { return; }
          swiper.controller.setTranslate(translate, byController);
        },
        setTransition: function setTransition(duration, byController) {
          var swiper = this;
          if (!swiper.controller.control) { return; }
          swiper.controller.setTransition(duration, byController);
        },
      },
    };

    var a11y = {
      makeElFocusable: function makeElFocusable($el) {
        $el.attr('tabIndex', '0');
        return $el;
      },
      makeElNotFocusable: function makeElNotFocusable($el) {
        $el.attr('tabIndex', '-1');
        return $el;
      },
      addElRole: function addElRole($el, role) {
        $el.attr('role', role);
        return $el;
      },
      addElLabel: function addElLabel($el, label) {
        $el.attr('aria-label', label);
        return $el;
      },
      disableEl: function disableEl($el) {
        $el.attr('aria-disabled', true);
        return $el;
      },
      enableEl: function enableEl($el) {
        $el.attr('aria-disabled', false);
        return $el;
      },
      onEnterKey: function onEnterKey(e) {
        var swiper = this;
        var params = swiper.params.a11y;
        if (e.keyCode !== 13) { return; }
        var $targetEl = $(e.target);
        if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {
          if (!(swiper.isEnd && !swiper.params.loop)) {
            swiper.slideNext();
          }
          if (swiper.isEnd) {
            swiper.a11y.notify(params.lastSlideMessage);
          } else {
            swiper.a11y.notify(params.nextSlideMessage);
          }
        }
        if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {
          if (!(swiper.isBeginning && !swiper.params.loop)) {
            swiper.slidePrev();
          }
          if (swiper.isBeginning) {
            swiper.a11y.notify(params.firstSlideMessage);
          } else {
            swiper.a11y.notify(params.prevSlideMessage);
          }
        }
        if (swiper.pagination && $targetEl.is(("." + (swiper.params.pagination.bulletClass)))) {
          $targetEl[0].click();
        }
      },
      notify: function notify(message) {
        var swiper = this;
        var notification = swiper.a11y.liveRegion;
        if (notification.length === 0) { return; }
        notification.html('');
        notification.html(message);
      },
      updateNavigation: function updateNavigation() {
        var swiper = this;

        if (swiper.params.loop || !swiper.navigation) { return; }
        var ref = swiper.navigation;
        var $nextEl = ref.$nextEl;
        var $prevEl = ref.$prevEl;

        if ($prevEl && $prevEl.length > 0) {
          if (swiper.isBeginning) {
            swiper.a11y.disableEl($prevEl);
            swiper.a11y.makeElNotFocusable($prevEl);
          } else {
            swiper.a11y.enableEl($prevEl);
            swiper.a11y.makeElFocusable($prevEl);
          }
        }
        if ($nextEl && $nextEl.length > 0) {
          if (swiper.isEnd) {
            swiper.a11y.disableEl($nextEl);
            swiper.a11y.makeElNotFocusable($nextEl);
          } else {
            swiper.a11y.enableEl($nextEl);
            swiper.a11y.makeElFocusable($nextEl);
          }
        }
      },
      updatePagination: function updatePagination() {
        var swiper = this;
        var params = swiper.params.a11y;
        if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
          swiper.pagination.bullets.each(function (bulletIndex, bulletEl) {
            var $bulletEl = $(bulletEl);
            swiper.a11y.makeElFocusable($bulletEl);
            swiper.a11y.addElRole($bulletEl, 'button');
            swiper.a11y.addElLabel($bulletEl, params.paginationBulletMessage.replace(/\{\{index\}\}/, $bulletEl.index() + 1));
          });
        }
      },
      init: function init() {
        var swiper = this;

        swiper.$el.append(swiper.a11y.liveRegion);

        // Navigation
        var params = swiper.params.a11y;
        var $nextEl;
        var $prevEl;
        if (swiper.navigation && swiper.navigation.$nextEl) {
          $nextEl = swiper.navigation.$nextEl;
        }
        if (swiper.navigation && swiper.navigation.$prevEl) {
          $prevEl = swiper.navigation.$prevEl;
        }
        if ($nextEl) {
          swiper.a11y.makeElFocusable($nextEl);
          swiper.a11y.addElRole($nextEl, 'button');
          swiper.a11y.addElLabel($nextEl, params.nextSlideMessage);
          $nextEl.on('keydown', swiper.a11y.onEnterKey);
        }
        if ($prevEl) {
          swiper.a11y.makeElFocusable($prevEl);
          swiper.a11y.addElRole($prevEl, 'button');
          swiper.a11y.addElLabel($prevEl, params.prevSlideMessage);
          $prevEl.on('keydown', swiper.a11y.onEnterKey);
        }

        // Pagination
        if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
          swiper.pagination.$el.on('keydown', ("." + (swiper.params.pagination.bulletClass)), swiper.a11y.onEnterKey);
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.a11y.liveRegion && swiper.a11y.liveRegion.length > 0) { swiper.a11y.liveRegion.remove(); }

        var $nextEl;
        var $prevEl;
        if (swiper.navigation && swiper.navigation.$nextEl) {
          $nextEl = swiper.navigation.$nextEl;
        }
        if (swiper.navigation && swiper.navigation.$prevEl) {
          $prevEl = swiper.navigation.$prevEl;
        }
        if ($nextEl) {
          $nextEl.off('keydown', swiper.a11y.onEnterKey);
        }
        if ($prevEl) {
          $prevEl.off('keydown', swiper.a11y.onEnterKey);
        }

        // Pagination
        if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
          swiper.pagination.$el.off('keydown', ("." + (swiper.params.pagination.bulletClass)), swiper.a11y.onEnterKey);
        }
      },
    };
    var A11y = {
      name: 'a11y',
      params: {
        a11y: {
          enabled: true,
          notificationClass: 'swiper-notification',
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
          firstSlideMessage: 'This is the first slide',
          lastSlideMessage: 'This is the last slide',
          paginationBulletMessage: 'Go to slide {{index}}',
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          a11y: {
            liveRegion: $(("<span class=\"" + (swiper.params.a11y.notificationClass) + "\" aria-live=\"assertive\" aria-atomic=\"true\"></span>")),
          },
        });
        Object.keys(a11y).forEach(function (methodName) {
          swiper.a11y[methodName] = a11y[methodName].bind(swiper);
        });
      },
      on: {
        init: function init() {
          var swiper = this;
          if (!swiper.params.a11y.enabled) { return; }
          swiper.a11y.init();
          swiper.a11y.updateNavigation();
        },
        toEdge: function toEdge() {
          var swiper = this;
          if (!swiper.params.a11y.enabled) { return; }
          swiper.a11y.updateNavigation();
        },
        fromEdge: function fromEdge() {
          var swiper = this;
          if (!swiper.params.a11y.enabled) { return; }
          swiper.a11y.updateNavigation();
        },
        paginationUpdate: function paginationUpdate() {
          var swiper = this;
          if (!swiper.params.a11y.enabled) { return; }
          swiper.a11y.updatePagination();
        },
        destroy: function destroy() {
          var swiper = this;
          if (!swiper.params.a11y.enabled) { return; }
          swiper.a11y.destroy();
        },
      },
    };

    var History = {
      init: function init() {
        var swiper = this;
        if (!swiper.params.history) { return; }
        if (!win.history || !win.history.pushState) {
          swiper.params.history.enabled = false;
          swiper.params.hashNavigation.enabled = true;
          return;
        }
        var history = swiper.history;
        history.initialized = true;
        history.paths = History.getPathValues();
        if (!history.paths.key && !history.paths.value) { return; }
        history.scrollToSlide(0, history.paths.value, swiper.params.runCallbacksOnInit);
        if (!swiper.params.history.replaceState) {
          win.addEventListener('popstate', swiper.history.setHistoryPopState);
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (!swiper.params.history.replaceState) {
          win.removeEventListener('popstate', swiper.history.setHistoryPopState);
        }
      },
      setHistoryPopState: function setHistoryPopState() {
        var swiper = this;
        swiper.history.paths = History.getPathValues();
        swiper.history.scrollToSlide(swiper.params.speed, swiper.history.paths.value, false);
      },
      getPathValues: function getPathValues() {
        var pathArray = win.location.pathname.slice(1).split('/').filter(function (part) { return part !== ''; });
        var total = pathArray.length;
        var key = pathArray[total - 2];
        var value = pathArray[total - 1];
        return { key: key, value: value };
      },
      setHistory: function setHistory(key, index) {
        var swiper = this;
        if (!swiper.history.initialized || !swiper.params.history.enabled) { return; }
        var slide = swiper.slides.eq(index);
        var value = History.slugify(slide.attr('data-history'));
        if (!win.location.pathname.includes(key)) {
          value = key + "/" + value;
        }
        var currentState = win.history.state;
        if (currentState && currentState.value === value) {
          return;
        }
        if (swiper.params.history.replaceState) {
          win.history.replaceState({ value: value }, null, value);
        } else {
          win.history.pushState({ value: value }, null, value);
        }
      },
      slugify: function slugify(text) {
        return text.toString()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '')
          .replace(/--+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '');
      },
      scrollToSlide: function scrollToSlide(speed, value, runCallbacks) {
        var swiper = this;
        if (value) {
          for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
            var slide = swiper.slides.eq(i);
            var slideHistory = History.slugify(slide.attr('data-history'));
            if (slideHistory === value && !slide.hasClass(swiper.params.slideDuplicateClass)) {
              var index = slide.index();
              swiper.slideTo(index, speed, runCallbacks);
            }
          }
        } else {
          swiper.slideTo(0, speed, runCallbacks);
        }
      },
    };

    var History$1 = {
      name: 'history',
      params: {
        history: {
          enabled: false,
          replaceState: false,
          key: 'slides',
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          history: {
            init: History.init.bind(swiper),
            setHistory: History.setHistory.bind(swiper),
            setHistoryPopState: History.setHistoryPopState.bind(swiper),
            scrollToSlide: History.scrollToSlide.bind(swiper),
            destroy: History.destroy.bind(swiper),
          },
        });
      },
      on: {
        init: function init() {
          var swiper = this;
          if (swiper.params.history.enabled) {
            swiper.history.init();
          }
        },
        destroy: function destroy() {
          var swiper = this;
          if (swiper.params.history.enabled) {
            swiper.history.destroy();
          }
        },
        transitionEnd: function transitionEnd() {
          var swiper = this;
          if (swiper.history.initialized) {
            swiper.history.setHistory(swiper.params.history.key, swiper.activeIndex);
          }
        },
        slideChange: function slideChange() {
          var swiper = this;
          if (swiper.history.initialized && swiper.params.cssMode) {
            swiper.history.setHistory(swiper.params.history.key, swiper.activeIndex);
          }
        },
      },
    };

    var HashNavigation = {
      onHashCange: function onHashCange() {
        var swiper = this;
        swiper.emit('hashChange');
        var newHash = doc.location.hash.replace('#', '');
        var activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr('data-hash');
        if (newHash !== activeSlideHash) {
          var newIndex = swiper.$wrapperEl.children(("." + (swiper.params.slideClass) + "[data-hash=\"" + newHash + "\"]")).index();
          if (typeof newIndex === 'undefined') { return; }
          swiper.slideTo(newIndex);
        }
      },
      setHash: function setHash() {
        var swiper = this;
        if (!swiper.hashNavigation.initialized || !swiper.params.hashNavigation.enabled) { return; }
        if (swiper.params.hashNavigation.replaceState && win.history && win.history.replaceState) {
          win.history.replaceState(null, null, (("#" + (swiper.slides.eq(swiper.activeIndex).attr('data-hash'))) || ''));
          swiper.emit('hashSet');
        } else {
          var slide = swiper.slides.eq(swiper.activeIndex);
          var hash = slide.attr('data-hash') || slide.attr('data-history');
          doc.location.hash = hash || '';
          swiper.emit('hashSet');
        }
      },
      init: function init() {
        var swiper = this;
        if (!swiper.params.hashNavigation.enabled || (swiper.params.history && swiper.params.history.enabled)) { return; }
        swiper.hashNavigation.initialized = true;
        var hash = doc.location.hash.replace('#', '');
        if (hash) {
          var speed = 0;
          for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
            var slide = swiper.slides.eq(i);
            var slideHash = slide.attr('data-hash') || slide.attr('data-history');
            if (slideHash === hash && !slide.hasClass(swiper.params.slideDuplicateClass)) {
              var index = slide.index();
              swiper.slideTo(index, speed, swiper.params.runCallbacksOnInit, true);
            }
          }
        }
        if (swiper.params.hashNavigation.watchState) {
          $(win).on('hashchange', swiper.hashNavigation.onHashCange);
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.params.hashNavigation.watchState) {
          $(win).off('hashchange', swiper.hashNavigation.onHashCange);
        }
      },
    };
    var HashNavigation$1 = {
      name: 'hash-navigation',
      params: {
        hashNavigation: {
          enabled: false,
          replaceState: false,
          watchState: false,
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          hashNavigation: {
            initialized: false,
            init: HashNavigation.init.bind(swiper),
            destroy: HashNavigation.destroy.bind(swiper),
            setHash: HashNavigation.setHash.bind(swiper),
            onHashCange: HashNavigation.onHashCange.bind(swiper),
          },
        });
      },
      on: {
        init: function init() {
          var swiper = this;
          if (swiper.params.hashNavigation.enabled) {
            swiper.hashNavigation.init();
          }
        },
        destroy: function destroy() {
          var swiper = this;
          if (swiper.params.hashNavigation.enabled) {
            swiper.hashNavigation.destroy();
          }
        },
        transitionEnd: function transitionEnd() {
          var swiper = this;
          if (swiper.hashNavigation.initialized) {
            swiper.hashNavigation.setHash();
          }
        },
        slideChange: function slideChange() {
          var swiper = this;
          if (swiper.hashNavigation.initialized && swiper.params.cssMode) {
            swiper.hashNavigation.setHash();
          }
        },
      },
    };

    /* eslint no-underscore-dangle: "off" */

    var Autoplay = {
      run: function run() {
        var swiper = this;
        var $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
        var delay = swiper.params.autoplay.delay;
        if ($activeSlideEl.attr('data-swiper-autoplay')) {
          delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
        }
        clearTimeout(swiper.autoplay.timeout);
        swiper.autoplay.timeout = Utils.nextTick(function () {
          if (swiper.params.autoplay.reverseDirection) {
            if (swiper.params.loop) {
              swiper.loopFix();
              swiper.slidePrev(swiper.params.speed, true, true);
              swiper.emit('autoplay');
            } else if (!swiper.isBeginning) {
              swiper.slidePrev(swiper.params.speed, true, true);
              swiper.emit('autoplay');
            } else if (!swiper.params.autoplay.stopOnLastSlide) {
              swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
              swiper.emit('autoplay');
            } else {
              swiper.autoplay.stop();
            }
          } else if (swiper.params.loop) {
            swiper.loopFix();
            swiper.slideNext(swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else if (!swiper.isEnd) {
            swiper.slideNext(swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else if (!swiper.params.autoplay.stopOnLastSlide) {
            swiper.slideTo(0, swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else {
            swiper.autoplay.stop();
          }
          if (swiper.params.cssMode && swiper.autoplay.running) { swiper.autoplay.run(); }
        }, delay);
      },
      start: function start() {
        var swiper = this;
        if (typeof swiper.autoplay.timeout !== 'undefined') { return false; }
        if (swiper.autoplay.running) { return false; }
        swiper.autoplay.running = true;
        swiper.emit('autoplayStart');
        swiper.autoplay.run();
        return true;
      },
      stop: function stop() {
        var swiper = this;
        if (!swiper.autoplay.running) { return false; }
        if (typeof swiper.autoplay.timeout === 'undefined') { return false; }

        if (swiper.autoplay.timeout) {
          clearTimeout(swiper.autoplay.timeout);
          swiper.autoplay.timeout = undefined;
        }
        swiper.autoplay.running = false;
        swiper.emit('autoplayStop');
        return true;
      },
      pause: function pause(speed) {
        var swiper = this;
        if (!swiper.autoplay.running) { return; }
        if (swiper.autoplay.paused) { return; }
        if (swiper.autoplay.timeout) { clearTimeout(swiper.autoplay.timeout); }
        swiper.autoplay.paused = true;
        if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
          swiper.autoplay.paused = false;
          swiper.autoplay.run();
        } else {
          swiper.$wrapperEl[0].addEventListener('transitionend', swiper.autoplay.onTransitionEnd);
          swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
        }
      },
    };

    var Autoplay$1 = {
      name: 'autoplay',
      params: {
        autoplay: {
          enabled: false,
          delay: 3000,
          waitForTransition: true,
          disableOnInteraction: true,
          stopOnLastSlide: false,
          reverseDirection: false,
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          autoplay: {
            running: false,
            paused: false,
            run: Autoplay.run.bind(swiper),
            start: Autoplay.start.bind(swiper),
            stop: Autoplay.stop.bind(swiper),
            pause: Autoplay.pause.bind(swiper),
            onVisibilityChange: function onVisibilityChange() {
              if (document.visibilityState === 'hidden' && swiper.autoplay.running) {
                swiper.autoplay.pause();
              }
              if (document.visibilityState === 'visible' && swiper.autoplay.paused) {
                swiper.autoplay.run();
                swiper.autoplay.paused = false;
              }
            },
            onTransitionEnd: function onTransitionEnd(e) {
              if (!swiper || swiper.destroyed || !swiper.$wrapperEl) { return; }
              if (e.target !== this) { return; }
              swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.autoplay.onTransitionEnd);
              swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
              swiper.autoplay.paused = false;
              if (!swiper.autoplay.running) {
                swiper.autoplay.stop();
              } else {
                swiper.autoplay.run();
              }
            },
          },
        });
      },
      on: {
        init: function init() {
          var swiper = this;
          if (swiper.params.autoplay.enabled) {
            swiper.autoplay.start();
            document.addEventListener('visibilitychange', swiper.autoplay.onVisibilityChange);
          }
        },
        beforeTransitionStart: function beforeTransitionStart(speed, internal) {
          var swiper = this;
          if (swiper.autoplay.running) {
            if (internal || !swiper.params.autoplay.disableOnInteraction) {
              swiper.autoplay.pause(speed);
            } else {
              swiper.autoplay.stop();
            }
          }
        },
        sliderFirstMove: function sliderFirstMove() {
          var swiper = this;
          if (swiper.autoplay.running) {
            if (swiper.params.autoplay.disableOnInteraction) {
              swiper.autoplay.stop();
            } else {
              swiper.autoplay.pause();
            }
          }
        },
        touchEnd: function touchEnd() {
          var swiper = this;
          if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.run();
          }
        },
        destroy: function destroy() {
          var swiper = this;
          if (swiper.autoplay.running) {
            swiper.autoplay.stop();
          }
          document.removeEventListener('visibilitychange', swiper.autoplay.onVisibilityChange);
        },
      },
    };

    var Fade = {
      setTranslate: function setTranslate() {
        var swiper = this;
        var slides = swiper.slides;
        for (var i = 0; i < slides.length; i += 1) {
          var $slideEl = swiper.slides.eq(i);
          var offset = $slideEl[0].swiperSlideOffset;
          var tx = -offset;
          if (!swiper.params.virtualTranslate) { tx -= swiper.translate; }
          var ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          var slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          $slideEl
            .css({
              opacity: slideOpacity,
            })
            .transform(("translate3d(" + tx + "px, " + ty + "px, 0px)"));
        }
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        var slides = swiper.slides;
        var $wrapperEl = swiper.$wrapperEl;
        slides.transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          var eventTriggered = false;
          slides.transitionEnd(function () {
            if (eventTriggered) { return; }
            if (!swiper || swiper.destroyed) { return; }
            eventTriggered = true;
            swiper.animating = false;
            var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (var i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    };

    var EffectFade = {
      name: 'effect-fade',
      params: {
        fadeEffect: {
          crossFade: false,
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          fadeEffect: {
            setTranslate: Fade.setTranslate.bind(swiper),
            setTransition: Fade.setTransition.bind(swiper),
          },
        });
      },
      on: {
        beforeInit: function beforeInit() {
          var swiper = this;
          if (swiper.params.effect !== 'fade') { return; }
          swiper.classNames.push(((swiper.params.containerModifierClass) + "fade"));
          var overwriteParams = {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: true,
            spaceBetween: 0,
            virtualTranslate: true,
          };
          Utils.extend(swiper.params, overwriteParams);
          Utils.extend(swiper.originalParams, overwriteParams);
        },
        setTranslate: function setTranslate() {
          var swiper = this;
          if (swiper.params.effect !== 'fade') { return; }
          swiper.fadeEffect.setTranslate();
        },
        setTransition: function setTransition(duration) {
          var swiper = this;
          if (swiper.params.effect !== 'fade') { return; }
          swiper.fadeEffect.setTransition(duration);
        },
      },
    };

    var Cube = {
      setTranslate: function setTranslate() {
        var swiper = this;
        var $el = swiper.$el;
        var $wrapperEl = swiper.$wrapperEl;
        var slides = swiper.slides;
        var swiperWidth = swiper.width;
        var swiperHeight = swiper.height;
        var rtl = swiper.rtlTranslate;
        var swiperSize = swiper.size;
        var params = swiper.params.cubeEffect;
        var isHorizontal = swiper.isHorizontal();
        var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        var wrapperRotate = 0;
        var $cubeShadowEl;
        if (params.shadow) {
          if (isHorizontal) {
            $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
            if ($cubeShadowEl.length === 0) {
              $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
              $wrapperEl.append($cubeShadowEl);
            }
            $cubeShadowEl.css({ height: (swiperWidth + "px") });
          } else {
            $cubeShadowEl = $el.find('.swiper-cube-shadow');
            if ($cubeShadowEl.length === 0) {
              $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
              $el.append($cubeShadowEl);
            }
          }
        }
        for (var i = 0; i < slides.length; i += 1) {
          var $slideEl = slides.eq(i);
          var slideIndex = i;
          if (isVirtual) {
            slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
          }
          var slideAngle = slideIndex * 90;
          var round = Math.floor(slideAngle / 360);
          if (rtl) {
            slideAngle = -slideAngle;
            round = Math.floor(-slideAngle / 360);
          }
          var progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          var tx = 0;
          var ty = 0;
          var tz = 0;
          if (slideIndex % 4 === 0) {
            tx = -round * 4 * swiperSize;
            tz = 0;
          } else if ((slideIndex - 1) % 4 === 0) {
            tx = 0;
            tz = -round * 4 * swiperSize;
          } else if ((slideIndex - 2) % 4 === 0) {
            tx = swiperSize + (round * 4 * swiperSize);
            tz = swiperSize;
          } else if ((slideIndex - 3) % 4 === 0) {
            tx = -swiperSize;
            tz = (3 * swiperSize) + (swiperSize * 4 * round);
          }
          if (rtl) {
            tx = -tx;
          }

          if (!isHorizontal) {
            ty = tx;
            tx = 0;
          }

          var transform = "rotateX(" + (isHorizontal ? 0 : -slideAngle) + "deg) rotateY(" + (isHorizontal ? slideAngle : 0) + "deg) translate3d(" + tx + "px, " + ty + "px, " + tz + "px)";
          if (progress <= 1 && progress > -1) {
            wrapperRotate = (slideIndex * 90) + (progress * 90);
            if (rtl) { wrapperRotate = (-slideIndex * 90) - (progress * 90); }
          }
          $slideEl.transform(transform);
          if (params.slideShadows) {
            // Set shadows
            var shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            var shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>"));
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>"));
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
            if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
          }
        }
        $wrapperEl.css({
          '-webkit-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
          '-moz-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
          '-ms-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
          'transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
        });

        if (params.shadow) {
          if (isHorizontal) {
            $cubeShadowEl.transform(("translate3d(0px, " + ((swiperWidth / 2) + params.shadowOffset) + "px, " + (-swiperWidth / 2) + "px) rotateX(90deg) rotateZ(0deg) scale(" + (params.shadowScale) + ")"));
          } else {
            var shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
            var multiplier = 1.5 - (
              (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2)
              + (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
            );
            var scale1 = params.shadowScale;
            var scale2 = params.shadowScale / multiplier;
            var offset = params.shadowOffset;
            $cubeShadowEl.transform(("scale3d(" + scale1 + ", 1, " + scale2 + ") translate3d(0px, " + ((swiperHeight / 2) + offset) + "px, " + (-swiperHeight / 2 / scale2) + "px) rotateX(-90deg)"));
          }
        }
        var zFactor = (Browser.isSafari || Browser.isWebView) ? (-swiperSize / 2) : 0;
        $wrapperEl
          .transform(("translate3d(0px,0," + zFactor + "px) rotateX(" + (swiper.isHorizontal() ? 0 : wrapperRotate) + "deg) rotateY(" + (swiper.isHorizontal() ? -wrapperRotate : 0) + "deg)"));
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        var $el = swiper.$el;
        var slides = swiper.slides;
        slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
        if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
          $el.find('.swiper-cube-shadow').transition(duration);
        }
      },
    };

    var EffectCube = {
      name: 'effect-cube',
      params: {
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          cubeEffect: {
            setTranslate: Cube.setTranslate.bind(swiper),
            setTransition: Cube.setTransition.bind(swiper),
          },
        });
      },
      on: {
        beforeInit: function beforeInit() {
          var swiper = this;
          if (swiper.params.effect !== 'cube') { return; }
          swiper.classNames.push(((swiper.params.containerModifierClass) + "cube"));
          swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));
          var overwriteParams = {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: true,
            resistanceRatio: 0,
            spaceBetween: 0,
            centeredSlides: false,
            virtualTranslate: true,
          };
          Utils.extend(swiper.params, overwriteParams);
          Utils.extend(swiper.originalParams, overwriteParams);
        },
        setTranslate: function setTranslate() {
          var swiper = this;
          if (swiper.params.effect !== 'cube') { return; }
          swiper.cubeEffect.setTranslate();
        },
        setTransition: function setTransition(duration) {
          var swiper = this;
          if (swiper.params.effect !== 'cube') { return; }
          swiper.cubeEffect.setTransition(duration);
        },
      },
    };

    var Flip = {
      setTranslate: function setTranslate() {
        var swiper = this;
        var slides = swiper.slides;
        var rtl = swiper.rtlTranslate;
        for (var i = 0; i < slides.length; i += 1) {
          var $slideEl = slides.eq(i);
          var progress = $slideEl[0].progress;
          if (swiper.params.flipEffect.limitRotation) {
            progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          }
          var offset = $slideEl[0].swiperSlideOffset;
          var rotate = -180 * progress;
          var rotateY = rotate;
          var rotateX = 0;
          var tx = -offset;
          var ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
            rotateX = -rotateY;
            rotateY = 0;
          } else if (rtl) {
            rotateY = -rotateY;
          }

          $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

          if (swiper.params.flipEffect.slideShadows) {
            // Set shadows
            var shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            var shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = $(("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'left' : 'top') + "\"></div>"));
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = $(("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'right' : 'bottom') + "\"></div>"));
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
            if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
          }
          $slideEl
            .transform(("translate3d(" + tx + "px, " + ty + "px, 0px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)"));
        }
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        var slides = swiper.slides;
        var activeIndex = swiper.activeIndex;
        var $wrapperEl = swiper.$wrapperEl;
        slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          var eventTriggered = false;
          // eslint-disable-next-line
          slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
            if (eventTriggered) { return; }
            if (!swiper || swiper.destroyed) { return; }
            // if (!$(this).hasClass(swiper.params.slideActiveClass)) return;
            eventTriggered = true;
            swiper.animating = false;
            var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (var i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    };

    var EffectFlip = {
      name: 'effect-flip',
      params: {
        flipEffect: {
          slideShadows: true,
          limitRotation: true,
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          flipEffect: {
            setTranslate: Flip.setTranslate.bind(swiper),
            setTransition: Flip.setTransition.bind(swiper),
          },
        });
      },
      on: {
        beforeInit: function beforeInit() {
          var swiper = this;
          if (swiper.params.effect !== 'flip') { return; }
          swiper.classNames.push(((swiper.params.containerModifierClass) + "flip"));
          swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));
          var overwriteParams = {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: true,
            spaceBetween: 0,
            virtualTranslate: true,
          };
          Utils.extend(swiper.params, overwriteParams);
          Utils.extend(swiper.originalParams, overwriteParams);
        },
        setTranslate: function setTranslate() {
          var swiper = this;
          if (swiper.params.effect !== 'flip') { return; }
          swiper.flipEffect.setTranslate();
        },
        setTransition: function setTransition(duration) {
          var swiper = this;
          if (swiper.params.effect !== 'flip') { return; }
          swiper.flipEffect.setTransition(duration);
        },
      },
    };

    var Coverflow = {
      setTranslate: function setTranslate() {
        var swiper = this;
        var swiperWidth = swiper.width;
        var swiperHeight = swiper.height;
        var slides = swiper.slides;
        var $wrapperEl = swiper.$wrapperEl;
        var slidesSizesGrid = swiper.slidesSizesGrid;
        var params = swiper.params.coverflowEffect;
        var isHorizontal = swiper.isHorizontal();
        var transform = swiper.translate;
        var center = isHorizontal ? -transform + (swiperWidth / 2) : -transform + (swiperHeight / 2);
        var rotate = isHorizontal ? params.rotate : -params.rotate;
        var translate = params.depth;
        // Each slide offset from center
        for (var i = 0, length = slides.length; i < length; i += 1) {
          var $slideEl = slides.eq(i);
          var slideSize = slidesSizesGrid[i];
          var slideOffset = $slideEl[0].swiperSlideOffset;
          var offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

          var rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          var rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
          // var rotateZ = 0
          var translateZ = -translate * Math.abs(offsetMultiplier);

          var stretch = params.stretch;
          // Allow percentage to make a relative stretch for responsive sliders
          if (typeof stretch === 'string' && stretch.indexOf('%') !== -1) {
            stretch = ((parseFloat(params.stretch) / 100) * slideSize);
          }
          var translateY = isHorizontal ? 0 : stretch * (offsetMultiplier);
          var translateX = isHorizontal ? stretch * (offsetMultiplier) : 0;

          var scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier);

          // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) { translateX = 0; }
          if (Math.abs(translateY) < 0.001) { translateY = 0; }
          if (Math.abs(translateZ) < 0.001) { translateZ = 0; }
          if (Math.abs(rotateY) < 0.001) { rotateY = 0; }
          if (Math.abs(rotateX) < 0.001) { rotateX = 0; }
          if (Math.abs(scale) < 0.001) { scale = 0; }

          var slideTransform = "translate3d(" + translateX + "px," + translateY + "px," + translateZ + "px)  rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) scale(" + scale + ")";

          $slideEl.transform(slideTransform);
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
          if (params.slideShadows) {
            // Set shadows
            var $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            var $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if ($shadowBeforeEl.length === 0) {
              $shadowBeforeEl = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>"));
              $slideEl.append($shadowBeforeEl);
            }
            if ($shadowAfterEl.length === 0) {
              $shadowAfterEl = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>"));
              $slideEl.append($shadowAfterEl);
            }
            if ($shadowBeforeEl.length) { $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0; }
            if ($shadowAfterEl.length) { $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0; }
          }
        }

        // Set correct perspective for IE10
        if (Support.pointerEvents || Support.prefixedPointerEvents) {
          var ws = $wrapperEl[0].style;
          ws.perspectiveOrigin = center + "px 50%";
        }
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        swiper.slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
      },
    };

    var EffectCoverflow = {
      name: 'effect-coverflow',
      params: {
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          scale: 1,
          modifier: 1,
          slideShadows: true,
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          coverflowEffect: {
            setTranslate: Coverflow.setTranslate.bind(swiper),
            setTransition: Coverflow.setTransition.bind(swiper),
          },
        });
      },
      on: {
        beforeInit: function beforeInit() {
          var swiper = this;
          if (swiper.params.effect !== 'coverflow') { return; }

          swiper.classNames.push(((swiper.params.containerModifierClass) + "coverflow"));
          swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));

          swiper.params.watchSlidesProgress = true;
          swiper.originalParams.watchSlidesProgress = true;
        },
        setTranslate: function setTranslate() {
          var swiper = this;
          if (swiper.params.effect !== 'coverflow') { return; }
          swiper.coverflowEffect.setTranslate();
        },
        setTransition: function setTransition(duration) {
          var swiper = this;
          if (swiper.params.effect !== 'coverflow') { return; }
          swiper.coverflowEffect.setTransition(duration);
        },
      },
    };

    var Thumbs = {
      init: function init() {
        var swiper = this;
        var ref = swiper.params;
        var thumbsParams = ref.thumbs;
        var SwiperClass = swiper.constructor;
        if (thumbsParams.swiper instanceof SwiperClass) {
          swiper.thumbs.swiper = thumbsParams.swiper;
          Utils.extend(swiper.thumbs.swiper.originalParams, {
            watchSlidesProgress: true,
            slideToClickedSlide: false,
          });
          Utils.extend(swiper.thumbs.swiper.params, {
            watchSlidesProgress: true,
            slideToClickedSlide: false,
          });
        } else if (Utils.isObject(thumbsParams.swiper)) {
          swiper.thumbs.swiper = new SwiperClass(Utils.extend({}, thumbsParams.swiper, {
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            slideToClickedSlide: false,
          }));
          swiper.thumbs.swiperCreated = true;
        }
        swiper.thumbs.swiper.$el.addClass(swiper.params.thumbs.thumbsContainerClass);
        swiper.thumbs.swiper.on('tap', swiper.thumbs.onThumbClick);
      },
      onThumbClick: function onThumbClick() {
        var swiper = this;
        var thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper) { return; }
        var clickedIndex = thumbsSwiper.clickedIndex;
        var clickedSlide = thumbsSwiper.clickedSlide;
        if (clickedSlide && $(clickedSlide).hasClass(swiper.params.thumbs.slideThumbActiveClass)) { return; }
        if (typeof clickedIndex === 'undefined' || clickedIndex === null) { return; }
        var slideToIndex;
        if (thumbsSwiper.params.loop) {
          slideToIndex = parseInt($(thumbsSwiper.clickedSlide).attr('data-swiper-slide-index'), 10);
        } else {
          slideToIndex = clickedIndex;
        }
        if (swiper.params.loop) {
          var currentIndex = swiper.activeIndex;
          if (swiper.slides.eq(currentIndex).hasClass(swiper.params.slideDuplicateClass)) {
            swiper.loopFix();
            // eslint-disable-next-line
            swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
            currentIndex = swiper.activeIndex;
          }
          var prevIndex = swiper.slides.eq(currentIndex).prevAll(("[data-swiper-slide-index=\"" + slideToIndex + "\"]")).eq(0).index();
          var nextIndex = swiper.slides.eq(currentIndex).nextAll(("[data-swiper-slide-index=\"" + slideToIndex + "\"]")).eq(0).index();
          if (typeof prevIndex === 'undefined') { slideToIndex = nextIndex; }
          else if (typeof nextIndex === 'undefined') { slideToIndex = prevIndex; }
          else if (nextIndex - currentIndex < currentIndex - prevIndex) { slideToIndex = nextIndex; }
          else { slideToIndex = prevIndex; }
        }
        swiper.slideTo(slideToIndex);
      },
      update: function update(initial) {
        var swiper = this;
        var thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper) { return; }

        var slidesPerView = thumbsSwiper.params.slidesPerView === 'auto'
          ? thumbsSwiper.slidesPerViewDynamic()
          : thumbsSwiper.params.slidesPerView;

        var autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
        var useOffset = autoScrollOffset && !thumbsSwiper.params.loop;
        if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
          var currentThumbsIndex = thumbsSwiper.activeIndex;
          var newThumbsIndex;
          var direction;
          if (thumbsSwiper.params.loop) {
            if (thumbsSwiper.slides.eq(currentThumbsIndex).hasClass(thumbsSwiper.params.slideDuplicateClass)) {
              thumbsSwiper.loopFix();
              // eslint-disable-next-line
              thumbsSwiper._clientLeft = thumbsSwiper.$wrapperEl[0].clientLeft;
              currentThumbsIndex = thumbsSwiper.activeIndex;
            }
            // Find actual thumbs index to slide to
            var prevThumbsIndex = thumbsSwiper.slides
              .eq(currentThumbsIndex)
              .prevAll(("[data-swiper-slide-index=\"" + (swiper.realIndex) + "\"]")).eq(0)
              .index();
            var nextThumbsIndex = thumbsSwiper.slides
              .eq(currentThumbsIndex)
              .nextAll(("[data-swiper-slide-index=\"" + (swiper.realIndex) + "\"]")).eq(0)
              .index();
            if (typeof prevThumbsIndex === 'undefined') { newThumbsIndex = nextThumbsIndex; }
            else if (typeof nextThumbsIndex === 'undefined') { newThumbsIndex = prevThumbsIndex; }
            else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) { newThumbsIndex = currentThumbsIndex; }
            else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) { newThumbsIndex = nextThumbsIndex; }
            else { newThumbsIndex = prevThumbsIndex; }
            direction = swiper.activeIndex > swiper.previousIndex ? 'next' : 'prev';
          } else {
            newThumbsIndex = swiper.realIndex;
            direction = newThumbsIndex > swiper.previousIndex ? 'next' : 'prev';
          }
          if (useOffset) {
            newThumbsIndex += direction === 'next' ? autoScrollOffset : -1 * autoScrollOffset;
          }

          if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
            if (thumbsSwiper.params.centeredSlides) {
              if (newThumbsIndex > currentThumbsIndex) {
                newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
              } else {
                newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
              }
            } else if (newThumbsIndex > currentThumbsIndex) {
              newThumbsIndex = newThumbsIndex - slidesPerView + 1;
            }
            thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);
          }
        }

        // Activate thumbs
        var thumbsToActivate = 1;
        var thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;

        if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
          thumbsToActivate = swiper.params.slidesPerView;
        }

        if (!swiper.params.thumbs.multipleActiveThumbs) {
          thumbsToActivate = 1;
        }

        thumbsToActivate = Math.floor(thumbsToActivate);

        thumbsSwiper.slides.removeClass(thumbActiveClass);
        if (thumbsSwiper.params.loop || (thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled)) {
          for (var i = 0; i < thumbsToActivate; i += 1) {
            thumbsSwiper.$wrapperEl.children(("[data-swiper-slide-index=\"" + (swiper.realIndex + i) + "\"]")).addClass(thumbActiveClass);
          }
        } else {
          for (var i$1 = 0; i$1 < thumbsToActivate; i$1 += 1) {
            thumbsSwiper.slides.eq(swiper.realIndex + i$1).addClass(thumbActiveClass);
          }
        }
      },
    };
    var Thumbs$1 = {
      name: 'thumbs',
      params: {
        thumbs: {
          swiper: null,
          multipleActiveThumbs: true,
          autoScrollOffset: 0,
          slideThumbActiveClass: 'swiper-slide-thumb-active',
          thumbsContainerClass: 'swiper-container-thumbs',
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          thumbs: {
            swiper: null,
            init: Thumbs.init.bind(swiper),
            update: Thumbs.update.bind(swiper),
            onThumbClick: Thumbs.onThumbClick.bind(swiper),
          },
        });
      },
      on: {
        beforeInit: function beforeInit() {
          var swiper = this;
          var ref = swiper.params;
          var thumbs = ref.thumbs;
          if (!thumbs || !thumbs.swiper) { return; }
          swiper.thumbs.init();
          swiper.thumbs.update(true);
        },
        slideChange: function slideChange() {
          var swiper = this;
          if (!swiper.thumbs.swiper) { return; }
          swiper.thumbs.update();
        },
        update: function update() {
          var swiper = this;
          if (!swiper.thumbs.swiper) { return; }
          swiper.thumbs.update();
        },
        resize: function resize() {
          var swiper = this;
          if (!swiper.thumbs.swiper) { return; }
          swiper.thumbs.update();
        },
        observerUpdate: function observerUpdate() {
          var swiper = this;
          if (!swiper.thumbs.swiper) { return; }
          swiper.thumbs.update();
        },
        setTransition: function setTransition(duration) {
          var swiper = this;
          var thumbsSwiper = swiper.thumbs.swiper;
          if (!thumbsSwiper) { return; }
          thumbsSwiper.setTransition(duration);
        },
        beforeDestroy: function beforeDestroy() {
          var swiper = this;
          var thumbsSwiper = swiper.thumbs.swiper;
          if (!thumbsSwiper) { return; }
          if (swiper.thumbs.swiperCreated && thumbsSwiper) {
            thumbsSwiper.destroy();
          }
        },
      },
    };

    // Swiper Class

    var components = [
      Device$1,
      Support$1,
      Browser$1,
      Resize,
      Observer$1,
      Virtual$1,
      Keyboard$1,
      Mousewheel$1,
      Navigation$1,
      Pagination$1,
      Scrollbar$1,
      Parallax$1,
      Zoom$1,
      Lazy$1,
      Controller$1,
      A11y,
      History$1,
      HashNavigation$1,
      Autoplay$1,
      EffectFade,
      EffectCube,
      EffectFlip,
      EffectCoverflow,
      Thumbs$1
    ];

    if (typeof Swiper.use === 'undefined') {
      Swiper.use = Swiper.Class.use;
      Swiper.installModule = Swiper.Class.installModule;
    }

    Swiper.use(components);

    return Swiper;

})));
//# sourceMappingURL=swiper.js.map
