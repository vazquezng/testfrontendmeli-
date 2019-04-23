/**
@flow

Esqueleto del documento html insetando de forma dinamica los css, script entro otros.
 */

import React from "react";
import PropTypes from "prop-types";
import serialize from "serialize-javascript";
import config from "../config";

/* eslint-disable react/no-danger */

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    styles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        cssText: PropTypes.string.isRequired
      }).isRequired
    ),
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    preloads: PropTypes.arrayOf(PropTypes.string.isRequired),
    app: PropTypes.object, // eslint-disable-line
    children: PropTypes.string.isRequired
  };

  static defaultProps = {
    styles: [],
    scripts: [],
    preloads: []
  };

  render() {
    const {
      title,
      description,
      styles,
      scripts,
      preloads,
      app,
      children
    } = this.props;
    return (
      <html className="no-js" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <link rel="dns-prefetch" href="//api.mercadolibr.com" />

          {scripts.map(script => (
            <link key={script} rel="preload" href={script} as="script" />
          ))}
          {/* <link rel="manifest" href="/manifest.json" / > */}
          <link rel="shortcut icon" href="/favicon.ico" />
          {styles.map(style => (
            <style
              key={style.id}
              id={style.id}
              dangerouslySetInnerHTML={{ __html: style.cssText }}
            />
          ))}
          {preloads.map(script => (
            <link key={script} rel="prefetch" href={script} />
          ))}
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          <script
            dangerouslySetInnerHTML={{ __html: `window.App=${serialize(app)}` }}
          />
          {scripts.map(script => (
            <script key={script} src={script} />
          ))}
          {config.analytics.googleTrackingId && (
            <script
              dangerouslySetInnerHTML={{
                __html:
                  "window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;" +
                  `ga('create','${
                    config.analytics.googleTrackingId
                  }','auto');ga('send','pageview')`
              }}
            />
          )}
          {config.analytics.googleTrackingId && (
            <script
              src="https://www.google-analytics.com/analytics.js"
              async
              defer
            />
          )}

          <script
            dangerouslySetInnerHTML={{
              __html: `// Check that service workers are registered
                if ('serviceWorker' in navigator) {
                  var refreshing;
                   // The event listener that is fired when the service worker updates
                   // Here we reload the page
                    navigator.serviceWorker.addEventListener('controllerchange', function () {
                      if (refreshing) return;
                      window.location.reload();
                      refreshing = true;
                    });
                   // Use the window load event to keep the page load performant
                   navigator.serviceWorker.register('/sw.js').then(registration => {
                     console.log('SW registered: ', registration);
                   }).catch(registrationError => {
                     console.log('SW registration failed: ', registrationError);
                   });
                }`
            }}
          />
        </body>
      </html>
    );
  }
}

export default Html;
