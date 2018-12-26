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
var FightingScene = (function (_super) {
    __extends(FightingScene, _super);
    function FightingScene() {
        var _this = _super.call(this) || this;
        _this.grpMs = [];
        _this.imgMs = [];
        _this.labMs = [];
        _this.grpPs = [];
        _this.imgPs = [];
        _this.labPs = [];
        _this.fightingPlayerArr = new Array();
        _this.fightingMonsterArr = new Array();
        _this.tempArr = new Array();
        _this.gameOver = false;
        _this.skinName = "resource/scene/FightingScene.exml";
        return _this;
    }
    FightingScene.prototype.onComplete = function () {
        this.initData();
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toBack, this);
    };
    FightingScene.prototype.initData = function () {
        var p = SceneManager.Instance.getCurrentScene();
        this.tempHpPlayer = p.tempHpPlayer;
        this.tempMpPlayer = p.tempMpPlayer;
        this.tempHpFs = p.tempHpFs;
        this.tempMpFs = p.tempMpFs;
        this.tempHpPet = p.tempHpPet;
        this.tempMpPet = p.tempMpPet;
        var monsterData = egret.localStorage.getItem("monsterData");
        var players = egret.localStorage.getItem("players");
        this.award = monsterData.award;
        var monsters = monsterData.monsters;
        this.grpMs = [this.grp_monster_01, this.grp_monster_02, this.grp_monster_03, this.grp_monster_04, this.grp_monster_05, this.grp_monster_06];
        this.imgMs = [this.img_monster_01, this.img_monster_02, this.img_monster_03, this.img_monster_04, this.img_monster_05, this.img_monster_06];
        this.labMs = [this.lab_monster_01, this.lab_monster_02, this.lab_monster_03, this.lab_monster_04, this.lab_monster_05, this.lab_monster_06];
        this.grpPs = [this.grp_player_01, this.grp_player_02, this.grp_player_03];
        this.imgPs = [this.img_player_01, this.img_player_02, this.img_player_03];
        this.labPs = [this.lab_player_01, this.lab_player_02, this.lab_player_03];
        for (var i = 0; i < monsters.length; i++) {
            this.labMs[i].text = monsters[i].name;
            this.imgMs[i].source = RES.getRes("m_001_png");
            this.grpMs[i].visible = true;
            monsters[i].index = i;
            monsters[i].indexArr = i;
            monsters[i].lx = 0;
            monsters[i].tempHp = 0;
            monsters[i].tempMp = 0;
            monsters[i].died = 0;
            this.fightingMonsterArr.push(monsters[i]);
        }
        console.log(monsters);
        console.log(players);
        for (var i = 0; i < players.length; i++) {
            if (1 == players[i].type && players[i].hp - this.tempHpPlayer > 0) {
                this.labPs[i].text = players[i].name;
                this.imgPs[i].source = RES.getRes("play_01_png");
                this.grpPs[i].visible = true;
                players[i].index = i;
                players[i].indexArr = i;
                players[i].lx = 1;
                players[i].died = 0;
                this.fightingPlayerArr.push(players[i]);
            }
            else if (2 == players[i].type && players[i].hp - this.tempHpFs > 0) {
                this.labPs[i].text = players[i].name;
                this.imgPs[i].source = RES.getRes("play_02_png");
                this.grpPs[i].visible = true;
                players[i].index = i;
                players[i].indexArr = i;
                players[i].lx = 1;
                players[i].died = 0;
                this.fightingPlayerArr.push(players[i]);
            }
            else if (3 == players[i].type && players[i].hp - this.tempHpFs > 0) {
                this.labPs[i].text = players[i].name;
                this.imgPs[i].source = RES.getRes("play_03_png");
                this.grpPs[i].visible = true;
                players[i].index = i;
                players[i].indexArr = i;
                players[i].lx = 1;
                players[i].died = 0;
                this.fightingPlayerArr.push(players[i]);
            }
        }
        this.startRound();
    };
    //开始回合
    FightingScene.prototype.startRound = function () {
        if (!this.gameOver) {
            if (this.tempArr.length == 0) {
                console.log("回合结束啦啦啦啦啦");
                this.tempArr = this.fightingMonsterArr;
                this.tempArr = this.tempArr.concat(this.fightingPlayerArr);
            }
            if (this.tempArr.length != 0) {
                this.tempArr.sort(function (a, b) {
                    return a.sd - b.sd;
                });
                //console.log(this.tempArr);
                //console.log(this.tempArr[this.tempArr.length-1]);
                this.toaAttack(this.tempArr.pop());
            }
            else {
                //egret.setTimeout(this.startRound, this, 5000);
            }
        }
        else {
            console.log("游戏结束啦啦啦啦啦");
        }
    };
    //攻击
    FightingScene.prototype.toaAttack = function (attacker) {
        //攻击者已死亡
        if (attacker.died == 1) {
            console.log(attacker.name + "已死亡");
            this.startRound();
            return;
        }
        var successJN = false;
        console.log(attacker.hp + "<<<<<" + attacker.tempHp);
        var hp = attacker.hp - attacker.tempHp;
        var mp = attacker.mp - attacker.tempMp;
        var gj = attacker.gj;
        var hx = attacker.hx;
        var sd = attacker.sd;
        //技能
        var skills = attacker.skills;
        var attArr = new Array();
        //怪物
        if (0 == attacker.lx) {
            while (!successJN) {
                //技能随机
                var si = UTILS.GetRandomIntInclusive(0, skills.length - 1);
                var skill = skills[si];
                console.log(si + "技能随机数");
                console.log(skill);
                console.log(attacker.hp + "<<<<<" + attacker.tempHp);
                console.log(hp + "<" + skill.usehp + "------" + mp + "<" + skill.usemp);
                if (hp < skill.usehp || mp < skill.usemp) {
                    continue;
                }
                var p = skill.parameter;
                var pp = p.split("_");
                //攻击数量
                var count = Number(pp[1]);
                if (count >= this.fightingPlayerArr.length) {
                    attArr = this.fightingPlayerArr;
                }
                else {
                    //只攻击一个 后期改
                    for (var i = 1; i > 0; i--) {
                        //攻击对象随机
                        var ai = UTILS.GetRandomIntInclusive(0, this.fightingPlayerArr.length - 1);
                        attArr.push(this.fightingPlayerArr[ai]);
                    }
                }
                var gjl = Number(pp[3]);
                var hxl = Number(pp[4]);
                gj = gj * gjl;
                console.log(attArr);
                for (var i = attArr.length - 1; i >= 0; i--) {
                    //攻击者下移 
                    var pep = this.grpMs[attacker.index].y;
                    egret.Tween.get(this.grpMs[attacker.index]).to({ "y": this.grpMs[attacker.index].y + 30 }, 30).wait(2000).to({ "y": pep }, 30);
                    var jn = new egret.Bitmap(RES.getRes("skill_02_png"));
                    jn.width = 50;
                    jn.height = 50;
                    jn.x = this.grpMs[attacker.index].x;
                    jn.y = this.grpMs[attacker.index].y;
                    this.addChild(jn);
                    //获取纹理
                    //var texture = RES.getRes("skill_01_png");
                    //获取配置
                    //var config = RES.getRes("skill_01_json");
                    //创建 GravityParticleSystem
                    //var system = new particle.GravityParticleSystem(texture, config);
                    //system.width=10;
                    //system.height=10;
                    //system.x=this.grpMs[attacker.index].x;
                    //system.y=this.grpMs[attacker.index].y;
                    //启动粒子库
                    //system.start();
                    //将例子系统添加到舞台
                    //this.addChild(system);
                    console.log(this.grpPs[attArr[i].index].x + "===" + this.grpPs[attArr[i].index].y);
                    var tw = egret.Tween.get(jn).to({ x: this.grpPs[attArr[i].index].x, y: this.grpPs[attArr[i].index].y, 'scaleX': 1.5, 'scaleY': 1.5 }, 1000).call(this.toAttActionByMs, this, [attacker, attArr[i], jn]);
                }
                successJN = true;
            }
            egret.setTimeout(this.startRound, this, 5000);
            //玩家
        }
        else {
            console.log(attacker.name + "玩家行动");
            egret.setTimeout(this.startRound, this, 500);
        }
    };
    //攻击目标
    FightingScene.prototype.toAttActionByMs = function (attacker, atted, jn) {
        //颜色矩阵数组
        var hxyj = false;
        //EffectUtils.startFlicker(this.imgPs[atted.index],80);
        //被攻击震动
        EffectUtils.startShake(this.grpPs[atted.index], 40);
        egret.setTimeout(function () {
            EffectUtils.stopShake(this.grpPs[atted.index]);
        }, this, 500);
        var mz = RECKON.GetMZ(attacker.lv, atted.lv, attacker.sd, atted.sd, attacker.rank, atted.rank);
        var sj = UTILS.GetRandomIntInclusive(0, 100);
        //console.log(sj+"==sj="+mz*100);
        if (sj < (mz * 100)) {
            var gj = RECKON.GetGJ(attacker.lv, atted.lv, atted.fy);
            var hx = RECKON.GetHX(attacker.lv, atted.lv, attacker.hx);
            sj = UTILS.GetRandomIntInclusive(0, 100);
            ///console.log(sj+"==hx="+hx*100);
            var sh;
            if (sj > (hx * 100)) {
                //未会心
                //console.log("伤害"+Math.round(attacker.gj*gj));
                sh = Math.round(attacker.gj * gj);
            }
            else {
                //会心
                sh = Math.round(attacker.gj * gj * 1.5);
            }
            //减少血量
            var textXL = new egret.TextField();
            textXL.text = "- " + sh;
            textXL.size = 30;
            textXL.textColor = 0xff0000;
            textXL.x = this.grpPs[atted.index].x + this.grpPs[atted.index].width / 2;
            textXL.y = this.grpPs[atted.index].y;
            this.addChild(textXL);
            //减少血量飘动
            egret.Tween.get(textXL).to({ "y": textXL.y - 70 }, 3000).call(this.removeChildMy, this, [textXL]);
            if (atted.type == 1) {
                this.tempHpPlayer += sh;
                console.log("wj剩余血量==============" + (atted.hp - this.tempHpPlayer));
                //玩家死亡 
                if (atted.hp - this.tempHpPlayer <= 0) {
                    this.gameOver = true;
                }
            }
            else if (atted.type == 2) {
                this.tempHpFs += sh;
                console.log("tb剩余血量==============" + (atted.hp - this.tempHpFs));
                //同伴死亡 
                if (atted.hp - this.tempHpFs <= 0) {
                    EffectUtils.setDisplayObjectGray(this.imgPs[atted.index]);
                    this.fightingPlayerArr.splice(atted.index, 1);
                    atted.died = 1;
                }
            }
            else if (atted.type == 3) {
                this.tempHpPet += sh;
                console.log("cw剩余血量==============" + (atted.hp - this.tempHpPet));
                //同伴死亡 
                if (atted.hp - this.tempHpPet <= 0) {
                    EffectUtils.setDisplayObjectGray(this.imgPs[atted.index]);
                    this.fightingPlayerArr.splice(atted.index, 1);
                    atted.died = 1;
                }
            }
        }
        this.removeChild(jn);
    };
    FightingScene.prototype.removeChildMy = function (obj) {
        this.removeChild(obj);
    };
    FightingScene.prototype.saveData = function () {
        var p = SceneManager.Instance.getCurrentScene();
        p.tempHpPlayer = this.tempHpPlayer;
        p.tempMpPlayer = this.tempMpPlayer;
        p.tempHpFs = this.tempHpFs;
        p.tempMpFs = this.tempMpFs;
        p.tempHpPet = this.tempHpPet;
        p.tempMpPet = this.tempMpPet;
    };
    FightingScene.prototype.getMonsters = function (result, self) {
        console.log(result.data);
    };
    FightingScene.prototype.toBack = function () {
        this.saveData();
        this.gameOver = true;
        SceneManager.Instance.popScene();
    };
    return FightingScene;
}(Scene));
__reflect(FightingScene.prototype, "FightingScene");
