(function (window, document) {
    window.shareViaWechat = function (type, title, thumbUrl, webpageUrl,slug) {
        if (typeof Wechat === "undefined") {
            alert("Wechat plugin is not installed.");
            return false;
        }
        Wechat.isInstalled(function (installed) {
            if (!installed) {
                alert("Wechat is not installed" );
            }
            
        }, function (reason) {
            alert("Failed: " + reason);
        });

        var params = {
            scene: type  // 0 会话 1 朋友圈 2 收藏
        };
        params.message = {
            title: "",
            description: "",
            mediaTagName: "CANADAZINE",
            //messageExt: "这是第三方带的测试字段",
            //messageAction: "<action>dotalist</action>",
            media: {}
        };

        params.message.title = title;
        params.message.description = slug;
        params.message.thumb = thumbUrl; //"https://cordova.apache.org/images/cordova_256.png";
        params.message.media.type = Wechat.Type.LINK;
        params.message.media.webpageUrl = webpageUrl; //"http://tech.qq.com/";


        Wechat.share(params, function () {
            //alert("Success");
        }, function (reason) {
            //alert("Failed: " + reason);
        });
        return true;
    };

})(window, document);