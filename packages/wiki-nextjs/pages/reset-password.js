import { useState } from 'react';
import { Input } from 'baseui/input';
import { FormControl } from 'baseui/form-control';
import { Button } from 'baseui/button';
import { useAuth } from '../lib/auth';
import { ThemeProvider, createTheme, lightThemePrimitives } from 'baseui';
import { ToasterContainer, PLACEMENT } from 'baseui/toast';

export default function ResetPassword() {
  const auth = useAuth();
  const [email, setEmail] = useState('');

  return (
    <div className="flex flex-col items-center">
      <div className="w-1/5 mt-14 min-w-max">
        <p className="m-auto max-w-max text-4xl font-bold mt-60 mb-14">
          Reset Password
        </p>
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
              onClick={() => auth.sendPasswordReset(email)}
              overrides={{
                BaseButton: {
                  style: () => ({
                    width: '100%',
                    backgroundColor: '#0051ff',
                    borderRadius: '0.375rem',
                  }),
                },
              }}>
              Send reset link
            </Button>
          </ToasterContainer>
        </ThemeProvider>
      </div>
    </div>
  );
}
