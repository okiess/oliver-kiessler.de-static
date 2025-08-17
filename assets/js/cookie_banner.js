// cookie_banner.js
function CookieBanner(options) {
  // Default-Optionen mit übergebenen Optionen zusammenführen
  options = options || {};

  this.options = {
    cookieName: options.cookieName || 'cookie_consent',
    expiryDays: options.expiryDays || 365,
    position: options.position || 'bottom',
    theme: options.theme || 'light',
    customStyles: options.customStyles || null,
    onAccept: options.onAccept || function() {},
    onDecline: options.onDecline || function() {},
    translations: options.translations || {
      title: 'Diese Website verwendet Cookies',
      message: 'Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. Durch die weitere Nutzung dieser Website stimmen Sie der Verwendung von Cookies zu.',
      acceptBtn: 'Akzeptieren',
      declineBtn: 'Ablehnen',
      settingsBtn: 'Einstellungen',
      necessaryText: 'Notwendige Cookies',
      analyticsText: 'Analytische Cookies',
      marketingText: 'Marketing Cookies',
      necessaryDesc: 'Diese Cookies sind für das Funktionieren der Website unbedingt erforderlich.',
      analyticsDesc: 'Diese Cookies helfen uns, die Nutzung der Website zu verstehen und zu verbessern.',
      marketingDesc: 'Diese Cookies werden verwendet, um Ihnen relevante Anzeigen zu zeigen.',
      saveSettingsBtn: 'Einstellungen speichern',
      closeText: 'Schließen'
    }
  };

  this.cookieCategories = {
    necessary: {
      enabled: true,
      required: true
    },
    analytics: {
      enabled: false,
      required: false
    },
    marketing: {
      enabled: false,
      required: false
    }
  };

  this.isSettingsOpen = false;
  this.init();
}

