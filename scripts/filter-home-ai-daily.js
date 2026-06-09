/* global hexo */

'use strict';

const pagination = require('hexo-pagination');

const DAILY_POST_RE = /(?:^|\/)ai-daily-(\d{4}-\d{2}-\d{2})(?:\/|\.md|$)/i;
const DAILY_TITLE_RE = /AI\s*日报\s*-\s*(\d{4}-\d{2}-\d{2})/i;
const RECENT_POST_CARD_VIEW = `if theme.aside.card_recent_post.enable
  .card-widget.card-recent-post
    .item-headline
      i.fas.fa-history
      span= _p('aside.card_recent_post')
    .aside-list
      - let postLimit = theme.aside.card_recent_post.limit === 0 ? site.posts.length : theme.aside.card_recent_post.limit || 5
      - let sort = theme.aside.card_recent_post.sort === 'updated' ? 'updated' : 'date'
      - visibleHomeRecentPosts(site.posts, postLimit, sort).each(function(article){
        - let link = article.link || article.path
        - let title = article.title || _p('no_title')
        - let no_cover = article.cover === false || !theme.cover.aside_enable ? 'no-cover' : ''
        - let post_cover = article.cover
        .aside-list-item(class=no_cover)
          if post_cover && theme.cover.aside_enable
            a.thumbnail(href=url_for(link) title=title)
              if article.cover_type === 'img'
                img(src=url_for(post_cover) onerror=\`this.onerror=null;this.src='\${url_for(theme.error_img.post_page)}'\` alt=title)
              else
                div(style=\`background: \${post_cover}\`)
          .content
            a.title(href=url_for(link) title=title)= title
            if theme.aside.card_recent_post.sort === 'updated'
              time(datetime=date_xml(article.updated) title=_p('post.updated') + ' ' + full_date(article.updated)) #[=date(article.updated, config.date_format)]
            else
              time(datetime=date_xml(article.date) title=_p('post.created') + ' ' + full_date(article.date)) #[=date(article.date, config.date_format)]
      - })`;

function todayInTimezone(timezone) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone || 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date());

  const value = (type) => parts.find((part) => part.type === type).value;
  return `${value('year')}-${value('month')}-${value('day')}`;
}

function getAiDailyDate(post) {
  const fields = [
    post.slug,
    post.path,
    post.source,
    post.full_source,
    post._id,
    post.title
  ];

  for (const field of fields) {
    if (!field) continue;

    const text = String(field);
    const pathMatch = text.match(DAILY_POST_RE);
    if (pathMatch) return pathMatch[1];

    const titleMatch = text.match(DAILY_TITLE_RE);
    if (titleMatch) return titleMatch[1];
  }

  return null;
}

function isVisibleOnHome(post, today) {
  const dailyDate = getAiDailyDate(post);
  return !dailyDate || dailyDate === today;
}

hexo.extend.helper.register('visibleHomeRecentPosts', function(posts, limit, sort) {
  const timezone = this.config.timezone || 'Asia/Shanghai';
  const today = todayInTimezone(timezone);
  const filteredPosts = posts.sort(sort, -1).filter((post) => isVisibleOnHome(post, today));
  return limit === 0 ? filteredPosts : filteredPosts.limit(limit);
});

hexo.extend.filter.register('before_generate', function() {
  this.theme.setView('includes/widget/card_recent_post.pug', RECENT_POST_CARD_VIEW);
});

hexo.config.index_generator = Object.assign({
  per_page: typeof hexo.config.per_page === 'undefined' ? 10 : hexo.config.per_page,
  order_by: '-date',
  layout: ['index', 'archive']
}, hexo.config.index_generator);

hexo.extend.generator.register('index', function(locals) {
  const config = this.config;
  const indexConfig = config.index_generator;
  const timezone = config.timezone || 'Asia/Shanghai';
  const today = todayInTimezone(timezone);
  const allPosts = locals.posts.sort(indexConfig.order_by);
  const posts = allPosts.filter((post) => isVisibleOnHome(post, today));
  const hiddenCount = allPosts.length - posts.length;

  posts.data.sort((a, b) => (b.sticky || 0) - (a.sticky || 0));

  if (hiddenCount) {
    this.log.info(`Home index: hid ${hiddenCount} old AI daily post(s); showing AI daily for ${today}.`);
  }

  const paginationDir = indexConfig.pagination_dir || config.pagination_dir || 'page';
  const path = indexConfig.path || '';

  return pagination(path, posts, {
    perPage: indexConfig.per_page,
    layout: indexConfig.layout || ['index', 'archive'],
    format: `${paginationDir}/%d/`,
    data: {
      __index: true
    }
  });
});
