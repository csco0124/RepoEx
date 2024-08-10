/*
	워크데이 comm.js 내용 추출(workday alert 사용)
 */

commUtil = {
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
	
	isEmpty : function(value){
		if (value === 'undefined' || value === undefined || value === null || value === "" || (value != null && typeof value == "object" && !Object.keys(value).length)) {
			return true;
		}
		return false;
	}
}

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
		if (location.pathname.includes('admin')) {

			//TODO 코드 개선 필요
			document.querySelector('nav').innerHTML = `<a href="javascript:location.href='${isLoginAuthor(CHIEF) ? '/work/admin/page/specialVacation' : '/work/admin/page/teamWorkMng'}'"
            													class="application" 
            													data-oper="work/admin/page"
            													data-auth=${[CHIEF, MIDDLE, PROJECT]}>
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
		} else {
			document.querySelector('nav').innerHTML = `<a href="javascript:location.href='/home';" class="home" data-oper="home">
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

		}


		// 현재메뉴 표시
		document.querySelectorAll('nav > a').forEach(element => {
			if (!!location.pathname.includes(element.getAttribute('data-oper'))) {
				element.classList.add('active');
			}
		});
	}

	//admin sidebar
	function renderLeftNav() {
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
		} else if (path.includes('/board/admin/page/')) {
			document.querySelector('section > .lnb').innerHTML = `<ul>
												                    <li data-auth=${[CHIEF, BOARD]}>
												                        <a href="">게시판</a>
												                    </li>
												                  </ul>`;
		} else if (path.includes('/admin/mypage/') || path.includes('/admin/survey/')) {
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
																	<li data-auth=${CHIEF}><a href="/survey/admin/survey/surveyManage">설문조사 등록</a></li>
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
			document.querySelector('.login-txt').innerHTML = `<div>
                                                       		<span>${user.korName}</span>님 환영합니다!
                                                	      </div>
                                                          <div>
                                 	                        <button class="btnS" id="logout">로그아웃</button>
                         	                              </div>`;
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
			renderNav();
			renderLoginInfo();
			renderLeftNav();
			createMetaTag();
		},

	}
})();