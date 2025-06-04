import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostFrontMatter {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  published: boolean;
}

export interface PostData {
  frontMatter: PostFrontMatter;
  content: React.ReactElement;
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data: frontMatter, content } = matter(fileContents);

    const { content: mdxContent } = await compileMDX<PostFrontMatter>({
      source: content,
      frontmatter: frontMatter as PostFrontMatter,
      options: {
        parseFrontmatter: true,
      },
    });

    return {
      frontMatter: frontMatter as PostFrontMatter,
      content: mdxContent,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPostSlugs(): string[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((name) => name.endsWith('.mdx'))
      .map((name) => name.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

export async function getAllPosts(): Promise<PostFrontMatter[]> {
  try {
    const slugs = getAllPostSlugs();
    const posts = await Promise.all(
      slugs.map(async (slug) => {
        const fullPath = path.join(postsDirectory, `${slug}.mdx`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        return data as PostFrontMatter;
      })
    );

    return posts
      .filter(post => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
} 