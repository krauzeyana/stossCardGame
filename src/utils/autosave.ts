import { autorun, set, toJS } from "mobx";

export const autoSave = <Store extends { [K: string]: any }>(
    _this: Store,
    states: Array<keyof Store>
) => {
    return states.map((state) => {
        const savedValue = localStorage.getItem(state.toString());

        if (savedValue) {
            set(_this, state, JSON.parse(savedValue));
        }

        return autorun(() => {
            const value = toJS(_this[state]);
            localStorage.setItem(state.toString(), JSON.stringify(value));
        });
    });
};
