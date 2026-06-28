import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "group relative isolate flex h-full flex-col overflow-hidden rounded-md border border-border-light bg-surface-card-light text-text-heading-light shadow-card transition-shadow duration-300 ease-in-out hover:shadow-card-hover",
  {
    variants: {
      variant: {
        default: "",
        featured: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BlogPostCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  tag: string;
  date: string;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  videoPoster?: string;
  mediaAlt?: string;
  href: string;
  readMoreText?: string;
}

const mediaCoverClassName =
  "absolute inset-0 h-full w-full object-cover";

const BlogPostCard = React.forwardRef<HTMLDivElement, BlogPostCardProps>(
  (
    {
      className,
      variant,
      tag,
      date,
      title,
      description,
      imageUrl,
      videoUrl,
      videoPoster,
      mediaAlt,
      href,
      readMoreText = "Read the full article",
      ...props
    },
    ref,
  ) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const isFeatured = variant === "featured";
    const hasFeaturedVideo = isFeatured && Boolean(videoUrl);
    const hasFeaturedImage = isFeatured && Boolean(imageUrl) && !hasFeaturedVideo;
    const hasDefaultImage = !isFeatured && Boolean(imageUrl);

    React.useEffect(() => {
      const video = videoRef.current;
      if (!video || !hasFeaturedVideo) return;

      video.muted = true;
      void video.play().catch(() => undefined);
    }, [hasFeaturedVideo, videoUrl]);

    const featuredMediaPanelClassName =
      "relative order-first min-h-[180px] w-full overflow-hidden md:col-span-3 md:min-h-0 md:h-full";

    const featuredContentClassName = "md:col-span-2";

    const defaultMediaPanelClassName =
      "relative min-h-0 w-full flex-1 overflow-hidden";

    const content = (
      <>
        {hasFeaturedVideo && (
          <div className={featuredMediaPanelClassName}>
            <video
              ref={videoRef}
              src={videoUrl}
              poster={videoPoster}
              autoPlay
              muted
              loop
              playsInline
              className={mediaCoverClassName}
              aria-label={mediaAlt ?? title}
            />
          </div>
        )}

        {hasFeaturedImage && (
          <div className={featuredMediaPanelClassName}>
            <img
              src={imageUrl}
              alt={mediaAlt ?? title}
              loading="lazy"
              className={mediaCoverClassName}
            />
          </div>
        )}

        {hasDefaultImage && (
          <div className={defaultMediaPanelClassName}>
            <img
              src={imageUrl}
              alt={mediaAlt ?? title}
              loading="lazy"
              className={mediaCoverClassName}
            />
          </div>
        )}

        <div
          className={cn(
            "flex flex-col p-6 md:p-8",
            isFeatured
              ? cn("flex-1 justify-between", featuredContentClassName)
              : hasDefaultImage
                ? "min-h-0 flex-1 justify-start overflow-hidden"
                : "flex-1 justify-center",
          )}
        >
          <div>
            <div className="mb-4 flex items-center gap-4 text-xs font-semibold uppercase text-text-muted">
              <span className="rounded-full bg-accent-primary/10 px-3 py-1 text-accent-primary">
                {tag}
              </span>
              <span>{date}</span>
            </div>

            <h3
              className={cn(
                "mb-3 font-bold leading-tight text-text-heading-light",
                isFeatured ? "text-xl lg:text-2xl" : "line-clamp-2 text-xl",
              )}
            >
              <span className="bg-gradient-to-r from-accent-primary to-accent-primary bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                {title}
              </span>
            </h3>

            <p
              className={cn(
                "text-text-primary-light",
                !isFeatured && "line-clamp-2",
              )}
            >
              {description}
            </p>
          </div>

          {isFeatured && (
            <div className="mt-8">
              <Button variant="default" className="group/button">
                {readMoreText}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
              </Button>
            </div>
          )}
        </div>
      </>
    );

    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      >
        <a
          href={href}
          className="absolute inset-0 z-10"
          aria-label={`Read more about ${title}`}
        >
          <span className="sr-only">{readMoreText}</span>
        </a>
        <div
          className={cn(
            "relative z-0 h-full w-full",
            isFeatured
              ? "grid min-h-0 min-w-0 grid-cols-1 md:grid-cols-5 md:items-stretch"
              : "flex min-h-0 min-w-0 flex-col",
          )}
        >
          {content}
        </div>
      </div>
    );
  },
);

BlogPostCard.displayName = "BlogPostCard";

export { BlogPostCard };
