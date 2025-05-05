import React from 'react';

interface TitleProps {
    text1: string;
    text2: string;
}

const Title: React.FC<TitleProps> = ({ text1, text2 }) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
      <p className='text-broken-white'>{text1} <span className='text-crimson font-medium'>{text2}</span></p>
      <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-crimson'></p>
    </div>
  );
};

export default Title;