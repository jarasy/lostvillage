var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//发送数据到服务器
var RECKON = (function () {
    function RECKON() {
    }
    /**
     * 计算闪避
     */
    RECKON.GetMZ = function (lv1, lv2, sd1, sd2, rank1, rank2) {
        return (1 / (1 + (sd2 - sd1) / 120)) * (1 / (1 + (lv2 - lv1) / 120)) - 0.05;
    };
    /**
    * 计算会心
    */
    RECKON.GetHX = function (lv1, lv2, hx) {
        return (1 / (1 - (lv1 - lv2) / 80)) * (0.004 * hx) + 0.1;
    };
    /**
     * 计算攻击
     */
    RECKON.GetGJ = function (lv1, lv2, fy) {
        return (1 / (1 - (lv1 - lv2) / 150)) * (1 / (1 + ((fy) / 160)));
    };
    return RECKON;
}());
__reflect(RECKON.prototype, "RECKON");
