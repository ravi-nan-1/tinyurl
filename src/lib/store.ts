import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type StoredLink = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
};

type UrlStore = {
  links: StoredLink[];
  addLink: (link: StoredLink) => void;
  removeLink: (id: string) => void;
};

export const useUrlStore = create<UrlStore>()(
  persist(
    (set) => ({
      links: [],
      addLink: (link) =>
        set((state) => ({
          links: [link, ...state.links],
        })),
      removeLink: (id) =>
        set((state) => ({
          links: state.links.filter((link) => link.id !== id),
        })),
    }),
    {
      name: 'url-storage', // unique name
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
