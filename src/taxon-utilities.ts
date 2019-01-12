import { ComputedClassesSpec } from '@/types';

function getPlusCircleClasses(isEnabledCondition: boolean): ComputedClassesSpec {
    const classes: ComputedClassesSpec = {
        'widget-add-icon': true
    };


    if (isEnabledCondition) {
        classes['ob-enabled'] = true;
    } else {
        classes['ob-disabled'] = true;
    }

    return classes;
}

export { getPlusCircleClasses }
