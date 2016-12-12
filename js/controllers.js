angular.module('wraf.controllers', [])

.controller('mainCtrl', function($scope,siteInfo,main_postListRes,postListRes,searchPostListRes,changeProtocol,$rootScope,$http,$document) {
	$scope.siteTitle = siteInfo.siteTitle;
	$scope.newsList = [];
	$scope.sliderNews = [];
	//初始化页面	
	var count = 20;

	$scope.loadNews = function(){
		$scope.page = 1;
		main_postListRes.query({
			page: $scope.page,
			count: count,
			include: 'title,thumbnail,author,date'
		}, function(data) {
			$scope.doneLoading = true;
			$scope.newsList = changeProtocol.changeImgProtocol(data.posts);		
		});
	}
	$scope.loadNews();


	//get top slider contents
	postListRes.query({
		theQquery: 390,
		page: $scope.page,
		count: count,
		include: 'title,thumbnail'
	}, function(data) {
		$scope.sliderNews = changeProtocol.changeImgProtocol(data.posts);
		$scope.sliderNewsQquery = 390;
	});

	$scope.sliderNext = function(){
		jq('#homepage_carousel').carousel('next');		
	}
	$scope.sliderPrev = function(){
		jq('#homepage_carousel').carousel('prev');		
	}

/*
	$http.get("https://ottawazine.com/api/get_recent_posts/?count=20&page=1&include=title,thumbnail,content")
	.success(function(data) {
		console.log(data);
	})
	.error(function(data, status) {
		console.error('Repos error', data);
		console.error(status);
	})
	.finally(function() {
		console.log("finally finished repos");
	});
*/


	$scope.page = 2; //把第2页的那6条新闻追加到页面上
	$rootScope.hasData = true;
	$scope.loadMore = function(){
		var theQquery = 319;
		main_postListRes.query({
			page: $scope.page,
			count: count,
			include: 'title,thumbnail,author,date'
		}, function(moreData) {
			for (var i = 0; i < moreData.posts.length; i++) {
				$scope.newsList.push(changeProtocol.changeSingleImgProtocol(moreData.posts[i]));
			}
			$scope.page ++; //每按一次追加6条新闻
			moreData.length === 0 ? $rootScope.hasData = false : $rootScope.hasData = true;
			$rootScope.$broadcast($rootScope.hasData);
		});
	};

})

.controller('tagCtrl', function($scope,postListRes,changeProtocol,$rootScope,$state) {

	$scope.newsList = [];

	switch ($state.current.name) {
	    case 'services':
	    	$scope.title = "加国新闻";
	    	$scope.titleImg = "img/icon_1_title.png";
	    	$scope.theQquery = 120;
	        break; 
	    case 'news':
	    	$scope.title = "中国新闻";
	    	$scope.titleImg = "img/icon_2_title.png";
	    	$scope.theQquery = 87;
	        break;
	    case 'about':
	    	$scope.title = "今日必读";
	    	$scope.titleImg = "img/icon_3_title.png";
	    	$scope.theQquery = 319;
	        break;
	    case 'contact':
	    	$scope.title = "吃喝玩乐";
	    	$scope.titleImg = "img/icon_4_title.png";
	    	$scope.theQquery = 122;
	        break;
	    case 'origin':
	    	$scope.title = "原创精选";
	    	$scope.titleImg = "img/icon_5_title.png";
	    	$scope.theQquery = 333;
	        break;
	    default: 
	        console.log('routing error');
	}	

	//初始化页面
	
	var count = 20;
	$scope.loadNews = function(){
		$scope.page = 1;
		postListRes.query({
			theQquery: $scope.theQquery,
			page: $scope.page,
			count: count,
			include: 'title,thumbnail,author,date'
		}, function(data) {
			$scope.doneLoading = true;
			$scope.newsList = changeProtocol.changeImgProtocol(data.posts);
		});		
	}
	$scope.loadNews();

	$scope.page = 2; //把第2页的那6条新闻追加到页面上
	$rootScope.hasData = true;
	$scope.loadMore = function(){
		postListRes.query({
			theQquery: $scope.theQquery,
			page: $scope.page,
			count: count,
			include: 'title,thumbnail,author,date'
		}, function(moreData) {			
			for (var i = 0; i < moreData.posts.length; i++) {
				$scope.newsList.push(changeProtocol.changeSingleImgProtocol(moreData.posts[i]));
			}
			$scope.page ++; //每按一次追加6条新闻
			moreData.length === 0 ? $rootScope.hasData = false : $rootScope.hasData = true;
			$rootScope.$broadcast($rootScope.hasData);
		});
	}
})

