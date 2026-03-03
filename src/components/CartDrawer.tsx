import { useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const CartDrawer = () => {
    const { items, subtotal, drawerOpen, closeDrawer, updateQty, removeFromCart } =
        useCart();

    /* Lock body scroll when drawer is open */
    useEffect(() => {
        if (drawerOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [drawerOpen]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`cart-overlay ${drawerOpen ? "cart-overlay--visible" : ""}`}
                onClick={closeDrawer}
                aria-hidden="true"
            />

            {/* Drawer */}
            <aside
                className={`cart-drawer ${drawerOpen ? "cart-drawer--open" : ""}`}
                aria-label="Shopping cart"
            >
                {/* Header */}
                <div className="cart-drawer-header">
                    <h2 className="cart-drawer-title">Your Cart</h2>
                    <button
                        onClick={closeDrawer}
                        className="cart-drawer-close"
                        aria-label="Close cart"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="cart-drawer-body">
                    {items.length === 0 ? (
                        <div className="cart-drawer-empty">
                            <p className="cart-drawer-empty-text">
                                Your protocol starts here.
                            </p>
                            <Link
                                to="/shop"
                                onClick={closeDrawer}
                                className="cart-drawer-browse"
                            >
                                Browse Supplements →
                            </Link>
                        </div>
                    ) : (
                        <ul className="cart-drawer-items">
                            {items.map((item) => (
                                <li key={item.name} className="cart-drawer-item">
                                    <div className="cart-drawer-item-info">
                                        <h3 className="cart-drawer-item-name">{item.name}</h3>
                                        {item.benefit && (
                                            <p className="cart-drawer-item-benefit">{item.benefit}</p>
                                        )}
                                        <p className="cart-drawer-item-price">{item.price}</p>
                                    </div>
                                    <div className="cart-drawer-item-actions">
                                        <div className="cart-drawer-qty">
                                            <button
                                                onClick={() => updateQty(item.name, item.qty - 1)}
                                                className="cart-drawer-qty-btn"
                                                aria-label={`Decrease quantity of ${item.name}`}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="cart-drawer-qty-num">{item.qty}</span>
                                            <button
                                                onClick={() => updateQty(item.name, item.qty + 1)}
                                                className="cart-drawer-qty-btn"
                                                aria-label={`Increase quantity of ${item.name}`}
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.name)}
                                            className="cart-drawer-remove"
                                            aria-label={`Remove ${item.name} from cart`}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="cart-drawer-footer">
                        <div className="cart-drawer-subtotal">
                            <span>Subtotal</span>
                            <span className="cart-drawer-subtotal-price">
                                ${subtotal.toFixed(2)}
                            </span>
                        </div>
                        <button className="cart-drawer-checkout">
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
};

export default CartDrawer;
