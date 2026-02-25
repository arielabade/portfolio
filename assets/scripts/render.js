function createTag(text) {
  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = text;
  return tag;
}

export function renderProjectCards(projects, container) {
  container.innerHTML = "";

  projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const stack = document.createElement("div");
    stack.className = "tag-row";
    project.stack.forEach((item) => stack.appendChild(createTag(item)));

    const link =
      project.repo === "#"
        ? '<span class="project-link disabled">Case interno</span>'
        : `<a class="project-link" href="${project.repo}" target="_blank" rel="noreferrer">Ver no GitHub</a>`;

    card.innerHTML = `
      <p class="kicker">${project.tag}</p>
      <h3>${project.name}</h3>
      <p class="project-description">${project.description}</p>
      <p class="status">${project.status}</p>
      <div class="project-footer">${link}</div>
    `;

    card.insertBefore(stack, card.querySelector(".status"));
    container.appendChild(card);
  });
}

export function renderList(items, container, mapper) {
  container.innerHTML = "";
  items.forEach((item) => {
    const element = document.createElement("article");
    element.className = "info-card";
    element.innerHTML = mapper(item);
    container.appendChild(element);
  });
}
