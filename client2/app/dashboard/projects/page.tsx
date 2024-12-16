"use client";

import ErrorUi from "@/components/blocks/error";
import LoadingBlock from "@/components/blocks/loadingBlock";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import authClient from "@/lib/auth-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import strShorten from "str_shorten";

interface ProjectInterface {
  id: number;
  imageUrl: string;
  description: string;
  name: string;
  githubUrl: string;
  liveLink: string;
  tags: string[];
}

export default function ProjectsPage() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;
  const cloudinaryUploadUrl = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL!;
  const cloudinaryUploadPreset =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
  const session = authClient.useSession();
  const queryClient = useQueryClient();

  const [newProject, setNewProject] = useState<ProjectInterface>({
    id: 0,
    imageUrl: "",
    description: "",
    name: "",
    githubUrl: "",
    liveLink: "",
    tags: [],
  });

  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => {
      const response = await axios.get(
        `${backendUrl}/public/projects/${session.data?.user.id}`
      );
      return response.data;
    },
    queryKey: ["projects"],
    enabled: !!session.data?.user.id,
  });
  const saveProjectMutation = useMutation({
    mutationFn: async (project: ProjectInterface) => {
      let imageUrl = project.imageUrl;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", cloudinaryUploadPreset);

        try {
          const response = await axios.post(cloudinaryUploadUrl, formData);
          imageUrl = response.data.secure_url;
        } catch (error) {
          console.error("Image upload failed:", error);
          throw new Error("Image upload failed");
        }
      }

      const projectData = {
        name: project.name,
        imageUrl,
        description: project.description,
        githubUrl: project.githubUrl,
        liveLink: project.liveLink,
        tags: project.tags,
      };

      if (editingProjectId) {
        return await axios.patch(
          `${backendUrl}/projects/${editingProjectId}`,
          projectData,
          { withCredentials: true }
        );
      } else {
        return await axios.post(`${backendUrl}/projects`, projectData, {
          withCredentials: true,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      resetForm();
    },
    onError: (error) => {
      console.error("Error saving project:", error);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setNewProject((prev) => ({ ...prev, tags }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Generate a local preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveProjectMutation.mutate({ ...newProject });
  };

  const handleEdit = (project: ProjectInterface) => {
    setNewProject(project);
    setEditingProjectId(project.id);
    setPreviewUrl(project.imageUrl);
    setSelectedFile(null);
  };

  const resetForm = () => {
    setNewProject({
      id: 0,
      imageUrl: "",
      description: "",
      name: "",
      githubUrl: "",
      liveLink: "",
      tags: [],
    });
    setEditingProjectId(null);
    setPreviewUrl(null);
    setSelectedFile(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await axios.delete(`${backendUrl}/projects/${id}`, {
        withCredentials: true,
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  if (isLoading) {
    return <LoadingBlock />;
  }

  if (isError) {
    return <ErrorUi />;
  }

  return (
    <div className="space-y-6 p-4 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
        Projects
      </h1>

      {/* <Button
        onClick={() => refetch()}
        disabled={isLoading}
        className="bg-black/75 dark:bg-white/5 text-white"
      >
        Fetch My Content
      </Button> */}

      <Card className="max-w-[97%] bg-white border-gray-200 border rounded-sm dark:border-white/5 dark:bg-white/5 shadow-sm ">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-gray-800 dark:text-white">
            {editingProjectId ? "Edit Project" : "Add New Project"}
          </CardTitle>
          <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
            {editingProjectId
              ? "Update your project details"
              : "Create a new project entry"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="imageUrl"
                className="text-gray-700 dark:text-gray-300"
              >
                Project Image
              </Label>
              <Input
                type="file"
                onChange={handleFileChange}
                className="border-gray-300 dark:border-white/5"
              />
              {previewUrl && (
                <Image
                  width={200}
                  height={200}
                  src={previewUrl}
                  alt="Image Preview"
                  className="w-full h-40 object-cover rounded-md mt-2"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-gray-700 dark:text-gray-300"
              >
                Project Name
              </Label>
              <Input
                id="name"
                name="name"
                value={newProject.name}
                onChange={handleInputChange}
                required
                className="border-gray-300 dark:border-white/5"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-gray-700 dark:text-gray-300"
              >
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={newProject.description}
                onChange={handleInputChange}
                required
                className="border-gray-300 dark:border-white/5"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="githubUrl"
                className="text-gray-700 dark:text-gray-300"
              >
                GitHub URL
              </Label>
              <Input
                id="githubUrl"
                name="githubUrl"
                value={newProject.githubUrl}
                onChange={handleInputChange}
                required
                className="border-gray-300 dark:border-white/5"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="liveLink"
                className="text-gray-700 dark:text-gray-300"
              >
                Live Link
              </Label>
              <Input
                id="liveLink"
                name="liveLink"
                value={newProject.liveLink}
                onChange={handleInputChange}
                required
                className="border-gray-300 dark:border-white/5"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="tags"
                className="text-gray-700 dark:text-gray-300"
              >
                Tags (comma-separated)
              </Label>
              <Input
                id="tags"
                name="tags"
                value={newProject.tags.join(", ")}
                onChange={handleTagsChange}
                className="h-8 py-3 border-gray-300 dark:border-white/5"
              />
            </div>

            <div className="flex gap-4 justify-end">
              <Button
                type="submit"
                disabled={saveProjectMutation.isPending}
                className="bg-black/75 text-white dark:bg-white/5"
              >
                {editingProjectId ? "Update Project" : "Add Project"}
              </Button>
              {editingProjectId && (
                <Button onClick={resetForm} className="bg-red-500 text-white ">
                  Cancel Edit
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className=" flex flex-row flex-wrap w-[97%] gap-4">
        {projects?.map((project: ProjectInterface) => (
          <Card
            key={project.id}
            className="bg-white w-[310px] p-0! rounded-sm dark:bg-white/5 dark:border-white/5 shadow-md"
          >
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-white">
                {project.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                width={200}
                height={200}
                src={project.imageUrl}
                alt={project.name}
                className="w-fit h-52 object-cover rounded-md mb-4"
              />
              <p className="text-xs text-wrap text-gray-600 dark:text-gray-400 mb-2 ">
                {strShorten(project.description, 400)}
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 dark:bg-white/5 dark:text-white text-black/70 px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className=" flex justify-between items-center">
                <Link
                  href={project.githubUrl}
                  className=" text-sm underline rounded-md p-2"
                >
                  Github
                </Link>
                <Link href={project.liveLink} className=" text-sm underline">
                  Live Link
                </Link>
              </div>
              <div className="flex gap-4 mt-5">
                <Button
                  onClick={() => handleEdit(project)}
                  className=" bg-black/80 dark:bg-white/10 text-white"
                >
                  Edit
                </Button>
                <Button
                  className="bg-red-500 dark:bg-red-500 py-1 text-white hover:bg-red-600"
                  onClick={() => handleDelete(project.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
