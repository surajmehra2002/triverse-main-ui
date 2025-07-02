'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { loginUser } from '@/api/services/authService';
import { Loader2, Rss } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');



  try {
    const response = await loginUser(email, password); // 👈 API call
    // alert(response.data.message)
    if (response.data.success){
      // alert("Login successful, redirecting to dashboard: " + response.data.route);
      router.push(response.data.route)
    }
    else router.push("/")


    } catch (err: any) {
      console.error("Login error:", err);
      setError(
        err?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side image */}
      <div className="relative w-full md:w-[65%] h-[200px] md:h-auto">
        <Image
          src="/images/servic-2.jpg"
          alt="Carousel"
          fill
          className="object-cover"
          priority
        />
        <p className="absolute bottom-2 left-2 text-white text-xs z-10">
          *Image Carousel, changes every 5–10 seconds*
        </p>
      </div>

      {/* Right side form */}
      <div className="relative w-full md:w-[35%] flex items-center justify-center px-4 py-10 bg-white/80 backdrop-blur-sm md:bg-transparent z-10">
        <Image
          src="/images/login.jpg"
          alt="Background"
          fill
          className="object-cover z-0"
          priority
        />
        <div className="absolute inset-0 backdrop-brightness-90 z-10"></div>

        <Card className="w-full max-w-sm shadow-md z-20 md:mt-0 mt-6">
          <CardContent className="space-y-6 py-6">
            <div className="flex justify-center">
              <Image
                src="/images/trilogo.jpg"
                alt="Logo"
                width={80}
                height={80}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-100"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-100"
                  required
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <div className="flex justify-end text-sm">
                <Link href="/Reset" className="text-blue-600 hover:underline">
                  Forgot your password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin h-4 w-4" />
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <p className="text-sm text-center text-gray-600">
              Don’t have an account?{' '}
              <Link href="/Partner" className="underline font-semibold text-blue-700">
                Become a partner here
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
