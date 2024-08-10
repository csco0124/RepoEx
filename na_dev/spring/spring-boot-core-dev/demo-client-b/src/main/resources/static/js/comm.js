function loadscript(url) {
	let measurementId = null;
	if(location.href.includes('workday.narui.co.kr')){
		measurementId = 'G-3QNNYP51W8';
	}else{
		measurementId = 'G-9SP2L3FHBZ';
	}
	
	url = url + measurementId;
	
    var script = document.createElement('script');
    script.src = url;
    script.type = "text/javascript";
    script.async = true;
    document.head.appendChild(script);
    
    window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
	gtag('config', measurementId);
	console.log("loadscript" + url);
}

loadscript("https://www.googletagmanager.com/gtag/js?id=");

$(document).ready(function() {
	uiUtil.initRender();
	commutil.setLoginUserServer();
	// commutil.isLoginMobile();
	//registerServiceWorker();
});
//$('head').append('<link rel="manifest" href="manifest.json">');
/*$('head').append('<meta name="mobile-web-app-capable" content="yes">');
$('head').append('<meta name="apple-mobile-web-app-capable" content="yes">');
$('head').append('<link rel="shortcut icon" size="192x192" href="../images/ic_launcher-playstore.png">');
$('head').append('<meta name="apple-mobile-web-app-title" content="NARUI">');
$('head').append('<meta name="apple-mobile-web-app-status-bar-style" content="black">');
$('head').append('<link rel="apple-touch-startup-image" href="loading.png" />');
$('head').append('<link rel="apple-touch-icon" size="128x128" href="../images/ic_launcher-playstore.png">');
$('head').append('<link rel="apple-touch-icon-precomposed size="128x128" href="../images/ic_launcher-playstore.png">');*/


if (sessionStorage.getItem('LOGIN_USER') == null && (!window.location.href.includes('login'))
	&& (!window.location.href.includes('logout')) && (!window.location.href.includes('member/page/join'))) {
	let url = location.href;

	location.href = "/login/rememberSession?url=" + url;
}

/* *q
*최초 로그인시 휴직인 경우 -> 버튼제어,HOME에서 ALERT 한번만
*로그인 후 재직상태 변경된 경우 -> SERVED관련 클래스 버튼 클릭시 OR 다른페이지 로드시 로그아웃
*/
window.addEventListener('DOMContentLoaded', () => {
	if(!location.href.includes("welfareBenefit")){
		$('input[type=tel]').attr('readonly', true);
	}
	$("[class*='timepicker']").each(function() {
		$(this).attr('readonly', true);
	});
	if (location.pathname === '/login/approval-waiting' || location.pathname === '/login' || location.pathname === '/login/admin' || location.pathname === '/login/denied') return;

	if (commutil.getLoginUser() == null && location.pathname != '/member/page/join') {
		let msg = '';
		msg = '세션이 존재하지 않습니다. 다시 로그인 해주세요.';
		commutil.alert(msg, () => {
			// window.location.replace("/login/denied");
			// FIXME 화면에서 denied 페이지로 이동 금지
			window.location.href = "/";
		});
	}
});

