import React, { ReactElement } from 'react';
import { JsxElement } from 'typescript';

export type navBarLink = {
    to: string;
    name: (props: navBarIcon) => JSX.Element;
};

export type navBarIcon = {
    isActive: boolean;
};

export type recipeMeta = {
    id: number;
    description: string;
    name: string;
    prep_time: number;
    difficulty: number;
    quantity: number;
    unit: string;
    vegetarian: boolean;
};

export type recipeIngredient = {
    english_name: string;
    hindi_name_devnagari: string;
    hindi_name_latin: string;
    quantity: number;
    unit: string;
};

export type recipeFull = {
    id: number;
    description: string;
    name: string;
    prep_time: number;
    difficulty: number;
    quantity: number;
    unit: string;
    vegetarian: boolean;
    contributor_bio: string;
    contributor_name: string;
    recipe_ingredients: recipeIngredient[];
    recipe_steps: string[];
    recipe_tags: string[];
};

export type arrowData = {
    isLast: boolean;
    id: number;
    top: boolean;
};

export type tagData = {
    tag: string;
};
