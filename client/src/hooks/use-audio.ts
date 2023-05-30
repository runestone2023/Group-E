import { useEffect, useState } from "react";

interface UseAudio {
  src: string;
  loop?: boolean;
}

const useAudio = ({ src, loop = false }: UseAudio) => {
  const [audio] = useState(new Audio(src));
  const [playing, setPlaying] = useState(false);

  const play = () => setPlaying(true);
  const pause = () => setPlaying(false);
  const toggle = () => setPlaying(!playing);
  const stop = () => {
    pause();
    audio.currentTime = 0;
  };

  useEffect(() => {
    if (playing) {
      audio.play();
    } else {
      audio.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  useEffect(() => {
    audio.loop = loop;

    const endListener = () => {
      if (loop) return;
      setPlaying(false);
    };
    audio.addEventListener("ended", endListener);
    return () => {
      audio.removeEventListener("ended", endListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { play, pause, toggle, stop };
};

export default useAudio;
