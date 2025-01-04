class AlignGrid
{
	constructor(config)	{
		console.log("AlignGrid constructor");
		
		this.config = config;
		this.scene = config.scene;
		this.cw = (config.width - config.marginLeft - config.marginRight ) / config.cols;   // cell width
		this.ch = (config.height - config.marginTop - config.marginBottom ) / config.rows;  // cell height
	}

	show() {
		this.graphics=this.scene.add.graphics();
		this.graphics.lineStyle(2,0xff0000);

		for (let i = this.config.marginLeft ; i < this.config.width - this.config.marginRight - this.config.marginLeft ; i+=this.cw) {
			this.graphics.moveTo(i, this.config.marginTop);
			this.graphics.lineTo(i,this.config.height - this.config.marginBottom);
		}

		for (let i = this.config.marginTop ; i < this.config.height - this.config.marginTop - this.config.marginBottom ; i+=this.ch) {
			this.graphics.moveTo(this.config.marginLeft, i);
			this.graphics.lineTo(this.config.width - this.config.marginRight,i);
		}

		this.graphics.strokePath();
	}

	placeAt(xx,yy,obj) {
		//calc position based upon the cellwidth and cellheight
		let x2 =this.cw*xx + this.cw/2 + this.config.marginLeft;
		let y2 =this.ch*yy + this.ch/2 + this.config.marginTop;
		// console.log(this.cw,x2,y2)
		obj.x=x2;
		obj.y=y2;
	}

	placeAtIndex(index,obj) {
		let yy = Math.floor(index/this.config.cols);
		let xx = index-(yy*this.config.cols);

		this.placeAt(xx,yy,obj);
	}
	
	getX(index) {
		let yy=Math.floor(index/this.config.cols);
		
		let xx=index-(yy*this.config.cols);
		let x2 =this.cw*xx + this.cw/2 + this.config.marginLeft;
		return x2
	}

	getY(index) {
		let yy=Math.floor(index/this.config.cols);
	
		let y2 =this.ch*yy + this.ch/2 + this.config.marginTop;
		return y2
	}

	showNumbers() {
		this.show();
		let count=0;
		for (let i = 0; i < this.config.rows; i++) {
			for (let j=0;j<this.config.cols;j++)
			{
				let numText=this.scene.add.text(0,0,count,{color:'#ff0000'});
				numText.setOrigin(0.5,0.5);
				this.placeAtIndex(count,numText);
				count++;
			}
		}
	}
}