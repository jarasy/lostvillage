var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//发送数据到服务器
var UTILS = (function () {
    function UTILS() {
    }
    /**
     * 获取随机数[min,max]
     */
    UTILS.GetRandomIntInclusive = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    };
    return UTILS;
}());
__reflect(UTILS.prototype, "UTILS");
