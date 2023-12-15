const buttonCssStrategy = new Map<string, string>();

buttonCssStrategy.set(
  "primary",
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
);
buttonCssStrategy.set(
  "secondary",
  "bg-gray-200 text-black border-gray-300 hover:border-gray-700 focus:ring-gray-300"
);
buttonCssStrategy.set(
  "danger",
  "bg-red-500 text-white hover:bg-red-700 focus:ring-red-500"
);
buttonCssStrategy.set(
  "fresh",
  "bg-green-500 text-white hover:bg-green-700 focus:ring-green-500"
);

buttonCssStrategy.set(
  "rotten",
  "bg-red-500 text-white hover:bg-green-700 focus:ring-green-500"
);
buttonCssStrategy.set(
  "stale",
  "bg-yellow-500 text-white hover:bg-yellow-700 focus:ring-yellow-500"
);



export { buttonCssStrategy };
