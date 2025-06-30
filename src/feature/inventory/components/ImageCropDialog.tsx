"use client";

import Cropper from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import getCroppedImg from "@/lib/utils";
import type { Area } from "react-easy-crop";

interface Props {
  open: boolean;
  imageUrl: string;
  onClose: () => void;
  onCropComplete: (file: File) => void;
}

export default function ImageCropDialog({
  open,
  imageUrl,
  onClose,
  onCropComplete,
}: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropCompleteInternal = useCallback(
    (_croppedArea: Area, croppedPixels: Area) => {
      setCroppedAreaPixels(croppedPixels);
    },
    []
  );

  const handleSave = async () => {
    if (!croppedAreaPixels) return;

    const croppedImageBlob = await getCroppedImg(imageUrl, croppedAreaPixels);
    const file = new File([croppedImageBlob], "cropped.jpg", {
      type: "image/jpeg",
    });

    onCropComplete(file);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-3xl h-[500px] flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>Recorta tu imagen</DialogTitle>
          <DialogDescription>
            Ajusta el área visible que se usará como imagen final del producto.
          </DialogDescription>
        </DialogHeader>

        {/* Cropper */}
        <div className="relative flex-1 bg-black rounded overflow-hidden">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropCompleteInternal}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Recortar y guardar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
