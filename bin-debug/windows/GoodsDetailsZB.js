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
var GoodsDetailsZB = (function (_super) {
    __extends(GoodsDetailsZB, _super);
    function GoodsDetailsZB(gid, bid, type) {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/windows/GoodsDetailsZB.exml";
        _this.id = bid;
        _this.type = type;
        var data = JSON.parse("{\"id\":" + gid + "}");
        Sk_PostJSON.SendTo(data, _this.onLoadLab, "", Sk_DATA.GET_GOODSBYID_URL, _this);
        return _this;
    }
    GoodsDetailsZB.prototype.onComplete = function () {
        if (this.type == 1) {
            this.btn_zb.label = "卸下";
            this.btn_zb.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toQx, this);
        }
        else {
            this.btn_zb.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toZb, this);
        }
        this.btn_dq.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toDq, this);
        this.btn_qx.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toClose, this);
    };
    GoodsDetailsZB.prototype.onLoadLab = function (result, self) {
        var property = String(result.data.parameter).split("_");
        self.wz = property[0];
        self.lab_hp.text = property[1] + "";
        self.lab_mp.text = property[2] + "";
        self.lab_gj.text = property[3] + "";
        self.lab_fy.text = property[4] + "";
        self.lab_sd.text = property[5] + "";
        self.lab_hx.text = property[6] + "";
        self.lab_name.text = result.data.name;
    };
    GoodsDetailsZB.prototype.toZb = function () {
        var data = JSON.parse("{\"id\":\"" + this.id + "\",\"wz\":\"" + this.wz + "\",\"roleId\":\"" + egret.localStorage.getItem("roleId") + "\",\"type\":\"" + 2 + "\"}");
        Sk_PostJSON.SendTo(data, this.over, "", Sk_DATA.TO_ZB_URL, this);
    };
    GoodsDetailsZB.prototype.toDq = function () {
        var data = JSON.parse("{\"id\":\"" + this.id + "\"}");
        Sk_PostJSON.SendTo(data, this.over, "", Sk_DATA.TO_DQALL_URL, this);
    };
    GoodsDetailsZB.prototype.toQx = function () {
        var data = JSON.parse("{\"id\":\"" + this.id + "\"}");
        Sk_PostJSON.SendTo(data, this.over, "", Sk_DATA.TO_QX_URL, this);
    };
    GoodsDetailsZB.prototype.toClose = function () {
        SceneManager.Instance.popScene();
    };
    GoodsDetailsZB.prototype.over = function (result, self) {
        var data = JSON.parse("{\"openId\":\"" + egret.localStorage.getItem("openId") + "\"}");
        Sk_PostJSON.SendTo(data, self.toLoadProperty, "", Sk_DATA.GET_ROLEPROPERTY_URL, this);
    };
    GoodsDetailsZB.prototype.toLoadProperty = function (result, self) {
        egret.localStorage.setItem("property", result.data);
        SceneManager.Instance.popScene();
        var bs = new BackpackScene();
        SceneManager.Instance.changeScene(bs);
    };
    return GoodsDetailsZB;
}(Scene));
__reflect(GoodsDetailsZB.prototype, "GoodsDetailsZB");
