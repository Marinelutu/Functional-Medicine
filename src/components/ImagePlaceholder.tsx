import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  label: string;
  className?: string;
  aspectRatio?: "hero" | "square" | "portrait" | "landscape" | "wide" | "icon";
}

const aspectClasses = {
  hero: "min-h-[500px] lg:min-h-[600px]",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[16/9]",
  wide: "aspect-[21/9]",
  icon: "w-20 h-20",
};

const ImagePlaceholder = ({ label, className, aspectRatio = "landscape" }: ImagePlaceholderProps) => {
  return (
    <div
      className={cn(
        "bg-placeholder-bg rounded-xl flex items-center justify-center text-placeholder-text font-mono text-sm p-4 text-center",
        aspectClasses[aspectRatio],
        className
      )}
    >
      {label}
    </div>
  );
};

export default ImagePlaceholder;
