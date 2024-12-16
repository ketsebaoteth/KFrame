"use client";

import ErrorUi from "@/components/blocks/error";
import LoadingBlock from "@/components/blocks/loadingBlock";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import authClient from "@/lib/auth-client";
import techOptions from "@/util/techStack";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface SkillInterface {
  id: number;
  name: string;
  imageUrl: string;
}

export default function SkillsPage() {
  const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const session = authClient.useSession();

  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState<SkillInterface>({
    id: 0,
    name: "",
    imageUrl: "",
  });

  const {
    data: skills,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["skills", session.data?.user.id],
    queryFn: async () => {
      if (!session.data?.user.id) return [];
      const response = await axios.get(
        `${backendurl}/public/skills/${session.data.user.id}`,
        { withCredentials: true }
      );
      return response.data;
    },
    enabled: !!session.data?.user.id,
  });

  const addSkillMutation = useMutation({
    mutationFn: async (skill: SkillInterface) => {
      return await axios.post(`${backendurl}/skills`, skill, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      refetch();
      resetForm();
    },
    onError: (error) => {
      console.error("Error adding skill:", error);
    },
  });

  const deleteSkillMutation = useMutation({
    mutationFn: async (skillId: number) => {
      return await axios.delete(`${backendurl}/skills/${skillId}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error deleting skill:", error);
    },
  });

  const handleTechSelect = (techName: string) => {
    const selected = techOptions?.find((tech) => tech.name === techName);
    if (selected) {
      setNewSkill({
        id: Date.now(),
        name: selected.name,
        imageUrl: selected.imageUrl,
      });
    }
    setSelectedTech(techName);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSkill((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name || !newSkill.imageUrl) return;
    addSkillMutation.mutate({ ...newSkill, id: Date.now() });
  };

  const resetForm = () => {
    setNewSkill({ id: 0, name: "", imageUrl: "" });
    setSelectedTech(null);
  };

  if (isLoading) {
    return <LoadingBlock />;
  }

  if (isError) {
    return <ErrorUi />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-medium">Select or Add a Skill</h1>

      <p className=" font-light text-sm text-blue-500">
        If you are able to find your skill, choose it from the dropdown. If not,
        add it manually by entering the name and the image link.
      </p>
      <div className="max-w-xs ">
        <Select onValueChange={handleTechSelect} value={selectedTech || ""}>
          <SelectTrigger className=" rounded-sm dark:bg-white/5">
            <SelectValue placeholder="Select a technology" />
          </SelectTrigger>
          <SelectContent className=" rounded-sm">
            {techOptions.map((tech) => (
              <SelectItem key={tech.name} value={tech.name}>
                {tech.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="md:max-w-[90%] w-full dark:bg-white/5 dark:border-white/5 rounded-sm">
        <CardHeader>
          <CardTitle>Add New Skill</CardTitle>
          <CardDescription>
            Select an existing tech or add a custom one below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Skill Name</Label>
              <Input
                id="name"
                name="name"
                value={newSkill.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={newSkill.imageUrl}
                onChange={handleInputChange}
                required
              />
            </div>
            <CardFooter className="gap-3">
              <Button type="submit" disabled={addSkillMutation.isPending}>
                {addSkillMutation.isPending ? "Submitting..." : "Add Skill"}
              </Button>
              <Button type="button" variant="secondary" onClick={resetForm}>
                Reset
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-medium">Skills List</h2>

      {skills && skills.length > 0 ? (
        <div className=" flex flex-row gap-3 flex-wrap w-[97%]">
          {skills.map(
            (skill: { imageUrl: string; name: string; id: number }) => (
              <Card
                key={skill.id}
                className=" rounded-sm dark:bg-white/5 dark:border-white/5"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img
                    height={200}
                    width={200}
                    src={skill.imageUrl}
                    alt={skill.name}
                    className="w-10 h-10 object-contain mb-4"
                  />
                  <h3 className="text-sm font-semibold">{skill.name}</h3>
                  <Button
                    className=" bg-red-500 mt-5"
                    onClick={() => deleteSkillMutation.mutate(skill.id)}
                  >
                    {deleteSkillMutation.isPending ? "Deleting..." : "Delete"}
                  </Button>
                </CardContent>
              </Card>
            )
          )}
        </div>
      ) : (
        <p>No skills found. Add a skill to get started!</p>
      )}
    </div>
  );
}