.controller('searchCtrl', function($scope,$http,searchPostListRes,changeProtocol,$rootScope) {
	$scope.title = "搜索";
	$scope.newsList = [];
	//初始化页面	
	$scope.showLoader = false;
	var count = 20;

	//search title
	$scope.startSearch = function(){
		//initialize
		$scope.newsList = [];
		$scope.page = 1;
		$scope.showLoader = true;
		$scope.noResult = false;

		$scope.searchKeyword = $scope.inputKeyword; //get ketword from input
		searchPostListRes.query({
			search: $scope.searchKeyword,
			page: $scope.page,
			count: count,
			include: 'title,thumbnail,author,date'
		}, function(data) {			
			$scope.inputKeyword = "";
			$scope.newsList = changeProtocol.changeImgProtocol(data.posts);
			if ($scope.newsList.length >= data.count_total) {
				//hide loading icon when all posts are loaded
				$scope.showLoader = false;
			}
			if ($scope.newsList.length === 0) {
				$scope.noResult = true;
			}

		});
	}
	
	$rootScope.hasData = true;
	$scope.loadMore = function(){
		if ($scope.newsList.length !== 0) {
			searchPostListRes.query({
				search: $scope.searchKeyword,
				page: ++$scope.page,
				count: count,
				include: 'title,thumbnail,author,date'
			}, function(moreData) {
				for (var i = 0; i < moreData.posts.length; i++) {
					$scope.newsList.push(changeProtocol.changeSingleImgProtocol(moreData.posts[i]));
				}

				if ($scope.newsList.length >= moreData.count_total) {
					//hide loading icon when all posts are loaded
					$scope.showLoader = false;
				}

				moreData.length === 0 ? $rootScope.hasData = false : $rootScope.hasData = true;
				$rootScope.$broadcast($rootScope.hasData);
			});

		}

	}

})

.controller('contentCtrl', function($scope,postListRes,$stateParams) {
		$scope.title = "内容";
		$scope.newsList = [];
		$scope.relatedPost = [];
		var postId = parseInt($stateParams.id);
		var page = parseInt($stateParams.page-1);
		var theQquery = $stateParams.theQquery;
		var count = 20*($stateParams.page-1);

		$scope.theQquery = theQquery + '/';
		$scope.page = 1;

		postListRes.query({
			theQquery: theQquery,
			page: 1,
			count: (20*($stateParams.page-1)),
			include: 'title,author,date,categories,content,tags,thumbnail,url'
		}, function(data) {
			var k = 0;
			for (var i =0; i < data.posts.length; i++) {
				if(data.posts[i].id == postId){
					k = i;
				} else if($scope.relatedPost.length < 9) {
					//load 9 related posts
					var newPost = {
						title:data.posts[i].title,
						url:'#/news/' + data.posts[i].id + '/' + theQquery + '/1'
					}					
					$scope.relatedPost.push(newPost);
				}
			}

			$scope.post = data.posts[k];	
			//convert string to date
			$scope.post.date = new Date($scope.post.date);			
		});

})


.controller('main_contentCtrl', function($scope,main_postListRes,$stateParams) {
		$scope.title = "内容";
		$scope.newsList = [];
		$scope.relatedPost = [];
		$scope.page = 1;
		var postId = parseInt($stateParams.id);
		var page = parseInt($stateParams.page-1);
		var count = 20*($stateParams.page-1);
		main_postListRes.query({
			page: 1,
			count: (20*($stateParams.page-1)),
			include: 'title,author,date,categories,content,tags,thumbnail,url,slug'
		}, function(data) {			
			var k = 0;
			for (var i = 0; i < data.posts.length; i++) {
				if(data.posts[i].id == postId){
					k = i;
				} else if($scope.relatedPost.length < 9) {
					//load 9 related posts
					var newPost = {
						title:data.posts[i].title,
						url:'#/news/' + data.posts[i].id + '/1'
					}					
					$scope.relatedPost.push(newPost);					
				}
			}
			$scope.post = data.posts[k];
			//convert string to date
			$scope.post.date = new Date($scope.post.date);
			
		});


})


.controller('search_contentCtrl', function($scope,searchPostListRes,$stateParams) {
		$scope.title = "内容";
		$scope.newsList = [];
		$scope.relatedPost = [];

		var postId = parseInt($stateParams.id);
		var page = parseInt($stateParams.page);
		var keyword = $stateParams.keyword;
		var count = 20*($stateParams.page);
		
		$scope.page = page;
		$scope.searchKeyword = keyword;

		searchPostListRes.query({
			search: $scope.searchKeyword,
			page: 1,
			count: count,
			include: 'title,author,date,categories,content,tags,thumbnail,url'
		}, function(data) {
			var k = 0;
			for (var i = 0; i < data.posts.length; i++) {
				if(data.posts[i].id == postId){
					k = i;
				} else if($scope.relatedPost.length < 9) {
					//load 9 related posts
					var newPost = {
						title:data.posts[i].title,
						url:'#/search/' + data.posts[i].id + '/' + $scope.searchKeyword + '/2'
					}					
					$scope.relatedPost.push(newPost);
				}
			}
			$scope.post = data.posts[k];
			//convert string to date
			$scope.post.date = new Date($scope.post.date);			


		});

})


.controller('footerCtrl', function($scope,$state) {
	$scope.$state = $state;	
	$scope.tagGroup = ["services", "news", "about", "contact", "origin"];

	$scope.$watch('$state.current.name', function(newValue) {
		if ($state.current.name == 'content' || $state.current.name == 'mainContent' || $state.current.name == 'searchContent') {
			$scope.displayContent = true
		} else {
			$scope.displayContent = false
		}

		
	});

	
});