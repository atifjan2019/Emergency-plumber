type Props = { data: Record<string, unknown> | Record<string, unknown>[] };

export default function SchemaMarkup({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
