"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Play } from "lucide-react";

interface VideoFeatureProps {
  videoId: string;
  title: string;
  /** 视频预览封面（poster）。默认使用站点主题 hero 图，确保视频预览与新主题一致。 */
  poster?: string;
}

/**
 * 视频 facade 组件：先展示本地 poster 图（带播放按钮覆盖层），点击后再加载 YouTube iframe。
 * 这样首页"带播放按钮的视频预览图"始终使用站点主题封面（hero.webp），
 * 不会出现旧游戏的 YouTube 默认封面，也避免了 maxresdefault 120×90 占位小图问题。
 */
export function VideoFeature({
  videoId,
  title,
  poster = "/images/hero.webp",
}: VideoFeatureProps) {
  const [activated, setActivated] = useState(false);

  const watchUrl = useMemo(
    () => `https://www.youtube.com/watch?v=${videoId}`,
    [videoId],
  );

  const embedUrl = useMemo(
    () =>
      `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&playsinline=1&rel=0`,
    [videoId],
  );

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setActivated(true)}
        aria-label={`Play video: ${title}`}
        className="group relative block w-full overflow-hidden rounded-2xl border border-[hsl(var(--nav-theme)/0.3)] bg-black"
        style={{ aspectRatio: "16 / 9" }}
      >
        {activated ? (
          <iframe
            className="absolute top-0 left-0 h-full w-full"
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <>
            {/* 主题预览封面 */}
            <img
              src={poster}
              alt={title}
              className="absolute top-0 left-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
            {/* 渐变遮罩，让播放按钮更突出 */}
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
            {/* 播放按钮 */}
            <span className="absolute inset-0 flex items-center justify-center">
              <span
                className="flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--nav-theme))] text-white shadow-2xl ring-4 ring-white/30 transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20"
              >
                <Play className="h-7 w-7 translate-x-0.5 fill-current md:h-9 md:w-9" />
              </span>
            </span>
            {/* 标题条 */}
            <span className="absolute bottom-0 left-0 right-0 p-4 text-left md:p-6">
              <span className="text-base font-semibold text-white drop-shadow-md md:text-xl">
                {title}
              </span>
            </span>
          </>
        )}
      </button>

      <div className="flex justify-center">
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
        >
          Watch on YouTube
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