CookieBanner.prototype = {
  init: function() {
    // Prüfen, ob bereits ein Consent gesetzt ist
    if (!this.hasConsent()) {
      this.createBanner();
      this.attachEvents();
    }
  },

  hasConsent: function() {
    var cookies = document.cookie.split(';');
    var hasConsent = false;

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.indexOf(this.options.cookieName + '=') === 0) {
        hasConsent = true;
        break;
      }
    }

    return hasConsent;
  },

  getConsentValue: function() {
    var cookies = document.cookie.split('; ');
    var cookieValue = null;

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      if (cookie.indexOf(this.options.cookieName + '=') === 0) {
        cookieValue = cookie.split('=')[1];
        break;
      }
    }

    if (cookieValue) {
      try {
        return JSON.parse(decodeURIComponent(cookieValue));
      } catch(e) {
        return null;
      }
    }

    return null;
  },

  setConsent: function(consent) {
    var value = encodeURIComponent(JSON.stringify(consent));
    var expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + this.options.expiryDays);

    document.cookie = this.options.cookieName + '=' + value + '; expires=' + expiryDate.toUTCString() + '; path=/; SameSite=Lax';
  },

  createBanner: function() {
    var self = this;
    var bannerStyles = this.generateStyles();

    // Styles zum Dokument-Head hinzufügen
    var styleElement = document.createElement('style');
    styleElement.textContent = bannerStyles;
    document.head.appendChild(styleElement);

    // Banner-Element erstellen
    var banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.className = 'cookie-banner cookie-banner-' + this.options.position + ' cookie-banner-' + this.options.theme;

    // Banner-Inhalt hinzufügen
    banner.innerHTML =
      '<div class="cookie-banner-content">' +
        '<h3>' + this.options.translations.title + '</h3>' +
        '<p>' + this.options.translations.message + '</p>' +
        '<div class="cookie-banner-actions">' +
          '<button id="cookie-accept" class="cookie-btn cookie-btn-primary">' + this.options.translations.acceptBtn + '</button>' +
          '<button id="cookie-decline" class="cookie-btn cookie-btn-secondary">' + this.options.translations.declineBtn + '</button>' +
          '<button id="cookie-settings" class="cookie-btn cookie-btn-tertiary">' + this.options.translations.settingsBtn + '</button>' +
        '</div>' +
      '</div>' +
      '<div class="cookie-banner-settings" style="display: none;">' +
        '<h3>' + this.options.translations.title + '</h3>' +
        '<div class="cookie-settings-options">' +
          '<div class="cookie-setting-option">' +
            '<div class="cookie-setting-header">' +
              '<label>' +
                '<input type="checkbox" id="cookie-necessary" checked disabled>' +
                '<span>' + this.options.translations.necessaryText + '</span>' +
              '</label>' +
            '</div>' +
            '<p>' + this.options.translations.necessaryDesc + '</p>' +
          '</div>' +
          '<div class="cookie-setting-option">' +
            '<div class="cookie-setting-header">' +
              '<label>' +
                '<input type="checkbox" id="cookie-analytics">' +
                '<span>' + this.options.translations.analyticsText + '</span>' +
              '</label>' +
            '</div>' +
            '<p>' + this.options.translations.analyticsDesc + '</p>' +
          '</div>' +
          /*'<div class="cookie-setting-option">' +
            '<div class="cookie-setting-header">' +
              '<label>' +
                '<input type="checkbox" id="cookie-marketing">' +
                '<span>' + this.options.translations.marketingText + '</span>' +
              '</label>' +
            '</div>' +
            '<p>' + this.options.translations.marketingDesc + '</p>' +
          '</div>' +*/
        '</div>' +
        '<div class="cookie-banner-actions">' +
          '<button id="cookie-save-settings" class="cookie-btn cookie-btn-primary">' + this.options.translations.saveSettingsBtn + '</button>' +
          '<button id="cookie-settings-close" class="cookie-btn cookie-btn-secondary">' + this.options.translations.closeText + '</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(banner);
  },

  generateStyles: function() {
    var baseStyles =
      '#cookie-consent-banner {' +
      '  position: fixed;' +
      '  ' + this.options.position + ': 0;' +
      '  left: 0;' +
      '  right: 0;' +
      '  padding: 20px;' +
      '  z-index: 999999;' +
      '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;' +
      '  font-size: 16px;' +
      '  line-height: 1.5;' +
      '  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);' +
      '}' +

      '#cookie-consent-banner * {' +
      '  box-sizing: border-box;' +
      '}' +

      '.cookie-banner-light {' +
      '  background-color: #ffffff;' +
      '  color: #333333;' +
      '}' +

      '.cookie-banner-dark {' +
      '  background-color: #222222;' +
      '  color: #ffffff;' +
      '}' +

      '.cookie-banner-content {' +
      '  max-width: 1200px;' +
      '  margin: 0 auto;' +
      '}' +

      '.cookie-banner-settings {' +
      '  max-width: 1200px;' +
      '  margin: 0 auto;' +
      '}' +

      '#cookie-consent-banner h3 {' +
      '  margin-top: 0;' +
      '  margin-bottom: 15px;' +
      '  font-size: 1.2em;' +
      '}' +

      '#cookie-consent-banner p {' +
      '  margin-top: 0;' +
      '  margin-bottom: 20px;' +
      '}' +

      '.cookie-banner-actions {' +
      '  display: flex;' +
      '  flex-wrap: wrap;' +
      '  gap: 10px;' +
      '}' +

      '.cookie-btn {' +
      '  padding: 0px 16px;' +
      '  border-radius: 4px;' +
      '  cursor: pointer;' +
      '  border: none;' +
      '  font-size: 14px;' +
      '  font-weight: 500;' +
      '  text-align: center;' +
      '  transition: background-color 0.2s;' +
      '}' +

      '.cookie-banner-light .cookie-btn-primary {' +
      '  color: white;' +
      '}' +

      '.cookie-banner-light .cookie-btn-secondary {' +
      '  color: #333333;' +
      '}' +

      '.cookie-banner-light .cookie-btn-tertiary {' +
      '  background-color: transparent;' +
      '  color: #0066cc;' +
      '}' +

      '.cookie-banner-dark .cookie-btn-primary {' +
      '  background-color: #3391ff;' +
      '  color: white;' +
      '}' +

      '.cookie-banner-dark .cookie-btn-secondary {' +
      '  background-color: #444444;' +
      '  color: white;' +
      '}' +

      '.cookie-banner-dark .cookie-btn-tertiary {' +
      '  background-color: transparent;' +
      '  color: #3391ff;' +
      '  text-decoration: underline;' +
      '}' +

      '.cookie-settings-options {' +
      '  margin: 20px 0;' +
      '}' +

      '.cookie-setting-option {' +
      '  margin-bottom: 15px;' +
      '  padding-bottom: 15px;' +
      '  border-bottom: 1px solid;' +
      '}' +

      '.cookie-banner-light .cookie-setting-option {' +
      '  border-color: #e6e6e6;' +
      '}' +

      '.cookie-banner-dark .cookie-setting-option {' +
      '  border-color: #444444;' +
      '}' +

      '.cookie-setting-option:last-child {' +
      '  border-bottom: none;' +
      '}' +

      '.cookie-setting-header {' +
      '  display: flex;' +
      '  justify-content: space-between;' +
      '  margin-bottom: 8px;' +
      '}' +

      '.cookie-setting-header label {' +
      '  display: flex;' +
      '  align-items: center;' +
      '  gap: 8px;' +
      '  font-weight: 600;' +
      '}' +

      '@media (max-width: 768px) {' +
      '  .cookie-banner-actions {' +
      '    flex-direction: column;' +
      '  }' +
      '  ' +
      '  .cookie-btn {' +
      '    width: 100%;' +
      '  }' +
      '}';

    return this.options.customStyles ? baseStyles + this.options.customStyles : baseStyles;
  },

  attachEvents: function() {
    var self = this;
    var banner = document.getElementById('cookie-consent-banner');
    var acceptBtn = document.getElementById('cookie-accept');
    var declineBtn = document.getElementById('cookie-decline');
    var settingsBtn = document.getElementById('cookie-settings');
    var saveSettingsBtn = document.getElementById('cookie-save-settings');
    var closeSettingsBtn = document.getElementById('cookie-settings-close');
    var contentSection = banner.querySelector('.cookie-banner-content');
    var settingsSection = banner.querySelector('.cookie-banner-settings');

    // Alle Cookies akzeptieren
    acceptBtn.addEventListener('click', function() {
      var consent = {
        necessary: true,
        analytics: true,
        marketing: true,
        timestamp: new Date().toISOString()
      };

      self.setConsent(consent);
      self.options.onAccept(consent);
      banner.parentNode.removeChild(banner);
    });

    // Nur notwendige Cookies akzeptieren
    declineBtn.addEventListener('click', function() {
      var consent = {
        necessary: true,
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString()
      };

      self.setConsent(consent);
      self.options.onDecline(consent);
      banner.parentNode.removeChild(banner);
    });

    // Einstellungen anzeigen
    settingsBtn.addEventListener('click', function() {
      contentSection.style.display = 'none';
      settingsSection.style.display = 'block';
      self.isSettingsOpen = true;
    });

    // Zurück zum Haupt-Banner
    closeSettingsBtn.addEventListener('click', function() {
      settingsSection.style.display = 'none';
      contentSection.style.display = 'block';
      self.isSettingsOpen = false;
    });

    // Cookie-Einstellungen speichern
    saveSettingsBtn.addEventListener('click', function() {
      var analyticsCheckbox = document.getElementById('cookie-analytics');
      var marketingCheckbox = document.getElementById('cookie-marketing');

      var consent = {
        necessary: true,
        analytics: analyticsCheckbox.checked,
        marketing: marketingCheckbox.checked,
        timestamp: new Date().toISOString()
      };

      self.setConsent(consent);

      if (consent.analytics && consent.marketing) {
        self.options.onAccept(consent);
      } else {
        self.options.onDecline(consent);
      }

      banner.parentNode.removeChild(banner);
    });
  }
};

// Globaler Export für ältere Browser
if (typeof window !== 'undefined') {
  window.CookieBanner = CookieBanner;
}
