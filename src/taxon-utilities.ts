import { ComputedClassesSpec } from '@/types';

function getPlusCircleClasses(condition: boolean): ComputedClassesSpec {
    const classes: ComputedClassesSpec = {
        'widget-add-icon': true
    };


    if (condition) {
        classes['ob-disabled'] = true;
    } else {
        classes['ob-enabled'] = true;
    }

    return classes;
}

export { getPlusCircleClasses }
