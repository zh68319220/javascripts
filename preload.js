/**
 * 图片预加载
 * 
 */
(function(win){
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

  win.Preloader = win.Preloader === undefined ? Preloader : win.Preloader;
})(window);

Preloader({
  resources: [
    'http://news.sohu.com/upload/yufeng/junshi/images/z2.pn1g',
    'http://news.sohu.com/upload/yufeng/junshi/images/body_bg.jpg',
    'http://news.sohu.com/upload/yufeng/junshi/images/z7.jpg',
    'http://news.sohu.com/upload/yufeng/junshi/images/z1.png',
    'http://news.sohu.com/upload/yufeng/junshi/images/angle.png'
  ],
  onProgress: function(percent){
    console.log(percent*100 + '%');
  },
  onComplete: function(t, e){
    console.log('finished. '+(t-e)+' success, '+e+' failed.');

    Preloader({
      resources: [
        'http://news.sohu.com/upload/yufeng/junshi/images/z2.png',
        'http://news.sohu.com/upload/yufeng/junshi/images/z3.png'
      ],
      onProgress: function(percent){
        console.log(percent*100 + '%');
      },
      onComplete: function(t, e){
        console.log('finished. '+(t-e)+' success, '+e+' failed.');
      }
    }).start();
  }
}).start();
