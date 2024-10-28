export async function POST(request: Request): Promise<Response> {
  const formData = await request.formData();
  
  console.log(formData.getAll('files'));
  console.log("post successfull");
  return {};
}
