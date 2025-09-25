// src/components/hub/InnovationTabs.client.ts
document.addEventListener("DOMContentLoaded", () => {
  const roots = document.querySelectorAll<HTMLElement>("[data-tabs]");
  roots.forEach((root) => {
    const initial = (root.getAttribute("data-initial") || "").trim();
    const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    const panels = Array.from(root.querySelectorAll<HTMLElement>('[role="tabpanel"]'));

    function openTab(id: string) {
      tabs.forEach((btn) => {
        const on = btn.dataset.id === id;
        btn.setAttribute("aria-selected", on ? "true" : "false");
        btn.classList.toggle("text-neutral-900", on);
        btn.classList.toggle("text-neutral-600", !on);
        const underline = btn.querySelector<HTMLElement>("span.absolute");
        if (underline) underline.style.backgroundColor = on ? "currentColor" : "transparent";
      });

      panels.forEach((p) => {
        const on = p.dataset.id === id;
        p.dataset.open = on ? "true" : "false";
        p.classList.toggle("hidden", !on);
      });
    }

    // Click + accesibilidad por teclado
    tabs.forEach((btn, i) => {
      btn.addEventListener("click", () => openTab(btn.dataset.id!));
      btn.addEventListener("keydown", (e) => {
        if (!["ArrowRight","ArrowLeft","ArrowDown","ArrowUp","Home","End"].includes(e.key)) return;
        e.preventDefault();
        let n = i;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % tabs.length;
        if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   n = (i - 1 + tabs.length) % tabs.length;
        if (e.key === "Home") n = 0;
        if (e.key === "End")  n = tabs.length - 1;
        tabs[n].focus();
        openTab(tabs[n].dataset.id!);
      });
    });

    // Abrir la inicial
    const defaultId = initial || tabs[0]?.dataset.id;
    if (defaultId) openTab(defaultId);
  });
});
