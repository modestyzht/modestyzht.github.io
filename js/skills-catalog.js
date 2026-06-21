(function () {
  const app = document.getElementById("skills-app");
  if (!app) return;

  const state = {
    catalog: null,
    query: "",
    category: "all",
    tool: "all",
    sort: "category",
  };

  const nodes = {
    stats: document.getElementById("skills-stats"),
    controls: document.getElementById("skills-controls"),
    categoryFilters: document.getElementById("skills-category-filters"),
    toolFilters: document.getElementById("skills-tool-filters"),
    sections: document.getElementById("skills-sections"),
    leaderboard: document.getElementById("skills-leaderboard"),
    updated: document.getElementById("skills-updated"),
  };

  function nextFrame(callback) {
    const frame = window.requestAnimationFrame || ((run) => window.setTimeout(run, 0));
    frame(callback);
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function safeGitHubUrl(value) {
    const url = String(value || "");
    return /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/.test(url) ? url : "#";
  }

  function formatStars(stars) {
    const count = Number(stars || 0);
    if (count >= 1000) {
      return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}k`;
    }
    return String(count);
  }

  function formatDate(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  function skillSearchText(skill) {
    return [
      skill.name,
      skill.command,
      skill.description,
      skill.category,
      ...(skill.tags || []),
      ...(skill.tools || []),
      ...(skill.features || []),
      ...(skill.useCases || []),
      ...(skill.keywords || []),
      ...(skill.repositories || []).map((repo) => repo.fullName),
    ].join(" ").toLowerCase();
  }

  function repoSearchText(repo) {
    return [
      repo.fullName,
      repo.name,
      repo.description,
      repo.language,
      ...(repo.topics || []),
    ].join(" ").toLowerCase();
  }

  function getTools(skills) {
    return Array.from(new Set(skills.flatMap((skill) => skill.tools || []))).sort((a, b) => a.localeCompare(b));
  }

  function filteredSkills() {
    const query = state.query.trim().toLowerCase();
    let items = state.catalog.skills.filter((skill) => {
      const categoryMatch = state.category === "all" || skill.category === state.category;
      const toolMatch = state.tool === "all" || (skill.tools || []).includes(state.tool);
      const queryMatch = !query || skillSearchText(skill).includes(query);
      return categoryMatch && toolMatch && queryMatch;
    });

    if (state.sort === "name") {
      items = items.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else if (state.sort === "stars") {
      items = items.slice().sort((a, b) => (b.stars || 0) - (a.stars || 0));
    }

    return items;
  }

  function filteredRepos() {
    const query = state.query.trim().toLowerCase();
    const repos = state.catalog.githubLeaderboard || [];
    if (!query) return repos;
    return repos.filter((repo) => repoSearchText(repo).includes(query));
  }

  function renderStats() {
    const count = state.catalog.counts || {};
    nodes.stats.innerHTML = `
      <div class="skills-stat"><strong>${escapeHtml(count.skills || state.catalog.skills.length)}</strong><span>Skills</span></div>
      <div class="skills-stat"><strong>${escapeHtml(count.categories || state.catalog.categories.length)}</strong><span>分类</span></div>
      <div class="skills-stat"><strong>${escapeHtml(count.githubLeaderboard || 0)}</strong><span>GitHub</span></div>
    `;
  }

  function renderControls() {
    nodes.controls.innerHTML = `
      <div class="skills-search">
        <i class="fas fa-search"></i>
        <input id="skills-search-input" type="search" value="${escapeHtml(state.query)}" placeholder="查功能、命令、工具或仓库" autocomplete="off">
      </div>
      <label class="skills-sort">
        <select id="skills-sort-select" aria-label="Skill 排序">
          <option value="category"${state.sort === "category" ? " selected" : ""}>按分类</option>
          <option value="stars"${state.sort === "stars" ? " selected" : ""}>按仓库热度</option>
          <option value="name"${state.sort === "name" ? " selected" : ""}>按名称</option>
        </select>
      </label>
    `;

    const categoryButtons = [
      { id: "all", name: "全部", icon: "fas fa-layer-group" },
      ...state.catalog.categories,
    ].map((category) => `
      <button class="skills-filter${state.category === category.id ? " is-active" : ""}" type="button" data-category="${escapeHtml(category.id)}">
        <i class="${escapeHtml(category.icon || "fas fa-tag")}"></i>${escapeHtml(category.name)}
      </button>
    `).join("");
    nodes.categoryFilters.innerHTML = categoryButtons;

    const tools = [{ id: "all", name: "全部工具" }, ...getTools(state.catalog.skills).map((tool) => ({ id: tool, name: tool }))];
    nodes.toolFilters.innerHTML = tools.map((tool) => `
      <button class="skills-filter${state.tool === tool.id ? " is-active" : ""}" type="button" data-tool="${escapeHtml(tool.id)}">
        ${escapeHtml(tool.name)}
      </button>
    `).join("");
  }

  function renderSkillCard(skill) {
    const repo = skill.primaryRepo || (skill.repositories || [])[0] || {};
    const repoUrl = safeGitHubUrl(repo.url);
    const features = (skill.features || []).slice(0, 3);

    return `
      <article class="skill-card" style="--accent:${escapeHtml(skill.accent || "#0f766e")}">
        <div class="skill-card-head">
          <div class="skill-icon"><i class="${escapeHtml(skill.icon || "fas fa-magic")}"></i></div>
          <div>
            <h3 class="skill-name">${escapeHtml(skill.name)}</h3>
            <code class="skill-command">${escapeHtml(skill.command)}</code>
          </div>
        </div>
        <p class="skill-desc">${escapeHtml(skill.description)}</p>
        <div class="skill-tags">${(skill.tags || []).map((tag) => `<span class="skill-tag">${escapeHtml(tag)}</span>`).join("")}</div>
        <div class="skill-tools">${(skill.tools || []).map((tool) => `<span class="skill-tool">${escapeHtml(tool)}</span>`).join("")}</div>
        <div class="skill-feature-title">功能点</div>
        <ul class="skill-features">${features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}</ul>
        <div class="skill-card-foot">
          <div class="skill-repo"><i class="fab fa-github"></i> <a href="${repoUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(repo.fullName || "GitHub")}</a></div>
          <div class="skill-stars"><i class="fas fa-star"></i>${formatStars(repo.stars || skill.stars)}</div>
        </div>
      </article>
    `;
  }

  function renderRail(className, content, label) {
    return `
      <div class="skill-rail-wrap">
        <button class="skill-rail-nav skill-rail-prev" type="button" data-rail-dir="-1" aria-label="${escapeHtml(label)}上一组">
          <i class="fas fa-chevron-left"></i>
        </button>
        <div class="${escapeHtml(className)}" tabindex="0" aria-label="${escapeHtml(label)}">
          ${content}
        </div>
        <button class="skill-rail-nav skill-rail-next" type="button" data-rail-dir="1" aria-label="${escapeHtml(label)}下一组">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    `;
  }

  function getRailStep(rail) {
    const card = rail.querySelector(".skill-card, .github-card");
    if (!card) return Math.max(rail.clientWidth * 0.85, 280);
    const styles = window.getComputedStyle(rail);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    return Math.max(card.getBoundingClientRect().width + gap, rail.clientWidth * 0.65);
  }

  function moveRail(wrap, direction) {
    const rail = wrap && wrap.querySelector(".skill-rail, .github-rail");
    if (!rail) return;

    rail.scrollBy({ left: direction * getRailStep(rail), behavior: "smooth" });
    window.setTimeout(() => updateRailButtons(wrap), 260);
  }

  function updateRailButtons(wrap) {
    const rail = wrap.querySelector(".skill-rail, .github-rail");
    const prev = wrap.querySelector(".skill-rail-prev");
    const next = wrap.querySelector(".skill-rail-next");
    if (!rail || !prev || !next) return;

    const maxScroll = Math.max(0, rail.scrollWidth - rail.clientWidth);
    const hasOverflow = maxScroll > 4;
    wrap.classList.toggle("has-overflow", hasOverflow);
    prev.disabled = !hasOverflow || rail.scrollLeft <= 2;
    next.disabled = !hasOverflow || rail.scrollLeft >= maxScroll - 2;
  }

  function updateAllRailButtons() {
    document.querySelectorAll(".skill-rail-wrap").forEach((wrap) => {
      const rail = wrap.querySelector(".skill-rail, .github-rail");
      if (rail && !rail.dataset.navBound) {
        rail.addEventListener("scroll", () => nextFrame(() => updateRailButtons(wrap)), { passive: true });
        rail.dataset.navBound = "true";
      }
      if (!wrap.dataset.navBound) {
        wrap.querySelectorAll("[data-rail-dir]").forEach((button) => {
          button.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            moveRail(wrap, Number(button.dataset.railDir) || 1);
          });
        });
        wrap.dataset.navBound = "true";
      }
      updateRailButtons(wrap);
    });
  }

  function scheduleRailUpdate() {
    nextFrame(updateAllRailButtons);
  }

  function renderSections() {
    const skills = filteredSkills();
    if (!skills.length) {
      nodes.sections.innerHTML = '<div class="skills-empty">没有匹配的 Skill，换一个功能词试试。</div>';
      scheduleRailUpdate();
      return;
    }

    if (state.sort !== "category") {
      const rail = renderRail("skill-rail", skills.map(renderSkillCard).join(""), "筛选结果 Skill");
      nodes.sections.innerHTML = `
        <section class="skill-section">
          <div class="skill-section-head">
            <div>
              <h2 class="skill-section-title"><i class="fas fa-layer-group"></i>筛选结果</h2>
              <p class="skill-section-desc">当前条件匹配到 ${skills.length} 个 Skill</p>
            </div>
            <span class="skill-section-count">${skills.length} 个</span>
          </div>
          ${rail}
        </section>
      `;
      scheduleRailUpdate();
      return;
    }

    nodes.sections.innerHTML = state.catalog.categories.map((category) => {
      const group = skills.filter((skill) => skill.category === category.id);
      if (!group.length) return "";
      const rail = renderRail("skill-rail", group.map(renderSkillCard).join(""), `${category.name} Skill`);
      return `
        <section class="skill-section" id="skill-category-${escapeHtml(category.id)}">
          <div class="skill-section-head">
            <div>
              <h2 class="skill-section-title"><i class="${escapeHtml(category.icon || "fas fa-tag")}"></i>${escapeHtml(category.name)}</h2>
              <p class="skill-section-desc">${escapeHtml(category.description || "")}</p>
            </div>
            <span class="skill-section-count">${group.length} 个</span>
          </div>
          ${rail}
        </section>
      `;
    }).join("");
    scheduleRailUpdate();
  }

  function renderRepoCard(repo) {
    const topics = (repo.topics || []).slice(0, 5);
    return `
      <article class="github-card">
        <div class="github-card-head">
          <h3 class="github-name"><a href="${safeGitHubUrl(repo.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(repo.fullName)}</a></h3>
          <span class="skill-stars"><i class="fas fa-star"></i>${formatStars(repo.stars)}</span>
        </div>
        <p class="github-desc">${escapeHtml(repo.description || "暂无仓库描述")}</p>
        <div class="github-meta">
          ${repo.language ? `<span><i class="fas fa-code"></i> ${escapeHtml(repo.language)}</span>` : ""}
          ${repo.forks ? `<span><i class="fas fa-code-branch"></i> ${escapeHtml(repo.forks)}</span>` : ""}
          ${repo.pushedAt ? `<span><i class="fas fa-clock"></i> ${escapeHtml(formatDate(repo.pushedAt))}</span>` : ""}
        </div>
        <div class="github-topics">${topics.map((topic) => `<span class="github-topic">${escapeHtml(topic)}</span>`).join("")}</div>
      </article>
    `;
  }

  function renderLeaderboard() {
    const repos = filteredRepos();
    if (!repos.length) {
      nodes.leaderboard.innerHTML = "";
      scheduleRailUpdate();
      return;
    }

    const rail = renderRail("github-rail", repos.map(renderRepoCard).join(""), "GitHub Skill 榜单");
    nodes.leaderboard.innerHTML = `
      <section class="skill-section">
        <div class="skill-section-head">
          <div>
            <h2 class="skill-section-title"><i class="fab fa-github"></i>GitHub Skill 榜单</h2>
            <p class="skill-section-desc">按 GitHub 搜索热度补充的 Skill / Agent 仓库，一周自动更新一次</p>
          </div>
          <span class="skill-section-count">${repos.length} 个仓库</span>
        </div>
        ${rail}
      </section>
    `;
    scheduleRailUpdate();
  }

  function renderUpdated() {
    nodes.updated.innerHTML = `
      <span><i class="fas fa-rotate"></i> 更新频率：${escapeHtml(state.catalog.updateCadence || "weekly")}</span>
      <span><i class="fas fa-calendar-check"></i> 数据时间：${escapeHtml(formatDate(state.catalog.generatedAt))}</span>
      <span><i class="fas fa-database"></i> 来源：GitHub + 人工整理</span>
    `;
  }

  function render() {
    renderStats();
    renderControls();
    renderSections();
    renderLeaderboard();
    renderUpdated();
    scheduleRailUpdate();
  }

  app.addEventListener("input", (event) => {
    if (event.target.id === "skills-search-input") {
      state.query = event.target.value;
      renderSections();
      renderLeaderboard();
    }
  });

  app.addEventListener("change", (event) => {
    if (event.target.id === "skills-sort-select") {
      state.sort = event.target.value;
      render();
    }
  });

  app.addEventListener("click", (event) => {
    const railNav = event.target.closest("[data-rail-dir]");
    if (railNav) {
      const wrap = railNav.closest(".skill-rail-wrap");
      moveRail(wrap, Number(railNav.dataset.railDir) || 1);
      return;
    }

    const category = event.target.closest("[data-category]");
    if (category) {
      state.category = category.dataset.category;
      render();
      return;
    }

    const tool = event.target.closest("[data-tool]");
    if (tool) {
      state.tool = tool.dataset.tool;
      render();
    }
  });

  app.addEventListener("keydown", (event) => {
    const rail = event.target.closest(".skill-rail, .github-rail");
    if (!rail) return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    const direction = event.key === "ArrowLeft" ? -1 : 1;
    rail.scrollBy({ left: direction * getRailStep(rail), behavior: "smooth" });
  });

  window.addEventListener("resize", scheduleRailUpdate);

  fetch("/data/skills-catalog.json", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((catalog) => {
      state.catalog = catalog;
      render();
    })
    .catch((error) => {
      nodes.sections.innerHTML = `<div class="skills-empty">Skill 数据加载失败：${escapeHtml(error.message)}</div>`;
    });
})();
