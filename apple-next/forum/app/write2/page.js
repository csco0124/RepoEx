export default async function Write2() {
  
  async function handleSubmit(formData) {
    "use server";
    console.log(formData);
    console.log(formData.get("title"));
  }
  
  return (
    <form action={handleSubmit}>
      <input type="text" name="title" />
      <button type="submit">Submit</button>
    </form>
  );
}
