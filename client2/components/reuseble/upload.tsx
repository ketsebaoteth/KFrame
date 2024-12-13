import React, { useState } from "react";
import axios from "axios";

interface CloudinaryUploadProps {
  onUploadSuccess: (url: string) => void; // Callback to pass the image URL to the parent component
}

const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({
  onUploadSuccess,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const cloudinaryUploadUrl = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL!;
  const cloudinaryUploadPreset =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);

      await uploadToCloudinary(file);
    }
  };

  const uploadToCloudinary = async (file: File) => {
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", cloudinaryUploadPreset);

      const response = await axios.post(cloudinaryUploadUrl, formData);
      onUploadSuccess(response.data.secure_url); // Pass the image URL to the parent component
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <label
        className="relative inline-block px-2 py-2 dark:bg-black/40 hover:bg-black/45 border cursor-pointer text-muted-foreground rounded-none transition-all duration-200 hover:text-white active:bg-muted"
        htmlFor="file-upload"
      >
        {selectedFile ? selectedFile.name : "Choose an image to upload"}
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          disabled={isUploading}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        />
      </label>
    </div>
  );
};

export default CloudinaryUpload;
