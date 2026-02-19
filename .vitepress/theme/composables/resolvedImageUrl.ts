import { withBase } from "vitepress";
export function ResolvedImageUrl(routePath: string, localePath: string, img?: string) {
    if (!img) return null;

    // 1. External/Absolute paths: vitepress handles these with withBase
    if (img.startsWith('http') || img.startsWith('/')) {
        return withBase(img);
    }

    // 2. Resolve relative paths (./ and ../)
    if (img.startsWith('./') || img.startsWith('../')) {

        // Remove file extension and trailing slash from route
        let currentDir = routePath.replace(/\/$/, "").replace(/\.html$/, "");
        currentDir = currentDir.substring(0, currentDir.lastIndexOf('/'));

        const parts = img.split('/');
        const dirParts = currentDir.split('/').filter(Boolean);

        for (const part of parts) {
            if (part === '..') dirParts.pop();
            else if (part !== '.' && part !== '') dirParts.push(part);
        }
        if (localePath === "en") {
            const DirParts = `/${dirParts.join('/')}`;
            if (DirParts.startsWith("/en")) {
                return withBase(DirParts);
            }
            return withBase(`/en/${DirParts}`)

        }
        return withBase(`/${dirParts.join('/')}`);
    }

    // 3. Fallback: If it's a naked filename, assume it's in the current locale's folder
    // localePath will be '/' for root or '/hi/' for others

    return withBase(`${localePath}${img}`);
}


