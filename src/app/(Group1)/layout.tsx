import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Group1 Page',
  description: '첫번째 그룹 레이아웃',
};

export default function Group1Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <p>Group 1 레이아웃 입니다.</p>
      {children}
    </div>
  );
}
