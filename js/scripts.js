(function($) {
    $(document).ready(function() {
        $('body').css('overflow', 'hidden');
        $(window).load(function() {
            var preloaderDelay = 350,
                preloaderFadeOutTime = 800;

            function hidePreloader() {
                var loadingAnimation = $('#loading-animation'),
                    preloader = $('#preloader');
                loadingAnimation.fadeOut();
                preloader.delay(preloaderDelay).fadeOut(preloaderFadeOutTime);
            }
            $('body').css('overflow', 'auto');
            hidePreloader();
            generateSameHeight();
        });

        if ($(window).width() > 1500) {
            $('.team-item-wrapper').each(function() {
                $(this).addClass('col-lg-3');
            });
        }
        if ($(window).width() < 768) {
            $('.animated').removeClass('animated').removeClass('hiding');
            $('.stat span').removeClass('timer');
        }
        if ($(window).height() < 512) {
            $('#bottom-navlinks').removeClass('bottom-navlinks').addClass('bottom-navlinks-small');
        }
        if ($(window).scrollTop() >= 100) {
            $('#top-header').addClass('after-scroll');
            $('#logo-header').removeClass('logo-light').addClass('logo-dark');
        }

        $(window).scroll(function() {
            var scroll = $(this).scrollTop();
            var header = $('#top-header');
            var logo = $('#logo-header');
            var src = logo.attr('src');
            var buyButton = $('#buy-tickets-button');

            if (scroll >= 100) {
                header.addClass('after-scroll');
                logo.removeClass('logo-light').addClass('logo-dark');
            } else {
                header.removeClass('after-scroll');
                if (!header.hasClass('dark-header')) {
                    logo.removeClass('logo-dark').addClass('logo-light');
                }
            }

            if (scroll >= $(window).height()) {
                buyButton.fadeIn(400);
                buyButton.removeClass('hidden');
            } else {
                buyButton.fadeOut(400, function() {
                    buyButton.addClass('hidden');
                });
            }
        });

        $(function() {
            var idArray = [];
            $('.rockstar-speakers-item').each(function() {
                idArray[idArray.length] = $(this).attr('data-id');
            });
            idArray = shuffleArray(idArray);
            for (var i = 0; i < 4; i++) {
                $('#rockstar-speaker-' + idArray[i]).removeClass('hidden');
            }
        });

        function shuffleArray(o) {
            for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        };

        var delay = parseInt($('.increment-animation').attr('data-delay'));
        $('.increment-animation').not('hidden').each(function(index) {
            $(this).attr('data-delay', index * delay);
        });

        $('.animated').appear(function() {
            var element = $(this);
            var animation = element.data('animation');
            var animationDelay = element.data('delay');
            if (animationDelay) {
                setTimeout(function() {
                    element.addClass(animation + " visible");
                    element.removeClass('hiding');
                    if (element.hasClass('counter')) {
                        element.find('.timer').countTo();
                    }
                }, animationDelay);
            } else {
                element.addClass(animation + " visible");
                element.removeClass('hiding');
                if (element.hasClass('counter')) {
                    element.find('.timer').countTo();
                }
            }
        }, {
            accY: -150
        });

        $(function() {
            $('a[href*=#]:not([href=#])').click(function() {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
                }
            });
        });

        $(function() {
            $('a[href=#]').click(function() {
                event.preventDefault();
            });
        });

        function generateSameHeight() {
            if ($(window).width() > 767) {
                $('.same-height-wrapper').each(function() {
                    var max = 0;
                    $('.same-height').each(function() {
                        var height = $(this).height();
                        if (height > max) {
                            max = height;
                        }
                    });
                    $('.same-height').each(function() {
                        $(this).height(max);
                    });
                });
            }
        }

        $('#post-section .post-body p').each(function() {
            if ($(this).find('.feature-image').length) {
                var url = $(this).find('.feature-image').prop('src');
                $('#top-section').css('background-image', 'url(' + url + ')').addClass('enable-overlay');
            }
        });

        $('.slider').each(function() {
            $(this).find('.slider-item').first().addClass('slider-current-item').removeClass('hidden');
            if ($(this).find('.slider-item').length > 1) {
                $(this).closest('.speaker-item').find('.slider-next-item').removeClass('hidden');
            }
        });
        $('.slider-next-item').click(function() {
            var speakerItem = $(this).closest('.speaker-item');
            var elem = speakerItem.find('.slider-current-item').next();
            if (elem.length) {
                elem.addClass('slider-current-item').removeClass('hidden');
                speakerItem.find('.slider-current-item').first().removeClass('slider-current-item').addClass('hidden');
            } else {
                speakerItem.find('.slider-item').first().addClass('slider-current-item').removeClass('hidden');
                speakerItem.find('.slider-current-item').last().removeClass('slider-current-item').addClass('hidden');
            }
        });

        //Side menu
        var container = $('.st-container');
        $('#menu-trigger').click(function(event) {
            event.stopPropagation();
            var top = $(window).scrollTop();
            var left = $(window).scrollLeft()
            var effect = $(this).attr('data-effect');

            if (!container.hasClass('st-menu-open')) {
                container.addClass(effect).delay(25).addClass('st-menu-open');
                $('body').css('overflow', 'hidden');
            } else {
                container.removeClass('st-menu-open');
                $('body').css('overflow', 'auto');
            }
        });
        $('.st-pusher').click(function() {
            if (container.hasClass('st-menu-open')) {
                container.removeClass('st-menu-open');
                $('body').css('overflow', 'auto');
            }
        });

        $(window).resize(function() {
            if ($(window).width() > 1500) {
                $('.team-item-wrapper').each(function() {
                    $(this).addClass('col-lg-3');
                });
            } else {
                $('.team-item-wrapper').each(function() {
                    $(this).removeClass('col-lg-3');
                });
            }
            if ($(window).width() > 767) {
                if (container.hasClass('st-menu-open')) {
                    container.removeClass('st-menu-open');
                    $('body').css('overflow', 'auto');
                }
                generateSameHeight()
            }
            var bottomNavLinks = $('#bottom-navlinks');
            if ($(window).height() < 512) {
                bottomNavLinks.removeClass('bottom-navlinks').addClass('bottom-navlinks-small');
            } else {
                bottomNavLinks.removeClass('bottom-navlinks-small').addClass('bottom-navlinks');
            }
            if ($(window).width() < 768) {
                $('.same-height').css('height', '100%');
            }
        });

        $('.modal').on('show.bs.modal', function() {
            $('body').css('overflow', 'hidden');
        });
        $('.modal').on('hide.bs.modal', function() {
            $('body').css('overflow', 'auto');
        });

        if (typeof twitterFeedUrl !== 'undefined') {
            var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from json where url="' + twitterFeedUrl + '"') + '&format=json&callback=?';
            $.getJSON(yql, function(data) {
                $.each(data.query.results.json.json, function(i, gist) {
                    var tweetElement = '<div class="tweet animated fadeInUp hidden"><p class="tweet-text">' + linkify(gist.text) + '</p><p class="tweet-meta">by <a href="https://twitter.com/' + gist.user.screen_name + ' target="_blank">@' + gist.user.screen_name + '</a></p></div>';
                    $('#tweets').append(tweetElement);
                });
                animateTweets();
            });

            function linkify(inputText) {
                var replacedText, pattern1, pattern2, pattern3, pattern4;
                pattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
                replacedText = inputText.replace(pattern1, '<a href="$1" target="_blank">$1</a>');
                pattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
                replacedText = replacedText.replace(pattern2, '$1<a href="http://$2" target="_blank">$2</a>');
                pattern3 = /#(\S*)/g;
                replacedText = replacedText.replace(pattern3, '<a href="https://twitter.com/search?q=%23$1" target="_blank">#$1</a>');
                pattern4 = /\B@([\w-]+)/gm;
                replacedText = replacedText.replace(pattern4, '<a href="https://twitter.com/$1" target="_blank">@$1</a>');
                return replacedText;
            }

            function animateTweets() {
                var $tweets = $('#tweets').find('.tweet'),
                    i = 0;
                $($tweets.get(0)).removeClass('hidden');

                function changeTweets() {
                    var next = (++i % $tweets.length);
                    $($tweets.get(next - 1)).addClass('hidden');
                    $($tweets.get(next)).removeClass('hidden');
                }
                var interval = setInterval(changeTweets, 5000);
            }
        }
    });


    //Google plus
    (function() {
        var po = document.createElement('script');
        po.type = 'text/javascript';
        po.async = true;
        po.src = 'https://apis.google.com/js/platform.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(po, s);
    })();

    //Google maps
    if (typeof googleMaps !== 'undefined') {
        var map, autocomplete, directionsDisplay, geocoder, polyline, origin;
        var markers = [];
        var directionsService = new google.maps.DirectionsService();
        var MY_MAPTYPE_ID = 'custom_style';

        function initialize() {
            directionsDisplay = new google.maps.DirectionsRenderer({
                suppressMarkers: true
            });
            geocoder = new google.maps.Geocoder();

            polyline = new google.maps.Polyline({
                strokeColor: '#03a9f4',
                strokeOpacity: 1,
                strokeWeight: 2
            });

            var defaultOpts = [{
                stylers: [{
                    lightness: 40
                }, {
                    visibility: 'on'
                }, {
                    gamma: 0.9
                }, {
                    weight: 0.4
                }]
            }, {
                elementType: 'labels',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'water',
                stylers: [{
                    color: '#5dc7ff'
                }]
            }, {
                featureType: 'road',
                stylers: [{
                    visibility: 'off'
                }]
            }];

            var zoomedOpts = [{
                stylers: [{
                    lightness: 40
                }, {
                    visibility: 'on'
                }, {
                    gamma: 1.1
                }, {
                    weight: 0.9
                }]
            }, {
                elementType: 'labels',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'water',
                stylers: [{
                    color: '#5dc7ff'
                }]
            }, {
                featureType: 'road',
                stylers: [{
                    visibility: 'on'
                }]
            }, {
                featureType: 'road',
                elementType: "labels",
                stylers: [{
                    saturation: -30
                }]
            }];

            var mapOptions = {
                zoom: 17,
                minZoom: 2,
                scrollwheel: false,
                panControl: false,
                draggable: true,
                zoomControl: false,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_TOP
                },
                scaleControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                center: centerMap,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
                },
                mapTypeId: MY_MAPTYPE_ID
            };
            if ($(window).width() < 768) {
                mapOptions.center = mobileCenterMap;
            }
            if (googleMaps == 'logistics') {
                mapOptions.zoom = 5;
                mapOptions.zoomControl = true;
            }

            map = new google.maps.Map(document.getElementById('canvas-map'), mapOptions);
            var marker = new google.maps.Marker({
                position: eventPlace,
                animation: google.maps.Animation.DROP,
                icon: icon,
                map: map
            });
            markers.push(marker);
            var defaultMapOptions = {
                name: 'Default Style'
            };
            var zoomedMapOptions = {
                name: 'Zoomed Style'
            };
            var defaultMapType = new google.maps.StyledMapType(defaultOpts, defaultMapOptions);
            var zoomedMapType = new google.maps.StyledMapType(zoomedOpts, zoomedMapOptions);
            map.mapTypes.set('default', defaultMapType);
            map.mapTypes.set('zoomed', zoomedMapType);
            if (googleMaps === 'logistics') {
                map.setMapTypeId('default');
                var input = (document.getElementById('location-input'));
                autocomplete = new google.maps.places.Autocomplete(input);
                google.maps.event.addListener(autocomplete, 'place_changed', function() {
                    marker.setVisible(false);
                    var place = autocomplete.getPlace();
                    if (place.geometry == 'undefined' || !place.geometry) {
                        return;
                    }
                    var address = '';
                    if (place.address_components) {
                        address = [
                            (place.address_components[0] && place.address_components[0].short_name || ''), (place.address_components[1] && place.address_components[1].short_name || ''), (place.address_components[2] && place.address_components[2].short_name || '')
                        ].join(' ');
                    }
                    geocoder.geocode({
                        'address': address
                    }, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            origin = results[0].geometry.location;
                            calcRoute(origin, 'TRANSIT');
                        } else {
                            alert('Geocode was not successful for the following reason: ' + status);
                        }
                    });
                });

            } else {
                map.setMapTypeId('zoomed');
            }

            function calcRoute(origin, selectedMode) {
                var request = {
                    origin: origin,
                    destination: eventPlace,
                    travelMode: google.maps.TravelMode[selectedMode]
                };
                directionsService.route(request, function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        map.setMapTypeId('zoomed');
                        directionsDisplay.setMap(map);
                        directionsDisplay.setDirections(response);
                        var leg = response.routes[0].legs[0];
                        makeMarker(leg.start_location);
                        makeMarker(leg.end_location);
                        $('#distance').text(leg.distance.text);
                        $('#estimateTime').text(leg.duration.text);
                        $('#mode-select').val(selectedMode);
                        $('#mode').removeClass('hidden');
                        var attribute = $('#mode-icon use').attr('xlink:href');
                        attribute = attribute.substring(0, attribute.indexOf('#') + 1) + 'icon-' + selectedMode.toLowerCase();
                        $('#mode-icon use').attr('xlink:href', attribute);
                    } else if (status != google.maps.DirectionsStatus.OK && selectedMode != 'DRIVING') {
                        calcRoute(origin, 'DRIVING');
                    } else {
                        var path = polyline.getPath();
                        path.push(origin);
                        path.push(eventPlace);
                        makeMarker(origin);
                        makeMarker(eventPlace);
                        var bounds = new google.maps.LatLngBounds();
                        bounds.extend(origin);
                        bounds.extend(eventPlace);
                        map.fitBounds(bounds);
                        polyline.setMap(map);
                        var distance = Math.round(google.maps.geometry.spherical.computeDistanceBetween(origin, eventPlace) / 1000);
                        $('#distance').text(distance + ' km');
                        $('#estimateTime').text('');
                        $('#find-flight').removeClass('hidden');
                        $('#mode').addClass('hidden');
                    }
                });
                deleteMarkers();
                $('#find-way').addClass('location-active');
                setDirectionInput(origin);
                $('#find-way h3').removeClass('fadeInUp').addClass('fadeOutDown');
            }

            function makeMarker(position) {
                var directionMarker = new google.maps.Marker({
                    position: position,
                    map: map,
                    icon: icon
                });
                markers.push(directionMarker);
            }

            function addMarker(location) {
                var marker = new google.maps.Marker({
                    position: location,
                    map: map
                });
                markers.push(marker);
            }

            function deleteMarkers() {
                for (var i = 0; i < markers.length; i++) {
                    markers[i].setMap(null);
                }
                markers = [];
            }

            function smoothZoom(level) {
                var currentZoom = map.getZoom(),
                    timeStep = 50;
                var numOfSteps = Math.abs(level - currentZoom);
                var step = (level > currentZoom) ? 1 : -1;
                for (var i = 0; i < numOfSteps; i++) {
                    setTimeout(function() {
                        currentZoom += step;
                        map.setZoom(currentZoom);
                    }, (i + 1) * timeStep);
                }
            }

            function setDirectionInput(origin) {
                geocoder.geocode({
                    'latLng': origin
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK && results[1]) {
                        var arrAddress = results[1].address_components;
                        $.each(arrAddress, function(i, address_component) {
                            if (address_component.types[0] == "locality") {
                                $('#result-name').text(address_component.long_name);
                                return false;
                            }
                        });
                    }
                });
            }

            $('#mode-select').change(function() {
                var selectedMode = $(this).val();
                calcRoute(origin, selectedMode);
            });


            $("#direction-locate").click(function() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        origin = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        calcRoute(origin, 'TRANSIT');
                    });
                }
            });

            $("#direction-cancel").click(function() {
                $('#find-way').removeClass('location-active');
                $('#location-input').val('');
                $("#find-flight").addClass('hidden');
                deleteMarkers();
                directionsDisplay.setMap(null);
                polyline.setMap(null);
                map.setMapTypeId('default');
                map.panTo(eventPlace);
                if ($(window).width() < 768) {
                    map.setCenter(mobileCenterMap);
                } else {
                    map.setCenter(centerMap);
                }
                makeMarker(eventPlace);
                smoothZoom(5);
                $('#find-way h3').removeClass('fadeOutDown').addClass('fadeInUp');
            });
        }

        google.maps.event.addDomListener(window, 'load', initialize);
    }

})(jQuery);
