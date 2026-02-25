import { profile, highlights, recognitions, timeline } from "../data/profile.js";
import { projects } from "../data/projects.js";
import { renderProjectCards, renderList } from "./render.js";

const $ = (selector) => document.querySelector(selector);

function hydrateProfile() {
  $("#profile-name").textContent = profile.name;
  $("#profile-role").textContent = profile.role;
  $("#profile-headline").textContent = profile.headline;
  $("#profile-summary").textContent = profile.summary;

  const techContainer = $("#tech-stack");
  profile.techStack.forEach((item) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = item;
    techContainer.appendChild(chip);
  });

  $("#contact-email").href = `mailto:${profile.contact.email}`;
  $("#contact-email").textContent = profile.contact.email;
  $("#contact-github").href = profile.contact.github;
  $("#contact-linkedin").href = profile.contact.linkedin;

  const waMessage = encodeURIComponent(
    `Olá, Ariel. Vi seu portfólio e gostaria de conversar sobre projetos de dados e IA.`
  );
  $("#contact-whatsapp").href = `https://wa.me/${profile.contact.whatsapp}?text=${waMessage}`;
}

function hydrateHighlights() {
  const container = $("#highlight-list");
  highlights.forEach((item) => {
    const block = document.createElement("div");
    block.className = "metric";
    block.innerHTML = `<strong>${item.metric}</strong><span>${item.label}</span>`;
    container.appendChild(block);
  });
}

function hydrateTabs() {
  const tabs = Array.from(document.querySelectorAll("[data-tab-target]"));
  const panels = Array.from(document.querySelectorAll("[data-tab-panel]"));

  function activate(tabName) {
    tabs.forEach((tab) => {
      const active = tab.dataset.tabTarget === tabName;
      tab.setAttribute("aria-selected", String(active));
      tab.classList.toggle("is-active", active);
    });

    panels.forEach((panel) => {
      const active = panel.dataset.tabPanel === tabName;
      panel.hidden = !active;
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activate(tab.dataset.tabTarget));
  });

  activate("projetos");
}

function hydratePanels() {
  renderProjectCards(projects, $("#projects-grid"));

  renderList(recognitions, $("#recognition-grid"), (item) => `
    <h3>${item.title}</h3>
    <p>${item.detail}</p>
    <p class="meta">${item.source}</p>
  `);

  renderList(timeline, $("#timeline-grid"), (item) => `
    <p class="kicker">${item.period}</p>
    <h3>${item.role}</h3>
    <p>${item.description}</p>
  `);
}

function hydrateMobileMenu() {
  const button = $("#menu-button");
  const menu = $("#mobile-menu");
  if (!button || !menu) return;

  button.addEventListener("click", () => {
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isExpanded));
    menu.hidden = isExpanded;
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.hidden = true;
      button.setAttribute("aria-expanded", "false");
    });
  });
}

function hydrateReveal() {
  const elements = document.querySelectorAll("[data-reveal]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  elements.forEach((el) => observer.observe(el));
}

function init() {
  hydrateProfile();
  hydrateHighlights();
  hydrateTabs();
  hydratePanels();
  hydrateMobileMenu();
  hydrateReveal();
}

init();
