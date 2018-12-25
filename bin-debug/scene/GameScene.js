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
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/scene/GameScene.exml";
        return _this;
    }
    GameScene.prototype.onComplete = function () {
        //console.log(egret.localStorage.getItem("property"));
        var data = egret.localStorage.getItem("property");
        egret.localStorage.setItem("roleId", data.id);
        this.dj.text = data.level;
        this.mc.text = data.name;
        this.hs.text = data.hs;
        this.property.text = data.hp + "_" + data.mp + "_" + data.gj + "_" + data.fy + "_" + data.sd + "_" + data.hx;
        this.btn_bb.touchEnabled = true;
        this.btn_bb.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toShowBB, this);
        this.btn_map.touchEnabled = true;
        this.btn_map.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toShowMap, this);
    };
    GameScene.prototype.onLoadTx = function (base64, self) {
        var saveImage = new Image;
        saveImage.onload = function () {
            var texture = new egret.Texture();
            var bitmapdata = new egret.BitmapData(saveImage);
            texture.bitmapData = bitmapdata;
            var imgReview = new egret.Bitmap(texture);
            imgReview.height = 90;
            imgReview.width = 90;
            imgReview.x = 15;
            imgReview.y = 15;
            self.addChild(imgReview);
        };
        saveImage.src = "data:image/png;base64," + base64.data;
    };
    GameScene.prototype.toShowBB = function () {
        var bs = new BackpackScene();
        SceneManager.Instance.changeScene(bs);
    };
    GameScene.prototype.toShowMap = function () {
        var mv = new MapView();
        SceneManager.Instance.changeScene(mv);
    };
    return GameScene;
}(Scene));
__reflect(GameScene.prototype, "GameScene");
