import AppGrid from '@/components/AppGrid';
import PhotoGridSidebar from '@/photo/PhotoGridSidebar';
import { getPhotosMetaCached } from '@/photo/cache';
import { getDataForCategoriesCached } from '@/category/cache';
import { FEED_META_QUERY_OPTIONS } from '@/feed';

export default async function ArtistStatementPage() {
    const [
        photosCount,
        categories,
    ] = await Promise.all([
        getPhotosMetaCached(FEED_META_QUERY_OPTIONS)
            .then(({ count }) => count)
            .catch(() => 0),
        getDataForCategoriesCached()
            .catch(() => ({}) as any),
    ]);

    return (
        <AppGrid
            contentMain={
                <div className="space-y-6 max-w-2xl mx-auto py-4">
                    <h1 className="text-3xl font-bold">Polifonía Visual: El diálogo de la imagen</h1>

                    <div className="space-y-4 text-lg leading-relaxed text-dim">
                        <p>
                            Una fotografía nunca es un punto final; es, en esencia, una pregunta abierta. Polifonía Visual surge de la voluntad de convertir el acto solitario de observar en un proceso colectivo de creación.
                        </p>

                        <p>
                            Durante años, mi cámara ha recorrido las calles y los paisajes de Argentina, capturando fragmentos de una realidad que ahora entrego a otras manos. En este proyecto, la fotografía deja de ser un registro estático para convertirse en un territorio de encuentro. Aquí, el trazo, la palabra y el color de distintos artistas se superponen a mi propia mirada, creando una obra nueva: una polifonía donde las voces no se anulan, sino que resuenan juntas.
                        </p>

                        <p>
                            Estas páginas no solo muestran lugares o momentos; documentan una conversación. Son cartografías donde mi lente puso el escenario y el artista invitado, la historia. El resultado es un híbrido visual donde la realidad capturada y la imaginación volcada se funden en una sola pieza, celebrando la riqueza de la interpretación compartida.
                        </p>
                    </div>

                    <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
                        <p className="font-medium text-dim">Gustavo Sanchez / Pusadolfo</p>
                    </div>
                </div>
            }
            contentSide={
                <PhotoGridSidebar
                    photosCount={photosCount}
                    {...categories}
                />
            }
        />
    );
}
