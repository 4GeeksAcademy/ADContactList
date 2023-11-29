import { Form, useLoaderData, redirect,useNavigate, } from "react-router-dom";
import { updateContact } from "../contacts";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
  }

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Email</span>
        <input
          type="text"
          name="twitter"
          placeholder="@something something "
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Phone number</span>
        <input
          placeholder=""
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Address</span>
        <textarea
          name="notes"
          defaultValue={contact.notes}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button"  onClick={() => {
            navigate(-1);
          }}>Cancel</button>
      </p>
    </Form>
  );
}