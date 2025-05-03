import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
        lineHeight: 1.6,
        fontFamily: 'Helvetica',
    },
    section: {
        marginBottom: 10,
    },
});

export function PlanPDF({ content }: { content: string }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {content.split('\n\n').map((block, idx) => (
                    <Text key={idx} style={styles.section}>{block}</Text>
                ))}
            </Page>
        </Document>
    );
}
