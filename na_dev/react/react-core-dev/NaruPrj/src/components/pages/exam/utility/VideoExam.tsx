import { useEffect, useRef, useState } from "react";
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import VideoExamComponent from "./VideoExamComponent";


const videoSrc1 = "http://vjs.zencdn.net/v/oceans.mp4";
const videoSrc2 = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const VideoExam = () => {
	const [videoState, setVideoState] = useState('');
	const [videoOptions, setVideoOptions] = useState({
		autoplay: true,
		playbackRates: [0.5, 1, 1.25, 1.5, 2],
		controls: true,
		responsive: true,
		fluid: true,
	});
	const [videoObj, setVideoObj] = useState<any>(null);
	const [playSrc, setPlaySrc] = useState<any>("");

  const playerRef = useRef(null);

	useEffect(() => {
		

		return () => {
		}
	}, []);
	
	

	const handlePlayerReady = (player : any) => {
		playerRef.current = player;
		// 처음 실행 동영상
		player.src({src: videoSrc1, type: 'video/mp4'});
		setPlaySrc(videoSrc1);
		player.on('loadedmetadata', function() {
			var duration = player.duration();
			setVideoState('동영상 전체 재생 시간: ' + duration + ' 초');
		});

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
      setVideoState('동영상이 대기 중입니다.');
    });

    player.on('playing', () => {
      videojs.log('player is going now');
      setVideoState('동영상이 재생 중입니다.');
    });

		player.on('pause', () => {
      videojs.log('player is pause');
      setVideoState('동영상이 일시정지 중입니다.');
    });
		
		player.on('timeupdate', () => {
      videojs.log('timeupdate..............');
			let time = player.currentTime();
			setVideoState('재생 시간 : ' + time);
			
    });

		player.on('ended', () => {
      videojs.log('player will ended');
			setVideoState('동영상 재생완료 되었습니다.');
    });
		
    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

	const handlePlay = (playSecond:number) => {
		playerRef.current = videoObj;
		// 비디오 플레이어가 재생될 때 호출되는 핸들러
    // playSecond 초를 계산하여 새로운 재생 위치를 계산
    let newTime = videoObj.currentTime() + playSecond;

    // 0보다 작은 값이 되지 않도록 확인
    if (newTime < 0) {
      newTime = 0;
    }

    // 새로운 재생 위치로 이동
    videoObj.currentTime(newTime);
	}

	const videoChange = () => {
		playerRef.current = videoObj;
		const nextplaySrc = playSrc === videoSrc1 ? videoSrc2 : videoSrc1;
		videoObj.src({
			src: nextplaySrc,
			type: 'video/mp4',
		});
		setPlaySrc(nextplaySrc);
	}

  return (
    <div className="content">
      <div className="content">
        <div className="title-item">
          <h2 className="h2-title">동영상 핸들링(김동건)</h2>
          <ul className="location">
            <li>예제</li>
            <li>유틸리티</li>
            <li>동영상 핸들링</li>
          </ul>
        </div>
        <div className="cont-item" style={{position: "relative"}}>
				<h3>{videoState}</h3><br/>
				<button type="button" className="btn btn-outline-secondary" onClick={() => handlePlay(-5)}>5초 뒤로</button>&nbsp;&nbsp;&nbsp;
				<button type="button" className="btn btn-outline-secondary" onClick={() => handlePlay(5)}>5초 앞으로</button>&nbsp;&nbsp;&nbsp;
				<button type="button" className="btn btn-outline-secondary" onClick={() => videoChange()}>동영상 변경</button>
				<br/><br/>
				<VideoExamComponent options={videoOptions} onReady={handlePlayerReady} setVideoObj={setVideoObj} videoState={videoState} setVideoState={setVideoState} />
				</div>
      </div>
    </div>
  );
};

export default VideoExam;
