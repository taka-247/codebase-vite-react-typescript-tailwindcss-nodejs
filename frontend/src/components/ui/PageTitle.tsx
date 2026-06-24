import type { ReactNode } from 'react';

type Props = React.ComponentProps<'h1'> & {
  children: ReactNode;
};

export default function PageTitle({ children, ...props }: Props) {
  return (
    <h1 className='text-text mb-4' {...props}>
      {children}
    </h1>
  );
}