(function(global, factory){
    "use strict";
    if(typeof module === 'object' && module.exports === 'object'){
        module.exports = factory(global);
    }else{
        factory(global);
    }
})(typeof window !== undefined ? window : this, function(window){
    var setWebkitStyle = function(ele, style, val){
        ele.style[style] = val;
        ele.style['webkit' + style] = val;
    };

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

    function IwatchMenu(opt){
        this.clientWidth = document.documentElement.clientWidth,
        this.clientHeight = document.documentElement.clientHeight,
        this.view = document.getElementsByClassName('iwatch-view')[0],
        this.container = document.getElementsByClassName('iwatch-container')[0],
        this.centerY = this.clientHeight / 2,
        this.centerX = this.clientWidth / 2,
        this.items = [],
        this.r = opt.r, //圆半径
        this.dy = dx = opt.dpos, // container的偏移量
        this.dr = Math.sqrt((this.clientHeight/2) * (this.clientHeight/2) + (this.clientWidth/2) * (this.clientWidth/2)), // 设备中心与设备边缘的最远距离
        this.colors = opt.colors,
        this.row = opt.row,
        this.col = opt.col,
        this.total = opt.total,
        this.data = opt.data.data;

        this.init();
    };

    IwatchMenu.prototype.init = function(){
        var _this = this;
        setWebkitStyle(this.container, 'Transform', 'translate(0, 0)');
        this.container.x = 0,
        this.container.y = 0,
        this.container.sx = 0,
        this.container.sy = 0;

        for(var i = 0; i <= this.row; i ++){
            for(var j = 0; j <= this.col; j++){
                var a = document.createElement('a');
                a.href = '#';
                if( i % 2 == 1 ){
                    a.x = j*this.r*1.7;
                }else{
                    a.x = j*this.r*1.7 - this.r;
                }
                a.y = i*this.r*1.7;

                var ix = a.x + this.r,
                iy = a.y + this.r + this.clientHeight/10;
                var xnum = ( this.dr - Math.sqrt((this.centerX - ix) * (this.centerX - ix) + (this.centerY - iy) * (this.centerY - iy)) ) / this.dr;
                a.xnum = xnum;
                setWebkitStyle(a, 'Transform', 'translate('+a.x+'px, '+a.y+'px) scale('+xnum+','+xnum+')');
                if(i * j > this.data.length - 1){
                    a.innerHTML = '<i class="nav-icon"></i><p class="nav-title">跑步</p><p class="nav-num">1000万</p>';
                }else{
                    this.data[i*j].num = parseInt(this.data[i*j].num) >= 10000 ? parseInt(this.data[i*j].num/10000) + "万" : this.data[i*j].num;
                    a.innerHTML = '<i class="nav-icon" style="background: url('+this.data[i*j].img_url+') no-repeat;"></i><p class="nav-title">'+this.data[i*j].title+'</p><p class="nav-num">'+this.data[i*j].num+'</p>';
                }
                a.style.background = this.getRandomColor();

                this.container.appendChild(a);
                this.items.push(a);
            }
        }

        this.view.addEventListener('touchstart', function(e){
            e.preventDefault();
            e.stopPropagation();
            var touch = e.touches[0];
            _this.view.sx = touch.clientX,
            _this.view.sy = touch.clientY;
        }, false);

        this.view.addEventListener('touchmove', function(e){
            e.preventDefault();
            e.stopPropagation();
            var touch = e.touches[0],
            mx = touch.clientX - _this.view.sx,
            my = touch.clientY - _this.view.sy;
            // 设置边界
            if( (mx + _this.container.x) > _this.r * 1.7 * _this.col/2 || (mx + _this.container.x) < -_this.r * 1.7 * _this.col ){
                return;
            }else if( (my + _this.container.y) > _this.r * 1.7 * _this.row/2 || (my + _this.container.y) < -_this.r * 1.7 * _this.row ){
                return;
            }
            // 容器的移动
            _this.container.x = mx + _this.container.x;
            _this.container.y = my + _this.container.y;
            setWebkitStyle(_this.container, 'Transform', 'translate('+_this.container.x+'px, '+_this.container.y+'px)');
            _this.view.sx = touch.clientX,
            _this.view.sy = touch.clientY;
            // 每一项的宽高变化
            for(var i = 0; i <= _this.items.length - 1; i++){
                var ix = _this.items[i].x + _this.container.x - _this.container.sx + _this.r,
                iy = _this.items[i].y + _this.clientHeight/10 + _this.container.y - _this.container.sy + _this.r;
                // 距离中心越远 系数越小
                var xnum = ( _this.dr - Math.sqrt((_this.centerX - ix) * (_this.centerX - ix) + (_this.centerY - iy) * (_this.centerY - iy)) ) / _this.dr;
                setWebkitStyle(_this.items[i], 'Transform', 'translate('+_this.items[i].x+'px, '+_this.items[i].y+'px) scale('+xnum+','+xnum+')');
            }
        }, false);
        this.view.addEventListener('touchend', function(e){}, false);

        this.tap(this.container, function(e){
            e.preventDefault();
            var target = e.target.nodeName.toLowerCase() == 'p' || e.target.nodeName.toLowerCase() == 'i' ? e.target.parentNode : e.target;
            if(target.nodeName.toLowerCase() == 'a'){
                console.log(target);
            }
        });
    };

    IwatchMenu.prototype.tap = function(dom, callBack){
        var startTime = 0,
        delayTime = 200,
        isMove = false;
        dom.addEventListener('touchstart', function(e){
            startTime = Date.now();
        }, false);
        dom.addEventListener("touchmove",function(e){
            //如果发生了移动就改变isMove的值
            isMove=true;  
        });
        dom.addEventListener("touchend",function(e){
            //如果发生了移动就不执行回调  
            if(isMove) {
                isMove = false;
                return;
            }
            //如果大于延时时间就不执行回调函数  
            if(Date.now()-startTime>delayTime) return;
            callBack(e);
        });
    };

    IwatchMenu.prototype.getRandomColor = function(){
        return this.colors[parseInt(Math.random()*6)];
    };

    window.IwatchMenu = IwatchMenu;
});