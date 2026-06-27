import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ContainerAnimated,
  ContainerInset,
  ContainerScroll,
  ContainerSticky,
  HeroVideo,
  VideoPlayOverlay,
} from "@/components/ui/animated-video-on-scroll";
import { imageRegistry } from "@/data/images";

export function VideoSection() {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFullPlay, setIsFullPlay] = useState(false);

  const handlePlayFull = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.loop = false;
    video.currentTime = 0;
    void video.play();
    setIsFullPlay(true);

    if (video.requestFullscreen) {
      void video.requestFullscreen();
    }
  };

  const handleVideoEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.loop = true;
    video.controls = false;
    void video.play();
    setIsFullPlay(false);
  };

  return (
    <section id="video" className="relative isolate z-10 w-full bg-canvas-dark">
      <ContainerScroll className="h-[350vh]">
        <ContainerSticky className="flex h-svh flex-col items-center bg-canvas-dark px-6 pb-8 pt-20 text-text-on-dark md:px-8 md:pt-24">
          <ContainerAnimated className="w-full max-w-3xl shrink-0 space-y-2 text-center">
            <h2 className="text-display text-text-on-dark">{t("video.headline")}</h2>
            <p className="mx-auto max-w-[42ch] text-body-lg text-text-primary-dark">
              {t("video.subtitle")}
            </p>
          </ContainerAnimated>

          <ContainerInset
            insetYRange={[18, 0]}
            insetXRange={[18, 0]}
            className="relative mt-4 h-[min(54svh,520px)] w-full max-w-4xl shrink-0 md:mt-5"
          >
            <HeroVideo
              ref={videoRef}
              src={imageRegistry.heroVideo}
              aria-label={t("video.imageAlt")}
              scaleRange={[0.88, 1]}
              autoPlay={!isFullPlay}
              muted={!isFullPlay}
              loop={!isFullPlay}
              controls={isFullPlay}
              onEnded={handleVideoEnded}
            />
            {!isFullPlay && (
              <VideoPlayOverlay label={t("video.play")} onPlay={handlePlayFull} />
            )}
          </ContainerInset>
        </ContainerSticky>
      </ContainerScroll>
    </section>
  );
}
