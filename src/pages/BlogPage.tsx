import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { BlogPostCard } from "@/components/ui/card-18";
import { imageRegistry } from "@/data/images";
import {
  viewportPageContainerClassName,
  viewportPageSectionClassName,
  type EmbeddedPageProps,
} from "@/lib/page-shell";

const postKeys = ["post1", "post2", "post3"] as const;

const postGridClasses: Record<(typeof postKeys)[number], string> = {
  post1:
    "relative z-0 min-h-0 h-full hover:z-10 lg:col-span-3 lg:row-start-2",
  post2:
    "relative z-0 min-h-0 h-full hover:z-10 lg:col-span-3 lg:row-start-3",
  post3:
    "relative z-0 min-h-[320px] hover:z-10 md:col-span-2 md:min-h-0 md:h-full lg:col-span-3 lg:col-start-4 lg:row-span-2 lg:row-start-2",
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export function BlogPage({ embedded = false }: EmbeddedPageProps) {
  const { t } = useTranslation();

  return (
    <section
      id={embedded ? "blog" : undefined}
      className={viewportPageSectionClassName(embedded)}
    >
      <div className={viewportPageContainerClassName(embedded)}>
        <motion.div
          className="grid grid-cols-1 gap-6 md:min-h-0 md:flex-1 md:grid-cols-2 md:overflow-hidden lg:grid-cols-6 lg:grid-rows-[minmax(0,auto)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-8 lg:items-stretch"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="relative z-[1] min-h-0 hover:z-10 md:col-span-2 lg:col-span-6 lg:row-start-1"
          >
            <BlogPostCard
              variant="featured"
              className="max-h-full"
              tag={t("pages.blog.featured.category")}
              date={t("pages.blog.featured.date")}
              title={t("pages.blog.featured.title")}
              description={t("pages.blog.featured.excerpt")}
              href="/contact"
              readMoreText={t("pages.blog.readFullArticle")}
              videoUrl={imageRegistry.blog.featuredVideo}
              videoPoster={imageRegistry.blog.featuredPoster}
              mediaAlt={t("pages.blog.featured.videoAlt")}
            />
          </motion.div>

          {postKeys.map((key) => (
            <motion.div
              key={key}
              variants={itemVariants}
              className={postGridClasses[key]}
            >
              <BlogPostCard
                tag={t(`pages.blog.posts.${key}.category`)}
                date={t(`pages.blog.posts.${key}.date`)}
                title={t(`pages.blog.posts.${key}.title`)}
                description={t(`pages.blog.posts.${key}.excerpt`)}
                href="/contact"
                readMoreText={t("pages.blog.readMore")}
                imageUrl={
                  key === "post3" ? imageRegistry.blog.post3Image : undefined
                }
                mediaAlt={
                  key === "post3"
                    ? t("pages.blog.posts.post3.imageAlt")
                    : undefined
                }
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
