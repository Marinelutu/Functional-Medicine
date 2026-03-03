import { useState, useCallback } from "react";
import { useCart } from "@/contexts/CartContext";

interface AddToCartButtonProps {
    productName: string;
    productPrice: string;
    productBenefit?: string;
    variant?: "default" | "bundle" | "large";
    qty?: number;
}

type ButtonState = "idle" | "loading" | "confirmed";

const AddToCartButton = ({
    productName,
    productPrice,
    productBenefit,
    variant = "default",
    qty = 1,
}: AddToCartButtonProps) => {
    const [state, setState] = useState<ButtonState>("idle");
    const { addToCart } = useCart();

    const handleClick = useCallback(() => {
        if (state !== "idle") return;

        setState("loading");

        setTimeout(() => {
            for (let i = 0; i < qty; i++) {
                addToCart(productName, productPrice, productBenefit);
            }
            setState("confirmed");

            setTimeout(() => {
                setState("idle");
            }, 2000);
        }, 400);
    }, [state, addToCart, productName, productPrice, productBenefit, qty]);

    const isBundle = variant === "bundle";
    const isLarge = variant === "large";

    const baseClasses = isLarge
        ? "flex-1 px-6 py-3 rounded-full font-semibold transition-all duration-300"
        : "px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300";

    const stateClasses =
        state === "confirmed"
            ? "atc-btn--confirmed"
            : state === "loading"
                ? "atc-btn--loading"
                : isBundle
                    ? "bg-accent text-accent-foreground hover:opacity-90"
                    : "bg-primary text-primary-foreground hover:opacity-90";

    const label =
        state === "confirmed"
            ? "✓ Added"
            : state === "loading"
                ? ""
                : isBundle
                    ? "Add Bundle"
                    : "Add to Cart";

    return (
        <button
            onClick={handleClick}
            disabled={state !== "idle"}
            className={`${baseClasses} ${stateClasses} atc-btn`}
            aria-label={`Add ${productName} to cart`}
        >
            {state === "loading" ? (
                <span className="atc-spinner" aria-label="Adding to cart" />
            ) : (
                <span className="atc-btn-text">{label}</span>
            )}
        </button>
    );
};

export default AddToCartButton;
