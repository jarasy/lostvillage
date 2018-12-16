var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var LoadingWin = (function (_super) {
    __extends(LoadingWin, _super);
    function LoadingWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/windows/LoadingWin.exml";
        return _this;
    }
    LoadingWin.prototype.onComplete = function () {
        // 监听帧事件,每帧都让loading图片转动
        this.addEventListener(egret.Event.ENTER_FRAME, this.updata, this);
    };
    LoadingWin.prototype.updata = function () {
        // 旋转
        this.img_loading.rotation += 5;
    };
    return LoadingWin;
}(Scene));
__reflect(LoadingWin.prototype, "LoadingWin");
