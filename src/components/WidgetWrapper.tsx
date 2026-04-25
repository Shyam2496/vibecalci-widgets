import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ──────────────────────────────────────────────
   SectionCard — shared background card for a group of widgets
   ────────────────────────────────────────────── */
export interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const SectionCard: React.FC<SectionCardProps> = ({ title, children, className }) => (
  <section className={cn('w-full', className)}>
    <div
      className="relative bg-[#dde3e9] rounded-[2rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.8)] border border-[#adb3b8]/30 overflow-hidden"
    >
      {/* Brushed Aluminum Chassis Overlay */}
      <div className="absolute inset-0 brushed-metal pointer-events-none opacity-50 z-0" />

      {/* Section title bar */}
      <div className="relative z-10 px-5 pt-2.5 pb-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{title}</p>
      </div>

      {/* Widgets */}
      <div className="relative z-10 flex flex-col gap-0 px-3 pb-1.5">
        {children}
      </div>
    </div>
  </section>
);

/* ──────────────────────────────────────────────
   WidgetWrapper — individual widget inside a SectionCard
   ────────────────────────────────────────────── */
export interface WidgetWrapperProps {
  label: string;
  hint?: string;
  iconColorClass?: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const WidgetWrapper: React.FC<WidgetWrapperProps> = ({
  label,
  hint,
  iconColorClass = 'text-indigo-500',
  badge,
  children,
  className,
}) => {
  return (
    <div className={cn('w-full rounded-2xl bg-transparent', className)}>
      {/* Label Row */}
      <div className="flex items-center justify-between px-2 pt-2 pb-1.5">
        <div className="flex items-center gap-1.5">
          <span className={cn('text-[13px] font-bold tracking-tight uppercase opacity-90', iconColorClass)}>
            {label}
          </span>
        </div>
        {badge && <div className="flex-shrink-0">{badge}</div>}
      </div>

      {/* Content */}
      <div className="px-2 pb-2">
        {/* Hint */}
        {hint && (
          <p className="text-[12px] leading-snug text-slate-500 font-medium tracking-wide mb-2.5">{hint}</p>
        )}
        
        <div className="w-full">{children}</div>
      </div>

      {/* Divider */}
      <div className="mx-4 border-b border-[#bcc2c8]/50 mt-1" />
    </div>
  );
};

export default WidgetWrapper;