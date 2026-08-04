(() => {
    const storageKey = 'frs-theme';
    const validThemes = new Set(['light', 'dark']);
    const root = document.documentElement;

    const readSavedTheme = () => {
        try {
            const theme = localStorage.getItem(storageKey);
            return validThemes.has(theme) ? theme : null;
        } catch (error) {
            return null;
        }
    };

    const saveTheme = (theme) => {
        try {
            localStorage.setItem(storageKey, theme);
        } catch (error) {
            // Storage can be unavailable in strict privacy contexts.
        }
    };

    const getDefaultTheme = () => {
        const theme = root.dataset.defaultTheme;
        return validThemes.has(theme) ? theme : 'light';
    };

    const getCurrentTheme = () => {
        const theme = root.dataset.theme;
        return validThemes.has(theme) ? theme : getDefaultTheme();
    };

    const updateToggle = (theme) => {
        const isDark = theme === 'dark';
        document.querySelectorAll('[data-theme-toggle]').forEach((toggle) => {
            toggle.setAttribute('aria-pressed', String(isDark));
            toggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
            toggle.setAttribute('title', `Switch to ${isDark ? 'light' : 'dark'} theme`);
        });
    };

    const applyTheme = (theme, persist = false) => {
        root.dataset.theme = theme;
        updateToggle(theme);

        if (persist) {
            saveTheme(theme);
        }
    };

    applyTheme(readSavedTheme() || getDefaultTheme());

    document.addEventListener('DOMContentLoaded', () => {
        updateToggle(getCurrentTheme());

        document.querySelectorAll('[data-theme-toggle]').forEach((toggle) => {
            toggle.addEventListener('click', () => {
                const nextTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
                applyTheme(nextTheme, true);
            });
        });
    });
})();
