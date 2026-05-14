import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  OAuthProvider,
  User
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'sonner';
import { Eye, EyeOff, Mail, Lock, ChevronRight, LogIn, UserPlus } from 'lucide-react';
import { emailService } from '@/lib/emailService';

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const createUserProfile = async (user: User) => {
    try {
      const userRef = doc(db, 'profiles', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }, { merge: true });
        console.log('User profile created in Firestore');
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const userName = userCredential.user.displayName || formData.email.split("@")[0];
        
        // Send login confirmation email
        emailService.sendLoginEmail(userName, formData.email)
          .catch(err => console.error("Failed to send login email:", err));
        
        toast.success('Successfully logged in! Check your email for confirmation.');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const userName = formData.email.split("@")[0];
        await createUserProfile(userCredential.user);
        
        // Send welcome email
        emailService.sendLoginEmail(userName, formData.email)
          .catch(err => console.error("Failed to send welcome email:", err));
        
        toast.success('Account created successfully! Check your email for confirmation.');
      }
      navigate(-1); // Go back to previous page (likely checkout or home)
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error(error.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (providerName: 'google' | 'facebook' | 'apple') => {
    setIsLoading(true);
    try {
      let provider;
      if (providerName === 'google') {
        provider = new GoogleAuthProvider();
      } else if (providerName === 'facebook') {
        provider = new FacebookAuthProvider();
      } else {
        provider = new OAuthProvider('apple.com');
      }
      
      const userCredential = await signInWithPopup(auth, provider);
      await createUserProfile(userCredential.user);
      
      const userName = userCredential.user.displayName || userCredential.user.email?.split("@")[0] || "User";
      const userEmail = userCredential.user.email || "";
      
      // Send login confirmation email
      if (userEmail) {
        emailService.sendLoginEmail(userName, userEmail)
          .catch(err => console.error("Failed to send social login email:", err));
      }
      
      toast.success(`Successfully logged in with ${providerName}! Check your email for confirmation.`);
      navigate(-1);
    } catch (error: any) {
      console.error('Social login error:', error);
      toast.error(error.message || 'Social login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '' });
    setShowPassword(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row">
      {/* Left side - Hero section */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-slate-900 via-blue-900 to-primary flex items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full translate-x-1/4 translate-y-1/4 blur-3xl animate-pulse" />
        </div>
        <div className="text-white max-w-lg z-10">
          <h1 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            Elevate Your Tech Game with Tech Zone.
          </h1>
          <p className="text-blue-100 text-lg">
            Join thousands of tech enthusiasts and get early access to premium deals and exclusive product launches.
          </p>
        </div>
      </div>

      {/* Right side - Login/Signup form */}
      <div className="flex-1 bg-card flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Logo/Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
              <img src="/logo.png" alt="Tech Zone" className="w-12 h-auto" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {isLogin ? 'Welcome Back' : 'Join Us Today'}
            </h2>
            <p className="text-muted-foreground">
              {isLogin 
                ? 'Continue your journey with Tech Zone' 
                : 'Start your journey with Tech Zone today'
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1.5 ml-1">
                Your email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-1.5 ml-1">
                {isLogin ? 'Password' : 'Create new password'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-12 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder={isLogin ? "Enter your password" : "Create a secure password"}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between px-1">
                <label className="flex items-center cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 text-primary border-border rounded focus:ring-primary cursor-pointer" />
                  <span className="ml-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">Remember me</span>
                </label>
                <button type="button" className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : isLogin ? (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <span className="text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have account?"}
              </span>{' '}
              <button
                type="button"
                onClick={toggleMode}
                className="text-primary hover:text-primary/80 font-semibold transition-colors underline-offset-4 hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-8 mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-card text-muted-foreground">Or continue with</span>
              </div>
            </div>
          </div>

          {/* Social login buttons */}
          <div className="space-y-4 pt-2">
            <button 
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 border border-border rounded-xl hover:bg-secondary transition-colors font-medium text-sm gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Gmail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
