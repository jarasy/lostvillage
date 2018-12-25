class FightingScene extends Scene {
	public grp_monster_06:eui.Group;
	public img_monster_06:eui.Image;
	public lab_monster_06:eui.Label;
	public grp_monster_02:eui.Group;
	public img_monster_02:eui.Image;
	public lab_monster_02:eui.Label;
	public grp_monster_05:eui.Group;
	public img_monster_05:eui.Image;
	public lab_monster_05:eui.Label;
	public grp_monster_03:eui.Group;
	public img_monster_03:eui.Image;
	public lab_monster_03:eui.Label;
	public grp_monster_01:eui.Group;
	public img_monster_01:eui.Image;
	public lab_monster_01:eui.Label;
	public grp_monster_04:eui.Group;
	public img_monster_04:eui.Image;
	public lab_monster_04:eui.Label;
	public grp_player_01:eui.Group;
	public img_player_01:eui.Image;
	public lab_player_01:eui.Label;
	public grp_player_02:eui.Group;
	public img_player_02:eui.Image;
	public lab_player_02:eui.Label;
	public grp_player_03:eui.Group;
	public img_player_03:eui.Image;
	public lab_player_03:eui.Label;
	public btn_back:eui.Button;

	public tempHpPlayer:number;
	public tempMpPlayer:number;
	public tempHpFs:number;
	public tempMpFs:number;
	public tempHpPet:number;
	public tempMpPet:number;

	public award:String;

	private grpMs : eui.Group[] = [];
	private imgMs : eui.Image[] = [];
	private labMs : eui.Label[] = [];

	private grpPs : eui.Group[] = [];
	private imgPs : eui.Image[] = [];
	private labPs : eui.Label[] = [];

	private fightingPlayerArr:Array<any>=new Array();
	private fightingMonsterArr:Array<any>=new Array();

	private tempArr:Array<any>;

	private gameOver:boolean=false;

	public constructor() {
		super();
		this.skinName = "resource/scene/FightingScene.exml";

		
	}
	
	protected onComplete() {
		this.initData();
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toBack, this);
		
	}

	private initData(){
        let p=<MapView>SceneManager.Instance.getCurrentScene();
		this.tempHpPlayer=p.tempHpPlayer;
		this.tempMpPlayer=p.tempMpPlayer;
		this.tempHpFs=p.tempHpFs;
		this.tempMpFs=p.tempMpFs;
		this.tempHpPet=p.tempHpPet;
		this.tempMpPet=p.tempMpPet;


		let monsterData=<any>egret.localStorage.getItem("monsterData");
		let players =<any> egret.localStorage.getItem("players");

		this.award=<String>monsterData.award;
		let monsters= monsterData.monsters;

		this.grpMs=[this.grp_monster_01,this.grp_monster_02,this.grp_monster_03,this.grp_monster_04,this.grp_monster_05,this.grp_monster_06];
		this.imgMs=[this.img_monster_01,this.img_monster_02,this.img_monster_03,this.img_monster_04,this.img_monster_05,this.img_monster_06];
		this.labMs=[this.lab_monster_01,this.lab_monster_02,this.lab_monster_03,this.lab_monster_04,this.lab_monster_05,this.lab_monster_06];

		this.grpPs=[this.grp_player_01,this.grp_player_02,this.grp_player_03];
		this.imgPs=[this.img_player_01,this.img_player_02,this.img_player_03];
		this.labPs=[this.lab_player_01,this.lab_player_02,this.lab_player_03];


		for (let i=0;i<monsters.length;i++) {
			this.labMs[i].text=monsters[i].name;
			this.imgMs[i].source= RES.getRes("m_001_png");
			this.grpMs[i].visible=true;
			monsters[i].index=i;
			monsters[i].lx=0;
			monsters[i].tempHp=0;
			monsters[i].tempMp=0;
			this.fightingMonsterArr.push(monsters[i]);
		}
		console.log(monsters);
		console.log(players);
		for (let i=0;i<players.length;i++) {
			if(1==players[i].type&&players[i].hp-this.tempHpPlayer>0){
				this.labPs[i].text=players[i].name;
				this.imgPs[i].source= RES.getRes("play_01_png");
				this.grpPs[i].visible=true;
				players[i].index=i;
				players[i].lx=1;
				players[i].tempHp=0;
				players[i].tempMp=0;
				this.fightingPlayerArr.push(players[i]);
			}else if(2==players[i].type&&players[i].hp-this.tempHpFs>0){
				this.labPs[i].text=players[i].name;
				this.imgPs[i].source= RES.getRes("play_02_png");
				this.grpPs[i].visible=true;
				players[i].index=i;
				players[i].lx=1;
				players[i].tempHp=0;
				players[i].tempMp=0;
				this.fightingPlayerArr.push(players[i]);
			}else if(3==players[i].type&&players[i].hp-this.tempHpFs>0){
				this.labPs[i].text=players[i].name;
				this.imgPs[i].source= RES.getRes("play_03_png");
				this.grpPs[i].visible=true;
				players[i].index=i;
				players[i].lx=1;
				players[i].tempHp=0;
				players[i].tempMp=0;
				this.fightingPlayerArr.push(players[i]);
			}
		}

		this.startRound();
	}

	//开始
	private start(){
		while(!this.gameOver){
			this.startRound();
			this.gameOver=true;
		}

	}

	//开始回合
	private startRound(){
		this.tempArr=this.fightingMonsterArr;
		this.tempArr=this.tempArr.concat(this.fightingPlayerArr);
		this.tempArr.sort(function(a,b){
            return a.sd-b.sd});
		console.log(this.tempArr);
		console.log(this.tempArr[this.tempArr.length-1]);
		this.toaAttack(this.tempArr[this.tempArr.length-1]);

	}
	//攻击
	private toaAttack(attacker){
		var successJN=false;
		var hp=attacker.hp-attacker.tempHp;
		var mp=attacker.mp-attacker.tempMp;
		var gj=attacker.gj;
		var hx=attacker.hx;
		var sd=attacker.sd;

		//技能
		var skills:Array<any>=attacker.skills;
		var attArr:Array<any>=new Array();
		//怪物
		if(0==attacker.lx){

			while(!successJN){
				//技能随机
				let si=UTILS.GetRandomIntInclusive(0,skills.length-1);
				let skill = skills[si];
				console.log(si+"技能随机数");
				console.log(skill);
				if(hp<skill.usehp||mp<skill.usemp){
					continue;
				}
				let p:String=skill.parameter;
				let pp=p.split("_");
				//攻击数量
				let count:number=Number(pp[1]);
				if(count>=this.fightingPlayerArr.length){
					attArr=this.fightingPlayerArr;
				}else{
					//只攻击一个 后期改
					for(let i=1;i>0;i--){
						//攻击对象随机
						let ai=UTILS.GetRandomIntInclusive(0,this.fightingPlayerArr.length-1);
						attArr.push(this.fightingPlayerArr[ai]);
					}
				}

				let gjl:number=Number(pp[3]);
				let hxl:number=Number(pp[4]);
				gj=gj*gjl;
				console.log(attArr);

				for(let i=attArr.length-1;i>=0;i--){
					var jn = new egret.Bitmap(RES.getRes("skill_02_png"));
					jn.width=50;
					jn.height=50;
					jn.x=this.grpMs[attacker.index].x+this.grpMs[attacker.index].width/2;
					jn.y=this.grpMs[attacker.index].y+this.grpMs[attacker.index].height/2;
					this.addChild(jn);
					console.log(this.grpMs[attacker.index].x+"--"+this.grpMs[attacker.index].y+this.grpMs[attacker.index]);
					console.log(attArr[i].index);
					console.log(this.grpPs[attArr[i].index]);
					console.log(this.grpPs[attArr[i].index].x+"--"+this.grpPs[attArr[i].index].y);
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
					var tw = egret.Tween.get(jn).to( {x:this.grpPs[attArr[i].index].x+this.grpPs[attArr[i].index].width/2,y:this.grpPs[attArr[i].index].y+this.grpPs[attArr[i].index].height/2 ,'scaleX': 1.5,'scaleY': 1.5}, 1000);
					//,'scaleX': 2,'scaleY': 2
				}
				
				



				successJN=true;
			}

		//玩家
		}else{

		}
	}

	//攻击目标
	private toAttAction(attacker,atted){

	}

	private saveData(){
        let p=<MapView>SceneManager.Instance.getCurrentScene();
		p.tempHpPlayer=this.tempHpPlayer;
		p.tempMpPlayer=this.tempMpPlayer;
		p.tempHpFs=this.tempHpFs;
		p.tempMpFs=this.tempMpFs;
		p.tempHpPet=this.tempHpPet;
		p.tempMpPet=this.tempMpPet;
	}


	private getMonsters(result,self) {	
		console.log(result.data);
	}

	private toBack() {	
		this.saveData();
		SceneManager.Instance.popScene();
	}

	
}