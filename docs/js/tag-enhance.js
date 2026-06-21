(function() {
  if (!document.querySelector('.tag-cloud-list')) return;

  const fontToCount = {
    '1.5': 6,
    '1.35': 4,
    '1.3': 3,
    '1.2': 2,
    '1.1': 1
  };

  document.querySelectorAll('.tag-cloud-list a').forEach(a => {
    const fs = parseFloat(a.style.fontSize);
    const count = fontToCount[String(fs)] || 1;
    a.setAttribute('data-count', count + '篇');
  });

  // 去重：只保留第一个出现的 tag（tag cloud 区的版本）
  const seen = new Set();
  document.querySelectorAll('.tag-cloud-list a').forEach(a => {
    const name = a.textContent.trim();
    if (seen.has(name)) {
      a.style.display = 'none';
    } else {
      seen.add(name);
    }
  });
})();
