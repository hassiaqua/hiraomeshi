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

/* position sticky
*********************************************/
var elem = document.querySelectorAll('.slider-mv');
Stickyfill.add(elem);

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


/* .slider-mv
*********************************************/

//インジケーター初期表示
$('.slider-mv__items').on('init', function(event, slick) {
  $('.slider-indicator__current').text(slick.currentSlide + 1);
  $('.slider-indicator__total').text('/' + slick.slideCount);
})
//インジケーター切り替え表示
.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
  $('.slider-indicator__current').text(nextSlide + 1);
  startProgressbar();
});
//コントローラー
$('#slider-prev').click(function() {
	$('.slider-mv__items').slick('slickPrev');
	startProgressbar();
});
$('#slider-next').click(function() {
	$('.slider-mv__items').slick('slickNext');
	startProgressbar();
});

//インジケーターslick切り替え
var ua = navigator.userAgent;
if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
	var time = 8;
}else{
	var time = 8;
}
var $bar,
		$slick,
		isPause,
		tick,
		percentTime;

$slick = $('.slider-mv__items');
$slick.slick({
	fade: true,
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	// autoplay: true,
	// autoplaySpeed: 4000,
	speed: 1000,
	dots: false,
	arrows: false,
	pauseOnHover: false,
});

$bar = $('.slider-bar__animation');

function startProgressbar() {
	resetProgressbar();
	percentTime = 0;
	isPause = false;
	tick = setInterval(interval, 10);
}

function interval() {
	if(isPause === false) {
		percentTime += 1 / (time+0.1);
		$bar.css({
			width: percentTime+"%"
		});
		if(percentTime >= 100){
			$slick.slick('slickNext');
			startProgressbar();
		}
	}
}

function resetProgressbar() {
	$bar.css({
		width: 0+'%'
	});
	clearTimeout(tick);
}

startProgressbar();




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
