'use client';

interface DefaultProfilePictureProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function DefaultProfilePicture({ name, size = 'md' }: DefaultProfilePictureProps) {
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const sizeClasses = {
    sm: 'w-10 h-10 text-xl',
    md: 'w-24 h-24 text-4xl',
    lg: 'w-32 h-32 text-5xl'
  };

  return (
    <div 
      className={`${sizeClasses[size]} rounded-full bg-[#222223] flex items-center justify-center font-bold text-[#00EDFF]`}
    >
      {getInitial(name)}
    </div>
  );
}