import { useEffect, useRef, useCallback, useState } from "react";
import { BlogArticle, allArticles } from "@/data/blogArticles";
import ImagePlaceholder from "@/components/ImagePlaceholder";

interface BlogModalProps {
    article: BlogArticle | null;
    onClose: () => void;
    onOpenArticle?: (article: BlogArticle) => void;
}

const mostReadTitles = [
    "5 Lab Tests Your Doctor Never Orders But Should",
    "Why Your Thyroid Labs Are 'Normal' But You Still Feel Terrible",
    "Brain Fog Is Not Normal — Here's What's Causing It",
    "The Gut-Brain Axis Explained",
    "Why Your Cortisol Is Sabotaging Your Weight Loss",
];

const BlogModal = ({ article, onClose, onOpenArticle }: BlogModalProps) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    const handleClose = useCallback(() => {
        if (modalRef.current) {
            modalRef.current.classList.add("blog-modal-content--closing");
        }
        if (overlayRef.current) {
            overlayRef.current.classList.add("blog-modal-overlay--closing");
        }
        setTimeout(onClose, 200);
    }, [onClose]);

    useEffect(() => {
        if (!article) return;
        document.body.style.overflow = "hidden";
        setScrollProgress(0);
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
        if (progressRef.current) progressRef.current.style.setProperty('--progress-width', '0%');

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", handleKey);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKey);
        };
    }, [article, handleClose]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        const maxScroll = scrollHeight - clientHeight;
        if (maxScroll <= 0) {
            setScrollProgress(0);
            if (progressRef.current) progressRef.current.style.setProperty('--progress-width', '0%');
            return;
        }
        const progress = (scrollTop / maxScroll) * 100;
        setScrollProgress(progress);
        if (progressRef.current) progressRef.current.style.setProperty('--progress-width', `${progress}%`);
    };

    if (!article) return null;

    let relatedArticles: BlogArticle[] = [];
    const sameCategoryIndex = allArticles.findIndex(a => a.category === article.category && a.slug !== article.slug);
    const sameCategory = sameCategoryIndex !== -1 ? allArticles[sameCategoryIndex] : null;

    if (sameCategory) {
        relatedArticles.push(sameCategory);
        const diffCategoryMostRead = allArticles.find(a => mostReadTitles.includes(a.title) && a.category !== article.category && a.slug !== article.slug);
        if (diffCategoryMostRead) {
            relatedArticles.push(diffCategoryMostRead);
        } else {
            relatedArticles.push(allArticles.find(a => a.slug !== article.slug && a.slug !== sameCategory.slug)!);
        }
    } else {
        relatedArticles = allArticles
            .filter(a => mostReadTitles.includes(a.title) && a.slug !== article.slug)
            .slice(0, 2);
    }

    const renderBody = (body: string) => {
        const lines = body.split("\n").filter(line => line.trim() !== "");
        const elements: JSX.Element[] = [];
        let key = 0;

        for (const line of lines) {
            const trimmed = line.trim();

            if (trimmed.startsWith("## ")) {
                elements.push(
                    <h2 key={key++} className="blog-modal-h2">{trimmed.slice(3)}</h2>
                );
            } else if (trimmed.startsWith("### ")) {
                elements.push(
                    <h3 key={key++} className="blog-modal-h3">{trimmed.slice(4)}</h3>
                );
            } else if (trimmed.startsWith("> ")) {
                elements.push(
                    <blockquote key={key++} className="blog-modal-blockquote">
                        <p>{trimmed.slice(2).replace(/^"/, "").replace(/"$/, "")}</p>
                    </blockquote>
                );
            } else if (trimmed.startsWith("- ")) {
                elements.push(
                    <li key={key++} className="blog-modal-list-item">{trimmed.slice(2)}</li>
                );
            } else {
                const items = trimmed.split(/(?=\*\*)/).filter(Boolean);
                const isInlineList = items.length > 1 && items.every(item => /^\*\*[^*]+\*\*\s*—\s*/.test(item));

                if (isInlineList) {
                    elements.push(
                        <ul key={key++} className="blog-modal-inline-list">
                            {items.map((item, i) => {
                                const match = item.match(/^\*\*([^*]+)\*\*\s*—\s*(.*)$/);
                                if (match) {
                                    return (
                                        <li key={i} className="blog-modal-inline-list-item">
                                            <span className="blog-modal-inline-list-term">{match[1]}</span>
                                            <span className="blog-modal-inline-list-desc"> — {match[2]}</span>
                                        </li>
                                    );
                                }
                                return null;
                            })}
                        </ul>
                    );
                    continue;
                }

                // Parse bold text within paragraphs
                const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
                const rendered = parts.map((part, i) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                        return <strong key={i}>{part.slice(2, -2)}</strong>;
                    }
                    return part;
                });
                elements.push(
                    <p key={key++} className="blog-modal-paragraph">{rendered}</p>
                );
            }
        }

        return elements;
    };

    return (
        <>
            <div
                ref={overlayRef}
                className="blog-modal-overlay"
                onClick={handleClose}
                aria-label="Close article modal"
            />
            <div className="blog-modal-wrapper" onClick={handleClose}>
                <div
                    ref={modalRef}
                    className="blog-modal-content"
                    onClick={(e) => e.stopPropagation()}
                    role="dialog"
                    aria-modal="true"
                    aria-label={article.title}
                >
                    <div 
                        ref={progressRef}
                        className="blog-modal-progress-bar"
                    />
                    {/* Fixed close button - positioned relative to .blog-modal-content */}
                    <button
                        className="blog-modal-close"
                        onClick={handleClose}
                        aria-label="Close article"
                        title="Close"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {/* Scrollable inner content */}
                    <div className="blog-modal-scroll" ref={scrollRef} onScroll={handleScroll}>
                        {/* Hero image */}
                        <div className="blog-modal-hero">
                            <img src={article.image} alt={article.title} className="blog-modal-hero-img" />
                        </div>

                        {/* Content */}
                        <div className="blog-modal-body-wrapper">
                            <span className="blog-modal-category">{article.category}</span>
                            <h1 className="blog-modal-title">{article.title}</h1>

                            <div className="blog-modal-meta">
                                <span>{article.author}</span>
                                <span className="blog-modal-meta-dot">·</span>
                                <span>{article.date}</span>
                                <span className="blog-modal-meta-dot">·</span>
                                <span>{article.readTime} read</span>
                            </div>

                            <div className="blog-modal-article-body">
                                {renderBody(article.body)}
                            </div>
                        </div>

                        {/* Read Next Section */}
                        <div className="bg-[#F5F0E8] py-10 px-6 md:px-10 text-center">
                            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#C9A84C] block mb-8">
                                READ NEXT
                            </span>
                            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
                                {relatedArticles.map(a => (
                                    <div
                                        key={a.slug}
                                        className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-200"
                                        onClick={() => {
                                            if (onOpenArticle) {
                                                handleClose();
                                                setTimeout(() => onOpenArticle(a), 200);
                                            }
                                        }}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && onOpenArticle) {
                                                handleClose();
                                                setTimeout(() => onOpenArticle(a), 200);
                                            }
                                        }}
                                    >
                                        <div className="h-[160px] overflow-hidden">
                                            <ImagePlaceholder
                                                label={`Blog — ${a.title}`}
                                                aspectRatio="landscape"
                                                className="w-full h-full object-cover"
                                                src={a.image}
                                            />
                                        </div>
                                        <div className="p-5">
                                            <span className="font-mono text-[10px] tracking-wider uppercase text-[#C9A84C] block mb-2">{a.category}</span>
                                            <h4 className="font-display font-semibold text-lg text-[#2D4A3E] leading-tight mb-2">{a.title}</h4>
                                            <span className="font-sans text-[13px] text-muted-foreground">{a.readTime} read</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA strip */}
                        <div className="blog-modal-cta">
                            <p className="blog-modal-cta-text">
                                Ready to apply this to your own health?
                            </p>
                            <a href="/book" className="blog-modal-cta-button">
                                Check If You Qualify
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogModal;
