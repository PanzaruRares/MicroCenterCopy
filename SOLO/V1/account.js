const themeStorageKey = "microcenter-demo-theme-v1";
const accountMenu = document.querySelector(".account-menu");
const themeToggle = document.querySelector("#theme-toggle");
const loginOpen = document.querySelector("#login-open");
const logoutButton = document.querySelector("#logout-button");
const accountLabel = document.querySelector("#account-label");
const loginDialog = document.querySelector("#login-dialog");
const loginForm = document.querySelector("#login-form");
const loginTitle = document.querySelector("#login-title");
const loginSubmit = document.querySelector(".account-submit");
const loginModeToggle = document.querySelector("#account-mode-toggle");
const loginEmail = document.querySelector("#login-email");
const displayName = document.querySelector("#display-name");
const displayNameLabel = document.querySelector("#display-name-label");
const loginPassword = document.querySelector("#login-password");
const loginStatus = document.querySelector("#login-status");
const accountStatus = document.querySelector("#account-status");
const loginClose = document.querySelector(".account-dialog-close");
let isRegisterMode = false;
let authClient = null;

if (
    !accountMenu || !themeToggle || !loginOpen || !logoutButton || !accountLabel ||
    !loginDialog || !loginForm || !loginTitle || !loginSubmit || !loginModeToggle ||
    !loginEmail || !displayName || !displayNameLabel || !loginPassword ||
    !loginStatus || !accountStatus || !loginClose
) {
    throw new Error("The account menu is missing required controls.");
}

const setTheme = (theme) => {
    const isLight = theme === "light";
    document.body.dataset.theme = isLight ? "light" : "dark";
    themeToggle.textContent = isLight ? "Switch to black mode" : "Switch to white mode";
};

try {
    setTheme(window.localStorage.getItem(themeStorageKey) === "light" ? "light" : "dark");
} catch {
    setTheme("dark");
    accountStatus.textContent = "Theme preference storage is unavailable; the theme will reset when you leave this page.";
}

function accountFromUser(user) {
    return user ? {
        id: user.id,
        label: user.user_metadata?.display_name || user.email
    } : null;
}

function updateAccountUi(account) {
    window.currentAccount = account;
    accountLabel.textContent = account?.label || "Account";
    accountLabel.title = account ? `Signed in as ${account.label}` : "Account";
    loginOpen.hidden = Boolean(account);
    logoutButton.hidden = !account;
    if (account) {
        accountStatus.textContent = `Signed in as ${account.label}`;
    } else if (accountStatus.textContent.startsWith("Signed in as ")) {
        accountStatus.textContent = "";
    }
}

function dispatchAccountChange(account) {
    window.dispatchEvent(new CustomEvent("store:account-changed", { detail: account }));
}

window.accountReady = (async () => {
    const config = window.STOREFRONT_SUPABASE_CONFIG;
    if (!config?.url || !config?.anonKey) {
        accountStatus.textContent = "Account sync is not configured yet. Add your Supabase URL and publishable key to deploy.";
        updateAccountUi(null);
        return null;
    }

    try {
        const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
        authClient = createClient(config.url, config.anonKey, {
            auth: {
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: true,
                flowType: "pkce"
            }
        });
        window.storeClient = authClient;
        const { data, error } = await authClient.auth.getSession();
        if (error) {
            throw error;
        }

        const account = accountFromUser(data.session?.user);
        updateAccountUi(account);
        if (!account) {
            accountStatus.textContent = "";
        }
        return account;
    } catch (error) {
        accountStatus.textContent = "Could not connect to Supabase. Check the project URL, publishable key, and network.";
        console.error("Could not initialize Supabase authentication:", error);
        return null;
    }
})();

themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.dataset.theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    try {
        window.localStorage.setItem(themeStorageKey, nextTheme);
        if (!accountStatus.textContent.startsWith("Signed in as ")) {
            accountStatus.textContent = "";
        }
    } catch {
        accountStatus.textContent = "Theme changed for this page, but your browser could not save the preference.";
    }
});

loginOpen.addEventListener("click", () => {
    accountMenu.open = false;
    isRegisterMode = false;
    loginStatus.textContent = "";
    loginForm.reset();
    updateLoginMode();
    loginDialog.showModal();
});

function updateLoginMode() {
    loginTitle.textContent = isRegisterMode ? "Create account" : "Log in";
    loginSubmit.textContent = isRegisterMode ? "Create account" : "Log in";
    loginModeToggle.textContent = isRegisterMode ? "Back to log in" : "Create an account";
    loginPassword.autocomplete = isRegisterMode ? "new-password" : "current-password";
    loginPassword.minLength = 12;
    displayName.hidden = !isRegisterMode;
    displayNameLabel.hidden = !isRegisterMode;
    displayName.required = false;
    loginStatus.textContent = isRegisterMode
        ? "Use a password with at least 12 characters."
        : "";
}

loginModeToggle.addEventListener("click", () => {
    isRegisterMode = !isRegisterMode;
    updateLoginMode();
});

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    loginSubmit.disabled = true;
    loginStatus.textContent = isRegisterMode ? "Creating your account…" : "Signing in…";
    try {
        await window.accountReady;
        if (!authClient) {
            throw new Error("Account service is not configured. Set up the Supabase URL and publishable key first.");
        }

        let result;
        if (isRegisterMode) {
            result = await authClient.auth.signUp({
                email: loginEmail.value.trim(),
                password: loginPassword.value,
                options: {
                    data: { display_name: displayName.value.trim() },
                    emailRedirectTo: window.location.href.split("#")[0]
                }
            });
        } else {
            result = await authClient.auth.signInWithPassword({
                email: loginEmail.value.trim(),
                password: loginPassword.value
            });
        }
        if (result.error) {
            throw result.error;
        }

        const account = accountFromUser(result.data.user);
        if (!result.data.session) {
            loginForm.reset();
            loginStatus.textContent = "Check your email to confirm your account, then log in here.";
            return;
        }

        updateAccountUi(account);
        loginForm.reset();
        loginDialog.close();
        dispatchAccountChange(account);
    } catch (error) {
        loginStatus.textContent = error.message || "Authentication failed. Please try again.";
    } finally {
        loginSubmit.disabled = false;
    }
});

logoutButton.addEventListener("click", async () => {
    logoutButton.disabled = true;
    try {
        await window.accountReady;
        if (!authClient) {
            throw new Error("Account service is not configured.");
        }
        const { error } = await authClient.auth.signOut();
        if (error) {
            throw error;
        }
        updateAccountUi(null);
        dispatchAccountChange(null);
        accountStatus.textContent = "You have logged out.";
    } catch (error) {
        accountMenu.open = true;
        accountStatus.textContent = error.message || "Could not log out. Please try again.";
    } finally {
        logoutButton.disabled = false;
    }
});

loginClose.addEventListener("click", () => loginDialog.close());
loginDialog.addEventListener("click", (event) => {
    if (event.target === loginDialog) {
        loginDialog.close();
    }
});
