import Spinner from '@/components/Spinner';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Spinner size={30} />
      <span className="ml-3 text-lg text-gray-500">Cargando selección...</span>
    </div>
  );
}
