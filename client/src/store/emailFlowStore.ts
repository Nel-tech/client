import { create } from 'zustand';
import { AxiosError } from 'axios';
import { getPendingEmailChange } from '@/lib/api/endpoints/user/user';
import { PendingEmailVerification } from '@/lib/api/endpoints/user/type';

interface EmailFlowState {
  isPending: boolean;
  pendingEmailChange: PendingEmailVerification | null;
  error: string | null;
}

interface EmailFlowActions {
  setPending: (data: PendingEmailVerification | null) => void;
  clearPendingEmailChange: () => void;
  checkPendingEmailChange: () => Promise<void>;
}

type EmailFlowStore = EmailFlowState & EmailFlowActions;

// Helper to extract error messages
const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.error || error.message || 'An error occurred';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

export const useEmailFlowStore = create<EmailFlowStore>()((set) => ({
  // State
  isPending: false,
  pendingEmailChange: null,
  error: null,

  // Actions
  setPending: (data) => {
    set({ isPending: !!data, pendingEmailChange: data });
  },

  clearPendingEmailChange: () => {
    set({ isPending: false, pendingEmailChange: null, error: null });
  },

  checkPendingEmailChange: async () => {
    try {
      const response = await getPendingEmailChange();

      set({
        isPending: !!response.pendingEmailChange,
        pendingEmailChange: response.pendingEmailChange,
        error: null,
      });

      console.log('Pending email change:', response.pendingEmailChange);
    } catch (error) {
      console.error('Check pending email failed:', error);
      const errorMessage = getErrorMessage(error);
      set({
        isPending: false,
        pendingEmailChange: null,
        error: errorMessage,
      });
      throw error;
    }
  },
}));

// Selectors
export const usePendingEmailChange = () =>
  useEmailFlowStore((state) => state.pendingEmailChange);

export const useIsPendingEmailChange = () =>
  useEmailFlowStore((state) => state.isPending);

export const useCheckPendingEmailChange = () =>
  useEmailFlowStore((state) => state.checkPendingEmailChange);

export const useEmailFlowError = () =>
  useEmailFlowStore((state) => state.error);
