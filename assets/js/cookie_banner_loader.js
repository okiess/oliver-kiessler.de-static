// cookie_banner_loader.js
(function() {
  // Standard-Event für Nicht-Turbo-Apps und ältere Browser
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieBanner);
  } else {
    initCookieBanner();
  }

  function initCookieBanner() {
    // Cookie Banner mit Standard-Konfiguration initialisieren
    var cookieBanner = new CookieBanner({
      // Standard-Optionen
      cookieName: 'rails_app_cookie_consent',
      position: 'bottom',
      theme: 'light',

      // Callback-Funktionen
      onAccept: function(consent) {
        console.log('Cookies akzeptiert:', consent);

        // Google Analytics laden, wenn analytics akzeptiert wurde
        if (consent.analytics) {
          loadGoogleAnalytics();
        }

        // Marketing-Skripte laden, wenn marketing akzeptiert wurde
        if (consent.marketing) {
          loadMarketingScripts();
        }
      },

      onDecline: function(consent) {
        console.log('Einige Cookies abgelehnt:', consent);
      }
    });
  }

  // Beispiel-Funktionen zum Laden von externen Skripten
  function loadGoogleAnalytics() {
    // Hier Analytics-Skripte laden
    console.log('Google Analytics wird geladen...');

    // Beispiel für GA4 (ersetzen Sie 'G-XXXXXXXXXX' durch Ihre Tracking-ID)
    /*
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
    */
  }

  function loadMarketingScripts() {
    // Hier Marketing-Skripte laden
    console.log('Marketing-Skripte werden geladen...');

    // Beispiel für Facebook Pixel (ersetzen Sie 'XXXXXXXXXX' durch Ihre Pixel-ID)
    /*
    var script = document.createElement('script');
    script.innerHTML = '!function(f,b,e,v,n,t,s)' +
    '{if(f.fbq)return;n=f.fbq=function(){n.callMethod?' +
    'n.callMethod.apply(n,arguments):n.queue.push(arguments)};' +
    'if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version=\'2.0\';' +
    'n.queue=[];t=b.createElement(e);t.async=!0;' +
    't.src=v;s=b.getElementsByTagName(e)[0];' +
    's.parentNode.insertBefore(t,s)}(window, document,\'script\',' +
    '\'https://connect.facebook.net/en_US/fbevents.js\');' +
    'fbq(\'init\', \'XXXXXXXXXX\');' +
    'fbq(\'track\', \'PageView\');';
    document.head.appendChild(script);
    */
  }
})();
