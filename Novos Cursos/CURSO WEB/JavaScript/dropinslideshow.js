

var _dropinslideshowcount=0

function dropinslideshow(imgarray, w, h, delay){
	this.id="_dropslide"+(++_dropinslideshowcount) //Generate unique ID for this slideshow instance (automated)
	this.createcontainer(parseInt(w), parseInt(h))
	this.delay=delay
	this.imgarray=imgarray
	var preloadimages=[]
	for (var i=0; i<imgarray.length; i++){
		preloadimages[i]=new Image()
		preloadimages[i].src=imgarray[i][0]
	}
	this.animatestartpos=parseInt(h)*(-1) //Starting "top" position of an image before it drops in
	this.slidedegree=10 //Slide degree (> is faster)
	this.slidedelay=30 //Delay between slide animation (< is faster)
	this.activecanvasindex=0 //Current "active" canvas- Two canvas DIVs in total
	this.curimageindex=0
	this.zindex=100
	this.isMouseover=0
	this.init()
}


dropinslideshow.prototype.createcontainer=function(w, h){
 document.write('<div id="'+this.id+'" style="position:relative; width:'+w+'px; height:'+h+'px; overflow:hidden">')
	document.write('<div style="position:absolute; width:'+w+'px; height:'+h+'px; top:0;"></div>')
	document.write('<div style="position:absolute; width:'+w+'px; height:'+h+'px; top:-'+h+'px;"></div>')
	document.write('</div>')
	this.slideshowref=document.getElementById(this.id)
	this.canvases=[]
	this.canvases[0]=this.slideshowref.childNodes[0]
	this.canvases[1]=this.slideshowref.childNodes[1]
}

dropinslideshow.prototype.populatecanvas=function(canvas, imageindex){
	var imageHTML='<img src="'+this.imgarray[imageindex][0]+'" style="border: 0" />'
	if (this.imgarray[imageindex][1]!="")
		imageHTML='<a href="'+this.imgarray[imageindex][1]+'" target="'+this.imgarray[imageindex][2]+'">'+imageHTML+'</a>'
	canvas.innerHTML=imageHTML
}


dropinslideshow.prototype.animateslide=function(){
	if (this.curimagepos<0){ //if image hasn't fully dropped in yet
		this.curimagepos=this.curimagepos+this.slidedegree
		this.activecanvas.style.top=this.curimagepos+"px"
	}
	else{
		clearInterval(this.animatetimer)
		this.activecanvas.style.top=0
		this.setupnextslide()
		var slideshow=this
		setTimeout(function(){slideshow.rotateslide()}, this.delay)
	}
}



dropinslideshow.prototype.setupnextslide=function(){
	this.activecanvasindex=(this.activecanvasindex==0)? 1 : 0
	this.activecanvas=this.canvases[this.activecanvasindex]
	this.activecanvas.style.top=this.animatestartpos+"px"
	this.curimagepos=this.animatestartpos
	this.activecanvas.style.zIndex=(++this.zindex)
	this.curimageindex=(this.curimageindex<this.imgarray.length-1)? this.curimageindex+1 : 0
	this.populatecanvas(this.activecanvas, this.curimageindex)
}

dropinslideshow.prototype.rotateslide=function(){
	var slideshow=this
	if (this.isMouseover)
		setTimeout(function(){slideshow.rotateslide()}, 50)
	else
		this.animatetimer=setInterval(function(){slideshow.animateslide()}, this.slidedelay)
}

dropinslideshow.prototype.init=function(){
	var slideshow=this
	this.populatecanvas(this.canvases[this.activecanvasindex], 0)
	this.setupnextslide()
	this.slideshowref.onmouseover=function(){slideshow.isMouseover=1}
	this.slideshowref.onmouseout=function(){slideshow.isMouseover=0}
	setTimeout(function(){slideshow.rotateslide()}, this.delay)
}

