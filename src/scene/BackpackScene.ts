

class BackpackScene extends Scene {
	public btn_back:eui.Button;
	public list: eui.List;
	public list0: eui.List;
	public list1: eui.List;
	public list2: eui.List;

	public viewStack:eui.ViewStack;

	public data1 :Array<any>;
	public data2 :Array<any>;
	public data3 :Array<any>;
	public data4 :Array<any>;

	public lab_dj: eui.Label;
	public lab_hp: eui.Label;
	public lab_mp: eui.Label;
	public lab_gj: eui.Label;
	public lab_fy: eui.Label;
	public lab_sd: eui.Label;
	public lab_hx: eui.Label;

	public lab_hq: eui.Label;
	public lab_tb: eui.Label;
	public lab_st: eui.Label;
	public lab_sb: eui.Label;
	public lab_tui: eui.Label;
	
	public lab_rank: eui.Label;

	public constructor() {
		super();
		this.skinName = "resource/scene/BackpackScene.exml";
		
		var data=JSON.parse("{\"roleId\":\""+egret.localStorage.getItem("roleId")+"\",\"type\":\"1\"}");	
		Sk_PostJSON.SendTo(data,this.toLoadData1,"",Sk_DATA.GET_GOODSBYTYPE_URL,this);	 
		data=JSON.parse("{\"roleId\":\""+egret.localStorage.getItem("roleId")+"\",\"type\":\"2\"}");	
		Sk_PostJSON.SendTo(data,this.toLoadData2,"",Sk_DATA.GET_GOODSBYTYPE_URL,this);	 
		Sk_PostJSON.SendTo(data,this.toLoadData5,"",Sk_DATA.GET_ZBGOODS_URL,this);	 

		data=JSON.parse("{\"roleId\":\""+egret.localStorage.getItem("roleId")+"\",\"type\":\"3\"}");	
		Sk_PostJSON.SendTo(data,this.toLoadData3,"",Sk_DATA.GET_GOODSBYTYPE_URL,this);	 
		data=JSON.parse("{\"roleId\":\""+egret.localStorage.getItem("roleId")+"\",\"type\":\"4\"}");	
		Sk_PostJSON.SendTo(data,this.toLoadData4,"",Sk_DATA.GET_GOODSBYTYPE_URL,this);	 

		

	}


	protected onComplete() {
		let data= <any>egret.localStorage.getItem("property");
		egret.localStorage.setItem("roleId",data.id);
		this.lab_dj.text=data.level;
		this.lab_hp.text=data.hp;
		this.lab_mp.text=data.mp;
		this.lab_gj.text=data.gj;
		this.lab_fy.text=data.fy;
		this.lab_sd.text=data.sd;
		this.lab_hx.text=data.hx;
		switch(data.rank){
			case 1:
			this.lab_rank.text="黄";
			break;
			case 2:
			this.lab_rank.text="玄";
			break;
			case 3:
			this.lab_rank.text="地";
			break;
			case 4:
			this.lab_rank.text="天";
			break;
			default:

		}

		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toBack, this);
		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onChange,this);
		this.list0.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onChange0,this);
		this.list1.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onChange1,this);
		this.list2.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onChange1,this);
	}

    private onChange(e:eui.PropertyEvent):void{
        //获取点击消息
        console.log(this.list.selectedItem,this.list.selectedIndex)
    }
	private onChange0(e:eui.PropertyEvent):void{
        //获取点击消息
        console.log(this.list0.selectedItem.bid,this.list0.selectedIndex)
		let gd:GoodsDetailsZB =new GoodsDetailsZB(this.list0.selectedItem.gid,this.list0.selectedItem.bid,this.list0.selectedItem.equipped);
		SceneManager.Instance.pushScene(gd);
    }
	private onChange1(e:eui.PropertyEvent):void{
        //获取点击消息
        console.log(this.list1.selectedItem,this.list1.selectedIndex)
    }
	private onChange2(e:eui.PropertyEvent):void{
        //获取点击消息
        console.log(this.list2.selectedItem,this.list2.selectedIndex)
    }
	private toBack() {	
		let s1:GameScene =  new GameScene();
		SceneManager.Instance.changeScene(s1);
	}
	/** 进行数据绑定 */
	public bindData(list:eui.List,data:Array<any>): void {
		let arrCollection: eui.ArrayCollection = new eui.ArrayCollection(data);
		list.dataProvider = arrCollection;	
	}

		/** 进行数据绑定 */
	public bindZbData(list:eui.List,data:Array<any>): void {
		for (let i=0;i<data.length;i++) {
			console.log(data[i]);
			if(data[i].equipped==1){
				data[i].count="已装备";
			}else{
				data[i].count="";
			}
		}
		let arrCollection: eui.ArrayCollection = new eui.ArrayCollection(data);
		list.dataProvider = arrCollection;	
	}

	private toLoadData1(result,self) {
		self.bindData(self.list,result.data);
		self.viewStack.selectedIndex=0;
	}
	private toLoadData2(result,self) {
		self.bindZbData(self.list0,result.data);
	}
	private toLoadData3(result,self) {
		self.bindData(self.list1,result.data);
	}
	private toLoadData4(result,self) {
		self.bindData(self.list2,result.data);
	}

	private toLoadData5(result,self) {
	
		let arr = [];
		for (let item of result.data) {
			var property:String[] =String(item.parameter).split("_");
			arr[Number(property[0])]=item.name;
		}
		self.lab_hq.text=arr[0]==null?"无":arr[0];
		self.lab_tb.text=arr[1]==null?"无":arr[1];
		self.lab_st.text=arr[2]==null?"无":arr[2];
		self.lab_sb.text=arr[3]==null?"无":arr[3];
		self.lab_tui.text=arr[4]==null?"无":arr[4];
	}

	
}