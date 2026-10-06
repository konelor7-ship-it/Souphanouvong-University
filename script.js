const mobileMenu = document.querySelector(".mobile-nav");
const menuButton = mobileMenu.querySelector("summary");

mobileMenu.addEventListener("toggle", () => {
    menuButton.setAttribute(
        "aria-label",
        mobileMenu.open ? "Close navigation menu" : "Open navigation menu"
    );
});

mobileMenu.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", () => {
        mobileMenu.open = false;
    });
});

document.addEventListener("click", (event) => {
    if (mobileMenu.open && !mobileMenu.contains(event.target)) {
        mobileMenu.open = false;
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu.open) {
        mobileMenu.open = false;
        menuButton.focus();
    }
});

const sections = Array.from(
    document.querySelectorAll("#about, #study, #campus, #news, #admissions")
);
const navigationLinks = document.querySelectorAll(
    '.desktop-nav a[href^="#"], .mobile-nav nav a[href^="#"]'
);

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(() => {
        const currentSection = sections
            .filter((section) => section.getBoundingClientRect().top <= window.innerHeight * 0.35)
            .pop();

        if (!currentSection) {
            navigationLinks.forEach((link) => link.removeAttribute("aria-current"));
            return;
        }

        navigationLinks.forEach((link) => {
            if (link.hash === `#${currentSection.id}`) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }, { rootMargin: "-35% 0px -64% 0px" });

    sections.forEach((section) => sectionObserver.observe(section));
}