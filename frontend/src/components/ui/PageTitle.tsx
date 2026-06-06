import type { ReactNode } from 'react';

type Props = React.ComponentProps<'h2'> & {
  children: ReactNode;
};

export default function PageTitle({ children, ...props }: Props) {
  return (
    <h2 className='text-white mb-4' {...props}>
      {children}
    </h2>
  );
}