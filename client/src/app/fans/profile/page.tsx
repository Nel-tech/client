'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, Check, User, Mail, Link, Gift, AlertTriangle } from 'lucide-react';

import { ProfileSkeleton } from '@/components/loader/profile/ProfileSkeleton';
import { ProfileError } from '@/components/loader/profile/ProfileError';
import { getCurrentUser } from '@/lib/api';
export default function UserProfileInterface() {
  const [copied, setCopied] = useState(false);

 const { data: user, isLoading, isError, refetch } = useAuthStore()
  const referralLink = user?.user?.referralCode

  if(isLoading){
return <ProfileSkeleton/>
  }
  
if(isError){ 
  return <ProfileError onRetry={() => refetch()} />
}
  const copyReferralLink = async () => {

  if (!referralLink) {
    console.error('No referral code available');
    return;
  }

  try {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};
  const getInitials = (name:string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Completion Reward Alert */}
        <Alert className="border-amber-500 bg-amber-50 text-amber-800">
          <Gift className="h-4 w-4" />
          <AlertDescription className="font-medium">
            🎉 Complete your profile and get €10 bonus reward! Fill in your username and email to claim.
          </AlertDescription>
        </Alert>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile Setup</h1>
          <p className="text-gray-600">Complete your profile information</p>
        </div>

        {/* Profile Avatar Card - Moved Up */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Avatar
            </CardTitle>
            <CardDescription>
              Your profile picture preview
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="bg-blue-600 text-white text-xl">
                {user?.user.username ? getInitials(user?.user.username) : 'UN'}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="font-semibold text-lg">
                {user?.user.username || ''}
              </h3>
              <p className="text-gray-600 text-sm flex items-center justify-center gap-1">
                <Mail className="w-3 h-3" />
                {user?.user.email|| ''}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Input Fields */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Enter your basic profile details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={user?.user.username}
                className="focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={user?.user.email}
                className="focus:border-blue-500"
              />
            </div>
            <Alert className="border-blue-200 bg-blue-50 text-blue-800">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Profile editing can only be done in Account Settings after initial setup.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-1 gap-6">

          {/* Referral Link Card */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="w-5 h-5" />
                Referral Link
              </CardTitle>
              <CardDescription>
                Share this link to earn rewards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <code className="text-blue-600 text-sm break-all">
                  {referralLink}
                </code>
              </div>
              <Button
                onClick={copyReferralLink}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={copied}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Referral Link
                  </>
                )}
              </Button>
              <p className="text-xs text-gray-500 text-center">
                Link updates automatically when you change your username
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}