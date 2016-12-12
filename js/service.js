angular.module('wraf.services', [])

// about page/contact page/services page
.factory('PageRes', ['$resource', 'siteInfo', function($resource,siteInfo) {
    var Page = $resource(siteInfo.wpApiUrl + 'p=:pageId', {
      pageId: '@pageId'
    }, {
      get: {
        method: 'GET',
        header: {'Content-Type' : 'application/json; charset=UTF-8'}
      }
    });
    return Page;
}])

// post list factory
.factory('postListRes', ['$resource', 'siteInfo', function($resource,siteInfo){
	var postList = $resource(siteInfo.wpApiUrl + 'get_category_posts&category_id=:theQquery'+'&count=:count'+'&page=:page' + '&include=:include',{ //
	  theQquery:'@theQquery',
	  page: '@page',
	  count: '@count',
	  include: '@include'
	},{
	    query:{
	      method:'GET',
	      cache:true,
	      header: {'Content-Type' : 'application/json; charset=UTF-8'}
	      //isArray:true
	    }
	  }
	);
	return postList;
}])

// search factory
.factory('searchPostListRes', ['$resource', 'siteInfo', function($resource,siteInfo){
	var searchPostList = $resource(siteInfo.wpApiUrl + 'get_search_results' + '&search=:search' + '&include=:include',{ //
		search:'@search',
		page: '@page',
		count: '@count',
		include: '@include'
	},{
	    query:{
	      method:'GET',
	      cache:false,
	      header: {'Content-Type' : 'application/json; charset=UTF-8'}
	      //isArray:true
	    }
	  }
	);
	return searchPostList;
}])


// main page post list factory
.factory('main_postListRes', ['$resource', 'siteInfo', function($resource,siteInfo){
	var postList = $resource(siteInfo.wpApiUrl + 'get_recent_posts'+'&count=:count'+'&page=:page' + '&include=:include',{ //
	  page: '@page',
	  count: '@count',
	  include: '@include'
	},{
	    query:{
	      method:'GET',
	      cache:true,
	      header: {'Content-Type' : 'application/json; charset=UTF-8'}
	      //isArray:true
	    }
	  }
	);
	//https://ottawazine.com/?json=get_recent_posts&count=20&page=1&callback=show_posts_widget
	return postList;
}])

//single post factory
.factory('postRes', ['$resource', 'siteInfo', function($resource,siteInfo) {
	var post = $resource(siteInfo.wpApiUrl + 'get_post&post_id=:postId', {
	  postId: '@postId'
	}, {
	  query: {
	    method: 'GET',
	    header: {'Content-Type' : 'application/json; charset=UTF-8'}
	  }
	});
	return post;
}])


.factory('changeProtocol', function(){
	var changeProtocol = {
		changeImgProtocol: function(posts){
			for (var i = 0; i < posts.length; i++) {
				if (posts[i].thumbnail) {
					posts[i].thumbnail = posts[i].thumbnail.replace("https://", "http://");
					posts[i].thumbnail_images.full.url = posts[i].thumbnail_images.full.url.replace("https://", "http://");
				}				
			}
			return posts;
		},
		changeSingleImgProtocol:function(post){
			post.thumbnail = post.thumbnail.replace("https://", "http://");
			return post;
		}
	}
	return changeProtocol;
})

