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
            monsters[i].lx = 0;
            monsters[i].tempHp = 0;
            monsters[i].tempMp = 0;
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
                players[i].lx = 1;
                players[i].tempHp = 0;
                players[i].tempMp = 0;
                this.fightingPlayerArr.push(players[i]);
            }
            else if (2 == players[i].type && players[i].hp - this.tempHpFs > 0) {
                this.labPs[i].text = players[i].name;
                this.imgPs[i].source = RES.getRes("play_02_png");
                this.grpPs[i].visible = true;
                players[i].index = i;
                players[i].lx = 1;
                players[i].tempHp = 0;
                players[i].tempMp = 0;
                this.fightingPlayerArr.push(players[i]);
            }
            else if (3 == players[i].type && players[i].hp - this.tempHpFs > 0) {
                this.labPs[i].text = players[i].name;
                this.imgPs[i].source = RES.getRes("play_03_png");
                this.grpPs[i].visible = true;
                players[i].index = i;
                players[i].lx = 1;
                players[i].tempHp = 0;
                players[i].tempMp = 0;
                this.fightingPlayerArr.push(players[i]);
            }
        }
        this.startRound();
    };
    //开始
    FightingScene.prototype.start = function () {
        while (!this.gameOver) {
            this.startRound();
            this.gameOver = true;
        }
    };
    //开始回合
    FightingScene.prototype.startRound = function () {
        this.tempArr = this.fightingMonsterArr;
        this.tempArr = this.tempArr.concat(this.fightingPlayerArr);
        this.tempArr.sort(function (a, b) {
            return a.sd - b.sd;
        });
        console.log(this.tempArr);
        console.log(this.tempArr[this.tempArr.length - 1]);
        this.toaAttack(this.tempArr[this.tempArr.length - 1]);
    };
    //攻击
    FightingScene.prototype.toaAttack = function (attacker) {
        var successJN = false;
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
                    //var jn = new egret.Bitmap(RES.getRes("play_02_png"));
                    //jn.width=50;
                    //jn.height=50;
                    //jn.x=this.grpMs[attacker.index].x;
                    //jn.y=this.grpMs[attacker.index].y;
                    //this.addChild(jn);
                    console.log(attArr[i].index);
                    console.log(this.grpPs[attArr[i].index]);
                    console.log(this.grpPs[attArr[i].index].x + "--" + this.grpPs[attArr[i].index].y);
                    //获取纹理
                    var texture = RES.getRes("skill_01_png");
                    //获取配置
                    var config = RES.getRes("skill_01_json");
                    //创建 GravityParticleSystem
                    var system = new particle.GravityParticleSystem(texture, config);
                    system.width = 50;
                    system.height = 50;
                    system.x = this.grpMs[attacker.index].x;
                    system.y = this.grpMs[attacker.index].y;
                    //启动粒子库
                    system.start();
                    //将例子系统添加到舞台
                    this.addChild(system);
                    var tw = egret.Tween.get(system).to({ x: this.grpPs[attArr[i].index].x, y: this.grpPs[attArr[i].index].y, 'scaleX': 2, 'scaleY': 2 }, 1000);
                }
                successJN = true;
            }
            //玩家
        }
        else {
        }
    };
    //攻击目标
    FightingScene.prototype.toAttAction = function (attacker, atted) {
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
        SceneManager.Instance.popScene();
    };
    return FightingScene;
}(Scene));
__reflect(FightingScene.prototype, "FightingScene");
