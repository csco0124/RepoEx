
$(document).ready(function(){
    //공통 팝업
    $('.pop-btn').off().on('click', function(){
      layerHandler(this);
    });
    //select popup
    selectPopup();


    // pc-gnb
    $('.btn-menu').off().on('click', function () {
		if ($(this).parent().hasClass('active') === false) {
          	$(this).parent().addClass('active');
		} else {
	        $(this).parent().removeClass('active');
	    }
	});
  	// 230221 - 기존로직 주석
    /*$('.nav > ul > li > dt').off().on('click', function () {
		$(this).parents().siblings().removeClass('open');
      	if ($(this).parent().parent('li').hasClass('open') === false) {
          	$(this).parent().parent('li').addClass('open');
      	} else {
          	$(this).parent().parent('li').removeClass('open');
      	}
  	});*/
});

//오늘 날짜 계산
var day = new Date();

var serverDate;

var year = day.getFullYear();
var month = day.getMonth()+1;
var date = day.getDate();
var dayLabel = day.getDay();
var viewHours = day.getHours(); //시
var viewMinutes = day.getMinutes(); //분
var viewSeconds = day.getSeconds(); //초
var txtDay = month + '월 ' + date + '일 '

function getTodayLabel(date) {
  var week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
  var today = day.getDay();
  var todayLabel = week[today];
  return todayLabel;
}

function getTodayLabel02() {
  var week02 = new Array('(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)');
  var today02 = new Date().getDay();
  var todayLabel02 = week02[today02];
  return todayLabel02;
}

function setTime(date) {

	var viewHours = date.getHours(); //시
	var viewMinutes = date.getMinutes(); //분
	var viewSeconds = date.getSeconds(); //초
	var hours_str = viewHours < 10 ? "0" + viewHours : viewHours;
	var minutes_str = viewMinutes < 10 ? "0" + viewMinutes : viewMinutes;
	var seconds_str = viewSeconds < 10 ? "0" + viewSeconds : viewSeconds;
	$('.check-time').text(hours_str + ':' + minutes_str);
}

function setDay(day) {

	var month = day.getMonth()+1;
	var date = day.getDate();
	var txtDay = month + '월 ' + date + '일 ';
	$('.check-day').text(txtDay + getTodayLabel(day));
}

function init() {
	setInterval(() => {
		nowDate.setSeconds(nowDate.getSeconds() + 1)
		setTime(nowDate)
	}, 1000);
	setDay(nowDate);
}


//calendar 그리기(화면 - 근무형태)
function check_calnedar(date){
  if(!!date) {
  	day = date;
  }

  const renderCalendar = () => {
  const viewYear = day.getFullYear(); //현재 연도
  const viewMonth = day.getMonth(); // 현재 달

  // year-month 채우기
  document.querySelector('#cal-top-YM').textContent = `${viewMonth + 1}월 ${viewYear}`;

  const prevLast = new Date(viewYear, viewMonth, 0); // 지난 달 마지막 Date
  const thisLast = new Date(viewYear, viewMonth + 1, 0); // 이번 달 마지막 Date

  const PLDate = prevLast.getDate(); // 지난 달 일 수
  const PLDay = prevLast.getDay(); // 지난 달 일주(0-6), 하루 수를 반환

  const TLDate = thisLast.getDate(); // 현재 달 일 수
  const TLDay = thisLast.getDay(); // 현재 달 일주(0-6), 하루 수를 반환

  // Dates 기본 배열들
  const prevDates = []; // 저번 달 배열 값 넣을 곳
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = []; //다음 달 배열 값 넣을 곳

  // prevDates(저번 달) 계산
  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }
    // nextDates(다음 달) 계산
    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
  }
    // Dates 합치기
    const dates = prevDates.concat(thisDates, nextDates);

    // Dates 정리
    const firstDateIndex = dates.indexOf(1); //현재 달 첫번째 날 찾기
    const lastDateIndex = dates.lastIndexOf(TLDate); //현재 달 마지막 날 찾기

    if ($('.calendar-box').hasClass('type01')) {
      dates.forEach((day, i) => {
      const condition = i >= firstDateIndex && i < lastDateIndex + 1
                          ? 'this'
                          : 'more-calendar';
      dates[i] = `<div class="date"><a href="#" class="${condition}"><span class="cal-day">${day}</span><span class="cal-schedule"></span></a></div>`;
      // console.log(i);
      //출근 여부 = .cal-schedule에 출근 ok, 출근 안할때 no class 추가
      });
    } else if ($('.calendar-box').hasClass('type02')) {
      dates.forEach((day, i) => {
      const condition = i >= firstDateIndex && i < lastDateIndex + 1
                          ? 'this'
                          : 'more-calendar';
      dates[i] = `<div class="date ${condition}"><span class="cal-day">${day}</span><span class="txt-box"></span></div>`;
      // console.log(i);
      //.txt-box에 필요 텍스트 데이터
      });
    }

  // Dates 그리기
    document.querySelector('.dates').innerHTML = dates.join('');
    // 오늘 날짜 그리기
    if (viewMonth === serverDate.getMonth() && viewYear === serverDate.getFullYear()) {
		  day.setDate(serverDate.getDate())
      for (let date of document.querySelectorAll('.this')) {
        if (+date.innerText === day.getDate()) {
          date.classList.add('today');//오늘
        break;
        }
      }
    }
  }
  renderCalendar();
}

