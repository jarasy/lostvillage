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
var MapView = (function (_super) {
    __extends(MapView, _super);
    function MapView() {
        var _this = _super.call(this) || this;
        _this.tempHpPlayer = 0;
        _this.tempMpPlayer = 0;
        _this.tempHpFs = 0;
        _this.tempMpFs = 0;
        _this.tempHpPet = 0;
        _this.tempMpPet = 0;
        _this.skinName = "resource/scene/MapView.exml";
        var data = JSON.parse("{\"openId\":\"" + egret.localStorage.getItem("openId") + "\"}");
        Sk_PostJSON.SendTo(data, _this.getPlays, "", Sk_DATA.GET_PLAYS_URL, _this);
        return _this;
    }
    MapView.prototype.onComplete = function () {
        //背景
        this.map = new lv.Map(this);
        this.map.init();
        this.map.x = 80;
        this.map.y = 300;
        this.addChild(this.map);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toBack, this);
    };
    MapView.prototype.getPlays = function (result, self) {
        egret.localStorage.setItem("players", result.data);
    };
    MapView.prototype.getMonsters = function () {
        var data = JSON.parse("{\"openId\":\"" + egret.localStorage.getItem("openId") + "\",\"mapId\":\"1\"}");
        Sk_PostJSON.SendTo(data, this.toFighting, "", Sk_DATA.GET_MONSTERS_URL, this);
    };
    MapView.prototype.toFighting = function (result, self) {
        //console.log(result.data);
        egret.localStorage.setItem("monsterData", result.data);
        var fs = new FightingScene();
        SceneManager.Instance.pushScene(fs);
    };
    MapView.prototype.toBack = function () {
        var s1 = new GameScene();
        SceneManager.Instance.changeScene(s1);
    };
    return MapView;
}(Scene));
__reflect(MapView.prototype, "MapView");
