/*
 * Shared theme controller for Fluid 1.9.9.
 * Color/highlight/comment integration adapted from Fluid's color-schema.js
 * (https://github.com/fluid-dev/hexo-theme-fluid, GPL-V3), in turn based on
 * https://blog.skk.moe/post/hello-darkmode-my-old-friend/ .
 * This replaces that script; it must never be loaded alongside it.
 */
(function(window, document) {
  'use strict';
  var fluid = window.Fluid || (window.Fluid = {});
  if (fluid.siteTheme) {
    fluid.siteTheme.sync();
    return;
  }

  var root = document.documentElement;
  var storageKey = 'Fluid_Color_Scheme';
  var mode = 'system';
  var media = typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  var labels = { system: '跟随系统', light: '亮色', dark: '暗色' };
  var next = { system: 'light', light: 'dark', dark: 'system' };
  var boundControls = new WeakSet();
  var boundFrames = new WeakSet();
  var widgetTimer;

  function storage(action, value) {
    try {
      if (action === 'get') return window.localStorage.getItem(storageKey);
      if (action === 'set') window.localStorage.setItem(storageKey, value);
      if (action === 'remove') window.localStorage.removeItem(storageKey);
    } catch (e) { /* Storage can be blocked: the in-page preference still works. */ }
    return null;
  }

  var stored = storage('get');
  if (stored === 'light' || stored === 'dark') mode = stored;
  else if (stored !== null) storage('remove');

  function resolvedScheme() {
    if (mode !== 'system') return mode;
    if (media) return media.matches ? 'dark' : 'light';
    var cssMode = getComputedStyle(root).getPropertyValue('--color-mode').replace(/["'\s]/g, '');
    return cssMode === 'dark' ? 'dark' : 'light';
  }

  function setText(element, text) {
    if (element && element.textContent !== text) element.textContent = text;
  }

  function setPreference(preference) {
    mode = preference;
    if (mode === 'system') storage('remove');
    else storage('set', mode);
    sync();
  }

  function bindControl(anchor) {
    if (boundControls.has(anchor)) return;
    boundControls.add(anchor);
    anchor.setAttribute('role', 'button');
    var spacePressed = false;
    anchor.addEventListener('click', function(event) {
      event.preventDefault();
      setPreference(next[mode]);
    });
    // Anchors already turn Enter into click. Handling it again would double-toggle.
    anchor.addEventListener('keydown', function(event) {
      if (event.key !== ' ' && event.key !== 'Spacebar') return;
      event.preventDefault();
      if (!event.repeat) spacePressed = true;
    });
    anchor.addEventListener('keyup', function(event) {
      if (event.key !== ' ' && event.key !== 'Spacebar') return;
      event.preventDefault();
      if (spacePressed) {
        spacePressed = false;
        anchor.click();
      }
    });
    anchor.addEventListener('blur', function() { spacePressed = false; });
  }

  function syncControls(scheme) {
    var description = mode === 'system'
      ? '跟随系统（当前实际为' + labels[scheme] + '）' : labels[mode] + '模式';
    ['', 'mobile-'].forEach(function(prefix) {
      var container = document.querySelector('#' + prefix + 'color-toggle-btn');
      var anchor = container && container.querySelector('a');
      var icon = document.querySelector('#' + prefix + 'color-toggle-icon');
      if (anchor) {
        bindControl(anchor);
        anchor.setAttribute('title', description);
        anchor.setAttribute('aria-label', description);
        if (!prefix) {
          var label = anchor.querySelector('[data-site-theme-label]');
          if (!label) {
            label = document.createElement('span');
            label.setAttribute('data-site-theme-label', '');
            anchor.appendChild(label);
          }
          setText(label, labels[mode]);
        }
      }
      if (icon) {
        icon.setAttribute('class', 'iconfont icon-' + scheme);
        icon.setAttribute('aria-hidden', 'true');
      }
    });
    setText(document.querySelector('#mobile-color-toggle-label'), labels[mode]);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', getComputedStyle(root).getPropertyValue('--navbar-bg-color').trim());
  }

  function syncHighlight(scheme) {
    [['highlight-css', 'light'], ['highlight-css-dark', 'dark']].forEach(function(pair) {
      var link = document.getElementById(pair[0]);
      if (link) {
        if (scheme === pair[1]) link.removeAttribute('disabled');
        else link.setAttribute('disabled', '');
      }
    });
    clearTimeout(widgetTimer);
    widgetTimer = setTimeout(function() {
      if (!fluid.utils || !fluid.utils.getBackgroundLightness) return;
      document.querySelectorAll('.markdown-body pre').forEach(function(pre) {
        var cls = fluid.utils.getBackgroundLightness(pre) >= 0 ? 'code-widget-light' : 'code-widget-dark';
        var widget = pre.querySelector('.code-widget-light, .code-widget-dark');
        if (widget) {
          widget.classList.remove('code-widget-light', 'code-widget-dark');
          widget.classList.add(cls);
        }
      });
    }, 200);
  }

  function safely(callback) {
    try { callback(); } catch (e) { /* One unavailable comment service must not break the theme. */ }
  }

  function syncApplications(scheme) {
    safely(function() { if (window.REMARK42) window.REMARK42.changeTheme(scheme); });
    safely(function() { if (window.CUSDIS) window.CUSDIS.setTheme(scheme); });
    safely(function() {
      var frame = document.querySelector('.utterances-frame');
      if (frame && frame.contentWindow) frame.contentWindow.postMessage({ type: 'set-theme',
        theme: scheme === 'dark' ? window.UtterancesThemeDark : window.UtterancesThemeLight
      }, 'https://utteranc.es');
    });
    safely(function() {
      var frame = document.querySelector('iframe.giscus-frame');
      if (frame && frame.contentWindow) frame.contentWindow.postMessage({ giscus: { setConfig: {
        theme: scheme === 'dark' ? window.GiscusThemeDark : window.GiscusThemeLight
      } } }, 'https://giscus.app');
    });
    document.querySelectorAll('iframe').forEach(function(frame) {
      if (boundFrames.has(frame)) return;
      boundFrames.add(frame);
      frame.addEventListener('load', function() { syncApplications(resolvedScheme()); });
    });
  }

  function sync() {
    var scheme = resolvedScheme();
    root.setAttribute('data-user-color-scheme', scheme);
    syncControls(scheme);
    syncHighlight(scheme);
    syncApplications(scheme);
  }

  // Publish just the idempotence handle; preference stays in this single closure.
  fluid.siteTheme = { sync: sync };
  sync(); // Original synchronous head position: resolve before body is parsed.
  if (media) {
    var onSystemChange = function() { if (mode === 'system') sync(); };
    if (media.addEventListener) media.addEventListener('change', onSystemChange);
    else if (media.addListener) media.addListener(onSystemChange);
  }
  if (typeof MutationObserver !== 'undefined') {
    new MutationObserver(function(records) {
      if (records.some(function(record) { return record.addedNodes.length > 0; })) sync();
    }).observe(root, { childList: true, subtree: true });
  }
  document.addEventListener('DOMContentLoaded', sync, { once: true });
})(window, document);
