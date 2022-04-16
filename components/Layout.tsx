import React, { ReactNode } from 'react';
import { AuthWrapper } from './Auth';

type Props = {
  title?: string;
};

const Layout: React.FC<Props> = ({
  children,
  title = 'This is the default title',
}) => (
  <div className="flex flex-col flex-grow w-full h-full mt-0 max-w-screen-lg min-w-[800px]">
    <h2 className="flex-grow-0 my-5 text-2xl font-bold text-center text-slate-100 md:text-4xl">
      {title}
    </h2>

    <div className="flex flex-col flex-grow p-8 mb-6 bg-gray-100 rounded-xl drop-shadow-2xl">
      {children}
    </div>
  </div>
);

export default Layout;
