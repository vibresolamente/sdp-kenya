import Link from 'next/link';
import Image from 'next/image';

interface PolicyCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export default function PolicyCard({ id, title, description, imageUrl }: PolicyCardProps) {
  const img = imageUrl || '/placeholder-policy.jpg';
  return (
    <Link href={`/policies/${id}`} className="block">
      <div className="pillar-card glass-bg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
        <Image src={img} alt={title} width={400} height={250} className="w-full h-48 object-cover rounded-t-lg mb-4" />
        <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 text-sm line-clamp-3">{description}</p>
        <div className="read-more-link mt-3 text-teal">Read more →</div>
      </div>
    </Link>
  );
}
