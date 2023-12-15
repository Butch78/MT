const textCssStrategy = new Map<string, string>();

textCssStrategy.set(
    "h1",
    "text-2xl tablet:text3xl laptop:text-4xl desktop:text-5xl"
);

textCssStrategy.set(
    "h2",
    "text-3xl text-gray-900"
);

textCssStrategy.set(
    "h3",
    "text-2xl text-gray-900"
);

textCssStrategy.set(
    "p",
    "p-2 text-gray-900"
);

textCssStrategy.set(
    "label",
    "p-2 text-gray-900"
);

textCssStrategy.set(
    "nav",
    "p-2 text-green-500 hover:text-green-700"
)

export { textCssStrategy };