import { useEffect, useRef, useCallback } from "react";
import type { BlogArticle } from "@/data/blogArticles";

interface BlogModalProps {
    article: BlogArticle | null;
    onClose: () => void;
}

const BlogModal = ({ article, onClose }: BlogModalProps) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClose = useCallback(() => {
        if (modalRef.current) {
            modalRef.current.classList.add("blog-modal-content--closing");
        }
        if (overlayRef.current) {
            overlayRef.current.classList.add("blog-modal-overlay--closing");
        }
        setTimeout(onClose, 350);
    }, [onClose]);

    useEffect(() => {
        if (!article) return;
        document.body.style.overflow = "hidden";

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", handleKey);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKey);
        };
    }, [article, handleClose]);

    if (!article) return null;

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
                    {/* Fixed close button - positioned relative to .blog-modal-content */}
                    <button
                        className="blog-modal-close"
                        onClick={handleClose}
                        aria-label="Close article"
                        title="Close"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {/* Scrollable inner content */}
                    <div className="blog-modal-scroll">
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

                        {/* CTA strip */}
                        <div className="blog-modal-cta">
                            <p className="blog-modal-cta-text">
                                Ready to apply this to your own health?
                            </p>
                            <a href="/book" className="blog-modal-cta-button">
                                Start Free Assessment
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogModal;
