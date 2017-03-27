(function(global, factory){
    "use strict";
    if(typeof module === "object" && typeof module.exports === "object"){
        module.exports = factory(global);
    }else{
        factory(global);
    }
})(typeof window !== undefined ? window : this, function(window){
    /* preload */
    function Preloader(config){
        return new Preloader.init(config);
    };
    Preloader.init = function(conf){
        this.resources = conf.resources || [],
        this.onProgress = conf.onProgress || null,
        this.onComplete = conf.onComplete || null;
        this.total = this.resources.length;
        this.loaded = 0;
        this.fails = 0;
    };
    Preloader.init.prototype.start = function(){
        this.loadImgs();
    };
    Preloader.init.prototype.loadImgs = function(){
        var _this = this;
        for(var i = 0; i <= this.resources.length - 1; i++){
        var img = new Image();
        img.onload = function(){
            ++_this.loaded == _this.total ? _this.onComplete(_this.total, _this.fails) : _this.onProgress( _this.loaded / _this.total );
        };
        img.onerror = function(){
            _this.fails ++;
            ++_this.loaded == _this.total ? _this.onComplete(_this.total, _this.fails) : _this.onProgress( _this.loaded / _this.total );
        };
        img.src = this.resources[i];
        }
    };
    /* ajax */
    var Ajax = function(options){
    if(!options){
        return
    }
    var url = options.url || "",
        type = options.type || "GET",
        data = options.data || null,
        asynchronous = options.asynchronous || true,
        success = options.success || function(){},
        fail = options.fail || function(){};

    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new window.XMLHttpRequest();
    }
    else if(window.ActiveXObject){
        xhr = new window.ActiveXObject();
    }
    else{
        throw new Error("Your browser does not support XMLHTTP");
    }

    var stateChange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                var json = {};
                eval("json = " + xhr.responseText || {});
                success(json);
            }else{
                fail(xhr.status);
            }
            }else{
            fail(-1);
            }
        };

        if(xhr != null && url != ""){
            xhr.onreadystatechange = stateChange;
            xhr.open(type, url, asynchronous);
            xhr.send(JSON.stringify(data));
        }
    };
    /* 事件监听 */
    var EventListener = {
        addEvent : function(ele, tp, fn, capture){
            var capture = capture || false;
            if(ele.addEventListener){
                ele.addEventListener(tp, fn, capture);
            }
            else if(ele.attachEvent){
                ele.attachEvent("on" + tp, fn);
            }
            else{
                ele["on" + tp] = fn;
            }
        },
        removeEvent : function(ele, tp, fn, capture){
            var capture = capture || false;
            if(ele.removeEventListener){
                ele.removeEventListener(tp, fn, capture);
            }
            else if(ele.detachEvent){
                ele.detachEvent("on" + tp, fn);
            }
            else{
                ele["on" + tp] = null;
            }
        }
    };

    /* 函数节流 */
    var throttle = function(fn, delay){
        return function(){
            var _args = arguments;
            if(fn.tId == null){
            clearTimeout(fn.tId);
            fn.tId = setTimeout(function(){
                fn.apply(this, _args);
                fn.tId = null;
            }, delay);
            }
        };
    };

    window.EventListener = EventListener,
    window.throttle = throttle,
    window.Ajax = Ajax,
    window.Preloader = Preloader;
});