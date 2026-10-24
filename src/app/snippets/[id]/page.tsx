export default async function SnippetShowPage(props: any) {
  const { id } = await props.params;
  return <div>Show a Snippet - {id}</div>;
}
