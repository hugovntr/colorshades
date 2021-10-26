export function titleCase(string: string): string {
    return string
        .replace(/-/g, " ")
        .replace(
            /\w\S*/g,
            (t) => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()
        );
}
