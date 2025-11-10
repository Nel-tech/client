// components/EmailChangeModal.tsx
import React, { useState } from 'react';
import { Mail, Lock, X } from 'lucide-react';
import {Button} from '../../../../components/ui/button';


interface EmailChangeModalProps {
  isOpen: boolean;
  currentEmail: string;
  onRequestChange: (data: { email: string; password: string }) => Promise<void>;
  onClose: () => void;
  isRequesting: boolean;
}

export const EmailChangeModal = ({
  isOpen,
  currentEmail,
  onRequestChange,
  onClose,
  isRequesting,
}: EmailChangeModalProps) => {
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!newEmail || !password) return;

    await onRequestChange({
      email: newEmail.trim(),
      password,
    });

    // Reset form
    setNewEmail('');
    setPassword('');
  };

  const handleClose = () => {
    setNewEmail('');
    setPassword('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#ff6b35]" />
            Change Email
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Current Email
            </label>
            <div className="w-full p-3 border border-white/10 rounded-lg bg-white/5 text-gray-400">
              {currentEmail}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              New Email
            </label>
            <input
              type="email"
              className="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder:text-gray-400 focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35] focus:outline-none"
              placeholder="new.email@example.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-white flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder:text-gray-400 focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35] focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="bg-[#ff6b35]/10 border border-[#ff6b35]/30 rounded-lg p-3">
            <p className="text-xs text-gray-300">
              We&apos;ll send a verification code to your new email address.
              You&apos;ll need to enter it to complete the change.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleClose}
              className="flex-1 bg-white/10 text-white px-4 py-3 rounded-lg hover:bg-white/20 transition-colors font-medium"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!newEmail || !password || isRequesting}
              className="flex-1 bg-[#ff6b35] text-white px-4 py-3 rounded-lg hover:bg-[#e55a2b] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRequesting ? 'Sending...' : 'Send Verification Code'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};