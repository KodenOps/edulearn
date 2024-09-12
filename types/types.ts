export interface Instructor {
	id: number;
	itle: string;
}
export interface Course {
	id: number;
	title: string;
	url: string;
	is_paid: boolean;
	price: string;
	visible_instructor: Instructor;
	image_480x270: string;
	image_240x135: string;
	image_125_H: string;
	is_practise_test_course: boolean;
	published_title: string;
	tracking_id: string;
	locale: {
		title: string;
		english_title: string;
		simple_english_title: string;
	};
	result: any;
	subtitle: string;
	num_review: number;
	image_240x13: string;
}
