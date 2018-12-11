// @types/gsap does exist, but doesn't yet contain typings for Draggable

// Draggable defines both a type and a variable exported with the same name as
// that type.  So we need to use different names to disambiguate them.

declare module 'gsap/Draggable' {
    export type DraggableConstructor = any;
    export var Draggable: DraggableConstructor;
}
