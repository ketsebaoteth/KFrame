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
import authClient from "@/lib/auth-client";
import { generateShortURL } from "@/util/urlShortner";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const session = authClient.useSession();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;
  const cloudinaryUploadUrl = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL!;
  const cloudinaryUploadPreset =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

  const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL as string;
  const router = useRouter();

  const [profile, setProfile] = useState({
    image: "/user1.png",
    name: "",
    email: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    data: userInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const response = await axios.get(`${backendUrl}/user`, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  useEffect(() => {
    if (userInfo) {
      setProfile({
        image: userInfo.image || "/user1.png",
        name: userInfo.name || "",
        email: userInfo.email || "",
      });
      setPreviewUrl(userInfo.image || "/user1.png");
    }
  }, [userInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    mutate: updateUser,
    isPending,
    isError: updateError,
    error: updateErrorMessage,
    isSuccess,
  } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: async () => {
      let imageUrl = profile.image;

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

      const response = await axios.patch(
        `${backendUrl}/user`,
        { ...profile, image: imageUrl },
        { withCredentials: true }
      );

      return response.data;
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser();
  };

  const userLink = `${frontendUrl}/main/home/${session.data?.user.id}`;
  const result = generateShortURL(userLink);

  return (
    <div className="space-y-6 ">
      <h1 className="text-2xl font-medium">User Profile</h1>

      {isLoading && <LoadingBlock />}
      {isError && <ErrorUi />}

      {userInfo && (
        <Card className=" dark:bg-white/5 md:w-[90%] rounded-sm dark:border-white/5 border ">
          <CardHeader>
            <CardDescription>
              <span className=" font-normal text-sm">id :</span>
              {session.data?.user.id}
            </CardDescription>

            <CardDescription>
              <span className=" font-normal text-sm">id :</span>
              {`${frontendUrl}/main/home/${session.data?.user.id}`}
            </CardDescription>

            <hr />

            {result}

            <hr />
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={previewUrl || profile.image || "/user1.png"}
                  alt={profile.name}
                  className=" w-14  h-14 rounded-full"
                />
                <input type="file" onChange={handleFileChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                />
              </div>
              {updateError && (
                <p className="text-red-500">
                  Error updating profile: {updateErrorMessage.message}
                </p>
              )}
              {isSuccess && (
                <p className="text-green-500">Profile updated successfully!</p>
              )}
            </form>
          </CardContent>
          <CardFooter className=" flex gap-5 items-center">
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isPending}
              className=" dark:bg-white/10 dark:border-white/5 dark:text-white"
            >
              {isPending ? "Updating..." : "Update Profile"}
            </Button>

            <Button
              type="submit"
              onClick={async () => {
                const response = await authClient.signOut();

                const loggedOut = response.data?.success;
                if (loggedOut) {
                  router.push("/login");
                }
              }}
              className=" dark:bg-red-500 dark:border-none dark:text-white"
            >
              Log Out
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
