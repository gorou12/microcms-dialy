import { client } from "@/libs/microcms";
import styles from './page.module.css';
import dayjs from "dayjs";
import { SITE_NAME } from "@/app/config/constants";

type Props = {
	id: string;
	title: string;
	body: string;
	publishedAt: string;
	tags: {name: string};
};

async function getBlogPost(id:string): Promise<Props> {
	const data = await client.get({
		endpoint: `blog/${id}`,
	});
	return data;
}

export default async function BlogPostPage({params}: {params: Promise<{id: string}>}) {
	const {id} = await params;
	const post = await getBlogPost(id);

	const formattedDate = dayjs(post.publishedAt).format('YY.MM.DD');

	return (
		<article className={styles.main}>
			<h1 className={styles.title}>{post.title}</h1>
			<div className={styles.date}>{formattedDate}</div>
			<div className={styles.tags}>カテゴリー：{post.tags && post.tags.name}</div>
			<div className={styles.post} dangerouslySetInnerHTML={{__html: post.body}} />
		</article>
	);
}

export async function generateMetadata({params}: {params: Promise<{id : string}>}) {
	const {id} = await params;
	const post = await getBlogPost(id);
	return {
		title: `${post.title} | ${SITE_NAME}`,
	}
}

export async function generateStaticParams() {
	const contentIds = await client.getAllContentIds({endpoint:'blog'});

	return contentIds.map((contentId)=> ({
		id: contentId,
	}));
}
