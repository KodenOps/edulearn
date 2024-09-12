import { create } from 'zustand';
import { Course } from '@/types/types';

interface WishListState {
	wishlist: Course[];
	addToWishList: (course: Course) => void;
	removeFromWishList: (courseId: number) => void;
	isInWishList: (courseId: number) => boolean;
}

export const useWishListStore = create<WishListState>((set, get) => ({
	wishlist: [],
	addToWishList: (course) =>
		set((state) => ({ wishlist: [...state.wishlist, course] })),
	removeFromWishList: (courseId) =>
		set((state) => ({
			wishlist: state.wishlist.filter((c) => c.id !== courseId),
		})),
	isInWishList: (courseId) => get().wishlist.some((c) => c.id === courseId),
}));
