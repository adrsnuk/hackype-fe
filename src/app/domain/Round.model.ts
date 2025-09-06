import { WordDefinition } from "./WordDefinition.model";

export interface Round {
    id: number;
    content: string;
    definitions: WordDefinition[];
}