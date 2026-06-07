import type { ReactNode } from 'react';

type Props = React.ComponentProps<'button'> & {
  children: ReactNode;
};

export default function Button({ children, ...props }: Props) {
  return (
    <button className='p-4 bg-bg text-primary rounded-sm hover:cursor-pointer hover:opacity-[.7] transition-opacity duration-300' {...props}>
      {children}
    </button>
  );
}