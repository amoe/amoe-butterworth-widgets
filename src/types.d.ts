import { Node } from 'tree-model';

export interface TaxonomyNodeModel {
    content: string;
    id: number;
    label: string;
}

export type TaxonomyNode = Node<TaxonomyNodeModel>

export interface MyNodeModel {
    content: string;
    id: number;
    label: string;
}

export type MyNode = Node<MyNodeModel>

export type TransitionCallback = () => void;

// no type for Draggable in @types/gsap :(
export type Draggable = any;
