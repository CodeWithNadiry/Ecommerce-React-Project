import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      users: [],

      signup: ({ name, email, password }) => {
        const { users } = get();

        if (users.some((u) => u.email === email)) {
          alert("Email already exists");
          return false;
        }

        const role = email.includes("admin") ? "admin" : "user";
        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          password,
          role,
        };

        set({ users: [...users, newUser] });

        return true;
      },

      login: ({ email, password }) => {
        const { users } = get();

        const foundUser = users.find(
          (u) => u.email === email && u.password === password
        );

        if (!foundUser) {
          alert("Email or password incorrect");
          return false;
        }

        set({ user: foundUser, isLoggedIn: true });

        return foundUser.role;
      },

      logout: () => {
        set({ user: null, isLoggedIn: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;