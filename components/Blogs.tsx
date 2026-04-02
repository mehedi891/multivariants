import Link from "next/link";
import Image from "next/image";
import AnimateIn from "./AnimateIn";
import { getPublicBlogPosts } from "@/app/blog/public-api";

function formatDate(dateISO: string) {
  return new Date(dateISO).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function isRemoteImage(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

export default async function Blogs() {
  const { posts } = await getPublicBlogPosts({ page: 1, limit: 3 });

  return (
    <section
      className="relative overflow-hidden px-[5%] py-16 lg:py-24"
      style={{ background: "linear-gradient(160deg, #0a0f1e 0%, #0f172a 50%, #1a1040 100%)" }}
      id="blogs"
      aria-labelledby="blogs-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-20 -right-20 h-[400px] w-[400px] rounded-full bg-primary/15 blur-[80px]" />
        <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <AnimateIn direction="up">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-[13px] font-semibold text-primary-light uppercase tracking-widest mb-2">
                Resources
              </p>
              <h2 id="blogs-heading" className="text-3xl font-black tracking-tight text-white md:text-4xl">
                Latest News and Blogs
              </h2>
            </div>
            <Link href="/blog" className="inline-flex items-center px-5 py-2 rounded-lg text-sm font-semibold border-[1.5px] border-white/25 text-white/70 hover:border-primary hover:text-primary transition-all whitespace-nowrap glass">
              See All Blogs
            </Link>
          </div>
        </AnimateIn>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none" role="list">
          {posts.map((post, i) => (
            <AnimateIn key={post.slug} direction="up" delay={i * 100}>
              <li className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block h-full glass rounded-[20px] overflow-hidden border-white/10 hover:border-primary/40 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(92,106,196,0.2)] transition-all duration-300"
                >
                  <div className="relative h-[180px] overflow-hidden border-b border-white/10">
                    <Image
                      src={post.coverImage}
                      alt={post.coverImageAlt}
                      fill
                      unoptimized={isRemoteImage(post.coverImage)}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 92vw"
                    />
                  </div>

                  <article className="p-6 flex flex-col flex-1">
                    <p className="text-[12px] font-semibold text-primary-light uppercase tracking-[0.5px] mb-2">
                      {post.category}
                    </p>
                    <h3 className="text-[17px] font-bold mb-2.5 leading-snug text-white group-hover:text-primary-light transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-[13px] text-white/55 leading-relaxed mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <p className="text-[12px] text-white/35 flex items-center gap-1.5">
                      <time>{formatDate(post.publishedAt)}</time>
                      <span aria-hidden="true">|</span>
                      {post.readingTimeMinutes} min read
                    </p>
                  </article>
                </Link>
              </li>
            </AnimateIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
