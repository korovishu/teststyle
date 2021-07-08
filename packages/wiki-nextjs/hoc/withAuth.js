/* eslint-disable react/display-name */
import Router from 'next/router';
import { useAuth } from '../lib/auth';
import SpinnerIcon from '../components/spinnerIcon';

const withAuth = WrappedComponent => {
  return props => {
    if (typeof window !== 'undefined') {
      const auth = useAuth();
      if (auth.loading) return <SpinnerIcon />;
      else if (!auth.user) {
        auth.setRedirect(Router.pathname);
        Router.push('/login');
        return <SpinnerIcon />;
      }

      return <WrappedComponent {...props} />;
    }

    return <SpinnerIcon />;
  };
};

export default withAuth;
