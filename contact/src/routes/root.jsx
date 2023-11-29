import { useEffect } from "react";
import {
    Outlet,
    NavLink,
    Link,
    Form,
    useLoaderData,
    redirect,
    useSubmit,
  } from "react-router-dom";
  import { getContacts, createContact } from "../contacts";

  export async function action() {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
  }

  export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const contacts = await getContacts(q);
    return { contacts, q };
  }

export default function Root() {
  const { contacts, q } = useLoaderData();
  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);
  const submit = useSubmit();
    return (
      <>
        <div id="sidebar">
          <h1>My favorite contacts</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
                defaultValue={q}
                onChange={(event) => {
                  submit(event.currentTarget.form);
                }}
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </Form>
            <Form method="post">
            <button type="submit">Add a new Contact</button>
          </Form>
          </div>
          <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                    <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  
                  </Link>
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
          </nav>
        </div>
        <div id="detail"></div>
        <div id="detail">
        <Outlet />
      </div>
      </>
    );
  }