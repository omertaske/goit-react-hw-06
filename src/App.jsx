// src/App.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact, deleteContact, selectContacts } from "./redux/contactsSlice";
import { changeFilter, selectFilter } from "./redux/filtersSlice";

function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = () => {

 

    dispatch(addContact(name, number));
 
  };

  const handleDelete = (id) => dispatch(deleteContact(id));

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-500 flex flex-col items-center p-6 font-sans">
      <h1 className="text-5xl font-bold text-white mb-8 drop-shadow-lg ">Phonebook</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-6 w-full max-w-xl">
        <input
          type="text"
          placeholder="İsim"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 flex-1 shadow-sm"
        />
        <input
          type="number"
          placeholder="Numara"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 flex-1 shadow-sm"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-shadow shadow-md"
        >
          Ekle
        </button>
      </form>

      {/* Filter */}
      <input
        type="text"
        placeholder="Ara..."
        value={filter}
        onChange={(e) => dispatch(changeFilter(e.target.value))}
        className="p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 mb-6 w-full max-w-xl shadow-sm"
      />

      {/* List */}
      <ul className="w-full max-w-xl space-y-3">
        {filteredContacts.map((c) => (
          <li
            key={c.id}
            className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center hover:shadow-xl transition"
          >
            <span className="text-gray-800 font-medium">{c.name}: {c.number}</span>
            <button
              onClick={() => handleDelete(c.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-shadow shadow-sm"
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
