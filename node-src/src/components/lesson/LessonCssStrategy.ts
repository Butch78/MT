const cardCssStrategy = new Map<string, string>();

import { FruitEnum } from "@/models";

cardCssStrategy.set(
    FruitEnum.melon,
    "bg-red-50"
);

cardCssStrategy.set(
    FruitEnum.banana,
    "bg-yellow-50"
);

cardCssStrategy.set(
    FruitEnum.apple,
    "bg-red-50"
);

cardCssStrategy.set(
    FruitEnum.grape,
    "bg-purple-50"
);

cardCssStrategy.set(
    FruitEnum.orange,
    "bg-orange-50"
);

export { cardCssStrategy };