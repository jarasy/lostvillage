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
var lv;
(function (lv) {
    /**
     * 地图
     */
    var Node = (function (_super) {
        __extends(Node, _super);
        function Node(__posx, __posy) {
            var _this = _super.call(this) || this;
            var texture = RES.getRes("pot1_png");
            _this.posx = __posx;
            _this.posy = __posy;
            _this = _super.call(this, texture) || this;
            _this.height = _this.width = 60;
            _this.fill = false;
            return _this;
        }
        Node.prototype.doFillPot = function () {
            this.texture = RES.getRes("pot2_png");
            this.fill = true;
        };
        Node.prototype.doGoed = function () {
            this.texture = RES.getRes("pot3_png");
            this.fill = true;
        };
        Node.prototype.doIn = function () {
            this.texture = RES.getRes("pot2_png");
            this.fill = true;
        };
        Node.prototype.clean = function () {
            this.prenode = null;
        };
        Node.prototype.getPos = function () {
            return [this.posx, this.posy];
        };
        Node.prototype.isFill = function () {
            return this.fill;
        };
        return Node;
    }(egret.Bitmap));
    lv.Node = Node;
    __reflect(Node.prototype, "lv.Node");
})(lv || (lv = {}));
