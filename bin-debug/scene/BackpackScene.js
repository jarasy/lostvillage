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
        var data = JSON.parse("{\"roleId\":\"" + egret.localStorage.getItem("roleId") + "\",\"type\":\"1\"}");
        Sk_PostJSON.SendTo(data, _this.toLoadData1, "", Sk_DATA.GET_GOODSBYTYPE_URL, _this);
        data = JSON.parse("{\"roleId\":\"" + egret.localStorage.getItem("roleId") + "\",\"type\":\"2\"}");
        Sk_PostJSON.SendTo(data, _this.toLoadData2, "", Sk_DATA.GET_GOODSBYTYPE_URL, _this);
        Sk_PostJSON.SendTo(data, _this.toLoadData5, "", Sk_DATA.GET_ZBGOODS_URL, _this);
        data = JSON.parse("{\"roleId\":\"" + egret.localStorage.getItem("roleId") + "\",\"type\":\"3\"}");
        Sk_PostJSON.SendTo(data, _this.toLoadData3, "", Sk_DATA.GET_GOODSBYTYPE_URL, _this);
        data = JSON.parse("{\"roleId\":\"" + egret.localStorage.getItem("roleId") + "\",\"type\":\"4\"}");
        Sk_PostJSON.SendTo(data, _this.toLoadData4, "", Sk_DATA.GET_GOODSBYTYPE_URL, _this);
        return _this;
    }
    BackpackScene.prototype.onComplete = function () {
        var data = egret.localStorage.getItem("property");
        egret.localStorage.setItem("roleId", data.id);
        this.lab_dj.text = data.level;
        this.lab_hp.text = data.hp;
        this.lab_mp.text = data.mp;
        this.lab_gj.text = data.gj;
        this.lab_fy.text = data.fy;
        this.lab_sd.text = data.sd;
        this.lab_hx.text = data.hx;
        switch (data.rank) {
            case 1:
                this.lab_rank.text = "黄";
                break;
            case 2:
                this.lab_rank.text = "玄";
                break;
            case 3:
                this.lab_rank.text = "地";
                break;
            case 4:
                this.lab_rank.text = "天";
                break;
            default:
        }
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toBack, this);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChange, this);
        this.list0.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChange0, this);
        this.list1.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChange1, this);
        this.list2.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChange1, this);
    };
    BackpackScene.prototype.onChange = function (e) {
        //获取点击消息
        console.log(this.list.selectedItem, this.list.selectedIndex);
    };
    BackpackScene.prototype.onChange0 = function (e) {
        //获取点击消息
        console.log(this.list0.selectedItem.bid, this.list0.selectedIndex);
        var gd = new GoodsDetailsZB(this.list0.selectedItem.gid, this.list0.selectedItem.bid, this.list0.selectedItem.equipped);
        SceneManager.Instance.pushScene(gd);
    };
    BackpackScene.prototype.onChange1 = function (e) {
        //获取点击消息
        console.log(this.list1.selectedItem, this.list1.selectedIndex);
    };
    BackpackScene.prototype.onChange2 = function (e) {
        //获取点击消息
        console.log(this.list2.selectedItem, this.list2.selectedIndex);
    };
    BackpackScene.prototype.toBack = function () {
        var s1 = new GameScene();
        SceneManager.Instance.changeScene(s1);
    };
    /** 进行数据绑定 */
    BackpackScene.prototype.bindData = function (list, data) {
        var arrCollection = new eui.ArrayCollection(data);
        list.dataProvider = arrCollection;
    };
    /** 进行数据绑定 */
    BackpackScene.prototype.bindZbData = function (list, data) {
        for (var i = 0; i < data.length; i++) {
            console.log(data[i]);
            if (data[i].equipped == 1) {
                data[i].count = "已装备";
            }
            else {
                data[i].count = "";
            }
        }
        var arrCollection = new eui.ArrayCollection(data);
        list.dataProvider = arrCollection;
    };
    BackpackScene.prototype.toLoadData1 = function (result, self) {
        self.bindData(self.list, result.data);
        self.viewStack.selectedIndex = 0;
    };
    BackpackScene.prototype.toLoadData2 = function (result, self) {
        self.bindZbData(self.list0, result.data);
    };
    BackpackScene.prototype.toLoadData3 = function (result, self) {
        self.bindData(self.list1, result.data);
    };
    BackpackScene.prototype.toLoadData4 = function (result, self) {
        self.bindData(self.list2, result.data);
    };
    BackpackScene.prototype.toLoadData5 = function (result, self) {
        var arr = [];
        for (var _i = 0, _a = result.data; _i < _a.length; _i++) {
            var item = _a[_i];
            var property = String(item.parameter).split("_");
            arr[Number(property[0])] = item.name;
        }
        self.lab_hq.text = arr[0] == null ? "无" : arr[0];
        self.lab_tb.text = arr[1] == null ? "无" : arr[1];
        self.lab_st.text = arr[2] == null ? "无" : arr[2];
        self.lab_sb.text = arr[3] == null ? "无" : arr[3];
        self.lab_tui.text = arr[4] == null ? "无" : arr[4];
    };
    return BackpackScene;
}(Scene));
__reflect(BackpackScene.prototype, "BackpackScene");
