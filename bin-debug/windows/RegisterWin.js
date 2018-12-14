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
var RegisterWin = (function (_super) {
    __extends(RegisterWin, _super);
    function RegisterWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/windows/RegisterWin.exml";
        return _this;
    }
    RegisterWin.prototype.onComplete = function () {
        this.btn_ok.touchEnabled = true;
        this.btn_ok.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapclose, this);
    };
    RegisterWin.prototype.onTapclose = function () {
        SceneManager.Instance.popScene();
        console.log(this.ipt_name.text);
        var s1 = new GameScene();
        //切换到首页
        SceneManager.Instance.changeScene(s1);
    };
    return RegisterWin;
}(Scene));
__reflect(RegisterWin.prototype, "RegisterWin");
