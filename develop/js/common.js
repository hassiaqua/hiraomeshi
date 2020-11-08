!function(){	// limit scope
	$(function(){
		var $window = $(window),
		breakPoint = 767, //ブレイクポイントの設定
		wid = $window.width(),
		resizeTimer = false;


//////////////////////////////////////////////
//
//   function - parts
//
//////////////////////////////////////////////

/* change Img
*********************************************/
function changeImgSp(){
	$('.change-img').each(function(){
		$(this).attr("src",$(this).attr("src").replace(/_pc\./, '_sp.'));
	});
}
function changeImgPc(){
	$('.change-img').each(function(){
		$(this).attr("src",$(this).attr("src").replace(/_sp\./, '_pc.'));
	});
}

/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
function の追加スペース
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/


//////////////////////////////////////////////
//
//   Common - PC / SP
//
//////////////////////////////////////////////

/* object fit
*********************************************/
objectFitImages();

/* smooth scroll 
*********************************************/
$('.anchor').click(function(){
	var speed = 400;
	var href= $(this).attr("href");
	var target = $(href == "#" || href == "" ? 'html' : href);
	var position = target.offset().top;
	$("html, body").animate({scrollTop:position}, speed, "swing");
	return false;
});

/* fade
*********************************************/
$(".fade").hover(function(){
	$(this).fadeTo(100, 0.6);
},function(){
	$(this).fadeTo(300, 1.0);
});

/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
PCとSPで共通のものの追加スペース
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/

//////////////////////////////////////////////
//
//   Only Pc Size Processing
//
function pcSizeOnly(){
//////////////////////////////////////////////
changeImgPc();

/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
PCの時のみ実行するものの追加スペース
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/


//////////////////////////////////////////////
}
//   Only Sp Size Processing
//
function spSizeOnly(){
//////////////////////////////////////////////
changeImgSp();

/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
SPの時のみ実行するものの追加スペース
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/


//////////////////////////////////////////////
}
//   Break Point & Window Resize
//
//////////////////////////////////////////////
		function descriminateBp(){
			wid = $window.width();
			if(wid <= breakPoint){
				spSizeOnly();
			}else if(wid > breakPoint){
				pcSizeOnly();
			}
		}
		descriminateBp();
		$window.resize(function() {
			if(wid > $window.width() || wid < $window.width()){
				if (resizeTimer !== false) {
					clearTimeout(resizeTimer);
				}
				resizeTimer = setTimeout(descriminateBp, 200);
			}
		});
	});
}();

//////////////////////////////////////////////
//
//	LOAD
//
//////////////////////////////////////////////
$(window).on('load',function(){

	/* Loading
	*********************************************/


});
