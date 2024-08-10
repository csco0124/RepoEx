import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoExamComponent = ({ options, onReady, setVideoObj, setVideoState }: any) => {
  const videoRef = useRef<any>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    // 비디오 플레이어가 오직 한 번만 초기화 됨을 선언한다.
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        setVideoState("동영상 재생이 준비되었습니다.");
        onReady && onReady(player);
				setVideoObj(player);
      }));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, []);

  // Dispose the Video.js player when the functional component unmounts
  // 컴포넌트 언마운트 시 플레이어 삭제
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
		<div data-vjs-player>
      <div ref={videoRef} />
    </div>
	);
};

export default VideoExamComponent;
