type IconProps = {
    className?: string;
};

export function DuplicateIcon(props: IconProps): JSX.Element {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            {...props}
        >
            <path
                fill="currentColor"
                fillOpacity={0.3}
                d="M9 8H5v12h10v-3H9V8z"
            />
            <path
                stroke="currentColor"
                strokeWidth={2}
                d="M8 7V5a2 2 0 012-2h4.172a2 2 0 011.414.586l3.828 3.828A2 2 0 0120 8.828V15a2 2 0 01-2 2h-2M8 7v8a2 2 0 002 2h6M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
            />
        </svg>
    );
}

export function LightIcon(props: IconProps): JSX.Element {
    return (
        <svg
            {...props}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
        </svg>
    );
}

export function DarkIcon(props: IconProps): JSX.Element {
    return (
        <svg
            {...props}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
        </svg>
    );
}

export function SystemIcon(props: IconProps): JSX.Element {
    return (
        <svg
            {...props}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
        </svg>
    );
}

export function BeakerIcon(props: IconProps): JSX.Element {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            {...props}
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.252 5.91L8.625 4h6.75l-.627 1.91a10 10 0 00-.498 3.117v.843a3 3 0 00.586 1.782l4.987 6.754A1 1 0 0119.02 20H4.98a1 1 0 01-.804-1.594l4.987-6.754A3 3 0 009.75 9.87v-.843a10 10 0 00-.498-3.117z"
            />
            <path
                fill="currentColor"
                fillOpacity={0.3}
                d="M10.833 15.25C9.9 15.25 8.89 14.417 8.5 14L5 19h14l-2.333-3.75c-.39-.417-1.4-1.25-2.334-1.25-1.166 0-2.333 1.25-3.5 1.25z"
            />
        </svg>
    );
}

export function SelectIcon(props: IconProps): JSX.Element {
    return (
        <svg
            {...props}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
            />
        </svg>
    );
}

export function MinimizeIcon(props: IconProps): JSX.Element {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            {...props}
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 10l-3.293 3.293a1 1 0 01-1.414 0L8 10"
            />
        </svg>
    );
}

export function CloseIcon(props: IconProps): JSX.Element {
    return (
        <svg
            {...props}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    );
}

export function GithubIcon(props: IconProps): JSX.Element {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path
                fill-rule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
            ></path>
        </svg>
    );
}

export function TwitterIcon(props: IconProps): JSX.Element {
    return (
        <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
        </svg>
    );
}
