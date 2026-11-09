class NeyangNavbar extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = `
            <style>
                :host {
                    position: sticky;
                    z-index: 20;
                    top: 0;
                    display: block;
                    background: #fff;
                    box-shadow: 0 2px 8px rgba(0,0,0,.05);
                    color: #242424;
                    font-family: "Noto Sans Lao", "Phetsarath OT", "Leelawadee UI", sans-serif;
                }
                :host([embedded]) { display: none; }
                * { box-sizing: border-box; }
                .bar {
                    display: flex;
                    width: min(1200px,calc(100% - 40px));
                    min-height: 76px;
                    align-items: center;
                    gap: 24px;
                    margin: 0 auto;
                }
                .brand {
                    flex: 0 0 auto;
                    color: #f85606;
                    font-size: 27px;
                    font-weight: 900;
                    letter-spacing: -.06em;
                    text-decoration: none;
                }
                .search-area { display: none; min-width: 0; flex: 1; }
                :host(.has-search) .search-area { display: block; }
                .search-area ::slotted([slot="search"]) { width: 100%; }
                .actions-area { display: none; flex: 0 0 auto; }
                :host(.has-actions) .actions-area { display: block; }
                .actions-area ::slotted([slot="actions"]) { white-space: nowrap; }
                nav { display: flex; flex: 0 0 auto; align-items: center; gap: 18px; }
                nav button {
                    display: inline-flex;
                    min-height: 40px;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    border: 0;
                    border-radius: 6px;
                    padding: 0 5px;
                    background: transparent;
                    color: #555;
                    font: inherit;
                    font-size: 13px;
                    font-weight: 700;
                    white-space: nowrap;
                    cursor: pointer;
                    transition: color .15s,background .15s;
                }
                nav button:hover, nav button:focus-visible, nav button[aria-current="page"] {
                    background: #fff1e8;
                    color: #f85606;
                }
                svg { display: none; width: 19px; height: 19px; }
                @media (max-width: 900px) {
                    .bar { width: min(100% - 28px,720px); min-height: 64px; flex-wrap: wrap; gap: 14px; padding: 8px 0; }
                    .brand { font-size: 25px; }
                    nav {
                        position: fixed;
                        z-index: 30;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        display: grid;
                        grid-template-columns: repeat(4,minmax(0,1fr));
                        gap: 0;
                        border-top: 1px solid #ececec;
                        padding: 6px 6px calc(6px + env(safe-area-inset-bottom));
                        background: rgba(255,255,255,.97);
                        box-shadow: 0 -4px 16px rgba(0,0,0,.07);
                    }
                    nav button { min-width: 0; min-height: 48px; flex-direction: column; gap: 1px; border-radius: 5px; padding: 3px 1px; font-size: 10px; }
                    svg { display: block; }
                }
                @media (max-width: 600px) {
                    .bar { width: calc(100% - 20px); min-height: 58px; gap: 8px; padding: 8px 0; }
                    .brand { font-size: 23px; }
                    .search-area { order: 3; flex-basis: 100%; }
                }
                @media (max-width: 380px) {
                    .bar { width: calc(100% - 16px); gap: 7px; }
                    .brand { font-size: 20px; }
                }
            </style>
            <div class="bar">
                <a class="brand" href="#" aria-label="NEYANG ໜ້າຫຼັກ">NEYANG</a>
                <div class="search-area"><slot name="search"></slot></div>
                <div class="actions-area"><slot name="actions"></slot></div>
                <nav aria-label="ເມນູຫຼັກ">
                    <button type="button" data-view="community">
                        <svg class="home-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 10.5 9-7.3 9 7.3"/><path d="M5.5 9v11h13V9"/><path d="M9.5 20v-6h5v6"/><path d="M16 5.1V3.5h2v3.2"/></svg>
                        <span>Home</span>
                    </button>
                    <button type="button" data-view="store" data-target="products">
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6v3l2 2v12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8l2-2V3Z"/><path d="M9 6h6M8 13h8"/></svg>
                        <span>Product</span>
                    </button>
                    <button type="button" data-view="promotion">
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7"/><path d="M2 7h20v5H2zM12 7v14"/></svg>
                        <span>ໂປຣໂມຊັນ</span>
                    </button>
                    <button type="button" data-view="profile">
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>
                        <span>ໂປຣໄຟລ໌</span>
                    </button>
                </nav>
            </div>
        `;

        const searchSlot = shadow.querySelector('slot[name="search"]');
        const actionsSlot = shadow.querySelector('slot[name="actions"]');
        const updateSlots = () => {
            this.classList.toggle("has-search", searchSlot.assignedElements().length > 0);
            this.classList.toggle("has-actions", actionsSlot.assignedElements().length > 0);
        };
        searchSlot.addEventListener("slotchange", updateSlots);
        actionsSlot.addEventListener("slotchange", updateSlots);
        updateSlots();

        shadow.querySelector(".brand").addEventListener("click", (event) => {
            event.preventDefault();
            this.navigate(this.dataset.homeView || "store", this.dataset.homeTarget);
        });

        shadow.querySelectorAll("nav button").forEach((button) => {
            if (button.dataset.view === this.getAttribute("active")) {
                button.setAttribute("aria-current", "page");
            }
            button.addEventListener("click", () => {
                this.navigate(button.dataset.view, button.dataset.target);
            });
        });
    }

    connectedCallback() {
        if (this.hasAttribute("embedded") && window.parent === window) {
            this.removeAttribute("embedded");
        }
    }

    navigate(view, target) {
        const detail = { view, target };
        if (window.parent !== window) {
            const targetOrigin = window.location.origin === "null" ? "*" : window.location.origin;
            window.parent.postMessage({ type: "neyang-open-view", ...detail }, targetOrigin);
            return;
        }

        if (document.querySelector("#store-view")) {
            this.dispatchEvent(new CustomEvent("neyang-open-view", {
                bubbles: true,
                composed: true,
                detail
            }));
            return;
        }

        const pages = {
            community: "./section_home.html",
            store: `./index.html${target ? `#${target}` : ""}`,
            promotion: "./section_promotion.html",
            profile: "./section_profile.html"
        };
        window.location.href = pages[view] || pages.store;
    }
}

if (!customElements.get("neyang-navbar")) {
    customElements.define("neyang-navbar", NeyangNavbar);
}
