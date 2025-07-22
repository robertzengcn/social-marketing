import { describe, test, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';
import ConfirmDialog from '@/views/components/widgets/confirmDialog.vue';
import NoticeSnackbar from '@/views/components/widgets/noticeSnackbar.vue';
import TranslateSelect from '@/views/components/select/TranslateSelect.vue';

// Mock i18n
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      common: {
        cancel: 'Cancel',
        ok: 'OK',
        error: 'Error'
      }
    }
  }
});

// Mock utility function
vi.mock('@/views/utils/function', () => ({
  CapitalizeFirstLetter: (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
}));

describe('UI Components', () => {
  describe('ConfirmDialog', () => {
    test('renders correctly with props', () => {
      const wrapper = mount(ConfirmDialog, {
        props: {
          showDialog: true,
          noticeText: 'Are you sure?',
          noticeTitle: 'Confirm Action'
        },
        global: {
          plugins: [i18n]
        }
      });

      expect(wrapper.find('.v-card').exists()).toBe(true);
      expect(wrapper.text()).toContain('Are you sure?');
      expect(wrapper.text()).toContain('Confirm Action');
    });

    test('emits dialogclose when cancel button is clicked', async () => {
      const wrapper = mount(ConfirmDialog, {
        props: {
          showDialog: true,
          noticeText: 'Test',
          noticeTitle: 'Test'
        },
        global: {
          plugins: [i18n]
        }
      });

      const cancelButton = wrapper.find('v-btn');
      await cancelButton.trigger('click');
      
      expect(wrapper.emitted('dialogclose')).toBeTruthy();
    });

    test('emits okCallback when ok button is clicked', async () => {
      const wrapper = mount(ConfirmDialog, {
        props: {
          showDialog: true,
          noticeText: 'Test',
          noticeTitle: 'Test'
        },
        global: {
          plugins: [i18n]
        }
      });

      const okButton = wrapper.findAll('v-btn')[1]; // Second button is OK
      await okButton.trigger('click');
      
      expect(wrapper.emitted('okCallback')).toBeTruthy();
    });

    test('does not render when showDialog is false', () => {
      const wrapper = mount(ConfirmDialog, {
        props: {
          showDialog: false,
          noticeText: 'Test',
          noticeTitle: 'Test'
        },
        global: {
          plugins: [i18n]
        }
      });

      expect(wrapper.find('.v-dialog').exists()).toBe(false);
    });
  });

  describe('NoticeSnackbar', () => {
    test('renders with correct props', () => {
      const wrapper = mount(NoticeSnackbar, {
        props: {
          modelValue: true,
          message: 'Test message',
          type: 'success',
          timeout: 5000
        }
      });

      expect(wrapper.find('.v-snackbar').exists()).toBe(true);
      expect(wrapper.text()).toContain('Test message');
    });

    test('emits update:modelValue when closed', async () => {
      const wrapper = mount(NoticeSnackbar, {
        props: {
          modelValue: true,
          message: 'Test message'
        }
      });

      const closeButton = wrapper.find('v-btn');
      await closeButton.trigger('click');
      
      expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
    });

    test('shows correct icon for different types', () => {
      const successWrapper = mount(NoticeSnackbar, {
        props: {
          modelValue: true,
          message: 'Success',
          type: 'success'
        }
      });

      const errorWrapper = mount(NoticeSnackbar, {
        props: {
          modelValue: true,
          message: 'Error',
          type: 'error'
        }
      });

      expect(successWrapper.find('v-icon').attributes('icon')).toBe('mdi-check-circle');
      expect(errorWrapper.find('v-icon').attributes('icon')).toBe('mdi-alert-circle');
    });

    test('uses default props correctly', () => {
      const wrapper = mount(NoticeSnackbar, {
        props: {
          modelValue: true,
          message: 'Test'
        }
      });

      expect(wrapper.vm.type).toBe('info');
      expect(wrapper.vm.timeout).toBe(3000);
    });
  });

  describe('TranslateSelect', () => {
    test('renders with options from TranslateToolEnum', () => {
      const wrapper = mount(TranslateSelect);
      
      expect(wrapper.find('select').exists()).toBe(true);
      expect(wrapper.find('label').text()).toContain('Translation Tool:');
    });

    test('emits update:selectedTool when selection changes', async () => {
      const wrapper = mount(TranslateSelect);
      
      const select = wrapper.find('select');
      await select.setValue('deepseek_local');
      
      expect(wrapper.emitted('update:selectedTool')).toEqual([['deepseek_local']]);
    });

    test('watches selectedTool changes', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const wrapper = mount(TranslateSelect);
      
      const select = wrapper.find('select');
      await select.setValue('openai');
      
      expect(consoleSpy).toHaveBeenCalledWith('selectedTool changed from  to openai');
      
      consoleSpy.mockRestore();
    });

    test('has correct styling classes', () => {
      const wrapper = mount(TranslateSelect);
      
      expect(wrapper.find('.translate-select').exists()).toBe(true);
      expect(wrapper.find('.form-select').exists()).toBe(true);
    });
  });
}); 