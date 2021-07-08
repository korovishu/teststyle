import React from 'react';
import { StatefulTooltip, PLACEMENT } from 'baseui/tooltip';
import Image from 'next/image';

function ChangeCover() {
  function handleTooltipClick() {
    console.log('change cover');
  }

  return (
    <div
      className="block relative rounded cursor-pointer -mx-2  px-12 py-1.5 bg-blue-500 hover:bg-blue-600"
      onClick={handleTooltipClick}>
      <input
        className="absolute top-0 right-0 z-10 cursor-pointer opacity-0"
        type="file"
        id="img"
        name="img"
        accept="image/*"></input>
      <span className="text-xs text-white">Change Cover</span>
    </div>
  );
}

export default function Banner({ src }) {
  return (
    <>
      <StatefulTooltip
        accessibilityType={'tooltip'}
        content={ChangeCover}
        animateOutTime={200}
        placement={PLACEMENT.bottomRight}
        popoverMargin={-50}
        overrides={{
          Body: {
            style: () => ({ backgroundColor: 'transparent' }),
          },
          Inner: {
            style: () => ({
              backgroundColor: 'white',
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px',
              borderBottomLeftRadius: '4px',
              borderBottomRightRadius: '4px',
            }),
          },
        }}>
        <div className="h-72 w-full relative z-0">
          <Image src={src} alt="Dummy Cover" layout="fill" objectFit="cover" />
        </div>
      </StatefulTooltip>
    </>
  );
}
