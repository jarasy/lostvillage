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
    var Map = (function (_super) {
        __extends(Map, _super);
        function Map(parent) {
            var _this = _super.call(this) || this;
            _this.map = [];
            _this.mapsize = 8; //必须奇数
            _this.playTurn = true;
            _this.block = 0.01;
            _this.tap = 0;
            _this.px = UTILS.GetRandomIntInclusive(0, _this.mapsize - 1);
            _this.py = UTILS.GetRandomIntInclusive(0, _this.mapsize - 1);
            _this.p = parent;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        Map.prototype.onComplete = function () {
            this.init();
        };
        Map.prototype.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        };
        /**初始化*/
        Map.prototype.init = function () {
            while (this.numChildren) {
                this.removeChildAt(0);
            }
            this.map = [];
            this.createMap();
            this.tap = 0;
        };
        Map.prototype.toFighting = function () {
            var p = this.parent;
            p.getMonsters();
        };
        /**创建地图**/
        Map.prototype.createMap = function () {
            var node;
            //var txt:egret.TextField;
            for (var i = 0; i < this.mapsize; i++) {
                this.map[i] = [];
                for (var j = 0; j < this.mapsize; j++) {
                    node = new lv.Node(i, j);
                    node.x = i * 64;
                    node.y = j * 64;
                    this.map[i][j] = node;
                    node.touchEnabled = true; //开启触碰
                    node.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNodeClick, this);
                    this.addChild(node);
                    console.log(this.px + "-" + this.py);
                    if (i == this.px && j == this.py) {
                        node.doFillPot();
                    }
                }
            }
        };
        Map.prototype.lock = function () {
            this.playTurn = false;
        };
        Map.prototype.unlock = function () {
            this.playTurn = true;
        };
        Map.prototype.getNode = function (arr) {
            return this.map[arr[0]][arr[1]];
        };
        /**node被点击**/
        Map.prototype.onNodeClick = function (evt) {
            var node = evt.target;
            var n;
            var pos = node.getPos();
            console.log(Math.abs(pos[0] - this.px) + "---" + Math.abs(pos[1] - this.py));
            if (pos[0] - this.px == 0 && pos[1] - this.py == 0) {
                this.toFighting();
            }
            else if (pos[0] - this.px > 0 && pos[1] - this.py == 0) {
                this.goRight();
            }
            else if (pos[0] - this.px < 0 && pos[1] - this.py == 0) {
                this.goLeft();
            }
            else if (pos[0] - this.px == 0 && pos[1] - this.py > 0) {
                this.goUp();
            }
            else if (pos[0] - this.px == 0 && pos[1] - this.py < 0) {
                this.goDown();
            }
            else if (Math.abs(pos[0] - this.px) > Math.abs(pos[1] - this.py)) {
                if (pos[0] > this.px) {
                    this.goRight();
                }
                else {
                    this.goLeft();
                }
            }
            else if (Math.abs(pos[0] - this.px) < Math.abs(pos[1] - this.py)) {
                if (pos[1] > this.py) {
                    this.goUp();
                }
                else {
                    this.goDown();
                }
            }
            else if (Math.abs(pos[0] - this.px) == Math.abs(pos[1] - this.py)) {
                if (Math.random() > 0.5) {
                    console.log(pos[0] + "-" + this.px);
                    if (pos[0] > this.px) {
                        this.goRight();
                    }
                    else {
                        this.goLeft();
                    }
                }
                else {
                    console.log(pos[1] + "-" + this.py);
                    if (pos[1] > this.py) {
                        this.goUp();
                    }
                    else {
                        this.goDown();
                    }
                }
            }
            //node.touchEnabled = false;
            //node.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onNodeClick,this);
            //this.showRound(node);
            //this.dispatchEventWith("nodeClick");
        };
        Map.prototype.goLeft = function () {
            var n;
            n = this.map[this.px - 1][this.py];
            console.log(n);
            n.doIn();
            n = this.map[this.px][this.py];
            this.px -= 1;
            n.doGoed();
        };
        Map.prototype.goRight = function () {
            var n;
            n = this.map[this.px + 1][this.py];
            console.log(n);
            n.doIn();
            n = this.map[this.px][this.py];
            this.px += 1;
            n.doGoed();
        };
        Map.prototype.goUp = function () {
            var n;
            n = this.map[this.px][this.py + 1];
            console.log(n);
            n.doIn();
            n = this.map[this.px][this.py];
            this.py += 1;
            n.doGoed();
        };
        Map.prototype.goDown = function () {
            var n;
            n = this.map[this.px][this.py - 1];
            console.log(n);
            n.doIn();
            n = this.map[this.px][this.py];
            this.py -= 1;
            n.doGoed();
        };
        Map.prototype.getRandomIntInclusive = function (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
        };
        return Map;
    }(egret.DisplayObjectContainer));
    lv.Map = Map;
    __reflect(Map.prototype, "lv.Map");
})(lv || (lv = {}));
