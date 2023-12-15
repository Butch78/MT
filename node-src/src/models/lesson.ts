import type { Deck } from "./deck";

export interface LessonCreate {
    user_id: number;
    file_name: string;
    name: string;
    description: string;
}

export interface Lesson extends LessonCreate {
    id: string;
    ref_id: string;
    created_at: Date;
    decks: Deck[];
    // TODO: add chats to lesson model
    // chats: String[];
}