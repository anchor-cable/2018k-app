var $enable = false, $stopwatchTime, $startTime, $stopwatchTimeAdd = 0, message="お疲れ様でした！";

function startTask(){
	$('#stopwatch').show('slow');
	stopwatchStart();
	$('#starttask').hide();
	$('#endtask').show('slow');
}

function timeAction(){
	if($stopwatchMinute > 5){
		$("#stopwatch").css({
			'color' : '#EDAD0B'
		});
		message="お疲れ様でした！ やれましたね！";
		$('.gazou').attr("src","bafter.png");
		$timeAction = setTimeout("timeAction()", 300000);
	}

	if($stopwatchMinute > 10){
		$("#stopwatch").css({
			'color' : '#C7243A'
		});
		message="お疲れ様でした！ 集中されていましたね！";
		$timeAction = setTimeout("timeAction()", 1500000);
	}

	if($stopwatchMinute > 25){
		$('.gazou').attr("src","genki.png");
		message="お疲れ様でした！ 素晴らしい集中力！";
	}
}

function endTask(){
	clearTimeout( $stopwatch );
	if($("#modal-overlay")[0]) $("#modal-overlay").remove() ;
	$("body").append('<div id="modal-overlay"></div>');

	// ダイアログに内容記載
	$("#welcomeMessage").text(message);

	var time = "";
	if( $stopwatchHour > 0 ){
        time += $stopwatchHour + '時間';
    }
    if( $stopwatchMinute > 0 ){
		time += $stopwatchMinute + '分';
	}
	if( $stopwatchSecond > 0 ){
        time += $stopwatchSecond + '秒';
	}
	var task = $("#task").val();
	task = task.length >0 ? task : "タスク";
	var result = task + 'を' + time + 'やりました!';
	$("#result").text(result);
	$("#tweet").appendTweetButton("https://anchor-cable.github.io/2018k-app/",result + "　#やる気無い時タスクタイマー");

	$("#modal-overlay").fadeIn("slow");
	$("#modal-content").fadeIn("slow");
	centeringModalSyncer();
	$("#modal-overlay").unbind().click(function(){
		$("#modal-content,#modal-overlay").fadeOut("slow",function(){
			//フェードアウト後、[#modal-overlay]をHTML(DOM)上から削除
			$("#modal-overlay").remove();
			$startTime = undefined;
			$stopwatchTimeAdd = 0;
			$( '#stopwatchHour' ).text( '00' );
			$( '#stopwatchMinute' ).text( '00' );
			$( '#stopwatchSecond' ).text( '00' );
			$('#starttask').show();
			$('#stopwatch').hide();
			$('#endtask').hide();
			$("#tweet").empty();
		});	
	});

}

function centeringModalSyncer(){

	//画面(ウィンドウ)の幅を取得し、変数[w]に格納
	var w = $(window).width();

	//画面(ウィンドウ)の高さを取得し、変数[h]に格納
	var h = $(window).height();

	//コンテンツ(#modal-content)の幅を取得し、変数[cw]に格納
	var cw = $("#modal-content").outerWidth({margin:true});

	//コンテンツ(#modal-content)の高さを取得し、変数[ch]に格納
	var ch = $("#modal-content").outerHeight({margin:true});

	//コンテンツ(#modal-content)を真ん中に配置するのに、左端から何ピクセル離せばいいか？を計算して、変数[pxleft]に格納
	var pxleft = ((w - cw)/2);

	//コンテンツ(#modal-content)を真ん中に配置するのに、上部から何ピクセル離せばいいか？を計算して、変数[pxtop]に格納
	var pxtop = ((h - ch)/2);

	//[#modal-content]のCSSに[left]の値(pxleft)を設定
	$("#modal-content").css({"left": pxleft + "px"});

	//[#modal-content]のCSSに[top]の値(pxtop)を設定
	$("#modal-content").css({"top": pxtop + "px"});

}

function stopwatchStart(){
	if( $startTime === undefined ){
        var $startDate = new Date();
        $startTime = $startDate.getTime();
	};
	
	var $nowDate = new Date();
    $stopwatchTime = $nowDate.getTime() - $startTime + $stopwatchTimeAdd;
    $stopwatchSecond = Math.floor( $stopwatchTime / 1000 ) % 60;
    $stopwatchMinute = Math.floor( $stopwatchTime / 1000 / 60 ) % 60;
    $stopwatchHour = Math.floor( Math.floor( $stopwatchTime / 1000 / 60 ) / 60 );



    if( $stopwatchSecond < 10 ){
        $stopwatchSecond = '0' + $stopwatchSecond;
    }
    if( $stopwatchMinute < 10 ){
        $stopwatchMinute = '0' + $stopwatchMinute;
    }
    if( $stopwatchHour < 10 ){
        $stopwatchHour = '0' + $stopwatchHour;
    }

	$( '#stopwatchHour' ).text( $stopwatchHour );
    $( '#stopwatchMinute' ).text( $stopwatchMinute );
	$( '#stopwatchSecond' ).text( $stopwatchSecond );

	$stopwatch = setTimeout( "stopwatchStart()", 500 );
	$timeAction = setTimeout("timeAction()", 300000);

};

$.fn.appendTweetButton = function(url,text){
    $(this).append($("<a href=\"https://twitter.com/share\" class=\"twitter-share-button\" data-url=\""+url+"\" data-text=\""+text+"\" data-count=\"vertical\">Tweet<\/a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}else{twttr.widgets.load()}}(document, 'script', 'twitter-wjs');<\/script>"));
}