// 이전 달
const prevMonth = () => {
  day.setMonth(day.getMonth() - 1);
  day.setDate(1);
  check_calnedar();
}
// 다음 달
const nextMonth = () => {
  day.setDate(1);
  day.setMonth(day.getMonth() + 1);
  day.setDate(1);
  check_calnedar();
}




// popup
function layerHandler(obj) {
	var bthObj = $(obj);
	var thisClass = bthObj.attr('class');
	var idNum = thisClass.substring(thisClass.length-2);
	var idPop = $('.pop-open' + idNum);
  	var dimClose = idPop.find('.dim');

	idPop.attr('tabindex', '0').fadeIn().focus();
	$('body').css('overflow-y','hidden');

	$('.close-btn' + idNum).on('click', function(){
		idPop.fadeOut();
    idPop.removeAttr('tabindex');
		$('body').css('overflow-y','auto');
		return false;
	});
	dimClose.on('click', function(){
		idPop.fadeOut();
    idPop.removeAttr('tabindex');
		$('body').css('overflow-y','auto');
		return false;
	});
};

/**
 * @date 2023.04.11
 * @private
 * @author 김민정
 * @return N/A
 */
var layerPop = {

	/**
	 * layerId를 매개로 하여 팝업을 open 한다.
	 * @param {string} layerId : 팝업의 id값
	 * @param {string} init : 팝업 open시 실행할 function
	 * @param {string} initParam : 팝업 open시 실행할 function의 param data
	 * @param {string} callback : 팝업 close시 실행할 function
	 * @param {string} callbackParam : 팝업 close시 실행할 function의 param data
	 *
	 */
	layerPopOpen : function(layerId, init, initParam, callback, callbackParam) {
		var popId = $('#' + layerId);

		if(layerId == null || layerId.length == 0) {
			alert("팝업 id값은 필수입니다.");
			return false;
		}

		popId.find(".popup > .btn-close").off("click").on("click", function() {
			layerPop.layerPopClose(layerId, callback, callbackParam);
		});

		//popId.attr('tabindex', '0').fadeIn().focus();
		//$('body').css('overflow-y','auto');

		//init으로 function이 넘어온 경우
		if(typeof init === "function") {
			init(initParam);
		}

		popId.show();
	},

	/**
	 * layerPop을 id값으로 매개하여 close 한다.
	 * @param {string} layerId
	 * @param {string} callback
	 * @param {string} callbackParam
	 *
	 */
	layerPopClose : function(layerId, callback, callbackParam) {

		var popId = $("#" + layerId);

		if(layerId == null || layerId.length == 0) {
			alert("팝업 id값은 필수입니다.");
			return false;
		}

		if(typeof callback === "function") {
			callback(callbackParam);
		}

		popId.hide();
	}
}

// mobile popup 높이
var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", vh + "px");

window.addEventListener("resize", function(){
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", vh + "px");
});


