const brandColor = (level) => {
    return function ({opacityVariable, opacityValue}) {
        if (opacityValue) {
            return `rgba(var(--color-brand-${level}), ${opacityValue})`;
        }
        if (opacityVariable) {
            return `rgba(var(--color-brand-${level}), var(${opacityVariable}, 1))`;
        }
        return `rgb(var(--color-brand-${level}))`;
    };
};

const brandColors = (levels) => {
    const colors = {};

    levels.forEach(level => colors['brand-' + String(level)] = brandColor(level));

    return colors;
};

/**
 * @type {import('@types/tailwindcss').TailwindConfig}
 */
module.exports = {
    content: ['./src/**/*.{vue,ts,tsx}'],
    darkMode: 'class',
    theme: {
        borderColor: theme => ({
            ...theme('colors'),
            DEFAULT: theme('colors.gray.400', 'currentColor')
        }),
        extend: {
            colors: {
                ...brandColors([50, 100, 200, 300, 400, 500, 600, 700, 800, 900])
            },
            transitionProperty: {
                'spacing': 'margin, padding'
            },
            rotate: {
                '270': '270deg',
            }
        }
    }
};
