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
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type VideoSectionProps = {
  standalone?: boolean;
  embedded?: boolean;
  id?: string;
};

export function VideoSection({
  standalone = false,
  embedded = false,
  id,
}: VideoSectionProps) {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFullPlay, setIsFullPlay] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

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

  if (embedded && isMobile) {
    return (
      <section
        id={id ?? (standalone ? undefined : "video")}
        className={cn(
          "relative isolate w-full border-y border-border-light bg-canvas-dark",
        )}
      >
        <div className="container-main flex flex-col gap-6 py-8 text-text-on-dark">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-eyebrow text-text-muted">{t("video.eyebrow")}</p>
            <h2 className="mt-4 text-section-title text-text-on-dark">
              <span className="text-accent-primary">{t("video.headlineLine1")}</span>
              <br />
              <span>{t("video.headlineLine2")}</span>
            </h2>
          </div>

          <div className="relative mx-auto aspect-video w-full max-w-4xl overflow-hidden rounded-md bg-canvas-dark">
            <video
              ref={videoRef}
              src={imageRegistry.heroVideo}
              aria-label={t("video.imageAlt")}
              autoPlay={!isFullPlay}
              muted={!isFullPlay}
              loop={!isFullPlay}
              playsInline
              controls={isFullPlay}
              onEnded={handleVideoEnded}
              className="size-full object-cover"
            />
            {!isFullPlay && (
              <button
                type="button"
                onClick={handlePlayFull}
                className="absolute inset-0 flex items-center justify-center bg-canvas-dark/30"
                aria-label={t("video.play")}
              >
                <span className="rounded-full border border-border-glass bg-canvas-dark/60 px-5 py-2.5 font-mono-label text-sm text-text-on-dark">
                  {t("video.play")}
                </span>
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={id ?? (standalone ? undefined : "video")}
      className={cn(
        "relative isolate w-full bg-canvas-dark",
        embedded && "border-y border-border-light",
        !(embedded && isMobile) && "z-10",
      )}
    >
      <ContainerScroll className="h-[350vh]">
        <ContainerSticky
          className={cn(
            "flex h-svh flex-col bg-canvas-dark text-text-on-dark",
            standalone && !embedded ? "pt-nav lg:pt-nav-lg" : "pt-20 md:pt-24",
          )}
        >
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5 px-6 pb-8 md:gap-6 md:px-8">
            <ContainerAnimated
              className="w-full shrink-0"
              inputRange={[0, 1]}
              outputRange={[0, 0]}
            >
              <div className="mx-auto max-w-2xl shrink-0 text-center">
                <p className="text-eyebrow text-text-muted">{t("video.eyebrow")}</p>
                <h2 className="mt-4 text-section-title text-text-on-dark">
                  <span className="text-accent-primary">{t("video.headlineLine1")}</span>
                  <br />
                  <span>{t("video.headlineLine2")}</span>
                </h2>
              </div>
            </ContainerAnimated>

            <ContainerInset
              insetYRange={[32, 0]}
              insetXRange={[32, 0]}
              progressRange={[0, 0.85]}
              scaleRange={[0.8, 1]}
              className="relative h-[min(48svh,480px)] w-full max-w-4xl shrink-0 md:h-[min(54svh,520px)]"
            >
              <HeroVideo
                ref={videoRef}
                src={imageRegistry.heroVideo}
                aria-label={t("video.imageAlt")}
                progressRange={[0, 0.85]}
                scaleRange={[1, 1.08]}
                autoPlay={!isFullPlay}
                muted={!isFullPlay}
                loop={!isFullPlay}
                controls={isFullPlay}
                onEnded={handleVideoEnded}
              />
              {!isFullPlay && (
                <VideoPlayOverlay
                  label={t("video.play")}
                  onPlay={handlePlayFull}
                  progressRange={[0, 0.85]}
                  scaleRange={[0.8, 1]}
                  labelFadeStart={0.52}
                  labelFadeEnd={0.66}
                />
              )}
            </ContainerInset>
          </div>
        </ContainerSticky>
      </ContainerScroll>
    </section>
  );
}
