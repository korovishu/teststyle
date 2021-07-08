import * as React from 'react';
import { Spinner } from 'baseui/spinner';

export default function SpinnerIcon() {
  return (
    <Spinner
      overrides={{
        Svg: {
          style: () => ({
            marginTop: '20%',
            marginLeft: '50%',
          }),
        },
      }}
    />
  );
}
