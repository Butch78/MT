export enum StateEnum {
  active = "active",
  inactive = "inactive",
  update = "update",
  completed = "completed"
}


export enum FruitEnum {
  melon = "melon",
  banana = "banana",
  apple = "apple",
  grape = "grape",
  orange = "orange"
}

export interface CardBase {
  question: string;
  answer: string;
}

export interface CardCreate extends CardBase {
  testid?: string;
  deck_id: string;
  state: StateEnum;
  fruit: FruitEnum;
  interval: number;
  repetition: number;
  easiness: number;
  dueDate: Date;
  completed: Boolean;
}

export interface CardUpdate extends CardBase {
  testid?: string;
  deck_id: string;
  state: StateEnum;
  fruit: FruitEnum;
  interval: number;
  repetition: number;
  easiness: number;
  dueDate: Date;
  completed: Boolean;
}

export interface Card extends CardCreate {
  id: string;
}