//select popup
function selectPopup() {
	var target = $('.ipt-sel');

	// 셀렉트 클릭 버튼 이벤트
	$('.btn-sel').off().on('click', function() {
		var targetSel = $(this).next();
		var popTarget = $('.pop-sel');
		var selectValue = targetSel.val();
		var selTit = targetSel.attr('title');

		var tmp = ''
		targetSel.find('option').each(function(i) {
			if(typeof $(this).attr('value') != 'undefined') {
				tmp += '<li class="sel-radio">';
				if($(this).attr('value') == selectValue) {
					tmp += '	<input type="radio" name="sel_radio" id="sel_radio_' + i +'" value="' + $(this).attr('value') + '" checked />';
				} else {
					tmp += '	<input type="radio" name="sel_radio" id="sel_radio_' + i +'" value="' + $(this).attr('value') + '" />';
				}
				tmp += '	<label for="sel_radio_' + i +'">' + $(this).html() + '</label>';
				tmp += '</li>';
			}
		});
		popTarget.find('ul').html('');
		popTarget.find('ul').html(tmp);
		popTarget.find('.pop-head h1').text(selTit);
		if(targetSel.attr('disabled') != 'disabled'){
			popTarget.show();
			$('body').css('overflow', 'hidden');
		}
		$('input[name="sel_radio"]').off().on('click', function() {
			var radioValue = $('input[name="sel_radio"]:checked').val();
			var oldVal = targetSel.val();
			targetSel.val(radioValue);
			targetSel.val(radioValue).attr("selected","selected");
			var newVal = targetSel.val();
			popTarget.hide();
			$('body').css('overflow','auto');

			//select박스 onchange기능. select태그에 attribute를 change=펑션명 으로 사용.
            if( oldVal != newVal || !!targetSel.attr("isButton")){
                var changeFn = targetSel.attr("change");
                if( changeFn != null && typeof changeFn != "undefined" && changeFn != "" ){
                    var convertStringToFunction = window[changeFn];
                    convertStringToFunction(newVal, targetSel);
                }
            }

		});

		$('.close-sel').off().on('click', function() {
			popTarget.hide();
			$('body').css('overflow','auto');
		});
		$('.dim').off().on('click', function() {
			popTarget.hide();
			$('body').css('overflow','auto');
		});
	});
};

// tab
var Pub = Pub || {};
(function (context) {
  Pub.util = {
      isValid(variables) {
          if (variables === null || variables === undefined || variables === '' || variables === 'undefine') return false;
          return true;
      },
  };
}(window));
var UI = (function () {
  var tab = {
      /**
        * Tab
        * --------------------------------------
        * @param _tabID : tab Name
        * @param _activeNum : 활성화 Index(Default : 0)
        * @param _callback :
        * 일반탭과 스크롤 탭의 data-tab="_tabID" 위치가 다름에 주의
        */
      handler(_tabID, _activeNum, _callback) {
          var initActNum = Pub.util.isValid(_activeNum) ? _activeNum : 0;
          var $tabNav = $(`.tab-nav[data-tab="${_tabID}"]`);
          var $tabCon = $(`.tab-content[data-tab="${_tabID}"]`);
          var $navItem = $tabNav.find('li');

          var len = $tabNav.find('> li').length;
          if (len <= 2) {
              if (len <= 1) $tabNav.addClass('len1'); // 탭 갯수 2개일 경우 양쪽 여백 15
              else $tabNav.addClass('len2'); // 탭 갯수 2개일 경우 양쪽 여백 15
          }

          // tab-br : 한줄 또는 두줄일경우 min-높이값 설정
          if ($tabNav.hasClass('tab-br')) {
              var titleH_init = 45;
              $tabNav.find('a').each(function () {
                  var titleH = $(this).height();
                  if (titleH_init < titleH) titleH_init = titleH;
              });
              $tabNav.find('a').css({
                  'min-height': titleH_init + 28,
              });
          }

          // tap-top : make circle
          if ($tabNav.hasClass('tab-top')) {
              $tabNav.find('a span').wrapInner('<em class="txt">').append('<i class="circle"></i>');
          }

          var curTitle = $navItem.eq(initActNum).addClass('on').find('a').text();
          $navItem.eq(initActNum).addClass('on').find('a').attr('title', `${curTitle} 탭 선택`);
          $tabCon.hide();
          $tabCon.eq(initActNum).show();

          // EventHandler
          $tabNav.on('click', 'a', function () {
              // disabled
              if ($(this).hasClass('disabled')) {
                  return false;
              }

              var clickNum = $(this).parent().index();
              $navItem.removeClass('on').find('a').attr('title', '');
              var curTitle01 = $navItem.eq(clickNum).addClass('on').find('a').text();
              $navItem.eq(clickNum).addClass('on').find('a').attr('title', `${curTitle01} 탭 선택`);
              $tabCon.hide();
              $tabCon.eq(clickNum).show();
              $(this).blur();

              // -callback--------------
              if (_callback) _callback(clickNum);
              //------------------------
              return false;
          });
      }
  };

  return {
      tab: tab.handler
  };
}());