//PC인쇄 하기 전
window.addEventListener('beforeprint', () => {
	let selObj = document.querySelector('.top-from') === null ? null : document.querySelector('.top-from').getElementsByClassName('ipt-box');
	let valArr = new Array();
	let i = 0;
	if (selObj !== null) Array.from(selObj).forEach((obj) => Array.from(obj.querySelectorAll('select,input')).forEach((v) => valArr.push(v.value)));

	$('html, body').css('overflow', 'initial');
	document.body.innerHTML = document.getElementsByClassName("content")[0].outerHTML;

	selObj = document.querySelector('.top-from') === null ? null : document.querySelector('.top-from').getElementsByClassName('ipt-box');
	if (selObj !== null) Array.from(selObj).forEach((obj) => Array.from(obj.querySelectorAll('select,input')).forEach((v) => { $(v).val(valArr[i]); i++; }));
});
//PC인쇄 후 리로드
window.addEventListener('afterprint', () => location.reload());
commutil = {
	/*
	* 빈값 체크
	*/
	isEmpty: function(val) {
		if (val === 'undefined' || val === undefined || val === null || val === "" || (val != null && typeof val == "object" && !Object.keys(val).length)) {
			return true;
		}
		return false;
	},

	/**
	 * 공통코드 조회
	 * @param grpCd - 그룹코드
	 * @param option - 옵션
	 * @returns {*}
	 */
	getCommonList: function(grpCd, option = '') {
		return axios.get(`/common/commonCode/${grpCd}/${option}`);
	},
	/**
	 * 확인팝업
	 * @param message - 표시할 메시지 (string or html)
	 * @param callback - 확인 callback (function)
	 */
	alert: function(message, callback) {
		if (!document.getElementById('commAlertPop')) {
			const alertElement = `<article class="layer-popup type02" id="commAlertPop">
                                    <div class="dim" id="commAlertDim"></div>
                                    <div class="wrap-popup">
                                        <div class="popup">
                                            <div class="pop-cont">
                                                <div class="alret-text" id="commAlertMessage">
                                                    
                                                </div>
                                                <div class="pop-btn-bot">
                                                    <div>
                                                        <button class="btnM type-orange" id="commAlertBtn">확인</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                  </article>`;

			document.body.insertAdjacentHTML('beforeend', alertElement);
		}

		document.getElementById('commAlertMessage').innerHTML = message;

		const $alertPop = document.getElementById('commAlertPop');
		$alertPop.style.display = 'block';
		$alertPop.style.opacity = '0';
		$alertPop.setAttribute('tabindex', '0');
		uiUtil.fadeIn('#commAlertPop');
		$alertPop.focus();

		document.body.style.overflowY = 'hidden';

		const $commAlertBtn = document.getElementById('commAlertBtn'),
			$commAlertDim = document.getElementById('commAlertDim');

		function closeEvent() {
			uiUtil.fadeOut('#commAlertPop', () => { $alertPop.removeAttribute('style'); (callback || (() => { }))(); });
			$alertPop.removeAttribute('tabindex');
			document.body.style.overflowY = 'auto';
			$commAlertBtn.removeEventListener('click', closeEvent);
			$commAlertDim.removeEventListener('click', closeEvent);
		}

		$commAlertBtn.addEventListener('click', closeEvent);
		$commAlertDim.addEventListener('click', closeEvent);
	},
	/**
	 * 확인팝업 여러개
	 * @param message - 표시할 메시지 (string or html)
	 * @param callback - 확인 callback (function)
	 */
	alertFor: function(message, callback, idx) {

		const alertElement = `<article class="layer-popup type02" id="commAlertPop${idx}">
                                    <div class="dim" id="commAlertDim${idx}"></div>
                                    <div class="wrap-popup">
                                        <div class="popup">
                                            <div class="pop-cont">
                                                <div class="alret-text" id="commAlertMessage${idx}">
                                                    
                                                </div>
                                                <div class="pop-btn-bot">
                                                    <div>
                                                        <button class="btnM type-orange" id="commAlertBtn${idx}">확인</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                  </article>`;

		document.body.insertAdjacentHTML('beforeend', alertElement);

		document.getElementById(`commAlertMessage${idx}`).innerHTML = message;

		const $alertPop = document.getElementById(`commAlertPop${idx}`);
		$alertPop.style.display = 'block';
		$alertPop.style.opacity = '0';
		$alertPop.setAttribute('tabindex', '0');
		uiUtil.fadeIn(`#commAlertPop${idx}`);
		$alertPop.focus();

		document.body.style.overflowY = 'hidden';

		const $commAlertBtn = document.getElementById(`commAlertBtn${idx}`),
			$commAlertDim = document.getElementById(`commAlertDim${idx}`);

		function closeEvent() {
			uiUtil.fadeOut(`#commAlertPop${idx}`, () => { $alertPop.removeAttribute('style'); (callback || (() => { }))(); });
			$alertPop.removeAttribute('tabindex');
			document.body.style.overflowY = 'auto';
			$commAlertBtn.removeEventListener('click', closeEvent);
			$commAlertDim.removeEventListener('click', closeEvent);
		}

		$commAlertBtn.addEventListener('click', closeEvent);
		$commAlertDim.addEventListener('click', closeEvent);
	},
	/**
	 * 컨펌팝업
	 * @param message - 표시할 메시지 (string or html)
	 * @param option - {confirmCallback: 확인 callback, cancelCallback: 취소 callback} (object)
	 */
	confirm: function(message, option) {
		if (!document.getElementById('commConfirmPop')) {
			let leaveClass = sessionStorage.getItem('tempOfficeStatus') === "02" ? "servedConfirm" : "";
			const confirmElement = `<article class="layer-popup type02 pop-open99" id="commConfirmPop">
                                        <div class="dim" id="commConfirmDim"></div>
                                        <div class="wrap-popup">
                                            <div class="popup">
                                                <div class="pop-cont">
                                                    <div class="alret-text" id="commConfirmMessage">
                                                    </div>
                                                    <div class="pop-btn-bot two">
                                                        <div>
                                                            <button class="btnM close-btn99" id="commCancelBtn">취소</button>
                                                        </div>
                                                        <div>
                                                            <button class="${leaveClass} btnM type-orange" id="commConfirmBtn">확인</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </article>`;

			document.body.insertAdjacentHTML('beforeend', confirmElement);
		}

		document.getElementById('commConfirmMessage').innerHTML = message;

		const $confirmPop = document.getElementById('commConfirmPop');
		$confirmPop.style.display = 'block';
		$confirmPop.style.opacity = '0';
		$confirmPop.setAttribute('tabindex', '0');
		uiUtil.fadeIn('#commConfirmPop');
		$confirmPop.focus();

		document.body.style.overflowY = 'hidden';

		const $commConfirmBtn = document.getElementById('commConfirmBtn'),
			$commCancelBtn = document.getElementById('commCancelBtn'),
			$commConfirmDim = document.getElementById('commConfirmDim');

		function cancelEvent() {
			uiUtil.fadeOut('#commConfirmPop', () => { $confirmPop.removeAttribute('style'); ((option || {}).cancelCallback || (() => { }))(); });
			close();
		}

		function confirmEvent() {
			uiUtil.fadeOut('#commConfirmPop', () => { $confirmPop.removeAttribute('style'); ((option || {}).confirmCallback || (() => { }))(); });
			close();
		}

		function close() {
			$confirmPop.removeAttribute('tabindex');
			document.body.style.overflowY = 'auto';
			$commConfirmBtn.removeEventListener('click', confirmEvent);
			$commCancelBtn.removeEventListener('click', cancelEvent);
			$commConfirmDim.removeEventListener('click', cancelEvent);
		}

		$commConfirmBtn.addEventListener('click', confirmEvent);
		$commConfirmDim.addEventListener('click', cancelEvent);
		$commCancelBtn.addEventListener('click', cancelEvent);
	},
	/**
	 * 토스트메시지
	 * @param message 표시할 메시지 (string)
	 * @param ms - 표시할 시간 (밀리세컨드), default: 1000 (1초)
	 */
	toast: function(message, ms = 1000) {
		if (!document.getElementById('commToast')) {
			const toastElement = `<div class="toast" id="commToast">
                                    <div class="toast-box">
                                        <div class="dim"></div>
                                        <div class="txt-info" id="commToastMessage"></div>
                                    </div>
                                  </div>`;

			document.body.insertAdjacentHTML('beforeend', toastElement);
		}

		document.getElementById('commToastMessage').innerText = message;
		document.getElementById('commToast').style.visibility = 'visible';

		setTimeout(function() {
			document.getElementById('commToast').style.visibility = 'hidden';
		}, ms)
	},
	/**
	 * 출퇴근범위인지 체크
	 * @param curLat - 현재위치 위도
	 * @param curLon - 현재위치 경도
	 * @param workLat - 근무지 위도
	 * @param workLon - 근무지 경도
	 * @param range - 출퇴근범위
	 * @returns {boolean}
	 */
	isWorkRange: function(curLat, curLon, workLat, workLon, range) {
		const R = 6371e3; // metres
		const cl = curLat * Math.PI / 180;
		const wl = workLat * Math.PI / 180;
		const x = (workLat - curLat) * Math.PI / 180;
		const y = (workLon - curLon) * Math.PI / 180;

		const a = Math.sin(x / 2) * Math.sin(x / 2) + Math.cos(cl) * Math.cos(wl) * Math.sin(y / 2) * Math.sin(y / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		const d = R * c; // in metres

		return (d > range ? false : true);
	},
	// URL 파라미터값 객체로 변환
	getQueryStringObject: function() {
		const qs = window.location.search.substring(1).split('&');
		if (!qs) return {};

		const qsObj = {};
		for (let i = 0; i < qs.length; ++i) {
			const param = qs[i].split('=', 2);
			if (param.length === 1)
				qsObj[param[0]] = '';
			else
				qsObj[param[0]] = decodeURIComponent(param[1].replace(/\+/g, ' '));
		}

		return qsObj;
	},
	// 로그인정보 세션스토리지 저장
	setLoginUser: function(user) {
		if(user == null || user == undefined || user == '' || user == {}){
			user = {username: '익명', authorities: [{authority: 'anonymous'}]};
		}
		sessionStorage.setItem('LOGIN_USER', JSON.stringify(user));
	},

	// 로그인정보 반환
	getLoginUser: function() {
		let user = {};
		try {
			user = JSON.parse(sessionStorage.getItem("LOGIN_USER"));
		} catch (e) {
			console.error('User is empty');
		}
		// TODO: 개발을 위한 임시 값, 개발완료 후 return user; 로 변경필요
		return user;// || {emplyNmbr: 111111};
	},
	
	setLoginUserServer: function() {
		let url = '/login/autoLogin';
		console.log('setloginuserserver');
		jQuery.ajax({
		    url: url,
		    type: 'POST',
		    dataType: 'JSON',
		    success: function (result) {
				commutil.setLoginUser(result.data);
			}
		});
	},

	logout: function() {

		// let logoutUrl = "/logout/oauth2?redirect-url=";
		let redirectUrl = "";
		if (location.pathname.includes('admin')) {
			sessionStorage.removeItem('LOGIN_USER');
			sessionStorage.removeItem('firstLogin');
			sessionStorage.removeItem('tempOfficeStatus');
			redirectUrl = "/login/oauth2?redirect-url=/admin";
		} else {
			sessionStorage.removeItem('LOGIN_USER');
			sessionStorage.removeItem('firstLogin');
			sessionStorage.removeItem('tempOfficeStatus');

			if (window.webkit != undefined || window.jsInterface != undefined){
				sendMessage({action : 'deleteIdPwd'}); // 기기에 저장된 암호 삭제
			}

			redirectUrl = "/login/oauth2?redirect-url=/home";
		}

		let form = $('<form></form>');
		form.attr("action", "/logout");
		form.attr("method", "post");

		form.append($('<input>', { type: 'hidden', name: 'redirect-url', value: redirectUrl }));

		form.appendTo('body');
		form.submit();

		// location.href = logoutUrl;

		// ajax.post('/logout').then(function (data) {
		// 	if (location.pathname.includes('admin')) {
		// 		sessionStorage.removeItem('LOGIN_USER');
		// 		sessionStorage.removeItem('firstLogin');
		// 		sessionStorage.removeItem('tempOfficeStatus');
		//         location.href = '/login/admin';
		//         return;
		//     }else{
		// 		commutil.alert('로그아웃 되었습니다.', function (data) {
		// 			sessionStorage.removeItem('LOGIN_USER');
		// 			sessionStorage.removeItem('firstLogin');
		// 			sessionStorage.removeItem('tempOfficeStatus');
		// 			if(window.webkit != undefined || window.jsInterface != undefined){
		// 				sendMessage({action : 'deleteIdPwd'}); // 기기에 저장된 암호 삭제
		// 		 	}
		//             location.href = '/login';
		//         });
		// 	}
		//
		// });
	},

	/*//앱 사용중 푸쉬메시지 클릭하면 푸쉬메세지에 path로 이동
	pushCallback(path) {
		if (isEmpty(path)) return;
		sendMessage({action: 'deletePushPath'});
		location.href = path.charAt(0) !== '/' ? '/' + path : path;
	},*/

	//모바일 세션 체크
	isLoginMobile: function() {
		if (location.href.includes('/login')) return;

		if (isMobile() && isEmpty(sessionStorage.getItem('LOGIN_USER')) && !location.href.includes('/denied') && !location.href.includes('member/page/join')) {
			// location.href = '/login/denied';
			// FIXME 화면에서 denied 페이지로 이동 금지
			window.location.href = "/";
		}
	},
	
	workLogUpsert: function(isNullWorkLog, logParam){
		var url;
		if(isNullWorkLog){
			url = '/workLog/workLogInsert';
		}else{
			url = '/workLog/workLogUpdate';
		}
		
		return ajax.post(url, logParam);
	},
	
	getUrlParam: function(paramName){
		const urlStr = location.href;
		const urlObj = new URL(urlStr);
		const urlParam = urlObj.searchParams.get(paramName);
		
		return urlParam;
	},
	
	//에디터 파일
	//파일 첨부하기
	handleSubmit: function(pageDiv, event){
		event.preventDefault();
		const formData = new FormData();
		for(i=0; i<document.getElementsByName("uploadFiles").length; i++){
			formData.append("uploadFiles", document.getElementsByName("uploadFiles")[i].files[0]);
		}
		
		formData.append("refTable", "board");
		formData.append("refUid", $("#refUid").val());			
			
		ajax.post('/attach/upload', formData)
			.then(function(res){
				const data = res.data;
				if (data > 0){
					commutil.alert("게시물이 등록되었습니다.", () => {
						if(pageDiv == 'admin'){
							location.href = "/board/admin/page/list";
						}
						if(pageDiv == 'user'){
							location.href = "/board/page/list";
						}
					});
				} else {
					commutil.alert("게시물 등록 중에 오류가 발생했습니다.");
					console.log(error);
				}
			})
			.catch(function(error){
				commutil.alert("게시물 등록 중에 오류가 발생했습니다.");
				console.log(error);
			});	
	}
}

/**
 * formatting
 * @type {{phoneNo: (function(*): *)}}
 */
const format = {
	phoneNo: function(value) {
		return value.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3');
	},
}

/*window.onbeforeunload = function() {
	if (!document.getElementById('commLoading')) {
		const loadingElement = `<article class="layer-popup type02 dp-b" id="commLoading">
                                    <div class="dim" id="commLoadingDim"></div>
                                    <div class="wrap-popup">
                                        <div class="bubblingG">
                                            <span id="bubblingG_1"></span>
                                            <span id="bubblingG_2"></span>
                                            <span id="bubblingG_3"></span>
                                        </div>
                                    </div>
                                </article>`;

		document.body.insertAdjacentHTML('beforeend', loadingElement);
	}
	document.getElementById('commLoadingDim').classList.add('dp-b');
	document.getElementById('commLoadingDim').classList.remove('dp-n');
}

$(window).on('load', function() {
	if (document.getElementById('commLoadingDim') != null) {
		document.getElementById('commLoadingDim').classList.remove('dp-b');
		document.getElementById('commLoadingDim').classList.add('dp-n');
	}
});*/

axios.interceptors.request.use(function(config) {
	if (!document.getElementById('commLoading')) {
		const loadingElement = `<article class="layer-popup type02 dp-b" id="commLoading">
                                    <div class="dimTrans" id="commLoadingDim"></div>
                                    <div class="wrap-popup">
                                    	<div class="bubblingG">
                                            <span id="bubblingG_1"></span>
                                            <span id="bubblingG_2"></span>
                                            <span id="bubblingG_3"></span>
                                        </div>
                                    </div>
                                </article>`;

		document.body.insertAdjacentHTML('beforeend', loadingElement);
	}

	if (config.params && config.params.searchTrigger === 'Y') {
		document.getElementById('commLoadingDim').classList.add('dp-n');
	} else {
		document.getElementById('commLoadingDim').classList.remove('dp-n');
	}

	document.getElementById('commLoading').classList.remove('dp-n');
	document.getElementById('commLoading').classList.add('dp-b');
	return config;
}, function(error) {
	if (document.getElementById('commLoading') != null) {
		document.getElementById('commLoading').classList.remove('dp-b');
		document.getElementById('commLoading').classList.add('dp-n');
	}
	return Promise.reject(error);
});

axios.interceptors.response.use(function(response) {
	document.getElementById('commLoading').classList.remove('dp-b');
	document.getElementById('commLoading').classList.add('dp-n');
	return response.data;
}, function(error) {
	if (document.getElementById('commLoading') != null) {
		document.getElementById('commLoading').classList.remove('dp-b');
		document.getElementById('commLoading').classList.add('dp-n');
	}
	if(error.response == undefined || error.response == null){
		console.log('error.response is empty');
		return Promise.reject(error);
	}else{
		if (!!error.response.config.isSkipError) return Promise.reject(error.response.data);

		if (error.response.config.responseType == 'blob') {
			const reader = new FileReader();
			reader.onload = function () {
				const errorResponse = JSON.parse(reader.result);
				commutil.alert(errorResponse.message);
			};
			reader.readAsText(error.response.data);
			return Promise.reject(error.response.data);
		}
	
		commutil.alert(error.response.data.message);
	
		return Promise.reject(error.response.data);
	}
});

/**
 * ajax 통신 공통함수
 * @type {{post: (function(*, *, *): *), get: (function(*, *, *): *), delete: (function(*, *, *): *), put: (function(*, *, *): *)}}
 */
const ajax = {
	get: function(url, data, isSkipError) {
		return axios.get(url, { params: data, isSkipError: !!isSkipError });
	},
	post: function(url, data, isSkipError) {
		return axios.post(url, data, { isSkipError: !!isSkipError });
	},
	put: function(url, data, isSkipError) {
		return axios.put(url, data, { isSkipError: !!isSkipError });
	},
	delete: function(url, data, isSkipError) {
		return axios.delete(url, { params: data, isSkipError: !!isSkipError });
	},
	download: function(url, data, fileName, isSkipError) {
		return axios.get(url, { params: data, isSkipError: !!isSkipError, responseType: 'blob'}).then(function (res) {
			const link = document.createElement('a');
			const url = window.URL.createObjectURL(new Blob([res]));
			link.href = url;
			link.download = fileName;
			link.click();
			link.remove();
			window.URL.revokeObjectURL(url);
		});
	}

}

const attach = function(btnId, config) {
	if (!btnId) throw new Error('btnId is required');

	const $btn = document.getElementById(btnId);

	//if (!$btn) throw new Error('btnId is not exist');

	const fileList = [];
	const allowExt = config.allowExts || ['.ppt', 'pptx', '.xls', 'xlsx', '.jpg', '.jpeg', 'png', '.gif'];


	let fileInput = document.createElement('input');
	fileInput.type = 'file';
	fileInput.hidden = true;
	fileInput.accept = '.'.concat(allowExt.join(',.'));
	fileInput.onchange = function() {
		// TODO: 구현
	};

	document.body.appendChild(fileInput);

	// document.getElementById(btnId).onclick = function () {
	//     fileInput.click();
	// }

	return {
		onClickBtn: function() {
			fileInput.click();
		},
		getFileList: function() {
			return fileList;
		},
		getFormData: function() {
			const formData = new FormData();
			formData.append('uploadfiles', fileList);

			return formData;
		},
	}
}

const isArray = (input) => {
	return (
		input instanceof Array ||
		Object.prototype.toString.call(input) === '[object Array]'
	);
}


const isNotArray = (input) => {
	return !isArray(input);
}

//Object 체크
const isObj = (input) => {
	return (
		input != null &&
		Object.prototype.toString.call(input) === '[object Object]'
	);
}

const isNotObj = (input) => {
	return !isObj(input);
}

//Number 여부
const isNumber = (input) => {
	return (
		typeof input === 'number' ||
		Object.prototype.toString.call(input) === '[object Number]'
	);
}

const isNotNumber = (input) => {
	return !isNumber(input);
}

//Object key 포함 여부
const hasOwnProp = (obj, key) => {
	return Object.prototype.hasOwnProperty.call(obj, key);
}

// value 존재 여부 체크
const isEmpty = (v) => {
	if (typeof v === 'undefined' || v === null || !v) return true;
	if (isArray(v)) return isEmpty(v[0]);
	return typeof v === 'object' && Object.keys(v).length === 0;
}

const isNotEmpty = (v) => {
	return !isEmpty(v);
}

function isMobile() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isPc() {
	return !isMobile();
}

/**
 * App 의 경우 navigator.userAgent 에 NARUI_WORKDAY_APP 추가
 * */
function isApp() {
	let reg = new RegExp(/NARUI_(.*?)_APP/ig);
	return reg.test(navigator.userAgent);
}

function isLocal() {

}
// iOS 인지 알아보기
function iOS() {
	var iDevices = [
		'iPad Simulator',
		'iPhone Simulator',
		'iPod Simulator',
		'iPad',
		'iPhone',
		'iPod'
	];

	if (!!navigator.platform) {
		while (iDevices.length) {
			if (navigator.platform === iDevices.pop()) { return true; }
		}
	}
	return false;
}

// 안드로이드인지 알아보기
function Android() {
	return /(android)/i.test(navigator.userAgent)
}


// Native 단으로 메시지 전송
function sendMessage(message) {

	if (window.webkit != undefined || window.jsInterface != undefined) {
		var link = document.location.href;
		if (link.includes('home') == false) {
			if (iOS()) {
				window.webkit.messageHandlers.jsInterface.postMessage(message);
			}
			else if (Android()) {
				var msg = JSON.stringify(message);
				window.jsInterface.postMessage(msg);
			}
			else {
				//
			}
		} else {
			if (iOS()) {
				if (window.webkit.messageHandlers.jsInterface != undefined) {
					window.webkit.messageHandlers.jsInterface.postMessage(message);
				}
			}
			else if (Android()) {
				var msg = JSON.stringify(message);
				if (window.jsInterface != undefined) {
					window.jsInterface.postMessage(msg);
				}
			}
			else {
				//
			}
		}
	} else {
		if (message.callBack != undefined) {
			callBack();
		}
	}
}

// DB 서버 시간 불러오기
function getServerDate() {
	return new Promise(function(resolve, reject) {
		ajax.get('/common/getDateTime')
			.then(res => {
				const dateTime = res.data;
				if (!!dateTime) {
					var date = dateTime;
					date = new Date(date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8) + 'T' + date.substring(8, 10) + ':' + date.substring(10, 12));
					resolve(date)
				}

				reject(new Date());
			})
	})
}

