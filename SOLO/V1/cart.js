const cartStorageKey = "microcenter-demo-cart-v1";
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const cartItems = new Map();
let cartStatus = "";
let currentAccount = null;
let accountTransition = Promise.resolve();

const cartToggle = document.querySelector("#cart-toggle");
const cartCount = document.querySelector("#cart-count");
const cartDialog = document.createElement("dialog");
cartDialog.id = "cart-dialog";
cartDialog.className = "cart-dialog";
cartDialog.setAttribute("aria-labelledby", "cart-title");
cartDialog.innerHTML = `
    <div class="cart-content">
        <div class="cart-header">
            <h2 id="cart-title">Your cart</h2>
            <button class="cart-close" type="button" aria-label="Close cart">&times;</button>
        </div>
        <ul class="cart-items"></ul>
        <p class="cart-empty" hidden>Your cart is empty. Add a component to get started.</p>
        <p class="cart-status" role="status" aria-live="polite"></p>
        <div class="cart-footer">
            <span class="cart-total">Total: <span id="cart-total">$0.00</span></span>
            <button class="cart-action" type="button" data-cart-close>Continue shopping</button>
        </div>
    </div>
`;
document.body.append(cartDialog);

const cartList = cartDialog.querySelector(".cart-items");
const cartEmpty = cartDialog.querySelector(".cart-empty");
const cartStatusElement = cartDialog.querySelector(".cart-status");
const cartTotal = cartDialog.querySelector("#cart-total");

function validCartItem(item) {
    return Boolean(
        item &&
        typeof item.id === "string" &&
        typeof item.name === "string" &&
        Number.isFinite(item.price) &&
        item.price >= 0 &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
    );
}

function replaceCartItems(items) {
    cartItems.clear();
    items.forEach((item) => {
        if (validCartItem(item)) {
            cartItems.set(item.id, {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            });
        }
    });
}

function readGuestCart() {
    cartItems.clear();
    let serializedCart;
    try {
        serializedCart = window.localStorage.getItem(cartStorageKey);
    } catch {
        cartStatus = "Your browser blocked guest-cart storage. Log in to save your cart online.";
        return;
    }
    if (!serializedCart) {
        return;
    }

    try {
        const savedItems = JSON.parse(serializedCart);
        if (!Array.isArray(savedItems)) {
            throw new Error("Saved cart must be a list.");
        }
        replaceCartItems(savedItems);
    } catch (error) {
        cartStatus = "The saved guest cart could not be read. Add an item to start a fresh cart.";
        console.error(error);
    }
}

function renderCart() {
    const itemCount = [...cartItems.values()].reduce((total, item) => total + item.quantity, 0);
    const subtotal = [...cartItems.values()].reduce((total, item) => total + item.price * item.quantity, 0);
    cartCount.textContent = String(itemCount);
    cartList.replaceChildren();
    cartEmpty.hidden = itemCount > 0;
    cartTotal.textContent = currency.format(subtotal);
    cartStatusElement.textContent = cartStatus;

    cartItems.forEach((item) => {
        const row = document.createElement("li");
        const details = document.createElement("div");
        const name = document.createElement("strong");
        const linePrice = document.createElement("span");
        const controls = document.createElement("div");
        const decrease = document.createElement("button");
        const quantity = document.createElement("span");
        const increase = document.createElement("button");

        row.className = "cart-item";
        details.className = "cart-item-details";
        name.textContent = item.name;
        linePrice.textContent = `${currency.format(item.price)} each`;
        details.append(name, linePrice);
        controls.className = "cart-quantity";
        decrease.type = "button";
        decrease.textContent = "-";
        decrease.setAttribute("aria-label", `Remove one ${item.name}`);
        quantity.textContent = String(item.quantity);
        increase.type = "button";
        increase.textContent = "+";
        increase.setAttribute("aria-label", `Add one ${item.name}`);
        decrease.addEventListener("click", () => changeQuantity(item.id, -1));
        increase.addEventListener("click", () => changeQuantity(item.id, 1));
        controls.append(decrease, quantity, increase);
        row.append(details, controls);
        cartList.append(row);
    });
}

