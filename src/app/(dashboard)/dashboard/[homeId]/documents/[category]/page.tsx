async function DocumentCategoryPage({
  params,
}: PageProps<"/dashboard/[homeId]/documents/[category]">) {
  const { homeId, category } = await params;
  return <div>{category}</div>;
}
export default DocumentCategoryPage;
