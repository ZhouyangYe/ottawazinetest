angular.module('wraf.directive', ['wraf.controllers'])

.directive('detectBottom', function ($window) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {

			angular.element($window).bind("scroll", function() {
				var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
				var body = document.body, html = document.documentElement;
				var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
				windowBottom = windowHeight + window.pageYOffset;
				if (windowBottom >= docHeight - 5) {
					scope.$apply(attrs.detectBottom);					
				}
			});
		}
	};
})

.directive('refreshNews', function ($document,$timeout) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			scope.doneLoading = true;
			
			var startY = 0, y = 0;

			element.css({
				position: 'relative',
			});

			element.on('mousedown', function(event) {
			// Prevent default dragging of selected content
				event.preventDefault();

				if (window.pageYOffset == 0) {
					$document.on('mousemove', mousemove);
				}

				startY = event.pageY - y;

				$document.on('mouseup', mouseup);
			});

			function mousemove(event) {
				y = event.pageY - startY;
				if (y > 50) {
					y = 50;
				}

				element.css({
				  top: y + 'px',

				});
			}

			function mouseup() {

				if (y > 40) {
					console.log(y);
					scope.doneLoading = false;
					scope.$digest();
					$timeout(function(){
						scope.$apply(attrs.refreshNews);
					},500)

					
				}
				



				startY = 0, y = 0;
				element.css({
					top: 0 + 'px'
				});
				$document.off('mousemove', mousemove);
				$document.off('mouseup', mouseup);
			}




		}
	};
})

.directive('postContentDisplay', function ($timeout) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {			
			//android 4.X cannot load img from https. change protocol from https to http
			scope.$watch(attrs.ngBindHtml, function(newValue, oldValue) {
				if (newValue !== null && oldValue !== newValue) {
					//run on the next cycle
					$timeout(function() {
						var imgs = element.find('img');
						if (imgs.length > 0) {
							angular.forEach(imgs, function(item){
								item.src = item.src.replace("https://", "http://");								
							})
						}				        
				    }, 0);	
				}
			});			
		}
	};
})

.directive('socialShareButtons', function () {
	return {		
		restrict: 'A',
		scope:{
			title:'=',
			thumbUrl:'=',
			webpageUrl:'=',
			type:'=',
			slug:'='
		},
		link: function (scope, element, attrs) {	

			element.bind('click', function(){
				shareViaWechat(scope.type, scope.title, scope.thumbUrl, scope.webpageUrl,decodeURI(scope.slug));
			})
/*
			scope.shareWechatFriend = function(){
				shareViaWechat(0, scope.title, scope.thumbUrl, scope.webpageUrl);
			}
			scope.shareWechatMoment = function(){
				shareViaWechat(1, scope.title, scope.thumbUrl, scope.webpageUrl);
			}			*/
		}
	};
})


;