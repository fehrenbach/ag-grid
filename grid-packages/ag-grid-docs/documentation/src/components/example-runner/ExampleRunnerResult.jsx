import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import styles from './ExampleRunnerResult.module.scss';
import { getIndexHtmlUrl } from './helpers';
import { getIndexHtml } from './index-html-helper';
import isDevelopment from 'utils/is-development';

/**
 * This executes the given example in an iframe.
 */
const ExampleRunnerResult = ({ isOnScreen = true, resultFrameIsVisible = true, exampleInfo, darkMode }) => {
    const [isExecuting, setExecuting] = useState(isOnScreen && resultFrameIsVisible);
    const { pageName, name, internalFramework, importType } = exampleInfo;
    const [hasSetHtml, setHasSetHtml] = useState(false);
    const [showIframe, setShowIframe] = useState(false);

    useEffect(() => {
        // trigger the example to execute when it is on screen and the result pane is visible
        if (isOnScreen && resultFrameIsVisible && !isExecuting) {
            setExecuting(true);
        }
    }, [isOnScreen, resultFrameIsVisible]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        // if the example info changes (e.g. if modules and switched to packages) and the example is off screen,
        // stop it executing
        if (!isOnScreen && isExecuting) {
            setExecuting(false);
        }
    }, [exampleInfo]); // eslint-disable-line react-hooks/exhaustive-deps

    const iframeRef = React.createRef();

    useEffect(() => {
        const iframe = iframeRef.current;
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        if (isDevelopment()) {
            const { plunkerIndexHtml, codesandboxIndexHtml } = getIndexHtml(exampleInfo, true);

            // in development mode we generate the index HTML on the fly and inject it into the iframe
            iframeDoc.open();
            iframeDoc.write(isExecuting ? plunkerIndexHtml : '');
            iframeDoc.close();
        } else {
            iframe.src = isExecuting ? getIndexHtmlUrl(exampleInfo) : '';
            // setting the src causes a new document object to be created at
            // some point in the future, with no event to track it, so expire
            // the document and we poll until there's a new one
            iframeDoc._expired = true;
        }
        if (isExecuting) {
            setHasSetHtml(true);
        }
    }, [isExecuting, exampleInfo]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (darkMode == null || !hasSetHtml) return;
        const apply = () => {
            const innerDocument = iframeRef.current?.contentDocument;
            if (!innerDocument || innerDocument.readyState !== "complete" || innerDocument._expired) return false;
            applyExampleDarkMode(innerDocument, darkMode);
            setShowIframe(true);
            return true;
        }
        if (!apply()) {
            let interval = null;
            const poll = () => {
                if (apply()) {
                    stopPolling();
                }
            }
            const stopPolling = () => {
                clearInterval(interval)
            }
            interval = setInterval(poll, 10);
            return stopPolling;
        }
    }, [hasSetHtml, darkMode]);

    return <iframe
        key={`${pageName}_${name}_${internalFramework}_${importType}`}
        ref={iframeRef}
        title={name}
        className={classnames(styles.exampleRunnerResult, { [styles.hidden]: !resultFrameIsVisible })}
        style={{
            visibility: showIframe ? 'visible' : 'hidden'
        }}
        />;
};

export default ExampleRunnerResult;

const themes = {
    "ag-theme-alpine": {dark: false, other: "ag-theme-alpine-dark"},
    "ag-theme-alpine-dark": {dark: true, other: "ag-theme-alpine"},
    "ag-theme-balham": {dark: false, other: "ag-theme-balham-dark"},
    "ag-theme-balham-dark": {dark: true, other: "ag-theme-balham"},
}

const applyExampleDarkMode = (document, darkMode) => {
    document.querySelector("html").style.colorScheme = darkMode ? 'dark' : 'light';
    for (const el of document.querySelectorAll("[class*='ag-theme-']")) {
        for (const className of Array.from(el.classList.values())) {
            const theme = themes[className];
            if (theme && theme.dark !== darkMode) {
                el.classList.remove(className);
                el.classList.add(theme.other);
            }
        }
    }
}