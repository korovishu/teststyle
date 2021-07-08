import { useEffect, useState } from 'react';
import { Input } from 'baseui/input';
import { FormControl } from 'baseui/form-control';
import { Button } from 'baseui/button';
import Link from 'next/link';
import SocialSignIn from '../components/SocialSignIn';
import { useAuth } from '../lib/auth';
import { ThemeProvider, createTheme, lightThemePrimitives } from 'baseui';
import { ToasterContainer, PLACEMENT } from 'baseui/toast';

export default function SignUp() {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [rePass, setRePass] = useState('');
  const [confError, setConfError] = useState(false);

  useEffect(() => {
    if (pass !== rePass) {
      setConfError(true);
    } else {
      setConfError(false);
    }
  }, [pass, rePass]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-1/5 mt-14 min-w-max">
        <p className="m-auto max-w-max text-5xl font-bold mb-8">Sign Up</p>
        <SocialSignIn />
        <hr />
        <p className="text-center m-auto font-light">OR</p>
        <hr className="mb-5" />
        <FormControl label={() => 'Email'} caption={() => ''}>
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email address"
            error={false}
            clearOnEscape
            required
            overrides={{
              Root: {
                style: () => ({
                  borderRadius: '0.375rem',
                }),
              },
            }}
          />
        </FormControl>
        <FormControl label={() => 'Password'} caption={() => ''}>
          <Input
            value={pass}
            onChange={e => setPass(e.target.value)}
            placeholder="Enter Password"
            error={false}
            type="password"
            clearOnEscape
            required
            overrides={{
              Root: {
                style: () => ({
                  borderRadius: '0.375rem',
                }),
              },
            }}
          />
        </FormControl>
        <FormControl label={() => 'Confirm Password'} caption={() => ''}>
          <Input
            value={rePass}
            onChange={e => setRePass(e.target.value)}
            placeholder="Re-Enter Password"
            error={confError}
            type="password"
            clearOnEscape
            required
            overrides={{
              Root: {
                style: () => ({
                  borderRadius: '0.375rem',
                }),
              },
            }}
          />
        </FormControl>
        <ThemeProvider
          theme={createTheme(lightThemePrimitives, {
            colors: {
              buttonPrimaryHover: '#003fc7',
              buttonPrimaryActive: '#003fc7',
              buttonDisabledFill: '#3B82F6',
            },
          })}>
          <ToasterContainer
            placement={PLACEMENT.bottom}
            overrides={{
              ToastBody: {
                style: () => ({
                  borderRadius: '0.375rem',
                }),
              },
            }}>
            <Button
              disabled={confError}
              onClick={() => auth.signUp(email, pass)}
              overrides={{
                BaseButton: {
                  style: () => ({
                    width: '100%',
                    backgroundColor: '#0051ff',
                    borderRadius: '0.375rem',
                  }),
                },
              }}>
              Sign Up
            </Button>
          </ToasterContainer>
        </ThemeProvider>

        <p className="mt-4 text-sm font-light">
          Already have an account?
          <Link href="/login" passHref>
            <span className="cursor-pointer font-normal text-green-600 hover:underline ml-1">
              Log In.
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
