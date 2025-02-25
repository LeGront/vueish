import { mount } from '@vue/test-utils';
import UIInput from './UIInput.vue';
import { nextTick } from 'vue';

describe('UIInput', () => {
    it('should correctly display', () => {
        const wrapper = mount(UIInput, {
            props: {
                modelValue: '',
                name: 'input'
            }
        });

        expect(wrapper.element).toMatchSnapshot();
    });

    it('should handle model-binding correctly', async () => {
        const wrapper = mount(UIInput, {
            props: {
                modelValue: '',
                name: 'input'
            }
        });

        await wrapper.find('input').setValue('Hello World');

        expect(wrapper.emitted('update:modelValue')![0]).toStrictEqual(['Hello World']);
    });

    it('should be enabled by default', () => {
        const wrapper = mount(UIInput, {
            props: {
                modelValue: '',
                name: 'input'
            }
        });

        expect(wrapper.get('input').attributes().disabled).toBeUndefined();
    });

    it('should be disabled when the prop is provided so', async () => {
        const wrapper = mount(UIInput, {
            props: {
                modelValue: '',
                name: 'input',
                disabled: false
            }
        });

        const input = wrapper.get('input');

        expect(input.attributes().disabled).toBeUndefined();
        await wrapper.setProps({ disabled: true });
        expect(input.attributes().disabled).toBeDefined();
    });

    it('should assign the name prop', () => {
        const name = 'input';

        const wrapper = mount(UIInput, {
            props: {
                modelValue: '',
                name,
                label: 'my label'
            }
        });

        const input = wrapper.get('input');
        const label = wrapper.get('label');

        expect(input.attributes().id).toBe(name);
        expect(input.attributes().name).toBe(name);
        expect(label.attributes().for).toBe(name);
    });

    it('should assign the type prop', () => {
        const type = 'number';

        const wrapper = mount(UIInput, {
            props: {
                modelValue: '',
                name: 'input',
                type
            }
        });

        const input = wrapper.get('input');

        expect(input.attributes().type).toBe(type);
    });

    it('should display the label when passed as a prop', () => {
        const label = 'text';

        const wrapper = mount(UIInput, {
            props: {
                modelValue: '',
                name: 'input',
                label
            }
        });

        expect(wrapper.get('label').text()).toBe(label);
    });

    it('should autofocus on the input when the prop is provided', () => {
        const elem = document.createElement('div');
        document.body.appendChild(elem);

        const wrapper = mount(UIInput, {
            props: {
                modelValue: '',
                name: 'input',
                autofocus: true
            },
            attachTo: elem
        });

        expect(wrapper.get('input').element).toBe(document.activeElement);
    });

    it('should not show the clear icon if no-clear is provided', () => {
        const wrapper = mount(UIInput, {
            props: {
                name: 'input',
                modelValue: 'Hello World',
                noClear: true
            }
        });

        expect(wrapper.find('.clear-icon').exists()).toBe(false);
    });

    it('should not show the clear icon if there is no value', () => {
        const wrapper = mount(UIInput, {
            props: {
                name: 'input',
                modelValue: ''
            }
        });

        expect(wrapper.find('.clear-icon').exists()).toBe(false);
    });

    it('should not show the clear icon if it is disabled', () => {
        const wrapper = mount(UIInput, {
            props: {
                name: 'input',
                modelValue: 'Hello World',
                disabled: true
            }
        });

        expect(wrapper.find('.clear-icon').exists()).toBe(false);
    });

    it('should clear the value when the clear icon is clicked', async () => {
        const wrapper = mount(UIInput, {
            props: {
                name: 'input',
                modelValue: 'Hello World',
                clearable: true
            }
        });

        await wrapper.get('.clear-icon').trigger('click');
        expect(wrapper.emitted()).toHaveProperty('update:modelValue');
        expect(wrapper.emitted('update:modelValue')![0]).toStrictEqual(['']);
    });

    it('should display the prefix when passed as a slot', () => {
        const prefix = 'prefix';

        const wrapper = mount(UIInput, {
            props: {
                modelValue: '',
                name: 'input'
            },
            slots: {
                prefix
            }
        });

        expect(wrapper.get('.prefix').text()).toBe(prefix);
    });

    it('should display the prefix when passed as a prop', () => {
        const prefix = 'prefix';

        const wrapper = mount(UIInput, {
            props: {
                modelValue: '',
                name: 'input',
                prefix
            }
        });

        expect(wrapper.get('.prefix').text()).toBe(prefix);
    });

    it('should display the suffix when passed as a slot', () => {
        const suffix = 'suffix';

        const wrapper = mount(UIInput, {
            props: {
                modelValue: '',
                name: 'input'
            },
            slots: {
                suffix
            }
        });

        expect(wrapper.get('.suffix').text()).toBe(suffix);
    });

    it('should display the suffix when passed as a prop', () => {
        const suffix = 'suffix';

        const wrapper = mount(UIInput, {
            props: {
                modelValue: '',
                name: 'input',
                suffix
            }
        });

        expect(wrapper.get('.suffix').text()).toBe(suffix);
    });

    it('should only display the label if slot or prop given', async () => {
        let wrapper = mount(UIInput, {
            props: {
                modelValue: '',
                name: 'input'
            }
        });

        expect(wrapper.find('label').exists()).toBe(false);

        await wrapper.setProps({ label: 'myLabel' });
        expect(wrapper.find('label').exists()).toBe(true);

        wrapper = mount(UIInput, {
            props: {
                modelValue: '',
                name: 'input'
            },
            slots: {
                label: 'myLabel'
            }
        });
        expect(wrapper.find('label').exists()).toBe(true);
    });

    it('should toggle the input type on password type when toggle clicked on', async () => {
        jest.useFakeTimers();
        const wrapper = mount(UIInput, {
            props: {
                modelValue: '',
                name: 'input',
                type: 'password',
                passwordToggleTimeout: 1000
            }
        });

        expect(wrapper.get('input').attributes('type')).toBe('password');

        await wrapper.get('.pass-toggle').trigger('click');
        expect(wrapper.get('input').attributes('type')).toBe('text');

        await wrapper.get('.pass-toggle').trigger('click');
        expect(wrapper.get('input').attributes('type')).toBe('password');

        // it automatically turns back
        await wrapper.get('.pass-toggle').trigger('click');
        jest.runAllTimers();
        await nextTick();
        expect(wrapper.get('input').attributes('type')).toBe('password');

        jest.useRealTimers();
    });
});
