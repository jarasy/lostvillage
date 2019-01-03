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
	public btn_att:eui.Button;

	public tempHpPlayer:number;
	public tempMpPlayer:number;
	public tempHpFs:number;
	public tempMpFs:number;
	public tempHpPet:number;
	public tempMpPet:number;
	
	public grp_skills:eui.Group;

	public grp_skill_01:eui.Group;
	public grp_skill_02:eui.Group;
	public grp_skill_03:eui.Group;
	public grp_skill_04:eui.Group;
	public grp_skill_05:eui.Group;
	public img_skill_01:eui.Image;
	public img_skill_02:eui.Image;
	public img_skill_03:eui.Image;
	public img_skill_04:eui.Image;
	public img_skill_05:eui.Image;
	public lab_skill_01:eui.Label;
	public lab_skill_02:eui.Label;
	public lab_skill_03:eui.Label;
	public lab_skill_04:eui.Label;
	public lab_skill_05:eui.Label;

	public award:String;

	private grpMs : eui.Group[] = [];
	private imgMs : eui.Image[] = [];
	private labMs : eui.Label[] = [];

	private grpPs : eui.Group[] = [];
	private imgPs : eui.Image[] = [];
	private labPs : eui.Label[] = [];

	private grpSkills : eui.Group[] = [];
	private imgSkills : eui.Image[] = [];
	private labSkills : eui.Label[] = [];

	private fightingPlayerArr:Array<any>=new Array();
	private fightingMonsterArr:Array<any>=new Array();

	private skillArr:Array<any>=new Array();

	private tempArr:Array<any>=new Array();

	private gameOver:boolean=false;

	private skillIdx:number;
	private msClick:boolean=false;
	private msIdx:number;
	private attClick:boolean=false;

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

		this.grpSkills=[this.grp_skill_01,this.grp_skill_02,this.grp_skill_03,this.grp_skill_04,this.grp_skill_05];
		this.imgSkills=[this.img_skill_01,this.img_skill_02,this.img_skill_03,this.img_skill_04,this.img_skill_05];
		this.labSkills=[this.lab_skill_01,this.lab_skill_02,this.lab_skill_03,this.lab_skill_04,this.lab_skill_05];



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
			this.grpMs[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.msOnClick.bind(this,i),this);
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
				console.log("回合开始啦啦啦啦啦");
				this.tempArr=this.fightingMonsterArr;
				this.tempArr=this.tempArr.concat(this.fightingPlayerArr);
				console.log("攻击队列");
				console.log(this.tempArr);
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
			console.log("toaAttack"+attacker.name+"已死亡");
			this.startRound();
			return;
		}
		//技能
		var skills:Array<any>=attacker.skills;
		var attArr:Array<any>=new Array();
		var hp=0;
		var mp=0;
		var gj=attacker.gj;
		var hx=attacker.hx;
		var sd=attacker.sd;
		//怪物
		if(0==attacker.lx){
			console.log("怪物"+attacker.name+"开始攻击");
			hp=attacker.hp-attacker.tempHp;
			mp=attacker.mp-attacker.tempMp;

			var successJN=false;
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
					//被攻击者已死亡
					if(attArr[i].died!=1){
						var tw = egret.Tween.get(jn).to( {x:this.grpPs[attArr[i].index].x,y:this.grpPs[attArr[i].index].y ,'scaleX': 1.5,'scaleY': 1.5}, 1000).call(this.toAttActionByMs,this,[attacker,attArr[i],jn]);
						
					}else{
						console.log("attackEd"+attArr[i].name+"已死亡");
					}
					
					
				}

				successJN=true;
			}
			egret.setTimeout(this.startRound, this, 1500);

		//玩家
		}else{
			console.log("玩家"+attacker.name+"开始攻击");
			EffectUtils.startFlicker(this.grpPs[attacker.index],600);

			if(attacker.type==1){
				hp=attacker.hp-this.tempHpPlayer;
				mp=attacker.mp-this.tempMpPlayer;
			}else if(attacker.type==2){
				hp=attacker.hp-this.tempHpFs;
				mp=attacker.mp-this.tempMpFs;
			}else if(attacker.type==3){
				hp=attacker.hp-this.tempHpPet;
				mp=attacker.mp-this.tempMpPet;
			}
			for(let i=0;i<skills.length;i++){
				this.labSkills[i].text=skills[i].name;
				this.imgSkills[i].source= RES.getRes("play_02_png");
				this.grpSkills[i].visible=true;
				skills[i].idx=i;
				this.skillArr.push(skills[i]);
				this.grpSkills[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.skillsOnClick.bind(this,i),this);
			}
			this.grp_skills.visible=true;
			var tw = egret.Tween.get(this.grp_skills).to( {x:0}, 300);
			this.btn_att.visible=false;
			this.btn_att.once(egret.TouchEvent.TOUCH_TAP, function(){this.toAttActionByPs(attacker)},this);



			//egret.setTimeout(this.startRound, this, 500);

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
			egret.Tween.get(textXL).to({ "y": textXL.y-70}, 3000).call(function(){this.removeChild(textXL)},this);
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
					this.removeChild(this.grpPs[atted.index]);
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
					 console.log("打死"+this.grpPs);
					 console.log(this.grpPs);
                     console.log("下标"+atted.index);
					this.removeChild(this.grpPs[atted.index]);
				}
			}
			console.log("玩家信息");
			console.log(this.fightingPlayerArr);


		}

		this.removeChild(jn);
	}

		//攻击目标
	private toAttActionByPs(attacker:any):void{
		if(this.attClick){

		
			console.log(attacker.name+'玩家攻击');
			//颜色矩阵数组
			var hxyj:boolean=false;
			//EffectUtils.startFlicker(this.imgPs[atted.index],80);

			//被攻击震动
			EffectUtils.startShake(this.grpMs[this.msIdx],40);
			egret.setTimeout(function(){
				EffectUtils.stopShake(this.grpMs[this.msIdx]);
			}, this, 500);

			var atted=this.fightingMonsterArr[this.msIdx];
			console.log('被玩家攻击下标'+this.msIdx);
			console.log(this.fightingMonsterArr);

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
					textXL.x=this.grpMs[atted.index].x+this.grpMs[atted.index].width/2;
					textXL.y=this.grpMs[atted.index].y-50;
					this.addChild(textXL);
					//减少血量飘动
					egret.Tween.get(textXL).to({ "y": textXL.y-70}, 3000).call(function(){this.removeChild(textXL)},this);
					
					atted.tempHp+=sh;
					console.log(atted.name+"剩余血量=============="+(atted.hp-atted.tempHp));
					//怪物死亡 
					if(atted.hp-atted.tempHp<=0){
							egret.Tween.get(this.grpMs[atted.index]).to({alpha:0},600);
							EffectUtils.setDisplayObjectGray(this.imgMs[atted.index]);
							this.fightingMonsterArr.splice(atted.indexArr,1);
							atted.died=1;
							if(this.fightingMonsterArr.length==0){
								console.log("战斗胜利");

								var tw = egret.Tween.get(this.grp_skills).to( {x:640}, 200).call(function(){
								this.grp_skills.visible=false;
									for(let i=0;i<this.skillArr.length;i++){
										this.grpSkills[i].visible=false;
										EffectUtils.cancleDisplayObjectGray(this.grpSkills[i]);
									}
									this.skillArr=[];
								},this);
								EffectUtils.stopFlicker(this.grpPs[attacker.index]);
								
								this.toWin();
								return;
							}
							for(let i=0;i<this.fightingMonsterArr.length;i++){
								this.fightingMonsterArr[i].indexArr=i;
							}
						this.attClick=false;
						this.removeChild(this.grpMs[atted.index]);
						console.log("怪物剩下:");
						console.log(this.fightingMonsterArr);


					}else{
						EffectUtils.cancleDisplayObjectGray(this.grpMs[atted.index]);
					}
					
			}else{
				var textXL:egret.TextField = new egret.TextField();
				textXL.text="Miss";
				textXL.size=30;
				textXL.textColor=0xff0000;
				textXL.x=this.grpMs[atted.index].x+this.grpMs[atted.index].width/2;
				textXL.y=this.grpMs[atted.index].y-50;
				this.addChild(textXL);
				//减少血量飘动
				egret.Tween.get(textXL).to({ "y": textXL.y-70}, 3000).call(function(){this.removeChild(textXL)},this);
				EffectUtils.cancleDisplayObjectGray(this.grpMs[atted.index]);
			}
			
			var tw = egret.Tween.get(this.grp_skills).to( {x:640}, 200).call(function(){
				this.grp_skills.visible=false;
				for(let i=0;i<this.skillArr.length;i++){
					this.grpSkills[i].visible=false;
					EffectUtils.cancleDisplayObjectGray(this.grpSkills[i]);
				}
				this.skillArr=[];
			},this);
			EffectUtils.stopFlicker(this.grpPs[attacker.index]);
			egret.setTimeout(this.startRound, this, 1500);
		}else{
			console.log("选技能和怪物啊!");
			return;
		}
		

	}

	private removeChildMy(obj:egret.DisplayObject){
        this.removeChild(obj);
	}

	private skillsOnClick(idx,e:egret.Event):void{
		this.skillIdx=idx;
		console.log(idx);
		for(let i=0;i<this.grpSkills.length;i++){
			EffectUtils.cancleDisplayObjectGray(this.grpSkills[i]);
		}
		EffectUtils.setDisplayObjectGray(this.grpSkills[idx]);
		this.msClick=true;
	}

	private msOnClick(idx,e:egret.Event):void{

		if(this.msClick){
			console.log(e);
			for(let i=0;i<this.grpMs.length;i++){
				EffectUtils.cancleDisplayObjectGray(this.grpMs[i]);
			}
			EffectUtils.setDisplayObjectGray(this.grpMs[idx]); 
			for(let i=0;i<this.fightingMonsterArr.length;i++){
				if(idx==this.fightingMonsterArr[i].index){
					this.msIdx=this.fightingMonsterArr[i].indexArr;
					this.attClick=true;
					this.btn_att.visible=true;
				}
			}
			
			
		}else{
			console.log("请选择怪物啊");
		}
		
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


	public toBack() {	
		this.saveData();
		this.gameOver=true;
		SceneManager.Instance.popScene();
	}

	private toWin(){
		var data=JSON.parse("{\"id\":\""+this.award+"\"}");	
		Sk_PostJSON.SendTo(data,this.getAward,"",Sk_DATA.GET_AWARDS_URL,this);	
	}

	private getAward(result, self){
		//eui.Alert.show("您还没有登录!","提醒",this.toBack);
		var t:AwardWin =new AwardWin(self,result.data);
		t.y=self.height/2-(t.height/2);
		t.x=self.width/2-(t.width/2);
		console.log(result.data);
		self.addChild(t);


	}
	
}