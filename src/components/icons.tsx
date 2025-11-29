import { Link, GitBranch } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

export const Icons = {
  logo: (props: LucideProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <GitBranch />
      <Link />
    </svg>
  ),
};