const employNmbr = commutil.getLoginUser()

const uiUtil = (function() {

	const CHIEF = 'ROLE_CHIEF';		//최고관리자
	const MIDDLE = 'ROLE_MIDDLE';	//중간관리자
	const PROJECT = 'ROLE_PROJECT'; //프로젝트리더
	const BOARD = 'ROLE_BOARD';		//게시판관리자

	function fadeInAction(target, opacity, timer, callback) {
		opacity += 0.1;
		changeOpacity(target, opacity);

		if (opacity > 0.3) {
			target.style.display = 'block';
		}

		if (opacity > 1) {
			clearInterval(timer);
			(callback || (() => { }))();
		}

		return opacity;
	}

	function fadeOutAction(target, opacity, timer, callback) {
		opacity -= 0.1;
		changeOpacity(target, opacity);

		if (opacity <= 0.3) {
			target.style.display = 'none';
		}

		if (opacity < 0) {
			clearInterval(timer);
			(callback || (() => { }))();
		}

		return opacity;
	}

	function changeOpacity(target, opacity) {
		target.style.opacity = opacity;
	}

	function renderNav() {
		if (!document.querySelector('nav')) return;
		// nav 설정

			//TODO 코드 개선 필요
			document.querySelector('nav').innerHTML = `<a href="javascript:location.href='${isLoginAuthor(CHIEF) ? '/work/admin/page/specialVacation' : '/work/admin/page/teamWorkMng'}'"
            													class="application" 
            													data-oper="work/admin/page">
                                                                <span>근태관리</span>
                                                       </a>
                                                       <a href="javascript:location.href='${isLoginAuthor(CHIEF) ? '/commuting/admin/page/member' : '/commuting/admin/page/team'}'"
                                                       			class="time"
                                           						data-oper="commuting/admin/page"
                                           						data-auth=${[CHIEF, MIDDLE, PROJECT]}>
                                                            <span>출퇴근</span>
                                                       </a>
                                                       <a href="javascript:location.href='/board/admin/page/list';"
                                                       			class="board"
                                                       			data-oper="board/admin/page"
                                                       			data-auth=${[CHIEF, BOARD]}>
                                                            <span>게시판</span>
                                                       </a>
                                                       <a href="javascript:location.href='/member/admin/mypage/management';"
                                                       			class="mypage"
                                                       			data-oper="admin/mypage"
                                                       			data-auth=${CHIEF}>
                                                            <span>직원관리</span>
                                                       </a>`;
			if(document.querySelector('body header h1 img') != undefined){
				document.querySelector('body header h1 img').src = "/images/logo.png";
			}

			//로그인한 유저의 권한별 화면 보여주기
			document.querySelectorAll('nav > a').forEach(element => {
				element.style.display = isLoginAuthor(element.getAttribute('data-auth')) ? 'block' : 'none';
			});
			/*document.querySelector('nav').innerHTML = `<a href="javascript:location.href='/home';" class="home" data-oper="home">
                                                                <span>홈</span>
                                                           </a>
                                                           <a href="javascript:location.href='/work/page';" class="application" data-oper="work">
                                                                <span>근태신청</span>
                                                           </a>
                                                           <a href="javascript:location.href='/commuting/page';" class="time" data-oper="commuting">
                                                                <span>출퇴근</span>
                                                           </a>
                                                           <a href="javascript:location.href='/board/page/list';" class="board" data-oper="board">
                                                                <span>게시판</span>
                                                           </a>
                                                           <a href="javascript:location.href='/mypage/page';" class="mypage" data-oper="mypage">
                                                                <span>마이페이지</span>
                                                           </a>`;
*/


		// 현재메뉴 표시
		document.querySelectorAll('nav > a').forEach(element => {
			console.log(element.getAttribute('data-oper'));
			if (!!location.pathname.includes(element.getAttribute('data-oper'))) {
				element.classList.add('active');
			}
		});
	}

	//admin sidebar - 230221 퍼블 변경으로 임시 주석
	/*function renderLeftNav() {
		if (!document.querySelector('section > .lnb')) return;
		const path = location.pathname;

		if (path.includes('/work/admin/page/')) {
			document.querySelector('section > .lnb').innerHTML = `<ul>
												                    <li data-auth=${CHIEF}>
																		<a href="/work/admin/page/specialVacation">휴가 지급/삭감</a>
																	</li>
																	<li data-auth=${CHIEF}>
																		<a href="/work/admin/page/emplyWorkMng">직원별 근태관리</a>
																	</li>
																	<li data-auth=${[MIDDLE, PROJECT]}>
																		<a href="/work/admin/page/teamWorkMng">팀원별 근태관리</a>
																	</li>
											                	 </ul>`;
		} else if (path.includes('/commuting/admin/page')) {
			document.querySelector('section > .lnb').innerHTML = `<ul>
												                    <li data-auth=${CHIEF}>
												                        <a href="/commuting/admin/page/member">직원별 출퇴근관리</a>
												                    </li>
												                    <li data-auth=${[MIDDLE, PROJECT]}>
												                        <a href="/commuting/admin/page/team">팀원별 출퇴근관리</a>
												                    </li>
												                </ul>`;
		} else if (path.includes('/board/admin/page/') || path.includes('/admin/survey/')) {
			document.querySelector('section > .lnb').innerHTML = `<ul>
												                    <li data-auth=${[CHIEF, BOARD]}>
												                        <a href="/board/admin/page/list">게시판</a>
												                        <li data-auth=${CHIEF}><a href="/survey/board/admin/page/surveyList">설문조사(퀴즈)</a></li>
												                    </li>
												                  </ul>`;
		} else if (path.includes('/admin/mypage/')) {
			const tmpPath = ['new-member-management', 'leave-member-management', 'leaveMemberCommuting', 'retiree']
			const isActive = tmpPath.some(tmp => { return path.includes(tmp) }) ? 'active' : '';
			document.querySelector('section > .lnb').innerHTML = `<ul>
																	<li data-auth=${CHIEF}><a href="/member/admin/mypage/management">직원관리</a></li>
																	<li id="dlPanel" data-auth=${CHIEF} class="${isActive}">
																		<dl>
																			<dt>입/퇴사자 관리</dt>
																			<dd>
																				<ul>
																					<li><a href="/member/admin/mypage/new-member-management">입사자 관리</a></li>
																					<li><a href="/member/admin/mypage/leave-member-management">퇴사자 조회</a></li>
																					<li><a href="/member/admin/mypage/leaveMemberCommuting">퇴사자 출퇴근 내역 </a></li>
																					<li><a href="/work/admin/mypage/retiree">퇴사자 근태 내역</a></li>
																				</ul>
																			</dd>
																		</dl>
																	</li>
																	<li data-auth=${CHIEF}><a href="/member/admin/mypage/longWorkMember">장기근속자 관리</a></li>
																	<li data-auth=${CHIEF}><a href="/member/admin/mypage/leaveOfAbsence">휴직자 관리</a></li>
																	<li data-auth=${CHIEF}><a href="/member/admin/mypage/setAuthority">권한 설정</a></li>
																	<li data-auth=${CHIEF}><a href="/mypage/admin/mypage/appVersionCtr">앱 버전 관리</a></li>
																</ul>`;
																//히든 처리 요청이 있어 현재는 주석처리함. 원래는 직원관리 밑에 위치해있었음
//																<li data-auth=${CHIEF}><a href="/workConfig/admin/mypage/workConfig">근태설정</a></li>
			if (!(path.includes('/admin/mypage/leaveOfAbsence') || path.includes('/admin/mypage/leave-member-management') || path.includes('/admin/mypage/new-member-management') || path.includes('/admin/mypage/longWorkMember'))) {
				document.getElementById('dlPanel').addEventListener('click', function() { this.classList.toggle('active'); });
			}
		}

		//로그인한 유저의 권한별 화면 보여주기
		document.querySelectorAll('section > .lnb > ul > li').forEach(element => {
			element.style.display = isLoginAuthor(element.getAttribute('data-auth')) ? 'block' : 'none';
		});
	}*/
	
	//admin sidebar - 230221 퍼블 변경으로 로직 수정
	function renderLeftNav() {
		/*if (!document.querySelector('header > .nav')) return;
		const path = location.pathname;

		if (path.includes('public/view')) {
			document.querySelector('header > .nav').innerHTML = `<div class="logo">
					<img src="../../../../images/logo.png" alt="나루아이">
                </div>
				<ul>
					<li>
						<dl>
							<a href="/public/view/exam1">
								<dt>
									<span>임시 페이지1</span>
								</dt>
							</a>
						</dl>
					</li>
					<li>
						<dl>
							<a href="/public/view/exam2">
								<dt>
									<span>임시 페이지2</span>
								</dt>
							</a>
	                    </dl>
					</li>
					<li>
                        <dl>
                            <a href="javascript:uiUtil.privatePageEvent('/private/view/home')">
								<dt>
									<span>회원 페이지</span>
								</dt>
							</a>
                        </dl>
					</li>
					<li>
                        <dl>
                            <a href="/logout">
								<dt>
									<span>로그아웃</span>
								</dt>
							</a>
                        </dl>
					</li>
				</ul>
            </nav>`;
		}else if (path.includes('private/view')) {
			document.querySelector('header > .nav').innerHTML = `<div class="logo">
					<img src="../../../../images/logo.png" alt="나루아이">
                </div>
				<ul>
					<li>
						<dl>
							<a href="javascript:uiUtil.privatePageEvent('/private/view/exam1')">
								<dt>
									<span>임시 페이지1</span>
								</dt>
							</a>
						</dl>
					</li>
					<li>
						<dl>
							<a href="javascript:uiUtil.privatePageEvent('/private/view/exam2')">
								<dt>
									<span>임시 페이지2</span>
								</dt>
							</a>
						</dl>
					</li>
					<li>
                        <dl>
                            <a href="/oauth2/socialList">
								<dt>
									<span>소셜/간편 로그인 등록</span>
								</dt>
							</a>
                        </dl>
					</li>
					<li>
                        <dl>
                            <a href="/public/view/home">
								<dt>
									<span>게스트 페이지</span>
								</dt>
							</a>
                        </dl>
					</li>
					<li>
                        <dl>
                            <a href="/logout">
								<dt>
									<span>로그아웃</span>
								</dt>
							</a>
                        </dl>
					</li>
				</ul>
            </nav>`;
		}
		//로그인한 유저의 권한별 화면 보여주기
		document.querySelectorAll('header > .nav > li').forEach(element => {
			console.log("element123 : ",element);
			element.style.display = isLoginAuthor(element.getAttribute('data-auth')) ? 'block' : 'none';
		});*/
	}

	//로그인한 유저의 권한 포함 여부
	function isLoginAuthor(inputAuth) {
		if (isEmpty(commutil.getLoginUser())) return;

		const loginUserAuths = commutil.getLoginUser().authorities;
		//로컬에서는 전부 보여준다
		//if (location.href.includes('192.168') || location.href.includes('localhost')) return true;
		return loginUserAuths.some(auth => { return inputAuth.includes(auth.authority); });
	}

	function renderLoginInfo() {
		if (isEmpty(commutil.getLoginUser()) || !location.pathname.includes('admin') || location.pathname.includes('/login/admin')) {
			if (document.querySelector('.login-txt') != undefined) {
				document.querySelector('.login-txt').style.display = 'none';
			}
			return;
		}

		const user = commutil.getLoginUser();
		if(document.querySelector('.login-txt') != undefined) {
			if(isMobile()) {
				document.querySelector('.login-txt').innerHTML = `<div>
                                                       		<span>${user.korName}</span>님 환영합니다!
                                                	      </div>
                                                          <div>
                                 	                        <button class="btnS" id="logout">로그아웃</button>
                         	                              </div>`;
			} else {
				document.querySelector('.login-txt').innerHTML = `<div>
                                                       		<span>${user.korName}</span>님 환영합니다!
                                                	      </div>
                                                          <div>
                                 	                        <button class="btn-logout" id="logout">로그아웃</button>
                         	                              </div>`;
			}
			document.getElementById('logout').addEventListener('click', commutil.logout);
		}
	}

	//모바일 줌 차단
	function createMetaTag() {
		let meta = document.createElement('meta');
		meta.name = 'viewport';
		meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
		document.getElementsByTagName('head')[0].appendChild(meta);
	}

	return {
		fadeIn: function(selector, callback) {
			if (!selector) throw new Error('selector is required');

			const target = document.querySelector(selector);
			if (!target) throw new Error(`${selector} is not exists`);

			let opacity = 0, timer;

			timer = setInterval(function() {
				opacity = fadeInAction(target, opacity, timer, callback);
			}, 50);

		},
		fadeOut: function(selector, callback) {
			if (!selector) throw new Error('selector is required');

			const target = document.querySelector(selector);

			if (!target) throw new Error(`${selector} is not exists`);

			let opacity = 1, timer;

			timer = setInterval(function() {
				opacity = fadeOutAction(target, opacity, timer, callback);
			}, 50);

		},
		initRender: function() {
			//renderNav();
			renderLoginInfo();
			renderLeftNav();
			createMetaTag();
		},
		privatePageEvent: async function(url, authority){
			const userInfo = commutil.getLoginUser();
			let authName = null
			let isAuth = true;
			
			if(authority != 'client'){
				authName = authority;
			}else{
				await jQuery.ajax({
					    url: '/public/api/client-authority',
					    type: 'GET',
					    dataType: 'JSON',
					    success: function (result) {
							authName = result.data;
						}
				});
			}
			
			//익명은 private 페이지로 이동해도 인증페이지로 넘어가니 권한 체크 안함
			if(!(authName == null || userInfo == null || userInfo.authorities[0].authority == 'anonymous')){
				isAuth = false;
				//ROLE_A_USER 부분은 나중에 서버에서 가져오는 걸로
				userInfo.authorities.some((item) => {
					if(item.authority == authName){
						isAuth = true;
						return true;
					}
				});
			}
			
			if(isAuth){
				location.href = url;
			}else{
				commutil.alert('접근 권한이 없습니다.');
			}
		}
	}
})();