async function loadAccountCart() {
    const client = window.storeClient;
    if (!client || !currentAccount) {
        throw new Error("Account storage is not available.");
    }
    const { data, error } = await client
        .from("carts")
        .select("items")
        .eq("user_id", currentAccount.id)
        .maybeSingle();
    if (error) {
        throw error;
    }
    if (data && !Array.isArray(data.items)) {
        throw new Error("The saved cart data is invalid.");
    }
    replaceCartItems(data?.items || []);
}

async function persistCart() {
    const items = [...cartItems.values()];
    if (currentAccount) {
        const client = window.storeClient;
        if (!client) {
            cartStatus = "Account storage is not configured.";
            return false;
        }
        const { error } = await client.from("carts").upsert({
            user_id: currentAccount.id,
            items,
            updated_at: new Date().toISOString()
        }, { onConflict: "user_id" });
        if (error) {
            cartStatus = `Could not save your account cart: ${error.message}`;
            console.error("Could not save account cart:", error);
            return false;
        }
        cartStatus = "";
        return true;
    }

    try {
        window.localStorage.setItem(cartStorageKey, JSON.stringify(items));
        cartStatus = "";
        return true;
    } catch {
        cartStatus = "Cart changes could not be saved by this browser.";
        return false;
    }
}

async function changeQuantity(productId, amount) {
    const item = cartItems.get(productId);
    if (!item) {
        return;
    }
    item.quantity += amount;
    if (item.quantity <= 0) {
        cartItems.delete(productId);
    }
    cartStatus = "";
    await persistCart();
    renderCart();
}

async function initializeCart() {
    currentAccount = await window.accountReady;
    if (currentAccount) {
        try {
            await loadAccountCart();
        } catch (error) {
            cartStatus = `Could not load your account cart: ${error.message}`;
            console.error("Could not load account cart:", error);
        }
    } else {
        readGuestCart();
    }
    renderCart();
}

const cartReady = initializeCart();

async function switchAccount(account) {
    await cartReady;
    const guestItems = currentAccount ? [] : [...cartItems.values()];
    currentAccount = account;
    cartStatus = "";

    if (account) {
        try {
            await loadAccountCart();
            guestItems.forEach((guestItem) => {
                const savedItem = cartItems.get(guestItem.id);
                if (savedItem) {
                    savedItem.quantity = Math.min(99, savedItem.quantity + guestItem.quantity);
                } else {
                    cartItems.set(guestItem.id, guestItem);
                }
            });
            if (guestItems.length > 0) {
                const saved = await persistCart();
                if (saved) {
                    try {
                        window.localStorage.removeItem(cartStorageKey);
                    } catch {
                        cartStatus = "Your account cart was saved, but the guest copy could not be cleared from this browser.";
                    }
                }
            }
        } catch (error) {
            cartStatus = `Could not load your account cart: ${error.message}`;
            console.error("Could not switch to account cart:", error);
        }
    } else {
        readGuestCart();
    }
    renderCart();
}

window.addEventListener("store:account-changed", (event) => {
    accountTransition = accountTransition.then(() => switchAccount(event.detail));
});

window.addToCart = async (product) => {
    await cartReady;
    await accountTransition;
    if (
        !product ||
        typeof product.id !== "string" ||
        typeof product.name !== "string" ||
        !Number.isFinite(product.price) ||
        product.price < 0
    ) {
        throw new TypeError("Cannot add an invalid product to the cart.");
    }

    const existingItem = cartItems.get(product.id);
    if (existingItem) {
        existingItem.quantity = Math.min(99, existingItem.quantity + 1);
    } else {
        cartItems.set(product.id, {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    cartStatus = "";
    const saved = await persistCart();
    renderCart();
    return saved;
};

cartToggle.addEventListener("click", async () => {
    await cartReady;
    cartDialog.showModal();
});
cartDialog.querySelector(".cart-close").addEventListener("click", () => cartDialog.close());
cartDialog.querySelector("[data-cart-close]").addEventListener("click", () => cartDialog.close());
cartDialog.addEventListener("click", (event) => {
    if (event.target === cartDialog) {
        cartDialog.close();
    }
});
