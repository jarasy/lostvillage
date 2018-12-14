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
var BackpackScene = (function (_super) {
    __extends(BackpackScene, _super);
    function BackpackScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/scene/BackpackScene.exml";
        _this.bindData([{ label: "爱施德", num: "x2" }, { label: "爱施德", num: "x2" }, { label: "爱施德", num: "x2" }, { label: "爱施德", num: "x2" }, { label: "爱施德", num: "x2" }, { label: "爱施德", num: "x2" }, { label: "爱施德", num: "x2" }, { label: "爱施德", num: "x2" }, { label: "爱施德", num: "x2" }, { label: "爱施德", num: "x2" }]);
        return _this;
    }
    BackpackScene.prototype.onComplete = function () {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toBack, this);
    };
    BackpackScene.prototype.toBack = function () {
        SceneManager.Instance.popScene();
    };
    /** 进行数据绑定 */
    BackpackScene.prototype.bindData = function (data) {
        var arrCollection = new eui.ArrayCollection(data);
        this.list.dataProvider = arrCollection;
    };
    return BackpackScene;
}(Scene));
__reflect(BackpackScene.prototype, "BackpackScene");
