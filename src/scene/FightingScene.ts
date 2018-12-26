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

	private tempArr:Array<any>=new Array();

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
			monsters[i].indexArr=i;
			monsters[i].lx=0;
			monsters[i].tempHp=0;
			monsters[i].tempMp=0;
			monsters[i].died=0;
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
				players[i].indexArr=i;
				players[i].lx=1;
				players[i].died=0;
				this.fightingPlayerArr.push(players[i]);
			}else if(2==players[i].type&&players[i].hp-this.tempHpFs>0){
				this.labPs[i].text=players[i].name;
				this.imgPs[i].source= RES.getRes("play_02_png");
				this.grpPs[i].visible=true;
				players[i].index=i;
				players[i].indexArr=i;
				players[i].lx=1;
				players[i].died=0;
				this.fightingPlayerArr.push(players[i]);
			}else if(3==players[i].type&&players[i].hp-this.tempHpFs>0){
				this.labPs[i].text=players[i].name;
				this.imgPs[i].source= RES.getRes("play_03_png");
				this.grpPs[i].visible=true;
				players[i].index=i;
				players[i].indexArr=i;
				players[i].lx=1;
				players[i].died=0;
				this.fightingPlayerArr.push(players[i]);
			}
		}

		this.startRound();
	}

	//开始回合
	private startRound(){
		if(!this.gameOver){
			if(this.tempArr.length==0){
				console.log("回合结束啦啦啦啦啦");
				this.tempArr=this.fightingMonsterArr;
				this.tempArr=this.tempArr.concat(this.fightingPlayerArr);
			}
			
			if(this.tempArr.length!=0){
				this.tempArr.sort(function(a,b){
					return a.sd-b.sd});
				//console.log(this.tempArr);
				//console.log(this.tempArr[this.tempArr.length-1]);
				this.toaAttack(this.tempArr.pop());
				
			}else{
				//egret.setTimeout(this.startRound, this, 5000);
			}
			
		}else{
			console.log("游戏结束啦啦啦啦啦");
		}
		
		
	}
	//攻击
	private toaAttack(attacker){
		//攻击者已死亡
		if(attacker.died==1){
			console.log(attacker.name+"已死亡");
			this.startRound();
			return;
		}
		var successJN=false;
		console.log(attacker.hp+"<<<<<"+attacker.tempHp);
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
				console.log(attacker.hp+"<<<<<"+attacker.tempHp);
				console.log(hp+"<"+skill.usehp+"------"+mp+"<"+skill.usemp);
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
					//攻击者下移 
					var pep=this.grpMs[attacker.index].y;
					egret.Tween.get(this.grpMs[attacker.index]).to({ "y": this.grpMs[attacker.index].y+30 }, 30).wait(2000).to({ "y": pep }, 30);

					var jn = new egret.Bitmap(RES.getRes("skill_02_png"));
					jn.width=50;
					jn.height=50;
					jn.x=this.grpMs[attacker.index].x;
					jn.y=this.grpMs[attacker.index].y;
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
					console.log(this.grpPs[attArr[i].index].x+"==="+this.grpPs[attArr[i].index].y);

					var tw = egret.Tween.get(jn).to( {x:this.grpPs[attArr[i].index].x,y:this.grpPs[attArr[i].index].y ,'scaleX': 1.5,'scaleY': 1.5}, 1000).call(this.toAttActionByMs,this,[attacker,attArr[i],jn]);
					
				}

				successJN=true;
			}
			egret.setTimeout(this.startRound, this, 5000);

		//玩家
		}else{
			console.log(attacker.name+"玩家行动");
			egret.setTimeout(this.startRound, this, 500);

		}
	}


	//攻击目标
	private toAttActionByMs(attacker:any,atted:any,jn:egret.Bitmap):void{
		//颜色矩阵数组
        var hxyj:boolean=false;
		//EffectUtils.startFlicker(this.imgPs[atted.index],80);

		//被攻击震动
		EffectUtils.startShake(this.grpPs[atted.index],40);
		egret.setTimeout(function(){
			EffectUtils.stopShake(this.grpPs[atted.index]);
		}, this, 500);

		let mz:number=RECKON.GetMZ(attacker.lv,atted.lv,attacker.sd,atted.sd,attacker.rank,atted.rank);
		var sj:number = UTILS.GetRandomIntInclusive(0,100);
		//console.log(sj+"==sj="+mz*100);
		if(sj<(mz*100)){
			let gj:number = RECKON.GetGJ(attacker.lv,atted.lv,atted.fy);
			let hx:number= RECKON.GetHX(attacker.lv,atted.lv,attacker.hx);
			sj = UTILS.GetRandomIntInclusive(0,100);
			///console.log(sj+"==hx="+hx*100);
			var sh;
			if(sj>(hx*100)){
				//未会心
				//console.log("伤害"+Math.round(attacker.gj*gj));
				sh=Math.round(attacker.gj*gj);
			}else{
				//会心
				sh=Math.round(attacker.gj*gj*1.5);
			}
			//减少血量
			var textXL:egret.TextField = new egret.TextField();
			textXL.text="- "+sh;
			textXL.size=30;
			textXL.textColor=0xff0000;
			textXL.x=this.grpPs[atted.index].x+this.grpPs[atted.index].width/2;
			textXL.y=this.grpPs[atted.index].y;
			this.addChild(textXL);
			//减少血量飘动
			egret.Tween.get(textXL).to({ "y": textXL.y-70}, 3000).call(this.removeChildMy,this,[textXL]);
			if(atted.type==1){
				this.tempHpPlayer+=sh;
				console.log("wj剩余血量=============="+(atted.hp-this.tempHpPlayer));
				//玩家死亡 
				if(atted.hp-this.tempHpPlayer<=0){
					this.gameOver=true;
				}
			}else if(atted.type==2){
				this.tempHpFs+=sh;
				console.log("tb剩余血量=============="+(atted.hp-this.tempHpFs));
				//同伴死亡 
				if(atted.hp-this.tempHpFs<=0){
					EffectUtils.setDisplayObjectGray(this.imgPs[atted.index]);
					this.fightingPlayerArr.splice(atted.indexArr,1);
					atted.died=1;
					for(let i=0;i<this.fightingPlayerArr.length;i++){
						this.fightingPlayerArr[i].indexArr=i;
					}
				}
			}else if(atted.type==3){
				this.tempHpPet+=sh;
				console.log("cw剩余血量=============="+(atted.hp-this.tempHpPet));
				//同伴死亡 
				if(atted.hp-this.tempHpPet<=0){
					EffectUtils.setDisplayObjectGray(this.imgPs[atted.index]);
					this.fightingPlayerArr.splice(atted.indexArr,1);
					atted.died=1;
					for(let i=0;i<this.fightingPlayerArr.length;i++){
						this.fightingPlayerArr[i].indexArr=i;
					}
				}
			}
			console.log("玩家信息");
			console.log(this.fightingPlayerArr);


		}

		this.removeChild(jn);
	}

	private removeChildMy(obj:egret.DisplayObject){
        this.removeChild(obj);
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
		this.gameOver=true;
		SceneManager.Instance.popScene();
	}

	
}