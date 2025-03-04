import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Group3 Page',
  description: '세번째 그룹 레이아웃',
};

export default function Group2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <p>Group 3 레이아웃 입니다.</p>
      {children}
    </div>
  );
}
