import { toaster } from 'baseui/toast';

export default function AuthToast(message) {
  let toastKey;
  toastKey = toaster.negative(<>{message}</>, {
    onClose: () => console.log('Toast closed.'),
    overrides: {
      InnerContainer: {
        style: {
          width: '100%',
        },
      },
    },
  });
  return toastKey;
}
