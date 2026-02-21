import { create } from "zustand";

const useAuthStore = create((set) => ({

  user: JSON.parse(localStorage.getItem("loggedInUser")) || null,
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  users: JSON.parse(localStorage.getItem("users") || "[]"),

  signup: ({ name, email, password }) => {
    set((state) => {
      if (state.users.some((u) => u.email === email)) {
        alert("Email already exists");
        return {};
      }

      const role = email.includes("admin") ? "admin" : "user";
      const newUser = { id: Date.now().toString(), name, email, password, role };

      const updatedUsers = [...state.users, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      return { users: updatedUsers };
    });

    return true;
  },

  login: ({ email, password }) => {
    const foundUser = JSON.parse(localStorage.getItem("users") || "[]").find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      alert("Email or password incorrect");
      return false;
    }

    set({ user: foundUser, isLoggedIn: true });

    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
    localStorage.setItem("isLoggedIn", "true");

    return foundUser.role;
  },

  logout: () => {
    set({ user: null, isLoggedIn: false });
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("isLoggedIn");
  },
}));

export default useAuthStore;