/**
 * 페이징 공통함수
 * @param {number} paginationId : 페이징 표시될 태그 아이디
 * @param {number} searchFunction : 페이지번호 클릭 시 실행 될 함수
 * @param {number} pageSize : 한화면에 보여줄 페이지개수
 * @param {number} countPerPage : 한페이지에 보여줄 데이터개수
 * @constructor
 */
function Pagination (paginationId, searchFunction, pageSize = 10, countPerPage = 10) {
	if (!paginationId) throw new Error('paginationId is required');
	if (typeof searchFunction != 'function') throw new Error('searchFunction is not function');

	/**
	 * 
	 * @param {number} currentPageNo : 페이지번호
	 * @param {number} totalCount : 전체데이터건수
	 */
	this.render = function (currentPageNo, totalCount) {
		if (isNaN(currentPageNo)) throw new Error('currentPageNo is not digit');
		if (isNaN(totalCount)) throw new Error('totalCount is not digit');

		const totalPageCount = Math.ceil(totalCount / countPerPage);
		const firstPageNo = (Math.ceil(currentPageNo / pageSize) - 1) * pageSize + 1;  // ((currentPageNo - 1) % pageSize) * pageSize + 1;
		const lastPageNo = Math.min(firstPageNo + pageSize - 1, totalPageCount) ;

		const paginationList = [];

		if (firstPageNo > pageSize) {
			paginationList.push(
				`<button class="pageBox" id="prevBtn" data-pageno="${firstPageNo - 1}"> < </button>`
			);
		}

		for (let pageNo = firstPageNo; pageNo <= lastPageNo; pageNo++) {
			paginationList.push(
				`<button class="pageBox" data-pageno="${pageNo}" ${currentPageNo === pageNo ? 'style="color: white; background-color: #f66f06;"' : ''}>${pageNo}</button>`
			);
		}

		if (lastPageNo < totalPageCount) {
			paginationList.push(
				`<button class="pageBox" data-pageno="${lastPageNo + 1}"> > </button>`
			);
		}

		$(`#${paginationId}`).html(paginationList);

		$('[data-pageNo]').on('click', function () {
			const pageNo = $(this).data('pageno');
			searchFunction(pageNo, countPerPage);
		});
	}
}