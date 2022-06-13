declare module '*.png';
declare module '*.svg';

declare type navBarLink = {
    to: string;
    icon: (props: navBarIcon) => JSX.Element;
};

declare type navBarIcon = {
    isActive: boolean;
};

declare type recipeMeta = {
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

declare type recipeIngredient = {
    english_name: string;
    hindi_name_devnagari: string;
    hindi_name_latin: string;
    quantity: number;
    unit: string;
};

declare type ingredient = {
    english_name: string;
    hindi_name_devnagari: string;
    hindi_name_latin: string;
};

declare type recipeFull = {
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

declare type arrowData = {
    isLast: boolean;
    id: number;
    top: boolean;
    nextName?: string;
    prevName?: string;
};

declare type tagData = {
    tag: string;
};

declare type userData = {
    id: number;
    name: string;
    username: string;
    bio: string;
};

declare type userSignupData = {
    name: string;
    password: string;
    username: string;
    bio: string;
};

declare type userLoginData = {
    username: string;
    password: string;
};

declare type accessTokenData = {
    access_token: string;
};

declare type collection = {
    name: string;
    recipes: recipeMeta[];
};
