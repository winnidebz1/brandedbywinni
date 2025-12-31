import React from 'react';

// Use React.HTMLAttributes to allow standard props including onClick, id, style, etc.
// 'key' is handled by React and doesn't need to be in the interface if used in JSX correctly,
// but spreading props ensures other standard attributes work.

export const Card = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`bg-white rounded-2xl shadow-lg shadow-brand-pink/10 border border-brand-pink/20 p-6 hover:shadow-xl transition-shadow duration-300 ${className}`} {...props}>
        {children}
    </div>
);

export const Button = ({ children, variant = 'primary', className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost' }) => {
    const baseStyle = "px-6 py-2.5 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 shadow-lg flex items-center justify-center space-x-2";
    const variants = {
        primary: "bg-brand-pink text-white shadow-brand-pink/30 hover:shadow-brand-pink/50 hover:bg-brand-pink/90",
        secondary: "bg-brand-ivory text-brand-dark hover:bg-brand-ivory/80",
        outline: "border-2 border-brand-pink text-brand-pink hover:bg-brand-pink hover:text-white",
        ghost: "bg-transparent text-brand-dark hover:bg-brand-ivory/50 shadow-none hover:shadow-none"
    };

    return (
        <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export const Badge = ({ children, variant = 'default', className = '' }: { children: React.ReactNode, variant?: 'default' | 'success' | 'warning' | 'error' | 'pink', className?: string }) => {
    const variants = {
        default: "bg-brand-muted/20 text-brand-text",
        success: "bg-green-100 text-green-700",
        warning: "bg-yellow-100 text-yellow-700",
        error: "bg-red-100 text-red-700",
        pink: "bg-brand-ivory text-brand-dark border border-brand-pink/20"
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

export const PageHeader = ({ title, subtitle, action }: { title: string, subtitle?: string, action?: React.ReactNode }) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-brand-dark relative inline-block">
                {title}
                <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-brand-pink rounded-full"></span>
            </h1>
            {subtitle && <p className="text-brand-muted mt-3 text-lg">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
    </div>
);
