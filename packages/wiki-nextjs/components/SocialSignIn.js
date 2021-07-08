import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { useAuth } from '../lib/auth';
import { Button } from 'baseui/button';
import { ThemeProvider, createTheme, lightThemePrimitives } from 'baseui';

function SocialSignIn() {
  const auth = useAuth();
  return (
    <div className="flex flex-col mb-10 mt-20 m-auto">
      <ThemeProvider
        theme={createTheme(lightThemePrimitives, {
          colors: {
            buttonPrimaryHover: '#d10404',
            buttonPrimaryActive: '#d10404',
          },
        })}>
        <Button
          onClick={() => auth.signinWithGoogle()}
          overrides={{
            BaseButton: {
              style: () => ({
                width: '100%',
                backgroundColor: '#ff0000',
                borderRadius: '0.375rem',
              }),
            },
          }}>
          <FaGoogle size="20" className="text-white" />
          <p className="ml-3 text-white">Sign in with Google</p>
        </Button>
      </ThemeProvider>
      <ThemeProvider
        theme={createTheme(lightThemePrimitives, {
          colors: {
            buttonPrimaryHover: '#003fc7',
            buttonPrimaryActive: '#003fc7',
          },
        })}>
        <Button
          onClick={() => auth.signinWithFacebook()}
          overrides={{
            BaseButton: {
              style: () => ({
                width: '100%',
                backgroundColor: '#0051ff',
                borderRadius: '0.375rem',
                marginTop: '1rem',
              }),
            },
          }}>
          <FaFacebook size="23" className="ml-2" />
          <p className="ml-2">Sign in with Facebook</p>
        </Button>
      </ThemeProvider>
    </div>
  );
}

export default SocialSignIn;
