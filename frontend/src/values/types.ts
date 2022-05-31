import React, { ReactElement } from 'react';
import { JsxElement } from 'typescript';

export type navBarLink = {
    to: string;
    icon: (props: navBarIcon) => JSX.Element;
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
    contributor_username: string;
};

export type recipeIngredient = {
    english_name: string;
    hindi_name_devnagari: string;
    hindi_name_latin: string;
    quantity: number;
    unit: string;
};

export type ingredient = {
    english_name: string;
    hindi_name_devnagari: string;
    hindi_name_latin: string;
}

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
    contributor_username: string;
    recipe_ingredients: recipeIngredient[];
    recipe_steps: string[];
    recipe_tags: string[];
};

export type arrowData = {
    isLast: boolean;
    id: number;
    top: boolean;
    nextName?: string;
    prevName?: string;
};

export type tagData = {
    tag: string;
};

export type userData = {
    id: number;
    name: string;
    username: string;
    bio: string;
};

export type userSignupData = {
    name: string;
    password: string;
    username: string;
    bio: string;
};

export type userLoginData = {
    username: string;
    password: string;
};

export type accessTokenData = {
    access_token: string;
};

