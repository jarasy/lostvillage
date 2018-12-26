var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by yangsong on 2014/12/3.
 * 各种效果工具类
 */
var EffectUtils = (function () {
    function EffectUtils() {
    }
    /**
     * 类似mac上图标上下抖动的效果
     * @param obj 要抖动的对象，使用
     * @param initY 要抖动的对象的初始Y值，原始位置
     * @example eval(macIconShake("this.btnIcon", 100));
     * @returns {string} 返回的是一个要执行代码的字符串，通过eval执行
     */
    EffectUtils.macIconShake = function (obj, initY) {
        //抖动频率[时间，移动距离]，可修改
        var arr = [
            [20, 300],
            [15, 300],
            [10, 300],
            [5, 300]
        ];
        var str = "egret.Tween.get(" + obj + ")";
        for (var i = 0, len = arr.length; i < len; i++) {
            str += ".to({'y':" + initY + "-" + arr[i][0] + "}, " + arr[i][1] + ")";
            str += ".to({'y':" + initY + "}, " + arr[i][1] + ")";
        }
        str += ";";
        return str;
    };
    /**
     * 开始闪烁
     * @param obj
     */
    EffectUtils.startFlicker = function (obj, alphaTime) {
        obj.alpha = 1;
        egret.Tween.get(obj).to({ "alpha": 0 }, alphaTime).to({ "alpha": 1 }, alphaTime).call(this.startFlicker, this, [obj, alphaTime]);
        console.log(obj.alpha + "==" + alphaTime);
    };
    /**
     * 停止闪烁
     * @param obj
     */
    EffectUtils.stopFlicker = function (obj) {
        egret.Tween.removeTweens(obj);
    };
    /**
     * 开始上下抖动
     * @param obj
     */
    EffectUtils.startShake = function (obj, shakeTime, shakeHeight) {
        if (shakeHeight === void 0) { shakeHeight = 20; }
        if (!obj["shakeStartY"]) {
            obj["shakeStartY"] = obj.y;
            obj["shakeEndY"] = obj.y + shakeHeight;
        }
        var startY = obj["shakeStartY"];
        var endY = obj["shakeEndY"];
        egret.Tween.get(obj).to({ "y": endY }, shakeTime).to({ "y": startY }, shakeTime).call(this.startShake, this, [obj, shakeTime]);
    };
    /**
     * 停止上下抖动
     * @param obj
     */
    EffectUtils.stopShake = function (obj) {
        delete obj["shakeStartY"];
        delete obj["shakeEndY"];
        egret.Tween.removeTweens(obj);
    };
    /**
     * 设置显示对象“黑化”效果
     */
    EffectUtils.setDisplayObjectBlack = function (obj) {
        //颜色矩阵数组
        var colorMatrix = [
            1, 0, 0, 0, -255,
            0, 1, 0, 0, -255,
            0, 0, 1, 0, -255,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        obj.filters = [colorFlilter];
    };
    /**
     * 设置显示对象“灰化”效果
     */
    EffectUtils.setDisplayObjectGray = function (obj) {
        //颜色矩阵数组
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        obj.filters = [colorFlilter];
    };
    return EffectUtils;
}());
__reflect(EffectUtils.prototype, "EffectUtils");
