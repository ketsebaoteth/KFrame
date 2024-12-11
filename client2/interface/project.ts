interface ProjectInterface {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  githubUrl: string;
  liveLink: string;
  tags: string[]; // Array of tags (strings)
  userId: string;
}

export default ProjectInterface;
