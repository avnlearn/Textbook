/**
 * Generates the full CSS @page string for the HTML head.
 * @param size - 'a4', 'a5', 'a6', or 'a7'
 */
export function PaperSizeStyle(size: string): string {
    // Normalize input
    const s = size ? size.toLowerCase() : 'a4';

    // Mapping using DOTS for decimals (standard CSS syntax)
    const sizes: Record<string, string> = {
        a4: '210mm 297mm',
        a4l: '210mm 297mm landscape',
        a5: '148mm 210mm',
        a5l: '148mm 210mm landscape',
        a6: '105mm 148mm',
        a6l: '105mm 148mm landscape',
        a7: '74mm 105mm',
        a7l: '74mm 105mm landscape',
        a8: '52mm 74mm',
        a8l: '52mm 74mm landscape'
    };

    const pageSize = sizes[s] || '8.27in 11.69in';

    return `
        @media print {
            @page { 
                size: ${pageSize}; 
                margin: 0; 
                margin-bottom: 2mm;
            }
            body { 
                margin: 0; 
                padding: 0; 
                -webkit-print-color-adjust: exact; 
                print-color-adjust: exact; 
            }
            /* Hide default browser headers/footers for a cleaner worksheet */
            header, footer { display: none !important; }
        }
    `.replace(/\s+/g, ' ').trim();
}
